const chalk = require('chalk');
const fs = require('fs');

const folder = process.argv[2];
const docsDir = `./docs/${folder}`;
const fileDataDir = `./data/${folder}.json`;

const prettify = (str) => str.replace('.mdx', '').replace(/-/g, ' ');

// Check if folder exists
// read all files in folder
// Create file data json in /data/file/folder-name.json

if (fs.existsSync(docsDir)) {
    fs.readdir(docsDir, (err, files) => {
        fs.writeFile(
            fileDataDir,
            JSON.stringify(
                files.map((e) => {
                    return {
                        text: prettify(e),
                        slug: `/${folder}/${e.replace('.mdx', '')}`
                    };
                })
            ),
            {
                encoding: 'utf8',
                flag: 'w',
                mode: 0o666
            },
            (err) => {
                if (err) console.log(err);
                else {
                    console.log(chalk.green(`Created: ${chalk.blue.bold(fileDataDir)}`));
                }
            }
        );
    });
} else {
    console.log(chalk.red(`\nFolder : /docs/${folder} doesn't exists.`));
}
