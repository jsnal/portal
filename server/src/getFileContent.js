import unpackContent from 'unpack-content';
import git from './git';
import run from './run';

async function getChangedCommits(head, redisHead) {
  return await run(git(
    ['rev-list', '--ancestry-path', `^${redisHead}~`, head]
  ));
}

export async function getFileContent(blob) {
  // console.log(blob);
  const data = unpackContent(blob);
  console.log(data);
  // console.log(tags);
  // console.log(metadata);
}
