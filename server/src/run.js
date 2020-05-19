import spawn from 'child_process';
import logger from './utils/logger';

export default function run(cmd) {
  const _cmd = cmd.binary.concat(' ', cmd.args.join(' '));

  return new Promise((resolve) => {
    spawn.exec(_cmd, (error, stdout, stderr) => {
      if (error) {
        logger.error(`Trouble running ${_cmd}`, error);
      }
      resolve(stdout || stderr);
    });
  });
}
