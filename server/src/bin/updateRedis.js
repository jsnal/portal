import util from 'util';
import redis from '../redis';
import git from '../git';
import run from '../run';
import { loadContent } from '../loadContent';

(async () => {
  const head = (await run(git(['rev-parse', 'content']))).trim();
  const redisHead = String(await redis.get('HEAD'));
  if (head === redisHead) {
    console.log(util.format('Index already up-to-date at revision %s', head));
    process.exit(0);
  }

  console.log(`HEAD: ${head} REDIS_HEAD: ${redisHead}`);


  // check if the database is completely new
  const keys = await redis.keys('*');
  const isNewRedis = keys.some((v) => v.indexOf("notes:") >= 0);

  loadContent();
})();
