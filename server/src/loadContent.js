import git from './git';
import run from './run';

async function getChangedCommits(head, redisHead) {
  return await run(git(
    ['rev-list', '--ancestry-path', `^${redisHead}~`, head]
  ));
}

export async function loadContent(head, blobs) {
  // console.log('Head: ', head);
  // console.log('Blobs: ', blobs);
}
