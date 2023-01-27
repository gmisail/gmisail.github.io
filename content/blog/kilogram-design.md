---
title: "Kilogram Design"
date: 2023-01-11T23:02:33-05:00
draft: false 
---

This document serves as a living design document for how I feel the language should look / work internally. 

## Syntax 

### Records

Records are immutable "bags" of data, similar to a `struct` in C. 

```lua
record Player
	x: int,
	y: int,
	w: int,
	h: int
end
```

### Functions

```lua
function move_player(player: Player, dx: int, dy: int): Player
	Player { 
		x: player.x + dx,
		y: player.y + dy,
		w: player.w,
		h: player.h
	}
end
```
