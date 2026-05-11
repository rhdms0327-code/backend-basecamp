const fs = require('fs');
const dir = 'e:/Study/knowledge-hub/docs/03-tools-ide/git';
const files = [
    `${dir}/index.md`,
    `${dir}/docs/git-commands.md`
];

files.forEach(f => {
    if(fs.existsSync(f)){
        let c = fs.readFileSync(f, 'utf8');
        if(c.includes('🛠️')){
            fs.writeFileSync(f, c.replace(/🛠️/g, '🧡'), 'utf8');
            console.log('Updated ' + f);
        }
    }
});
