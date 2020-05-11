import util from 'util';
import mongoose from 'mongoose';
import git from '../git';
import run from '../run';
import Note from '../models/notes';
import Metadata, { setHead } from '../models/metadata';
import { getFileContent } from '../getFileContent';
import { getFileMetadata } from '../getFileMetadata';
import { getFilesChanged } from '../getFilesChanged';
import isArraysEqual from '../helpers/isArraysEqual';

function addNote(note) {
  Note.create(note, function(err, res) {
    if (err) console.error('Error: Unable to save ', note.blobHash, err)
  });
  // Note.findOneAndUpdate({blobHash: blobHash}, {
  //   title: title,
  //   tags: tags,
  //   createdAt: createdAt,
  //   // TODO: Wrap around this so I can get MM/DD/YYYY
  //   updatedAt: Date.now(),
  //   blobHash: blobHash,
  //   html: html,
  // }, {
  //   useFindAndModify: false,
  //   upsert: true,
  // }, function(err, res) {
  //   if (err) console.error('Error: Unable to save ', blobHash, err);
  // });
}

function deleteNote(blobHash) {
  Note.deleteOne({blobHash: blobHash}, function(err) {
    if (err) console.log(err);
  });
}

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

      addNote({
        title: title,
        tags: tags,
        createdAt: createdAt,
        // TODO: Wrap around this so I can get MM/DD/YYYY
        updatedAt: Date.now(),
        blobHash: blobHash,
        html: html,
      });
    }
  } else {
    if (head === mongoHead) {
      console.log('MongoDB is already up-to-date');
      return null;
    }

    const filesChanged = await getFilesChanged(head);

    for (let file of filesChanged) {
      let {title, blob, blobHash, extension} = await getFileMetadata(file.filepath);
      let {html, tags, createdAt} = await getFileContent(blob);
      console.log(blobHash);
      console.log(file.newBlobHash);

      switch(file.status.toUpperCase()) {
        case 'A': // Added
          addNote({
            title: title,
            tags: tags,
            createdAt: createdAt,
            updatedAt: Date.now(),
            blobHash: blobHash,
            html: html,
          })
          break;
        case 'D': // Delete
          deleteNote(file.currentBlobHash);
          break;
        case 'M': // Modified
          let note = {
            blobHash: blobHash,
            updatedAt: Date.now(),
            html: html,
          };

          const previousTags = await Note.find({ blobHash: file.currentBlobHash })
            .select('tags')
            .exec()
            .then(function (tags) {
              return Array.from(tags[0].tags);
            });

          if (!isArraysEqual(tags, previousTags)) {
            note.tags = tags;
          }
          console.log(note);
          // Update the note!
          break;
      }
    }
  }
  // Note.findOneAndUpdate({blobHash: 'a'}, {
  //   title: 'a',
  //   tags: ['a'],
  //   createdAt: 'a',
  //   // TODO: Wrap around this so I can get MM/DD/YYYY
  //   updatedAt: Date.now(),
  //   blobHash: 'a',
  //   html: 'a',
  // }, {
  //   useFindAndModify: false,
  //   upsert: true,
  // }, function(err, res) {
  //   if (err) console.error('Error: Unable to save ', err);
  // });

  setHead('0');
})();
