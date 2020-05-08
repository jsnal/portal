import util from 'util';
import git from '../git';
import run from '../run';
import Note from '../models/notes';
import { loadContent } from '../loadContent';
import { findObject } from '../mongoose';

// const note = new Note({
//   title: 'The Title',
//   tags: ['tag1', 'tag2'],
//   createdAt: '0/0/0',
//   blobHash: 'asdf',
//   headHash: 'ghjk',
//   content: 'Some example content.',
// });
//
// note.save();

(async () => {
  const head = (await run(git(['rev-parse', 'content']))).trim();
  // const dbHead = await Note.getHead();
  //
  // console.log(dbHead[0].head);
  // if (head === dbHead) {
  //   console.log(util.format('Index already up-to-date at revision %s', head));
  //   process.exit(0);
  // }

  // console.log(`HEAD: ${head} REDIS_HEAD: ${dbHead}`);

  loadContent();
})();
