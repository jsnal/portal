import MarkdownIt from 'markdown-it';
import unpackContent from 'unpack-content';
import hljs from 'highlight.js';
import logger from './utils/logger';

function highlight(str, lang) {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(lang, str).value;
    } catch (err) {
      logger.error('Unable to apply syntax highlighting', err);
    }
  }

  return '';
}

const md = MarkdownIt({
  highlight,
  html: true,
  linkify: true,
  typographer: true,
});

export default async function getFileContent(blob) {
  // Unpack the markdown header
  const content = unpackContent(blob);

  return {
    html: md.render(content.body),
    tags: content.tags,
    createdAt: content.created,
  };
}
