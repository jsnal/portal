/* eslint-disable import/prefer-default-export */
const MarkdownIt = require('markdown-it');

export const PROJECTURLS = {
  i3wm: {
    raw: 'https://raw.githubusercontent.com/jsnal/i3wm/master/README.md',
    hub: 'https://github.com/jsnal/i3wm/',
    desc: 'my linux configuration',
  },
  'paste-light': {
    raw: 'https://raw.githubusercontent.com/jsnal/paste-light/master/README.md',
    hub: 'https://github.com/jsnal/paste-light',
    desc: 'lightweight paste system that is managed from the terminal',
  },
  'vim-serape': {
    raw: 'https://raw.githubusercontent.com/jsnal/vim-serape/master/README.md',
    hub: 'https://github.com/jsnal/vim-serape',
    desc: 'a bright and vivid color scheme',
  },
  abbs: {
    raw: 'https://raw.githubusercontent.com/jsnal/abbs/master/README.md',
    hub: 'https://github.com/jsnal/abbs',
    desc: 'blazing fast a simple blogging system',
  },
  portal: {
    raw: 'https://raw.githubusercontent.com/jsnal/portal/master/README.md',
    hub: 'https://github.com/jsnal/portal',
    desc: 'this website source code',
  },
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
