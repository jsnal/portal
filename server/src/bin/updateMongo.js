import util from 'util';
import git from '../git';
import run from '../run';
import Note from '../models/notes';
import mongoose from 'mongoose';
import { getFileContent } from '../getFileContent';
import { getFileMetadata } from '../getFileMetadata';

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
    const regExp = new RegExp('([a-f0-9]{40})([^\0]+)', 'g');

    const files = (
      await run(
        git(['ls-tree', '--full-tree', '-r', '--name-only', 'content', '--', 'notes']),
      )
    ).trim();

    for (let file of files.split('\n')) {
      let {title, blob, blobHash, extension} = await getFileMetadata(file);
      console.log(title);
      console.log(blobHash);
      console.log(extension);

      await getFileContent(blob);
    }

    // let match;
    // while ((match = regExp.exec(files)))
    //   blobs.push(match[0]);

    // loadContent(head, blobs);
  } else {
    console.log('update');
  }

  // if (head === dbHead) {
  //   console.log(util.format('Index already up-to-date at revision %s', head));
  //   process.exit(0);
  // }
})();
