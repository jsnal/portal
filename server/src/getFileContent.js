import git from './git';
import run from './run';

async function getChangedCommits(head, redisHead) {
  return await run(git(
    ['rev-list', '--ancestry-path', `^${redisHead}~`, head]
  ));
}

export async function getFileContent(blob) {
  // console.log(blob);
}
