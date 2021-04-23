+++
title = "New Website Stack"
date = "2021-04-14T23:18:08-04:00"
tags = ["tech", "web"]
+++

Like a true programmer, I can never decide on a stack for my website. Originally, my website was nothing more than a couple HTML 
files hosted on Github Pages. This was of course back in middle school where bundling up a couple HTML files and throwing them in a 
git repo seemed like rocket science. All of these years later, my website is *still* a bundle of HTML files. What changed? Where am 
I going with this? Well, ultimately the changes that were made, and the reason why I spent so much time doing this, concerns the
*process* behind how those HTML files came to be. 

Originally, every HTML file was written by hand. This is, of course, the traditional means of developing a website. I soon realized
that this process was not practical as my website became larger and larger. For instance, if my website had a navigation bar on the 
top of every page, I would have copy-and-paste that HTML snippet on to *every* HTML page. Sure, that is manageable. What happens if
I want to make a change to that navigation bar? Now I have to make that change in *every* HTML page. Even though it was a relatively 
small website, I knew that there had to be a way to optimize this.

It was from this point that I discovered static site generators, which are applications that take a bunch of content (like text or 
Markdown), process it, and then spit out a bunch of HTML files. There are a lot of these out on the open source market (including
one that I made!), and as such have become a point of tinkering. I always make the joke that I like to overcomplicate easy tasks for
myself, and developing my website is no exception to this. I could have just designed a site in Wordpress and called it a day, and honestly
the result would likely be very similar. The issue with that is the fact that programming is fun! That being said, I would much rather mess 
around with various open source static site generators instead of using a ready-made solution.

Ultimately, that is why my website has gone through so many iterations.  The sheer number of options that are available to
me is dangerous as a programmer, since ultimately I love to tinker with new technology. Off the top of my head, I started with a 
vanilla setup, which was ported to Jekyll, then Nice, then Notion (thanks to Loconotion), and then Hugo (where it stands today.) 
I didn't have a problem with any of these frameworks, I actually thought they were all very pleasant to use. The problem lies with the
fact that once I find a solution that I like, I want to learn a new stack because it is just fun to do so.

As of right now, my website uses Hugo with the Etch theme. I felt that it was faster than Jekyll (may or may 
not be true, I haven't formally tested it) and I personally enjoy Go a lot more than Ruby (in case I want to do any modifications to the source code.) It is being hosted as a static site on Github Pages and does not use any analytics, cookies, or trackers.