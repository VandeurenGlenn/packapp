const { spawn} = require('child_process');
const exe = require('@vandeurenglenn/win-exe/win-exe.js');
const { join } = require('path');
const ora = require('ora');
const { writeFile, unlink } = require('fs');
const { promisify } = require('util');

let spinner;

const write = promisify(writeFile);
const remove = promisify(unlink);

const log = (text, type=false) => {
  if (!spinner) spinner = ora(text).start();
  if (type) spinner[type](text);
  if (spinner && !type) spinner.text = text;
}

const spawnChild = (cmd, args, verbose = false, child) => new Promise((resolve, reject) => {
  let afterdistributed = [];
  child = spawn(cmd, args);
  child.stdout.on('data', data => {
    data = data.toString();
    if (afterdistributed.length > 0) afterdistributed.push(data.split('\n'));
    else if (verbose) console.log(data);
    else if (afterdistributed.length === 0) log(data);

    if (data.includes('must be distributed')) {
      afterdistributed = data.split('\n');
    }
  })
  child.stderr.on('data', data => {
    // data = data.toString();
    // if (afterdistributed.length > 0) afterdistributed.push(data);
    // else if (vebose) console.log(data);
    // else log(data);
  });
  child.on('close', code => {
    if (afterdistributed.length > 0) {
      afterdistributed.forEach((text, i) => {
        if (i && text.length > 2) log(text, 'info');
        else if (!i) {
          log('pack app', 'warn');
          log(text, 'warn');
        }
      });
      afterdistributed = [];
    }
    if (code) reject(code);
    else resolve()
  });
});

const handleArray = arr => {
  if (Array.isArray(arr)) arr = arr.concat();
  return arr
}

module.exports = async options => {
  log('pack app');
  if (options.main) {
    const args = [join(process.cwd(), 'node_modules/pkg/lib-es5/bin.js'), options.main, '-c', '.packapp.pkg.json'];
    const config = {...options};
    config.entry = config.main;
    delete config.winExe;
    delete config.main;
    delete config.verbose;
    await write('.packapp.pkg.json', JSON.stringify(config));
    if (options.output && options.targets.length === 1) {
      args.push('--output');
      args.push(options.output);
    } else if (options.output && options.targets.length !== 1) {
      args.push('--out-path');
      args.push(options.output);
    }
    await spawnChild('node', args)
    log('pack app', 'succeed');
    await remove('.packapp.pkg.json');
  }
  if (options.winExe) {
    const winExe = [];
    Object.entries(options.winExe).forEach(val => {
      winExe.push(val[0])
      winExe.push(val[1])
    })
    options.winExe.verbose = options.verbose;
    const pIndex = process.argv.indexOf('password');
    if (!options.winExe.password) options.winExe.password = pIndex !== -1 ? process.argv[pIndex + 1] : false;
    await exe(options.winExe);
  }
}
