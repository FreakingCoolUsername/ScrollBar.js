# ScrollBar.js
Controls scroll bar disappearance when not in use.

ScrollBar.js is something I developed with help from ChatGPT (honestly, GPT did most of it). It is a script that allows the scroll bar on the side of the screen to disappear when not in use. The scroll bar will reappear when a user begins scrolling or moves the mouse to the far left edge of the browser screen. I also made sure that you can still use up and down arrows for scrolling; however, this is done by overwriting the default settings. The scroll bar has a delay setting, which defaults to 3 seconds, I believe, but it also adds a custom element that allows the developer to easily set the delay in the HTML.

Below is an example of how to use the <set-timer> element to do this. As for a literary explanation, it works as follows: You need to insert the <set-timer></set-timer> element at the bottom of your <body> element, above your <script> elements. To change the delay time, you change the sec attribute, <scroll-timer sec="3"></scroll-timer>, which as you can guess, is the number of seconds the scroll bar will remain after an event.

This script will also inject a custom CSS class into the webpage to control the scroll bar, so you need to ensure that you have no other CSS controlling the scroll bar with overflow-y or any other CSS classes with the name .no-scrollbar. The script will also sense if the user is on a mobile device and will not run the scroll bar functions to save processing power when it's not needed.


I hope many will find this script useful in their projects, and I trust I won't be too heavily ridiculed for utilizing ChatGPT's in its development.
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Example</title>
    
</head>
<body>
    <!-- Your webpage content here -->
    
    <!-- Custom element for setting scroll timer -->
    <scrolltimer sec="5"></scrolltimer>
    <script src="scrollbar_v1_4-29-24.js"></script>
</body>
</html>


