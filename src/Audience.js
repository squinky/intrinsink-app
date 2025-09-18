import React from 'react';
import firebase from './firebase.js';
import {Button, TextBox} from './Common.js';

class Audience extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: null,
			initSubtitles: false,
			showSubtitle: false
		};
	}
	handleShowSubtitle = (on) => {
		this.setState(state => ({
			showSubtitle: on
		}));
	}
	toggleShowSubtitle = () => {
		this.handleShowSubtitle(!this.state.showSubtitle);
	}
	handleChoice = (id) => {
		const prev = this.state.selected
		const updates = {};
		if (prev) {
  		updates[`/choices/${prev}/votes`] = firebase.database.ServerValue.increment(-1);
		}
  		updates[`/choices/${id}/votes`] = firebase.database.ServerValue.increment(1);
		firebase.database().ref(this.props.settings.performanceId).update(updates);
		this.setState(state => ({
			selected: id
		}));
	}
	handleFreeResponse = (value) => {
		var postData = value;
		var newPostKey = firebase.database().ref(this.props.settings.performanceId).child('rants').push().key;
		var updates = {};
		updates['/rants/' + newPostKey] = postData;
		firebase.database().ref(this.props.settings.performanceId).update(updates);
	}
	handleExternalURL = (id) => {
		window.open(id);
	}
	componentDidUpdate() {
		if (this.props.settings && !this.state.initSubtitles)
		{
			this.setState(state => ({
				initSubtitles: true
			}));
			this.handleShowSubtitle(this.props.settings.showSubtitlesToAudience);
		}
		if (!this.props.performance) return;
		let resetChoices = true;
		const choices = this.props.performance.choices;
		if (choices) {
			const choiceValues = Object.values(choices);
			choiceValues.forEach((item) => {
				if (item.votes) resetChoices = false;
			});
		}
		if (resetChoices && this.state.selected) {
			this.setState(state => ({
				selected: null
			}));
		}
	}
	render() {
		if (!this.props.performance) {
			return (
				<div aria-live="off">
					<p>Unable to read performance data.</p>
				</div>
			);
		}
		if (!this.props.performance.currentLine && !this.props.performance.choices) {
			const linkTree = Object.keys(this.props.settings.linkTree).map((i) =>
				<Button
						key={i}
						text={this.props.settings.linkTree[i].text}
						id={this.props.settings.linkTree[i].url}
						onClicked={this.handleExternalURL} />
			);
			return (
				<div aria-live="off">
					<p>{this.props.settings.endMessage}</p>
					{linkTree}
				</div>
			);
		}
		let subtitle = null;
		if (this.state.showSubtitle && this.props.performance.currentLine) {
			subtitle = <p>{this.props.performance.currentSpeaker.toUpperCase()}: {this.props.performance.currentLine}</p>
		}
		let subtitleToggle = null;
		let subtitleToggleText = this.state.showSubtitle ? "Hide Subtitles" : "Show Subtitles";
		if (this.props.settings.showSubtitlesToAudience) {
			subtitleToggle = <Button text={subtitleToggleText} onClicked={this.toggleShowSubtitle} styleClass="smallbutton" />
		}
		let choices = [];
		let leading = 0;
		const allChoices = this.props.performance.choices;
		if (allChoices) {
			for (let i = 0; i < allChoices.length; i++) {
				if (allChoices.length > 1) { // Use this to hide fake choices used to progress the story e.g. "news"
					if (allChoices[i].votes > allChoices[leading].votes) {
						leading = i;
					}
					choices.push(allChoices[i]);
				}
			}
		}
		let newText = ""
		let textType = ""
		if (this.props.performance.audience) {
			newText = this.props.performance.audience.replace(/\w+: /, '').trim();
			textType = this.props.performance.audience.slice(0, this.props.performance.audience.indexOf(": "));
			if (textType === "AUDIENCE_CHOICES") {
				// if there are no choices left, show the default message
				if (!choices.length) {
					return (
						<div aria-live="off">
							{subtitle}
							<p>{this.props.settings.defaultAudienceMessage}</p>
							{subtitleToggle}
						</div>
					);
				} else {
					const choiceList = Object.keys(choices).map((i) =>
						<Button
							key={i}
							text={choices[i].text+" ("+choices[i].votes+" votes)"}
							styleClass={
								makeChoiceClassString(
									Number(i) === Number(leading),
									choices[i]
								)
							}
							id={i}
							onClicked={this.handleChoice}
							selected={this.state.selected === i} />
					);
					return (
						<div>
							{subtitle}
							<p tabIndex="0" role="alert">{newText.trim()}</p>
							{choiceList}
							{subtitleToggle}
						</div>
					);
				}
			} else if (textType === "AUDIENCE_RANTBOX") {
				let freeResponseBox = <TextBox onSubmitted={this.handleFreeResponse}/>;

				let rantContent = null;
				if(this.props.settings.showRantContentToAudience){
					let r = null;
					if (this.props.performance.rants) {
						r = Object.keys(this.props.performance.rants).map((i) =>
							<li key={i}>{this.props.performance.rants[i]}</li>
						);
					}
					rantContent = <><p aria-hidden="true">Current rant content</p><ul aria-hidden="true">{r}</ul></>
				}
				return (
					<div>
						{subtitle}
						<div className="bubble">
							<p tabIndex="0" role="alert" >{newText.trim()}</p>
							{freeResponseBox}
						</div>
						{rantContent}
						{subtitleToggle}
					</div>
				);
			} else {
				return (
					<div>
						{subtitle}
						<p tabIndex="0" role="alert">{newText.trim()}</p>
						{subtitleToggle}
					</div>
				);
			}
		} else {
			return (
				<div aria-live="off">
					{subtitle}
					<p>{this.props.settings.defaultAudienceMessage}</p>
					{subtitleToggle}
				</div>
			);
		}
	}
}

const classTagPattern = /^CLASS:\s*(\S*)/;
const leadingHighlightClass = 'highlight';
function makeChoiceClassString(isLeadingChoice, choiceData) {
	const maybeHighlightClass = isLeadingChoice ? leadingHighlightClass : null;
	if (choiceData.tags) {
		for (const tag of choiceData.tags) {
			const maybeMatch = tag.match(classTagPattern);
			if (maybeMatch) {
				const className = maybeMatch[1];
				const maybeHighlightClassStr = maybeHighlightClass ? '' : maybeHighlightClass + ' ';
				return maybeHighlightClassStr + className;
			}
		}
	}
	return maybeHighlightClass;
}

export default Audience;
