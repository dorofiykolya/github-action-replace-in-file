const core = require('@actions/core');
const os = require("os");
const github = require('@actions/github');
const fs = require('fs');
const YAML = require('yaml');

try {
    const filePath = core.getInput("file");
    const search = core.getInput("search");
    const replace = core.getInput("replace");
    const list = core.getInput("list");

    var content = fs.readFileSync(filePath, 'utf8');
    var found = false;

    if (search && replace) {
        while (content.indexOf(search) !== -1) {
            content = content.replace(search, replace);
            found = true;
        }
    }
    if (list) {
        const map = YAML.parse(list);
        for (const key in map) {
            const value = map[key];
            if (value.search && value.replace) {
                while (content.indexOf(value.search) !== -1) {
                    content = content.replace(value.search, value.replace);
                    found = true;
                }
            }
        }
    }

    console.log(content);
    if (found) {
        fs.writeFileSync(filePath, content);
        core.setOutput("status", found ? "ok" : "fail");
    } else {
        core.setFailed(`search: "${search}" not found in file: ${filepath}${os.EOL}content:${os.EOL}${content}`);
    }
} catch (error) {
    core.setFailed(error.message);
}