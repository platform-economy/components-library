'use strict';
const { getDirectories } = require('../scripts/lib/fs')

const scopes = getDirectories('./packages').map(dir => ({ name: dir }));

module.exports = {
  types: [
    {value: 'feat',     name: '🌟  feat:     A new feature'},
    {value: 'fix',      name: '🐞  fix:      A bug fix'},
    {value: 'docs',     name: '📗  docs:     Documentation only changes'},
    {value: 'style',    name: '🎨  style:    Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)'},
    {value: 'refactor', name: '👀  refactor: A code change that neither fixes a bug nor adds a feature'},
    {value: 'perf',     name: '⚡️  perf:     A code change that improves performance'},
    {value: 'test',     name: '✅  test:     Adding missing tests'},
    {value: 'chore',    name: '📌  chore:    Changes to the build process or auxiliary tools and libraries such as documentation generation'},
    {value: 'revert',   name: '🚑  revert:   Revert to a commit'}
  ],

  scopes,

  messages: {
    type: 'Select the type of change that you\'re committing:',
    scope: '\nSelect package as the scope of this change (select empty to omit this option):',
    // used if allowCustomScopes is true
    customScope: 'Please do not use custom scope, only package name or empty:',
    subject: 'Write a short, imperative tense description of the change:\n',
    body: 'Provide a longer description of the change (optional). use "|" to break new line:\n',
    breaking: 'List any breaking changes (optional):\n',
    footer: 'List any issues closed by this change (optional). E.g.: #31, #34:\n',
    confirmCommit: 'Are you sure you want to proceed with the commit above?'
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],

  // limit subject length
  subjectLimit: 100
};
