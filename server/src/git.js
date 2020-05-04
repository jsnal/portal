import path from 'path';
import { spawn } from 'child_process';
import { CONTENT } from './constants';

// TODO: check if this exists on the system
const binary = 'git';

export default function git(args) {
  const content = path.resolve(__dirname, '../..', CONTENT);
  args = ['-C', content, ...args];

  return {
    binary: binary,
    args: args
  }
}
