var GM = {}
var posts = document.getElementById("posts")

GM.post = function(name, date, kind, description){
    posts.innerHTML += "<h3>" + name + " <span id='title-end'>/</span></h3><p>" + kind + " (" + date + ") " + description + "</p><hr/>"
}

GM.post("UniRogue", "November 2016", "HTML/CSS/JS", "A basic roguelike written in HTML/CSS/Javascript. It uses a 'div' and a string for rendering. It adds the characters to the string, which is then 'rendered' to the div. Proof of concept for DOM based rendering.")
GM.post("Pattern", "December 2016", "HTML/CSS/JS", "A program which procedurally generates argyle-like patterns by having 2 dots bounce around and 'drawing' their paths.")
GM.post("Editor.js", "December 2016", "HTML/CSS/JS", "Web-based plain text editor. Supports loading and downloading text files.")
GM.post("Pyweb", "December 2016", "JS/Canvas", "Library for writing HTML5 games in Python. Inspired by frameworks like Flixel and Pygame. Based on Canvas and Brython.")
GM.post("PocoVM", "February 2017", "HTML/CSS/JS", "Small virtual machine which runs hexadecimal-like bytecode in the browser. It is rendered with a HTML5 canvas element. Inspired by CHIP8.")
GM.post("Celda.js", "April 2017", "JS/Canvas", "A quick implementation of Conway's Game of Life in Javascript. It was written to study cellular automata.")
GM.post("MaChemTosh", "April 2017", "iOS/macOS/Swift", "Mac application for calculating the molar mass of chemical compounds. Written to practice developing macOS applications and for checking my chemistry work. All of the atomic masses are from: http://www.lenntech.com/periodic/mass/atomic-mass.htm")
GM.post("Trend Market Exchange", "May 2017", "JS/HTML5/CSS/NodeJS", " A stock market simulation game based off of term/phrase popularity. Data is based on Google Trends. The game uses Socket.io for sending data between the client and server, Express as the web app framework, and google-trends-api for getting Google Trends data. It is hosted on Heroku.")
GM.post("Pine", "August 2017", "Haxe/Neko", "A JS-like programming language that compiles into HTML code. It was written to allow me to write HTML code faster and easier.")
GM.post("Website", "September 2017", "HTML5/CSS3/JS", "This website utilizes Bootstrap for ensuring a responsive experience across platforms. It uses CSS3 for creating cross-platform animations and Javascript for the underlying logic. The fonts used on the site are Roboto and Roboto Mono, thanks to Google Fonts.")
