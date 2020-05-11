import util from 'util';
import mongoose from 'mongoose';
import git from '../git';
import run from '../run';
import Note from '../models/notes';
import Metadata, { setHead } from '../models/metadata';
import { getFileContent } from '../getFileContent';
import { getFileMetadata } from '../getFileMetadata';

(async () => {
  const head = (await run(git(['rev-parse', 'content']))).trim();
  const mongoHead = await Metadata.find({ _id: 100 })
    .select('head')
    .exec()
    .then(function (head) {
      return head[0].head;
    });
  const noteDocuments = await Note.countDocuments().exec();

  if (noteDocuments === 0) {
    console.log('Initialzing MongoDB based on:', head);

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
    const regExp = new RegExp('([a-f0-9]{40}) ([a-f0-9]{40}) ([ADM])\t(.+)', 'g');

    const diffTree = (await run(git(['diff-tree', '--no-commit-id', '-r', '-c', head]))).trim();
    const filesChanged = diffTree.split(/\r\n|\r|\n/).length;

    console.log(regExp.exec(diffTree));
    console.log(regExp.exec(diffTree));
    console.log(filesChanged);
    if (head === mongoHead) {
      console.log('MongoDB is already up-to-date');
      return null;
    }
  }

  setHead(head);
})();
