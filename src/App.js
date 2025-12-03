import React from 'react';
import {HashRouter as Router, Routes, Route} from "react-router-dom";
import firebase from './firebase.js';
import axios from 'axios';
import Splitter from '@devbookhq/splitter';
import GlobalStyle from './GlobalStyle.js';
import './App.css';
import Audience from './Audience.js';
import VideoCaller from './VideoCaller.js';
import Moderator from './Moderator.js';
import Subtitles from './Subtitles.js';
import {Button, VideoCall, TaskBar} from './Common.js';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			settings: null,
			performance: "loading",
			showVideoPanel: false,
			panelSizes: [62.5, 37.5]
		}
	}
	initSettings = (s) => {
		this.setState(state => ({
			settings: s
		}));
		// Get performance data from Firebase
		const performanceRef = firebase.database().ref(this.state.settings.performanceId);
		performanceRef.on('value', (snapshot) => {
			const newState = snapshot.val();
			this.setState(state => ({
				performance: newState
			}));
		});
	}
	handleResizeFinished = (_, newSizes) => {
		this.setState(state => ({
			panelSizes: newSizes
		}));
	}
	handleShowVideoPanel = (on) => {
		this.setState(state => ({
			showVideoPanel: on
		}));
	}
	componentDidMount() {
		axios.get("./settings.json").then((res) => this.initSettings(res.data));
		this.handleShowVideoPanel(window.innerWidth >= 1024);
	}
	componentWillUnmount() {
		this.setState = (state, callback) => {return;};
	}
	render() {
		let settings, performance, styles, video, mainTaskbarLeft, mainTaskbarRight, expander, bgimage;
		let panelSizes = this.state.panelSizes;
		if (this.state.settings) {
			settings = this.state.settings;
			performance = this.state.performance;
			styles = (<GlobalStyle styles={this.state.settings.styles} />);
			mainTaskbarLeft = (<strong>{this.state.settings.title}</strong>);
			if (this.state.settings.showDesktopIcons) {
				mainTaskbarRight = (<div><span className="material-icons"><span className="active">feed</span> mic bluetooth cloud wifi battery_4_bar</span> &nbsp;2:22</div>);
			}
			if (this.state.showVideoPanel && this.state.settings.videoCallEmbedLink) {
				const videoTaskbarRight = (
					<div>
						<Button
							text="close"
							id={false}
							onClicked={this.handleShowVideoPanel}
						/>
					</div>
				);
				video = (
					<div className='App-video-container'>
						<TaskBar right={videoTaskbarRight} />
						<VideoCall embedLink={this.state.settings.videoCallEmbedLink} />
					</div>
				);
			} else {
				panelSizes = [100];
				if (window.innerWidth >= 1024 && this.state.settings.videoCallEmbedLink) {
					expander = (
						<div className='expander'>
							<Button text=">>" id={true} onClicked={this.handleShowVideoPanel} />
						</div>
					);
				}
			}
			if (this.state.performance?.background) {
				bgimage = (
					<img src={"images/"+this.state.performance.background} alt="background" />
				);
			}
		}
		const audience = (
			<div className="App">
				{styles}
				<TaskBar left={mainTaskbarLeft} right={mainTaskbarRight} />
				{expander}
				<Splitter initialSizes={panelSizes} minWidths={[640, 384]} gutterClassName="gutter" onResizeFinished={this.handleResizeFinished}>
					{video}
					<div className="App-interact-sidebar">
						<div className="App-interact">
							<Audience settings={settings} performance={performance} />
						</div>
					</div>
				</Splitter>
			</div>
		);
		const caller = (
			<div className="App">
				{styles}
				<div className="App-interact-fullscreen">
					<div className="App-interact">
					<VideoCaller settings={settings} performance={performance} />
					</div>
				</div>
			</div>
		);
		const moderator = (
			<div className="App">
				{styles}
				<div className="App-interact-fullscreen">
					<div className="App-interact">
					<Moderator settings={settings} performance={performance} />
					</div>
				</div>
			</div>
		);
		const subtitles = (
			<div className="App">
				{styles}
				<Subtitles performance={performance} />
			</div>
		);
		const background = (
			<div className="Background">
				{bgimage}
			</div>
		);
		return (
			<Router>
				<Routes>
					<Route exact path="/" element={audience} />
					<Route path="/caller" element={caller} />
					<Route path="/moderator" element={moderator} />
					<Route path="/subtitles" element={subtitles} />
					<Route path="/background" element={background} />
				</Routes>
			</Router>
		);
	}
}

export default App;
