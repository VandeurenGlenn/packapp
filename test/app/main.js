const opn = require('opn');
const { createServer } = require('http');

// module.exports = () => new Promise((resolve, reject) => {
  createServer((req, res) => {
    res.write('Hello World!'); //write a response to the client
    res.end(); //end the response
  }).listen(3476)
  opn('http://127.0.0.1:3476').then(opened => {
    // resolve()
    console.log('ok');
  }).catch(err => console.log(err))//reject(err))
// });
