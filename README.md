# Custom VSCode Extensions

Write custom VSCode extension functions if unwilling to install extensions for single functions.

## Usages
- Add a function
    - Switch to a javascript file
        - use first commented line for its name, or use its filename
        - use `vscode` as an extension
    - Execute `Custom VSCE: Set Script` in command panel
- Run a function
    - Execute `Custom VSCE: Run Script` in command panel
    - Select the function to run

Example:
The function with a name `Reverse` is to reverse the selected lines.
```js
// Reverse
const editor = vscode.window.activeTextEditor;
editor?.edit(builder => {
    const selection = editor.selection,
        text = editor.document.getText(new vscode.Range(selection.start, selection.end))
    builder.replace(selection, text.split('\n').reverse().join('\n'));
});
```
