# packapp

## install
```sh
npm i --save-dev packapp
```

## usage
```js
import pack from 'packapp';

pack({
  main: 'test/app/main.js',
  targets: 'node10-win-x64,node10-linux-x64',
  assets: 'test/app/index.html',
  output: 'test/executables',
  winExe: {
    scripts: 'test/app/packapp-test.iss'
  }
})
```
