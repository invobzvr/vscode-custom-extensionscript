// Parse Json
const editor = vscode.window.activeTextEditor,
    document = editor.document;
let indent,
    text = document.getText().trim();
if (text.match(/\[?{['"]/)) {
    indent = 4;
    [
        [/'(.*?)'/g, (_, match) => `"${match.replace(/"/g, '\\"')}"`],
        [/True/g, 'true'],
        [/False/g, 'false'],
        [/None/g, 'null'],
    ].forEach(([regex, replacer]) => text = text.replace(regex, replacer));
} else {
    indent = 0;
}
const json = JSON.stringify(JSON.parse(text), null, indent);
text !== json && editor.edit(builder => {
    const lastLine = document.lineAt(document.lineCount - 1),
        start = new vscode.Position(0, 0),
        end = new vscode.Position(document.lineCount - 1, lastLine.text.length);
    builder.replace(new vscode.Range(start, end), json);
    editor.selection = new vscode.Selection(start, start);
    document.languageId !== 'json' && vscode.languages.setTextDocumentLanguage(document, 'json');
});
