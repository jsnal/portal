import util from 'util';
import git from '../git';
import run from '../run';
import Note from '../models/notes';
import mongoose from 'mongoose';
import { getFileContent } from '../getFileContent';
import { getFileMetadata } from '../getFileMetadata';

(async () => {
  const head = (await run(git(['rev-parse', 'content']))).trim();
  const noteDocuments = await Note.countDocuments().exec();

  if (noteDocuments === 0) {
    console.log('Initialzing MongoDB based on: ', head);

    const files = (
      await run(
        git(['ls-tree', '--full-tree', '-r', '--name-only', 'content', '--', 'notes']),
      )
    ).trim();

    for (let file of files.split('\n')) {
      let {title, blob, blobHash, extension} = await getFileMetadata(file);
      let {html, tags, createdAt} = await getFileContent(blob);

      Note.findOneAndUpdate({blobHash: blobHash}, {
        title: title,
        tags: tags,
        createdAt: createdAt,
        // TODO: Wrap around this so I can get MM/DD/YYYY
        updatedAt: Date.now(),
        blobHash: blobHash,
        html: html,
      }, {
        useFindAndModify: false,
        upsert: true,
      }, function(err, res) {
        if (err) console.error('Error: Unable to save ', blobHash, err);
      });
    }
  } else {
    console.log('update');
  }

  // if (head === dbHead) {
  //   console.log(util.format('Index already up-to-date at revision %s', head));
  //   process.exit(0);
  // }
})();
