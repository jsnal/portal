// TODO: Figure out a better way of doing this... dotenv maybe?
let MONGOURI;
let CONTENT = './server/content';

if (process.env.NODE_ENV === 'dev') {
  MONGOURI = 'mongodb://127.0.0.1/portal';
} else {
  MONGOURI = 'mongodb://mongodb_container/portal';
}

export { CONTENT, MONGOURI };
