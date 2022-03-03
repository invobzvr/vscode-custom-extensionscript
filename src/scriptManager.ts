import * as vscode from 'vscode';

interface Dictionary<T> {
    [key: string]: T
}

class ExtScript extends String {
    private _func: Function | undefined;

    get raw(): string {
        return this as unknown as string;
    }

    private get func(): Function {
        if (!this._func) {
            this._func = new Function('vscode', this.raw);
        }
        return this._func;
    }

    call() {
        this.func(vscode);
    }
}

export class ScriptManager {
    private config!: vscode.WorkspaceConfiguration;
    private scripts!: Dictionary<ExtScript>;

    constructor() {
        this.initialize();
    }

    initialize() {
        this.config = vscode.workspace.getConfiguration('custom-vsce');
        this.scripts = Object.fromEntries(Object
            .entries(this.config.get<Dictionary<string>>('scripts')!)
            .map(([key, val]) => [key, new ExtScript(val)]));
    }

    async requestPick(): Promise<string | undefined> {
        return await vscode.window.showQuickPick(Object.keys(this.scripts));
    }

    async set(): Promise<void> {
        const document = vscode.window.activeTextEditor?.document;
        if (document?.languageId === 'javascript') {
            const text = document.getText(),
                name = text.startsWith('//')
                    ? document.lineAt(0).text.substr(2).trim()
                    : document.fileName;
            this.scripts[name] = new ExtScript(text);
            this.save();
        } else {
            const document = await vscode.workspace.openTextDocument({
                language: 'javascript',
            });
            vscode.window.showTextDocument(document);
        }
    }

    async run(): Promise<void> {
        const name = await this.requestPick();
        if (name) {
            this.scripts[name].call();
        }
    }

    async edit(): Promise<void> {
        const name = await this.requestPick();
        if (name) {
            const document = await vscode.workspace.openTextDocument({
                language: 'javascript',
                content: this.scripts[name].raw,
            });
            vscode.window.showTextDocument(document);
        }
    }

    async delete(): Promise<void> {
        const name = await this.requestPick();
        if (name) {
            delete this.scripts[name];
            this.save();
        }
    }

    async save(): Promise<void> {
        await this.config.update('scripts', this.scripts, true);
    }
}