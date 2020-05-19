import git from '../git';
import run from '../run';
import logger from '../utils/logger';
import Note from '../models/notes';
import Metadata, { setHead } from '../models/metadata';
import getFileContent from '../getFileContent';
import getFileMetadata from '../getFileMetadata';
import getFilesChanged from '../getFilesChanged';
import isArraysEqual from '../helpers/isArraysEqual';

function addNote(note) {
  Note.create(note, (err) => {
    if (err) logger.error(`Unable to save ${note.blobHash}`, err);
  });
}

function deleteNote(blobHash) {
  Note.deleteOne({ blobHash }, (err) => {
    if (err) logger.error(`Unable to delete ${blobHash}`, err);
  });
}

function updateNote(blobHash, updates) {
  Note.findOneAndUpdate(
    { blobHash },
    updates,
    { useFindAndModify: false },
    (err) => {
      if (err) logger.error(`Unable to update ${blobHash}`, err);
    },
  );
}

export default async function updateMongo() {
  const head = (await run(git(['rev-parse', 'content']))).trim();
  const mongoHead = await Metadata.find({ _id: 100 })
    .select('head')
    .exec()
    .then((_head) => _head[0].head);
  const noteDocuments = await Note.countDocuments().exec();

  if (noteDocuments === 0) {
    logger.info(`Initialzing MongoDB based on: ${head}`);

    const files = (
      await run(
        git(['ls-tree', '--full-tree', '-r', '--name-only', 'content', '--', 'notes']),
      )
    ).trim();

    files.split('\n').forEach(async (file) => {
      const { title, blob, blobHash } = await getFileMetadata(file);
      const { html, tags, createdAt } = await getFileContent(blob);

      addNote({
        title,
        tags,
        createdAt: new Date(createdAt),
        updatedAt: Date.now(),
        blobHash,
        html,
      });
    });
  } else {
    if (head === mongoHead) {
      logger.info('MongoDB is already up-to-date');
      return null;
    }

    const filesChanged = await getFilesChanged(head);

    filesChanged.forEach(async (file) => {
      // TODO: Imperfect solution but this is needed because you can't get a file by
      // filepath if it no longer exists in the file system.
      let title;
      let blob;
      let blobHash;
      let html;
      let tags;
      let createdAt;
      if (file.status.toUpperCase() !== 'D') {
        ({ title, blob, blobHash } = await getFileMetadata(file.filepath));
        ({ html, tags, createdAt } = await getFileContent(blob));
      }

      switch (file.status.toUpperCase()) {
        case 'A': // Added
          addNote({
            title,
            tags,
            createdAt: new Date(createdAt),
            updatedAt: Date.now(),
            blobHash,
            html,
          });
          break;
        case 'D': // Delete
          deleteNote(file.currentBlobHash);
          break;
        case 'M': { // Modified
          const note = {
            blobHash,
            updatedAt: Date.now(),
            html,
          };

          const previousTags = await Note.find({ blobHash: file.currentBlobHash })
            .select('tags')
            .exec()
            .then((_tags) => Array.from(_tags[0].tags));

          // Check if the tags were changed and if they were update them.
          if (!isArraysEqual(tags, previousTags)) {
            note.tags = tags;
          }

          updateNote(file.currentBlobHash, note);
          break;
        }
        default:
          logger.warn(`Error: File status ${file.status} doesn't exist`);
          break;
      }
    });
  }

  // After all the changes have been made update the HEAD within MongoDB so things
  // don't break if we try to update already updated notes.
  setHead(head);
  return head;
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
