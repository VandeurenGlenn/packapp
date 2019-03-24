const { spawn} = require('child_process');
// const { exec } = require('pkg');
const exe = require('@vandeurenglenn/win-exe');
const { join } = require('path');
const ora = require('ora');

let spinner;
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
    const args = [join(__dirname, 'node_modules/pkg/lib-es5/bin.js')];
    args.push(options.main);
    if (options.targets) {
      args.push('--target')
      args.push(handleArray(options.targets))
    }
    if (options.scripts) {
      args.push('--scripts');
      args.push(handleArray(options.scripts));
    }
    if (options.assets) {
      args.push('--assets');
      args.push(handleArray(options.assets));
    }
    if (options.output && options.targets.length === 1) {
      args.push('--output');
      args.push(options.output);
    } else if (options.output && options.targets.length !== 1) {
      args.push('--out-path');
      args.push(options.output);
    }
    await spawnChild('node', args)
    log('pack app', 'succeed');
    // await exec(args, options.verbose)
  }
  if (options.winExe) {
    const winExe = [];
    Object.entries(options.winExe).forEach(val => {
      winExe.push(val[0])
      winExe.push(val[1])
    })
    options.winExe.verbose = options.verbose;
    await exe(options.winExe);
  }
}