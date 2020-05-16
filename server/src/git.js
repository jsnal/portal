import path from 'path';
import { CONTENT } from './constants';

// TODO: check if this exists on the system
const binary = 'git';

export default function git(args) {
  const content = path.resolve(__dirname, '../..', CONTENT);
  const _args = ['-C', content, ...args];

  return {
    binary,
    args: _args,
  };
}
