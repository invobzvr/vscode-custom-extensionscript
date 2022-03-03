import * as vscode from 'vscode';
import { ScriptManager } from './scriptManager';

export function activate(context: vscode.ExtensionContext) {
	const mngr = new ScriptManager;
	mngr.initialize();

	context.subscriptions.push(vscode.commands.registerCommand('custom-extensionscript.set', () => mngr.set()));
	context.subscriptions.push(vscode.commands.registerCommand('custom-extensionscript.run', () => mngr.run()));
	context.subscriptions.push(vscode.commands.registerCommand('custom-extensionscript.edit', () => mngr.edit()));
	context.subscriptions.push(vscode.commands.registerCommand('custom-extensionscript.delete', () => mngr.delete()));
}

export function deactivate() { }