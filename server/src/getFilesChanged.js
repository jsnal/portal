import git from './git';
import run from './run';

export default async function getFilesChanged(commit) {
  const filesChanged = [];

  // TODO: Figure out what this eslint error means
  /* eslint no-control-regex: 0 */
  const diffTreeRegExp = new RegExp('([a-f0-9]{40}) ([a-f0-9]{40}) ([ADM])\t(.+)', 'g');

  const diffTree = (
    await run(
      git(['diff-tree', '--no-commit-id', '-r', '-c', commit]),
    )
  ).trim();
  // const fileChangedCount = diffTree.split(/\r\n|\r|\n/).length;

  for (let result; result = diffTreeRegExp.exec(diffTree);) {
    const [match, currentBlobHash, newBlobHash, status, filepath] = result;
    filesChanged.push({
      match,
      currentBlobHash,
      newBlobHash,
      status,
      filepath,
    });
  }

  // Sort filesChanged so that 'D' is always first. If 'D' wasn't first we would
  // run into issues when trying to update the MonogDB because it would add a
  // file that already has the same blob hash. That would result in duplicated
  // posts with no way of deleting it without manually choosing.
  filesChanged.sort((a, b) => {
    if (b.status === 'D') {
      return 1;
    }

    if (a.status === b.status) {
      if (a.size > b.size) {
        return 1;
      }
      return -1;
    }

    return -1;
  });

  return filesChanged;
}
