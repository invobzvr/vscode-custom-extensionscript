// Reverse Lines
const editor = vscode.window.activeTextEditor;
editor.edit(builder => {
    const selection = editor.selection,
        text = editor.document.getText(new vscode.Range(selection.start, selection.end))
    builder.replace(selection, text.split('\n').reverse().join('\n'));
});