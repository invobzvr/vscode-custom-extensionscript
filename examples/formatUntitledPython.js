// Format Untitled Python
const child_process = require('child_process'),
    editor = vscode.window.activeTextEditor,
    document = editor.document,
    process = child_process.spawn('autopep8', ['--ignore=E401,E402,E501', '-']);
process.stdout.on('data', data => {
    editor.edit(builder => {
        const lastLine = document.lineAt(document.lineCount - 1),
            start = new vscode.Position(0, 0),
            end = new vscode.Position(document.lineCount - 1, lastLine.text.length);
        builder.replace(new vscode.Range(start, end), data.toString());
        editor.selection = new vscode.Selection(start, start);
    });
});
process.stdin.end(document.getText());
