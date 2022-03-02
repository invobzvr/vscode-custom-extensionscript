import * as vscode from 'vscode';
import { ScriptManager } from './scriptManager';

export function activate(context: vscode.ExtensionContext) {
	const mngr = new ScriptManager;
	mngr.initialize();

	context.subscriptions.push(vscode.commands.registerCommand('custom-vsce.script.set', () => mngr.set()));
	context.subscriptions.push(vscode.commands.registerCommand('custom-vsce.script.run', () => mngr.run()));
}

export function deactivate() { }