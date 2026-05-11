const fs = require('fs');
const dir = 'e:/Study/knowledge-hub/docs/03-tools-ide/vscode';
const files = [
    `${dir}/index.md`,
    `${dir}/docs/01-editorconfig-setup.md`,
    `${dir}/docs/02-vscode-settings-json.md`,
    `${dir}/docs/03-vscode-codelens-off.md`,
    `${dir}/docs/04-vscode-shortcuts.md`,
    `${dir}/docs/05-vscode-mouse-wheel-zoom.md`
];

files.forEach(f => {
    if(fs.existsSync(f)){
        let c = fs.readFileSync(f, 'utf8');
        if(c.includes('🧰')){
            fs.writeFileSync(f, c.replace(/🧰/g, '🩵'), 'utf8');
            console.log('Updated ' + f);
        }
    }
});
