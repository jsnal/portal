import git from './git';
import run from './run';

export default async function getFileMetadata(filePath) {
  const treeEntry = (
    await run(
      git(['ls-tree', '--full-tree', '-r', '-z', 'content', '--', filePath]),
    )
  ).match(/^\d+ (\w+) ([0-9a-f]+)\t(.+)\.(.+?)(\0|$)/);

  // If a tree entry doesn't exist for this filename, exit safely
  if (!treeEntry) return null;

  const [match, type, hash, filename, extension] = treeEntry;

  // If the tree entry isn't a blob assume something has gone wrong and return safely
  if (type !== 'blob') return null;

  const canonicalTitle = filename.replace(/^.*[\\\/]/, '').replace(/-/g, ' ');
  const blob = await run(git(['cat-file', 'blob', hash]));

  return {
    title: canonicalTitle,
    blob: blob,
    blobHash: hash,
    extension: extension,
  };
}
