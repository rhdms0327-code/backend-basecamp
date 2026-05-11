const fs = require('fs');
const dir = 'e:/Study/knowledge-hub/docs/03-tools-ide/visual-studio-2022';
const files = [
    dir + '/index.md',
    dir + '/docs/csharp-version.md',
    dir + '/docs/settings.md',
    dir + '/docs/shortcuts.md'
];

files.forEach(f => {
    if(fs.existsSync(f)){
        let c = fs.readFileSync(f, 'utf8');
        if(c.includes('🛠️')){
            fs.writeFileSync(f, c.replace(/🛠️/g, '💜'), 'utf8');
            console.log('Updated ' + f);
        }
    }
});
