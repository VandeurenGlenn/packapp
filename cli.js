#!/usr/bin/env node
const packapp = require('./packapp.js');

const argv = process.argv;

const winExeArgvIndex = argv.indexOf('--win-exe');
const winExeArgs = winExeArgvIndex === -1 ? null : argv.slice(winExeArgvIndex, argv.length);

const argVal = (arg, args = argv, index = -1) => {
  index = args.indexOf(arg);
  if (index !== -1) return args[index + 1];
  return undefined;
}

const help = `
example

  packapp "app/main.js" targets "node10-win-x64,node10-linux-x64" assets "app/index.html" outPath "executables" --win-exe scripts "app/setupscript.iss"

create bundle
  packapp "app/main.js" targets "node10-win-x64,node10-linux-x64" assets "app/index.html" outPath "executables"
create setup
packapp --win-exe scripts "app/setupscript.iss"
`

if (argv.indexOf('help') !== -1) console.log(help);
else {

  const options = {
    winExe: {}
  };

  options.main = argVal('main') || argv[0];
  options.targets = argVal('targets');
  options.scripts = argVal('scripts');
  options.output = argVal('output');
  options.assets = argVal('assets');

  if (options.scripts) options.scripts = options.scripts.split(',');
  if (options.assets) options.assets = options.scripts.split(',');
  if (options.targets) options.targets = options.targets.split(',');

  if (winExeArgs) {
    options.winExe.pfx = argVal('pfx', winExeArgs);
    options.winExe.password = argVal('password', winExeArgs);
    options.winExe.scripts = argVal('scripts', winExeArgs);
    options.winExe.name = argVal('name', winExeArgs); // signtool name

    if (options.winExe.scripts) options.winExe.scripts = options.winExe.scripts.split(',');
  } else {
    delete options.winExe;
  }

  packapp(options)
}
