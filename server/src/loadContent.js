import redis from './redis';
import git from './git';
import run from './run';

async function getChangedCommits(head, redisHead) {
  return await run(git(
    ['rev-list', '--ancestry-path', `^${redisHead}~`, head]
  ));
}

export async function loadContent() {
  const head = (await run(git(['rev-parse', 'content']))).trim();
  const redisHead = String(await redis.get('HEAD'));

  console.log(await getChangedCommits(head, redisHead));
}
