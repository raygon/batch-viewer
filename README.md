# Batch Viewer
Tools for visualizing batches of data in the browser.

## Overview
If you don't need to worry about having publicly accessible or production-quality web pages, the web languages (HTML, CSS, Javascript) allow for convenient visualizations and user interactions. This makes the browser well-suited for visualizing batches of stimuli. 

+ For instance, we might want to visualize the cochleagram representation of a signal, and also listen to the sound. HTML5 makes this very easy to do. 

+ In the browser, user interface, presentation, and interactions (like events) are quick and easy to code, but data processing and program logic is not. The browser is very front-end oriented. Contrast this to MATLAB or Python that are more back-end oriented: they make data processing and program logic easy to code, but user interface and presentation takes more work.

+ The browser is ubiquitous, so code is (mostly) portable (don't use IE).

+ The browser is designed to work over the web (so, in theory, you can easily access these visualization web pages on an external server, like openmind)

+ The basic idea is to generate all the data you want to visualize, save it to a folder, then use Javascript and HTML to display it in a comprehensible way.

+ JSON for specifying values and file paths for a given stimulus or object. This JSON file provides an interface between the front-end web page and the back-end "database" (i.e., the folder containing all of the visualizations).

+ Use dynamically-generated HTML for creating arbitrary numbers of similar elements (fill in values using the JSON file)

+ Use CSS flex-box for styling flexible containers. These containers can hold an arbitrary number of elements, and handle adding new elements and window resizing nicely.

+ JQuery provides concise methods for manipulating both single HTML elements 
and collections of them.

## Getting Started
If you want to use Grunt to manage builds, you'll need to install nodejs, Grunt, and the packages required for this project. Also, you'll need to uncomment the relevant script tags in batchViewer.html so that only the minified source file is loaded. You'll then need to run a build to get the minified sources.

The main batch viewer page can be accessed by opening batchViewer.html in a browser.

## Demo: Visualizing and Listening to Cochleagrams
The following files and folders should provide a working demo, used to visualize and listen to cochleagrams:

    + *data/*
        - *media/*: contains the  image and audio files needed for display.
        - *cochleagramDemoData.json*: provides the JSON data file for representing cochleagram input objects.
        - *README_CochleagramDemoData.md*: provides a short explanation of the cochleagramDemoData.json file used in the demo.
    + *src/*
        + *asset/*
            - *viewCochleagramDemo.js*: contains the code to render and attach event listeners to individual cochleagram input objects
            - *viewControlPanelDemo.js*: contains the code to create a basic control panel for interacting with cochleagram input objects.
        - *batchViewer.html*: this is the main page, i.e., the page to load in the browser. Start from here.
        - *cochleagramDemoController.js*: this is the main controller class that coordinates all rendering operations.
        - *batchViewerStyle.css*: defines styles used for the demo. 
    + *lib/*
        - *jquery-3.1.0.min.js*: local copy of jQuery library for DOM manipulation.

If you feel like this system is too spread out, or you don't want to deal with javascript modules, there is an additional folder to consider:

    + *src/*
        + *hacky_alternatives/*
            - *singleFileCochleagramDemo.html*: this attempts to implement the same cochleagram visualization demo provided by the files listed above, but in a single file.
            - *singleElementCochleagramDemo.html*: provides a naive implementation of a single cochleagram input object. This can be used as a starting point for making dynamically generated HTML.
