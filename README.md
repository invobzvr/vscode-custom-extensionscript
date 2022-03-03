# Custom VSCode ExtensionScript

Write custom VSCode extension scripts instead of installing extensions for single functions.

## Usages
- Set a script
    - (Optional) Switch to a javascript file (or new one will be opened)
        - use first commented line for its name, or use its filename
        - use `require` / `vscode` as an extension
    - Execute `Custom VSC ExtensionScript: Set Script` in command panel
- Run / Edit / Delete a script
    - Execute in command panel
    - Select the script to act
- AutoRun
    - Use keybinding (default: <kbd>ctrl</kbd>+<kbd>`</kbd>) to automatically run scripts that match certain conditions
        - If no script matches, users will be asked to select one to run
    - Set an array of object with `key`, `value` for scripts
    - So far supported keys:
        - `languageId`
        - `isUntitled`
    ```json
    {
        "custom-extensionscript.tasks": {
            "Parse Json": [
                {
                    "key": "languageId",
                    "value": "json"
                }
            ],
            "Format Untitled Python": [
                {
                    "key": "languageId",
                    "value": "python"
                },
                {
                    "key": "isUntitled",
                    "value": true
                }
            ]
        }
    }
    ```


## Examples
- [Reverse Lines](https://github.com/invobzvr/vscode-custom-extensionscript/blob/master/examples/reverseLines.js)
- [Parse Json](https://github.com/invobzvr/vscode-custom-extensionscript/blob/master/examples/parseJson.js)
- [Format Untitled Python](https://github.com/invobzvr/vscode-custom-extensionscript/blob/master/examples/formatUntitledPython.js)
