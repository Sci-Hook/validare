import  * as chalk from 'chalk';
import * as fs from 'fs';
import 'syncforeachloop';

global.validare = {}

export async function loadSchemas(rule_file:string|string[]) {

    var files:string[] = [];

    if (typeof rule_file == 'string') {
        files.push(rule_file);
    }else{
        files = rule_file;
    }

    files.syncForEach(function file(file,next_file) {
        try {
            var config:Buffer = fs.readFileSync(process.cwd() + '/' +  file);
            try {
                var parsed = JSON.parse(config.toString('utf-8'));
                global.validare = Object.assign(global.validare,parsed);
            } catch (error) {
                console.log(chalk.red(`[validare] File is not valid json. File: ${chalk.yellow(file)}`));
            }
        } catch (error) {
            console.log(chalk.red(`[validare] File can not read. File: ${chalk.yellow(file)}`));
        }
        next_file();
    });

}