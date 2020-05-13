import MarkdownIt from 'markdown-it';
import unpackContent from 'unpack-content';
import git from './git';
import run from './run';

// Implement a syntax highlighter for code blocks
const md = MarkdownIt({
  html: true,
  typographer: true,
});

export async function getFileContent(blob) {

  // Unpack the markdown header
  const content = unpackContent(blob);

  return {
    html: md.render(content.body),
    tags: content.tags,
    createdAt: content.created,
  }
}