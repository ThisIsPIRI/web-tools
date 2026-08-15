# 왼들오르나

Minimalist raw text completion web frontend for local OpenAI-like LLM APIs. Tested with [tabbyAPI](https://github.com/theroyallab/tabbyAPI), [TextGen](https://github.com/oobabooga/textgen), and (partially) [KoboldCPP](https://github.com/LostRuins/koboldcpp).

## Features
- Streaming generation
- A few select parameters
- Presets for these parameters
- Image input at arbitrary positions (TextGen only)
- All in a single HTML file (after running `./build-singlefile`)

## Dependencies
A modern browser, an OpenAI-like LLM API of your choice, a text editor (to edit `config.js`)

## Controls
`Ctrl+Enter` to continue your input. `Alt+Enter` to continue model output. `Esc` to stop generation. `Ctrl+Space` to return focus to input area. `Ctrl+Insert` to paste model output to input area; `Insert` to do the same and also append your chosen instruct template to it.

### Image controls
Drag-and-drop an image on the drop zone, then write `<__media__>` in your prompt. `Alt+m` to insert `<__media__>` faster. Right-click an image to remove it. The number of media tags and dropped images must match. Images are sent in the order they were dropped.

## Important
Edit `API_URL` in `config.js` to point to your local API. There's currently no way to change it within the page.

Generations are not saved; copy & paste them elsewhere if you want to keep them.

If using TextGen, you must apply this diff to make it accept requests from Oendlorna:

```
--- a/modules/api/script.py
+++ b/modules/api/script.py
@@ -99,7 +99,8 @@ check_anthropic_key = [Depends(verify_anthropic_key)]
 if shared.args.listen or shared.args.public_api:
     cors_kwargs = {"allow_origins": ["*"]}
 else:
-    cors_kwargs = {"allow_origin_regex": r"https?://(localhost|127\.0\.0\.1)(:\d+)?"}
+    cors_kwargs = {"allow_origin_regex": r"(https?://(localhost|127\.0\.0\.1)(:\d+)?|null)"}
+    print("modules/api/script.py: whitelisting 'null' as origin to allow requests from local HTML files.")
 
 app.add_middleware(
     CORSMiddleware,
```
