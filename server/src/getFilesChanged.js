import git from './git';
import run from './run';

export async function getFilesChanged(commit) {
  let filesChanged = [];
  const diffTreeRegExp = new RegExp('([a-f0-9]{40}) ([a-f0-9]{40}) ([ADM])\t(.+)', 'g');

  const diffTree = (
    await run(
      git(['diff-tree', '--no-commit-id', '-r', '-c', commit]),
    )
  ).trim();
  // console.log(diffTree);
  // const fileChangedCount = diffTree.split(/\r\n|\r|\n/).length;

  for(let part; part = diffTreeRegExp.exec(diffTree); ) {
    const [match, currentBlobHash, newBlobHash, status, filepath] = part;
    filesChanged.push({
      currentBlobHash: currentBlobHash,
      newBlobHash: newBlobHash,
      status: status,
      filepath: filepath,
    });
  }

  // Sort filesChanged so that 'D' is always first. If 'D' wasn't first we would
  // run into issues when trying to update the MonogDB because it would add a
  // file that already has the same blob hash. That would result in duplicated
  // posts with no way of deleting it without manually choosing.
  filesChanged.sort((a, b) => (b.status === 'D') ? 1 : (a.status === b.status) ? ((a.size > b.size) ? 1 : -1) : -1 )
  return filesChanged;
}
