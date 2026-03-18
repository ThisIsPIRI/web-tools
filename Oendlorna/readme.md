# 왼들오르나

Minimalist raw text completion web frontend for local OpenAI-like LLM APIs. Tested with [tabbyAPI](https://github.com/theroyallab/tabbyAPI), [text-generation-webui](https://github.com/oobabooga/text-generation-webui), and [KoboldCPP](https://github.com/LostRuins/koboldcpp).

## Features
- Streaming generation
- A few select parameters
- Presets for these parameters
- All in a single HTML file (after running `./build-singlefile`)

## Dependencies
A modern browser, an OpenAI-like LLM API of your choice, a text editor (to edit `config.js`)

## Controls
`Ctrl+Enter` to continue your input. `Alt+Enter` to continue model output. `Esc` to stop generation. `Ctrl+Space` to return focus to input area. `Ctrl+Insert` to paste model output to input area; `Insert` to do the same and also append your chosen instruct template to it.

## Important
Edit `API_URL` in `config.js` to point to your local API. There's currently no way to change it within the page.

Generations are not saved; copy & paste them elsewhere if you want to keep them.
