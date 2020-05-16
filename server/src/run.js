import spawn from 'child_process';

export default function run(cmd) {
  const _cmd = cmd.binary.concat(' ', cmd.args.join(' '));

  return new Promise((resolve) => {
    spawn.exec(_cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error);
      }
      resolve(stdout || stderr);
    });
  });
}
