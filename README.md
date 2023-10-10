# lyric-translator
Translate your favourite songs to any language!
# Link
https://trnigg.github.io/lyric-translator/

# Songde*green*
Derived from the work *mondegreen* meaning "a misunderstood or misinterpreted word or phrase resulting from a mishearing of the lyrics of a song."

For example,

    'I'm a Believer' by The Monkees:
    - Mondegreen: "Then I saw her face, now I'm gonna leave her"
    - Correct: "Then I saw her face, now I'm a believer"

## Description
- This application essentially allows you to recreate an endless amount of different "mondegreened" lyrics out of your favourite song!
- It is written in HTML, CSS and plain JS, leveraging OpenAI/Chat GPT and Spotify APIs, while using Tailwind for styling [insert links to the APIs].
- The application is designed to be responsive across devices, allowing for entertainment on the go! [are we actually responsive on mobile devices?] []

## Installation

To get started, all you need to do is visit the following URL: ________________!

>NOTE: Currently, the application requires the user to generate their own API keys for OpenAI and Spotify and to implement them within the JS code (see [Roadmap / Known Bugs](#roadmap--know-bugs) below).


## Usage
1. In order to use **Songde*green***, click the 'Start Songdefying' button on the homepage and two input fields will appear:
[insert screenshot of homepage]
2. From there, enter the name of the **song** and **artist** it's by for the lyrics you would like "songdefied" and hit 'Songdefy It!'.
[insert screenshot]
3. You will be taken to a page where your mondegreen-lyrics will be shown, alongside a Spotify embed allowing you to listen to a short preview of the track, to jog your memory of the real song!
    - Please note: Depending on OpenAI processing time, it could take up to 25 seconds to show your results (see [Roadmap / Known Bugs](#roadmap--know-bugs) below).
[another screenshot of results]


## Visuals
[We can include more screenshots here]

## Support
[Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.]

## Roadmap / Know Bugs
- Currently, secret keys are  required to run the JS and connect with the OpenAI and Spotify APIs, requiring us to remove these from visible code upon commits.
    - In the future, with more knowledge of back-end programming, these secret keys will be permanently implemented there.
- Due to the time it takes OpenAI to generate and render a response, a modal or an animation that lets the user know the response is loading would benefit the user experience.
- Future development could see us implement [Chatgpt.js](https://github.com/kudoai/chatgpt.js), a client-side JS library allows a web-application to directly communicate with OpenAI via manipulation of the DOM.
    - This would massively benefit the behind-the-scenes processes of the app, as it would no longer require an API call, cutting out the need for (financial) tokens required for each call.
    - It would also allow us to feed more informative prompts to Chat GPT, to facilitate better and more consistent responses.

[If you have ideas for releases in the future, it is a good idea to list them in the README.]

## Authors and acknowledgment
[Show your appreciation to those who have contributed to the project.]

## License
MIT License.

Please refer to the license section in the repo for further information.

## Project status
[If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.]