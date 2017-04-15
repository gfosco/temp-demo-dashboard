require('dotenv').load({ silent: true })

const path   = require('path')
const Mozaik = require('mozaik')

const _ = require('underscore')

let projects = _.shuffle([
  'facebook/react',
  'facebook/react-native',
  'facebookincubator/create-react-app',
  'facebook/immutable-js',
  'facebook/pop'
])

/* ,
 'facebook/hhvm',
 'facebook/flux',
 'facebook/fresco',
 'facebook/AsyncDisplayKit',
 'facebook/flow',
 'facebook/folly',
 'facebook/fresco',
 'facebook/jest',
 'facebook/relay',
 'facebook/osquery',
 'facebook/rocksdb',
 'facebook/stetho',
 'facebook/yoga',
 'yarnpkg/yarn',
 'facebook/SocketRocket',
 'facebook/infer',
 'facebook/xctool',
 'graphql/graphql-js',
 'prestodb/presto',
 'facebook/chisel',
 'facebook/watchman',
 'facebook/zstd',
 'facebook/proxygen',
 'facebook/graphql',
 'facebook/buck',
 'facebook/rebound',
 'facebook/componentkit',
 'facebook/reason',
 'facebookresearch/visdom',
 'facebookresearch/faiss'
 ]) */

let dashboards = [];

_.map(projects, (p) => {
  let board = {
    title: ' ',
    columns: 3,
    rows: 3,
    widgets: [
      { extension: 'github',
        widget: 'RepoBadge',
        title: p.substring(p.indexOf('/') + 1),
        repository: p,
        columns: 1, rows: 2,
        x: 0, y: 0 },
      { extension: 'github',
        widget: 'RepoCommitActivityLine',
        repository: p,
        columns: 2, rows: 1,
        x: 0, y: 2 },
      { extension: 'github',
        widget: 'RepoContributorsStats',
        title: 'Top Contributors',
        repository: p,
        columns: 1, rows: 3,
        x: 2, y: 0 },
      { extension: 'github',
        widget: 'PullRequests',
        title: 'Recent Pull Requests',
        repository: p,
        columns: 1, rows: 2,
        x: 1, y: 0 }
    ]
  }
  dashboards.push(board)
})


let config = {
  port: 5000,
  useWssConnection: false,
  rotationDuration: 12,
  apisPollInterval: 100000,
  dashboards: dashboards
};


Mozaik.configure(config)
Mozaik.registerApi('github',    require('mozaik-ext-github/client'))
Mozaik.start()