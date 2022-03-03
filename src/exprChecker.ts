import * as vscode from 'vscode';

export interface IExprStmt {
    key: string,
    value: string | boolean,
}

export class ExprChecker {
    static evaluate(exprs: IExprStmt[]): boolean {
        for (const iExpr of exprs) {
            switch (iExpr.key) {
                case 'languageId':
                    if (vscode.window.activeTextEditor?.document.languageId !== iExpr.value) {
                        return false;
                    }
                    break;
                case 'isUntitled':
                    if (vscode.window.activeTextEditor?.document.isUntitled !== iExpr.value) {
                        return false
                    }
                    break;
            }
        }
        return true;
    }
}