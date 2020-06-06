// TODO: Figure out a better way of doing this... dotenv maybe?
export const MONGOURI = process.env.NODE_ENV === 'dev' ? 'mongodb://127.0.0.1/portal' : 'mongodb://mongodb_container/portal';
export const CONTENT = './server/content';
