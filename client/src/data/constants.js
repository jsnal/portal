/* eslint-disable import/prefer-default-export */
const MarkdownIt = require('markdown-it');

export const PROJECTURLS = {
  i3wm: [
    'https://raw.githubusercontent.com/jsnal/i3wm/master/README.md',
    'https://github.com/jsnal/i3wm/',
  ],
  'paste-light': [
    'https://raw.githubusercontent.com/jsnal/paste-light/master/README.md',
    'https://github.com/jsnal/paste-light',
  ],
  'vim-serape': [
    'https://raw.githubusercontent.com/jsnal/vim-serape/master/README.md',
    'https://github.com/jsnal/vim-serape',
  ],
  abbs: [
    'https://raw.githubusercontent.com/jsnal/abbs/master/README.md',
    'https://github.com/jsnal/abbs',
  ],
  portal: [
    'https://raw.githubusercontent.com/jsnal/portal/master/README.md',
    'https://github.com/jsnal/portal',
  ],
};

export const NOTESURL = 'http://raw.githubusercontent.com/jsnal/notes/master/';

export const MDCOMPILER = new MarkdownIt();

export const MDCOMPILE = async (url) => {
  let html;
  await fetch(url)
    .then(data => data.text())
    .then((text) => {
      html = MDCOMPILER.render(text);
    });

  return html;
};
