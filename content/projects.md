+++
title = "Projects"
menu = "main"
+++

Listed below is a small sample of some of the projects that I am currently working on / have worked on. If you are interested in more, all of my
repositories can be found on my [Github profile.](https://github.com/gmisail)

### ⚖️ Kilogram

Kilogram is a functional programming language written in Rust. Inspired by
OCaml and Lua, it aims to be purely functional while also being comfortable to write in. It supports features like strict compile-time typechecking, pattern matching, and closures.

### 🚪 DormDesign
DormDesign is a web application for real-time dorm room design & management. The platform allows roommates to collaboratively design and plan
their dorm room using a user-friendly interface. Using DormDesign, roommates can synchronously visualize what their room will look like before
move-in and can decide who is going to bring what items to the room.

### 💾 Nice, Static Site Generator
Lightweight static site generator that compiles Markdown & HTML into compact static sites. It was written in the Haxe Programming
Language and used the `yaml`, `markdown`, and `hx-mustache` libraries. It is distributed using the `haxelib` package manager.

### 🐕 Mox Programming Language
Mox is my first attempt at implementing a transpiled programming language. The language attempts to combine the readable syntax of Lua with the
power and flexibility of C. It achieves this by transpiling `.mox` files into a single `.c` file that can be compiled using `gcc` or any other C
compiler. It has support for variables, functions, classes, conditional branching (if, else if, else), loops, and templating.


### 🐕‍🦺 Mace Game Engine
Mace is a game engine that I developed as a hobby project to experiment with procedural terrain generation. The goal was originally to develop
a fast tilemap implementation that supports infinite terrain generation with a low memory usage. Under the hood it uses `OpenSimplexNoise` as a
noise algorithm, `SFML` for rendering and input, `Lua` & `Sol2` for scripting, and `EnTT` as a entity-component system.


### 📝 resume.json
Small utility that I developed for easily generating my resume. Using a modification of [resume.md](https://github.com/mikepqr/resume.md), it will
take a `.json` file and generate an HTML file using `EJS`. This will be converted to a `PDF` using `relaxedjs`.
