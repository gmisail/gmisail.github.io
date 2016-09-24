var help = "Available Commands: help; clear; who; model; events; values; interests;";
var who = "My name is Graham Misail. I am a fan of basically everything technology, music, and sports. When it comes to my personality, I am introverted, as I'm not a fan of communicating with people that I'm not too familiar with. However, this trait is sometimes not prevolent. If you went to Nissitissit & DC, you know what I'm talking about. I'd prefer not to explain. Aside from this, I like to believe I am rather conscientious. Because I'm not very outgoing or extroverted, I tend to think about my choices more, be more cautious, and not do *stupid* things. Again, I'll bring up DC. ";
var model = "My greatest influence growing up was my dad. He got me into technology, which led to programming and software development, and at this moment that is my current career goal. He also got me into music by introducing me to his favorite bands and the classics (The Beatles, Led Zeppelin, etc.) Listening to these artists also got me into percussion, (Led Zeppelin in particular; sorry Ringo) which led me to doing band. I'm not saying my mom didn't influence me, but my dad really made me the person I am today.";
var values = "The things I value most are friends and family. I'm sorry to sound cliche, but its true. My family is very competetive. Its because of this, that I always try to get better. Whether it's regarding athletics or grades, I will always try to progress. The same goes for my friends. However, they taught me to calm down when it came it this and just enjoy myself and have fun. This combination taught me the overall lesson that I should try to succeed, yet I should have fun while doing it. For the future, I will take work seriously and try to succeed, but I will also give time to having a game time while I'm in my *careless* youth."
var events = "Early in life (around 7-12), I played baseball. Playing baseball allowed to me make some new friends, and become more comfortable with people. While I feel that I am still an introvert, baseball made me a bit more sociable. Without it, I feel I would be even more introverted. It allowed me to socialize and befriend people that had similar interests. Even though I don't have great social skills, playing baseball at such a young age for an extended period of time contributed a great amount to my comfort with new people and my overall self esteem.";
var interests = "I love computing and technology as a whole. Programming in particular is my favorite activity, so much so that I programmed this application using Javascript, HTML5, and jQuery. (depending on what browser you are using you can view the source using Right Click -> Inspect Element or -> View Source) Aside from this, I play lacrosse and I'm in the school band. To reach my full potential, I'll need to keep learning and practicing. However, it will be very difficult to do so, as there is always something new to learn and try. I wish to attend Massachusetts Institute of Technology, Stanford, University of California-Berkeley, or ETH Zurich for Computer Science & Software Engineering.";

jQuery(function($, undefined) {
    $('#term').terminal(function(command, term) {
        if(command == "help"){
            term.echo(help);
        }if(command == "who"){
            term.echo(who);
        }if(command == "model"){
            term.echo(model);
        }if(command == "events"){
            term.echo(events);
        }if(command == "values"){
            term.echo(values);
        }if(command == "interests"){
            term.echo(interests);
        }else{
           //term.echo('Unknown Command; use "help" for the list. ');
        }
    }, {
        greetings: '--- Who Am I ---',
        name: 'term',
        height: window.innerHeight,
        prompt: '-> '
    });
});