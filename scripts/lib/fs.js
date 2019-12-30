const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');

const isDirectory = source => lstatSync(source).isDirectory();

const getDirectories = source => {
  const dirs = [];
  readdirSync(source).forEach(name => {
    if (isDirectory(join(source, name))) {
      dirs.push(name);
    }
  });
  return dirs;
}

const createGetDirectories = (rootPath) => (source = []) => {
  const dirs = [];
  let _source = source;
  if (typeof source === 'string') {
    _source = [source];
  }

  readdirSync(join(...[process.cwd(), rootPath, ..._source])).forEach(name => {
    if (isDirectory(join(...[process.cwd(), rootPath, ...source, name]))) {
      dirs.push(name);
    }
  });
  return dirs;
}

module.exports = {
  createGetDirectories,
  getDirectories
}
