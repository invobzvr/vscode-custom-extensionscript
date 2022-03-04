// Format Untitled Python
const { execSync } = require('child_process'),
    editor = vscode.window.activeTextEditor,
    document = editor.document,
    text = document.getText(),
    data = execSync('autopep8 --ignore=E401,E402,E501 -', { input: text, encoding: 'utf8' });
data !== text.replace(/\r/g, '') && editor.edit(builder => {
    const lastLine = document.lineAt(document.lineCount - 1),
        start = new vscode.Position(0, 0),
        end = new vscode.Position(document.lineCount - 1, lastLine.text.length);
    builder.replace(new vscode.Range(start, end), data);
});