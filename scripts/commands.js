const program = require('commander');
const inquirer = require('inquirer');
const { join } = require('path');
const { createGetDirectories } = require('./lib/fs');
const { ensureDirSync } = require('fs-extra');
const { readFileSync, writeFileSync } = require('fs');
const { capitalize, decapitalize } = require('./lib/helpers');
const { parseFile } = require('./lib/parseFile');
const Handlebars = require('handlebars');
const _ = require('lodash');
const config = require(join(process.cwd(), './config/scripts.config.js'));
const TEMPLATE_ROOT = join(process.cwd(), './config/templates');

const Program = program.version('0.2.0');

const raiseError = (err) => {
  console.log(err);
  process.exit(1);
}

const createHelperMethods = ({ rootPath }) => ({
  getDirectories: createGetDirectories(rootPath),
  capitalize: capitalize,
  decapitalize: decapitalize,
  convertToKebab: text => _.kebabCase(text),
  convertToCamel: text => _.camelCase(text)
});

const getFinalPath = ({ path, actionOptions }, absolute = true) => {
  const { rootPath } = actionOptions;
  const pathResult = typeof path === 'function' ? path(actionOptions) : [path || ''];
  const abs = absolute ? process.cwd() : '';
  return join(...[abs, rootPath, ...pathResult]);
};

function create_dir({ path }, actionOptions) {
  const _path = getFinalPath({ path, actionOptions});

  ensureDirSync(_path);
}

function create_file({ path, name }, actionOptions) {
  const _path = getFinalPath({ path, actionOptions });

  try {
    writeFileSync(join(_path, name), '', 'utf8');
  } catch (e) {
    raiseError(e)
  }
}

function set_root_path({ path }, actionOptions) {
  const _path = getFinalPath({ path, actionOptions }, false);
  return _path;
}

function copy_templates({ list }, actionOptions) {
  Object.keys(list).forEach((sourceFile) => {
    const value = list[sourceFile];

    let _destinationFile = value;
    if (typeof value === 'function') {
      _destinationFile = value(actionOptions);
    }

    _destinationFile = join(process.cwd(), actionOptions.rootPath, _destinationFile);
    const _source = join(TEMPLATE_ROOT, sourceFile);

    try {
      const source = readFileSync(_source, 'utf8');

      Handlebars.registerHelper('lowercase', text => text.toLowerCase());
      Handlebars.registerHelper('uppercase', text => text.toUpperCase());
      Handlebars.registerHelper('capitalize', text => capitalize(text));
      Handlebars.registerHelper('decapitalize', text => decapitalize(text));
      Handlebars.registerHelper('kebab', text => _.kebabCase(text));
      Handlebars.registerHelper('camel', text => _.camelCase(text));

      const context = { ...actionOptions.answers, vars: actionOptions.vars };
      const template = Handlebars.compile(source);
      const result = template(context);

      writeFileSync(_destinationFile, result, 'utf8');
    } catch (e) {
      raiseError(e);
    }
  });
}

function edit_file({ path, name, onBody }, actionOptions) {
  const sourceFile = join(getFinalPath({ path, actionOptions }), name);
  parseFile({ sourceFile, onBody: onBody(actionOptions) })
}

async function RunCommand({ settings, flags, rootAnswers }) {
  let rootPath = settings.rootPath;
  const { vars } = settings;

  const defaultMaker = () => [];

  // Process prompts
  const promptsMaker = settings.prompts || defaultMaker;
  const prompts = promptsMaker(createHelperMethods({ rootPath }));
  let answers = await inquirer.prompt(prompts);

  // assign answers answers in recurrent invocation
  if (!Object.keys(answers).length) answers = rootAnswers;

  // Process actions
  const actions = settings.actions || [];
  actions.forEach((action) => {
    // Options object passed to action methods
    const actionOptions = { answers, rootPath, flags, vars };

    try {
      switch (action.type) {
        case 'create_dir':
          create_dir(action, actionOptions);
          break;
        case 'create_file':
          create_file(action, actionOptions);
          break;
        case 'copy_templates':
          copy_templates(action, actionOptions);
          break;
        case 'set_root_path':
          rootPath = set_root_path(action, actionOptions);
          break;
        case 'edit_file':
          edit_file(action, actionOptions);
          break;
        case 'on_flag':
          const isNotSet = flags[action.flag] === undefined;
          if (flags[action.flag] || (action.not_set && isNotSet)) {
            RunCommand({
              flags,
              rootAnswers: answers,
              settings: {
                rootPath,
                ...action.commands,
              }
            });
          }
          break;
      }
    } catch (e) {
      raiseError(e);
    }
  });
};

const commands = config.commands || {};
Object.keys(commands).forEach((commandKey) => {
  const P = Program.command(...[commandKey]);
  const flags = commands[commandKey].flags || {};
  Object.keys(flags).forEach((flagKey) => {
    P.option(...flags[flagKey]);
  });

  P.action((options = {}) => {
    RunCommand({
      settings: { ...commands[commandKey] },
      flags: options
    });
  })
});

Program.parse(process.argv);
