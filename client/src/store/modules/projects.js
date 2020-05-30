const state = {
  i3wm: {
    raw: 'https://raw.githubusercontent.com/jsnal/i3wm/master/README.md',
    hub: 'https://github.com/jsnal/i3wm/',
    desc: 'my linux configuration',
  },
  'paste-light': {
    raw: 'https://raw.githubusercontent.com/jsnal/paste-light/master/README.md',
    hub: 'https://github.com/jsnal/paste-light',
    desc: 'lightweight paste system that is managed from the terminal',
  },
  'vim-serape': {
    raw: 'https://raw.githubusercontent.com/jsnal/vim-serape/master/README.md',
    hub: 'https://github.com/jsnal/vim-serape',
    desc: 'a bright and vivid color scheme',
  },
  abbs: {
    raw: 'https://raw.githubusercontent.com/jsnal/abbs/master/README.md',
    hub: 'https://github.com/jsnal/abbs',
    desc: 'blazing fast a simple blogging system',
  },
  portal: {
    raw: 'https://raw.githubusercontent.com/jsnal/portal/master/README.md',
    hub: 'https://github.com/jsnal/portal',
    desc: 'this website source code',
  },
};

const getters = {
  getProjects: _state => _state,
  getProjectsName: _state => Object.keys(_state),
  getProjectRaw: _state => project => _state[project].raw,
  getProjectHub: _state => project => _state[project].hub,
};

export default {
  state,
  getters,
};
