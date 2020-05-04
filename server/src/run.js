import spawn from 'child_process';

export default function run(cmd) {
  cmd = cmd.binary.concat(' ', cmd.args.join(' '));

  return new Promise((resolve, reject) => {
    spawn.exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error);
      }
      resolve(stdout ? stdout : stderr);
    });
  });
}
