---
title: "Kilogram Design"
date: 2023-01-11T23:02:33-05:00
draft: false 
---

This document serves as a living design document for how I feel the language should look / work internally. 

## Syntax 

### Variables

Variables are defined using the `let` keyword. 

```javascript
let x: int = 100
let y: string = "hello world"
let z: float = 3.14
```

An interesting thing to note is that variables are **immutable**. This is similar to 
languages like Haskell or Elixir.

### Functions

There are no **named functions**, but instead **lambda functions** assigned to variables. Functions
are treated like any other variable, thus they are declared like any other variable: using a `let` binding.

```javascript
let sum: (int, int) -> int =
function(x: int, y: int): int
	x + y
end

sum(10, 5)
```

Note that for all variable declarations, you can optionally drop the type declaration. So, the above expression can 
be simplified to the following.

```javascript
let sum = function(x: int, y: int): int
	x + y
end
```

We still need to specify the types of `x` and `y`, however we can infer the type of `sum` based on its value.

### Records

Records are immutable "bags" of data, similar to a `struct` in C. 

```javascript
record Player
	x: int,
	y: int,
	w: int,
	h: int
end

let my_player = Player { x: 0, y: 5, w: 8, h: 16 }
my_player
```

### Enums

Enums behave similarly to algebraic data types in OCaml and Haskell. They can be used to construct
more complex data types, such as linked lists and trees.

```javascript
enum List
	Cons(int, List),
	Nil
end

let my_list = Cons(1, Cons(2, Cons(3, Nil)))
```

### If

Instead of the classic, C-style `if` statements, Kilogram uses "if expressions". 

```javascript
let demo: string = if 5 < 10 then "hello" else "world"
```

*TODO*

## Implementation

Kilogram is a compiled language using C as its compilation target. Since C is not a functional language,
thought must be put into how we represent functional concepts.

### Lambda functions

A core component of functional languages is lambda functions, otherwise known as anonymous functions. Let's consider
two equivalent chunks of code, one in Javascript and the other in Kilogram.

**Javascript:**
```javascript
let sum = (x, y) => x + y;
```

**Kilogram:**
```javascript
let sum = function(x: int, y: int): int 
	x + y
end
```

Internally, we are assigning the variable `sum` to a lambda function that takes integers `x, y` and returns an integer. Since functions
are just another value, we do not want to handle them drastically different from how we handle another primitives. To do this we need
to use a couple clever tricks.

The first issue is handling free variables within the function body. Consider the following code:

```javascript
let z = 10
let sum = function(x: int, y: int): int 
	x + y + z
end
```

As you can see, the value of `sum` depends on the value of `z`, but `z` is not passed as an argument. Instead, it is *captured* by the 
lambda function. Let's say we pass this `sum` variable to another function. How do we know what `z` is? 

To solve this, we add `z` to a *function context*. When we create an instance of a lambda function, we capture the values of each free variable and
store it within the function context. When we call the lambda function, we'll load each of the variables from the context into scope; that way, all of 
the necessary variables will be in scope to evaluate the function's body.
