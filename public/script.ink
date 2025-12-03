VAR topic = "nothing"

->Start

==Start

BACKGROUND: bg1.jpg

Apple: Hi, I'm the first video caller!

Banana: Hi, I'm the second video caller!

AUDIENCE_MESSAGE: Here is a message for the audience!

Apple: Nice to meet you!

Banana: You too!

->MultipleChoice

==MultipleChoice

AUDIENCE_CHOICES: What should be our next topic of discussion?

Apple: Here is some multiple-choice voting!

Banana: What should be our next topic of discussion?

+ Apple: The weather!
    ~topic = "the weather"
+ Apple: Cats!
    ~topic = "cats"
+ Apple: Late-stage capitalism!
    ~topic = "late-stage capitalism"
//choices stop appearing after this point

- ->WriteIn

==WriteIn

BACKGROUND: bg2.jpg

AUDIENCE_RANTBOX: Write any thoughts you have about {topic} here.

Apple: Now it's time for some fun with write-in options!

Banana: The audience is going to type stuff in and you are going to read it all!

Apple: That's right!

Apple: RANT_READ

Banana: That's all, folks!

->END