// TODO: Ignore console.logs in eslint for this file only

function _getDate() {
  return new Date().toGMTString();
}

export default {
  info: (message) => {
    console.info(_getDate(), ':: INFO -', message);
  },
  warn: (message) => {
    console.info(_getDate(), ':: WARNING -', message);
  },
  error: (message, error) => {
    console.info(_getDate(), ':: ERROR -', message, '\n', error);
  },
};

export function morganFormat(tokens, req, res) {
  return [
    tokens.date(req, res), '::',
    tokens.method(req, res), '-',
    tokens['remote-addr'](req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
  ].join(' ');
}
