import util from 'util';
import mongoose from 'mongoose';
import git from '../git';
import run from '../run';
import Note from '../models/notes';
import Metadata, { setHead } from '../models/metadata';
import getFileContent from '../getFileContent';
import getFileMetadata from '../getFileMetadata';
import getFilesChanged from '../getFilesChanged';
import isArraysEqual from '../helpers/isArraysEqual';

function addNote(note) {
  Note.create(note, function(err, res) {
    if (err) console.error('Error: Unable to save ', note.blobHash, err);
  });
}

function deleteNote(blobHash) {
  Note.deleteOne({blobHash: blobHash}, function(err) {
    if (err) console.log(err);
  });
}

function updateNote(blobHash, updates) {
  Note.findOneAndUpdate({blobHash, blobHash}, updates, { useFindAndModify: false },
    function(err, res) {
      if (err) console.error('Error: Unable to update ', blobHash, err);
    }
  );
}

export async function updateMongo() {
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
        createdAt: new Date(createdAt),
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
      // Imperfect solution but this is needed because you can't get a file by
      // filepath if it no longer exists in the file system.
      let title, blob, blobHash, extension, html, tags, createdAt;
      if (file.status.toUpperCase() !== 'D') {
        ({title, blob, blobHash, extension} = await getFileMetadata(file.filepath));
        ({html, tags, createdAt} = await getFileContent(blob));
      }

      switch(file.status.toUpperCase()) {
        case 'A': // Added
          addNote({
            title: title,
            tags: tags,
            createdAt: new Date(createdAt),
            updatedAt: Date.now(),
            blobHash: blobHash,
            html: html,
          });
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

          const previousTags = await Note.find({blobHash: file.currentBlobHash})
            .select('tags')
            .exec()
            .then(function (tags) {
              return Array.from(tags[0].tags);
            });

          // Check if the tags were changed and if they were update them.
          if (!isArraysEqual(tags, previousTags)) {
            note.tags = tags;
          }

          updateNote(file.currentBlobHash, note);
          break;
        default:
          console.error(`Error: File status ${file.status} doesn't exist`);
          break
      }
    }
  }

  // After all the changes have been made update the HEAD within MongoDB so things
  // don't break if we try to update already updated notes.
  setHead(head);
}

// TODO: For testing purposes... Should move somewhere better
// updateNote('a', {blobHash: 'new blob hash', title: 'bad title'});
// Note.findOneAndUpdate({blobHash: 'a'}, {
//   title: 'a',
//   tags: ['a'],
//   createdAt: 'a',
//   updatedAt: Date.now(),
//   blobHash: 'a',
//   html: 'a',
// }, {
//   useFindAndModify: false,
//   upsert: true,
// }, function(err, res) {
//   if (err) console.error('Error: Unable to save ', err);
// });
