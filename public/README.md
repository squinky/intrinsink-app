# Intrinsink software for online interactive performances

If you want to get set up as quickly as possible, start [here](./docs/02_getting-started-with-intrinsink.md).

- [Introduction](#introduction)

  - [Intrinsink in a Nutshell](#intrinsink-in-a-nutshell)
  - [Example](#example)
  - [Hello World Template vs App](#hello-world-template-vs-app)
- [Overview](./docs/01_overview.md)
  - [Performance Structure](./docs/01_overview.md#performance-structure)
  - [User Interface](./docs/01_overview.md#user-interface)
- [Getting Started With Intrinsink](./docs/02_getting-started-with-intrinsink.md)
  - [Downloading the Starter Template](./docs/02_getting-started-with-intrinsink.md#downloading-the-starter-template)
  - [Basic Configuration](./docs/02_getting-started-with-intrinsink.md#basic-configuration)
  - [Testing a Performance on Your Computer](./docs/02_getting-started-with-intrinsink.md#testing-a-performance-on-your-computer)
  - [Installing Inky](./docs/02_getting-started-with-intrinsink.md#installing-inky)
- [Writing an Intrinsink/Ink script](./docs/03_writing-an-intrinsink_ink-script.md)
  - [Basics](./docs/03_writing-an-intrinsink_ink-script.md#basics)
  - [Interactivity](./docs/03_writing-an-intrinsink_ink-script.md#interactivity)
  - [Summary](./docs/03_writing-an-intrinsink_ink-script.md#summary)
  - [Next Steps](./docs/03_writing-an-intrinsink_ink-script.md#next-steps)
- [Additional Technical Topics](./docs/04_additional-technical-topics.md)
  - [Configuration (`settings.json`)](./docs/04_additional-technical-topics.md#configuration-settingsjson)
  - [Customizations to Visual Presentation (`settings.json` styles)](./docs/04_additional-technical-topics.md#customizations-to-visual-presentation-settingsjson-styles)
- [Other](./docs/05_other.md)
  - [CSS Glossary](./docs/05_other.md#css-glossary)
  - [Accessibility Tips](./docs/05_other.md#accessibility-tips)
  - [Resources for Learning to Write Non-Linear Narratives](./docs/05_other.md#resources-for-learning-to-write-non-linear-narratives)

# Introduction

## Intrinsink in a Nutshell

Intrinsink is a tool for building performances which are interactive and accessible.

### Interactivity

Intrinsink facilitates the creation of performances that can incorporate and react to input from the audience. This is accomplished with the following features:

- [Audience input UI:](./docs/01_overview.md#audience-input) Intrinsink allows audience members to contribute via [multiple-choice](./docs/01_overview.md#multiple-choice) and [free-response](./docs/01_overview.md#free-response) questions.
- Dynamic scripts: Intrinsink allows authors to write dialogue and stories that change based on input received from the audience.

### Accessibility

Making performances more accessible is a key goal of Intrinsink. All performances built with it have these accessibility features:


- The UI includes [a live video stream](./docs/01_overview.md#audience-view-main), enabling both fully-online and hybrid performances. This allows performances built using Intrinsink to be more accessible to people who face barriers to in-person venues.
- A built-in subtitles interface which:
    - Automatically generates subtitles from the performance script.
    - [Displays subtitles](./docs/01_overview.md#subtitles-view) in sync with the performance.

## Example

Here is an excerpt from a real performance built with Intrinsink (you can find the entire recording [here](https://peertube.intrapology.com/w/5Hrv9k1YgywsQh6TUFBzrB)):

[Meghna Jayanth Oct 2024 Scratch Jam Performance - Intro](https://github.com/user-attachments/assets/da64e132-89cd-4b8c-affc-774ab147a98d)

## Hello World Template vs App

There are two versions of Intrinsink available to download:

### Intrinsink Hello World

Intrinsink Hello World is a starter template for artists who have limited software development knowledge. If you are new to Intrinsink, it is best to start with this version. For information on how to download the Hello World template, see this section: [Downloading the Starter Template](./docs/02_getting-started-with-intrinsink.md#downloading-the-starter-template).

### Intrinsink App

Intrinsink App is the core of our software. If you want to make customizations that are not possible with the Hello World starter template, then you will need to build on top of the core Intrinsink App code. Building with Intrinsink App requires the ability to program with JavaScript, React, and CSS. Intrinsink App can be found here: [https://github.com/squinky/intrinsink-app](https://github.com/squinky/intrinsink-app).
