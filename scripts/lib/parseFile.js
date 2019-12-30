const esprima = require('esprima');
const escodegen = require('escodegen');
const { readFile, writeFileSync } = require('fs');
const prettier = require('prettier');

const ESPRIMA_PARSE_SETTINGS = {
  sourceType: 'module',
  loc: true,
  range: true,
  comment: true,
  tokens: true
}

const makeGenSettings = file => ({
  format: {
    indent: {
      style: '  ',
      base: 0,
    },
    preserveBlankLines: true,
    newline: '\n',
    space: ' ',
  },
  comment: true,
  sourceCode: file,
});

const editFile = (filePath, onBody) => new Promise((resolve, reject) => {
  readFile(filePath, 'utf8', (err, file) => {
    if (err) return console.log(err);

    const parsed = esprima.parse(file, ESPRIMA_PARSE_SETTINGS);
    onBody(parsed, code => esprima.parse(code, ESPRIMA_PARSE_SETTINGS));

    resolve(escodegen.generate(parsed, makeGenSettings(file)));
  });
});

const parseFile = async ({ sourceFile, onBody }) => {
  const sourceCode = await editFile(sourceFile, onBody);

  const formatted = prettier.format(sourceCode, {
    semi: true,
    parser: 'typescript',
    singleQuote: true,
    trailingComma: 'all'
  });

  writeFileSync(sourceFile, formatted, { encoding: 'utf8', flag: 'w' });
};

module.exports = {
  parseFile
}
