# Web visualization tools
If you don't need to worry about having publicly accessible or production-quality web pages, the web languages (HTML, CSS, Javascript) allow for convenient visualizations and user interactions. This makes the browser well-suited for visualizing batches of stimuli. 

+ For instance, in this lab, we might want to visualize the cochleagram representation of a signal, and also listen to the sound. HTML5 makes this very easy to do. 

+ In the browser, user interface, presentation, and interactions (like events) are quick and easy to code, but data processing and program logic is not. The browser is very front-end oriented. Contrast this to MATLAB or Python, that are more back-end oriented: they make data processing and program logic easy to code, but user interface and presentation takes more work.

+ The browser is ubiquitous, so code is (mostly) portable (don't use IE).

+ The browser is designed to work over the web (so, in theory, you can easily access these visualization web pages on an external server, like openmind)

+ The basic idea is to generate all the data you want to visualize, save it to a folder, then use Javascript and HTML to display it in a comprehensible way.

+ JSON for specifying values and file paths for a given stimulus or object. This JSON file provides an interface between the "front-end" web page and the "back-end" database (i.e., the folder containing all of the visualizations).

+ Use dynamically-generated HTML for creating arbitrary numbers of similar elements (fill in values using the JSON file)

+ Use CSS flex-box for styling flexible containers. These containers can hold an arbitrary number of elements, and handle adding new elements and window resizing nicely.

+ JQuery provides concise methods for manipulating both single HTML elements and sets of them.
