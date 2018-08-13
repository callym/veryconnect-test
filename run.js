const child_process = require('child_process');
const path = require('path');

const spawn = child_process.spawn;
const dir = process.cwd();

function start_sails() {
  console.log('***** Starting Sails *****');

  const sails = spawn('npx.cmd', ['sails', 'lift'], {
    cwd: path.resolve(dir, 'backend'),
  });

  sails.stdout.on('data', data => console.log(data.toString('utf8').trim()));
  sails.stderr.on('data', data => console.error(data.toString('utf8').trim()));
};

function start_angular() {
  console.log('***** Starting Angular *****');

  const angular = spawn('npx.cmd', ['ng', 'serve'], {
    cwd: path.resolve(dir, 'frontend'),
  });

  angular.stdout.on('data', data => console.log(data.toString('utf8').trim()));
  angular.stderr.on('data', data => console.error(data.toString('utf8').trim()));
};

start_sails();
setTimeout(start_angular, 5000);
