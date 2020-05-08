import util from 'util';
import git from '../git';
import run from '../run';
import Note from '../models/notes';
import mongoose from 'mongoose';
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
  const noteDocuments = await Note.countDocuments().exec();

  if (noteDocuments === 0) {
    console.log('init');
    const regExp = new RegExp('[a-f0-9]{40}');
    const blobs = await run(git(['ls-files', '-s', '-z', 'notes']));
    console.log(regExp.exec(blobs));
    loadContent(head, blobs);
  } else {
    console.log('update');
  }
  // const dbHead = await Note.getHead();
  //
  // console.log(dbHead[0].head);
  // if (head === dbHead) {
  //   console.log(util.format('Index already up-to-date at revision %s', head));
  //   process.exit(0);
  // }

  // console.log(`HEAD: ${head} REDIS_HEAD: ${dbHead}`);
})();
