import git from './git';
import run from './run';

export async function getFilesChanged(commit) {
  const diffTreeRegExp = new RegExp('([a-f0-9]{40}) ([a-f0-9]{40}) ([ADM])\t(.+)', 'g');

  const diffTree = (
    await run(
      git(['diff-tree', '--no-commit-id', '-r', '-c', commit]),
    )
  ).trim();
  console.log(diffTree);
  // const fileChangedCount = diffTree.split(/\r\n|\r|\n/).length;

  let match;
  let originalBlobHash;
  let newBlobHash;
  let status;
  let filepath;
  // while (([match, originalBlobHash, newBlobHash, status, filepath] = diffTreeRegExp.exec(diffTree))) {
  while ((match = diffTreeRegExp.exec(diffTree))) {
    originalBlobHash = match[1];
    newBlobHash = match[2];
    status = match[3];
    filepath = match[4];
    console.log(originalBlobHash);
  }

  let filesChanged = {};

}
