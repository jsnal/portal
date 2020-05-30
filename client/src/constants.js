/* eslint-disable import/prefer-default-export */
const MarkdownIt = require('markdown-it');

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
