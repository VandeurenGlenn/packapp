// opn('packapp-test.exe')
const { spawn } = require('child_process');
const m = require('./../packapp');
const opn = require('opn')
const spawnChild = (cmd, args, child) => new Promise((resolve, reject) => {
  child = spawn(cmd, args);
  child.stdout.on('data', data => console.log(data.toString()));
  child.on('close', code => resolve(console.log(code)));
});
// spawnChild('node', ['../index.js', 'main', 'main.js', 'targets', 'host', 'assets', 'app/index.html'])
m({
  main: 'test/app/main.js',
  targets: 'node10-win-x64,node10-linux-x64',
  assets: 'test/app/index.html',
  outPath: 'test/executables',
  winExe: {
    scripts: 'test/app/packapp-test.iss'
  }
})
//.then(data => opn('../Packapp Test-setup.exe'))
.catch((data) => console.log(data))
