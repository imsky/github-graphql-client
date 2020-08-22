// Require modules
const test = require('ava');
const client = require('./');

// Define test queries
const queryWorking = `
query {
  repository(name: "github-graphql-client", owner: "imsky") {
    name
  }
}
`;

const queryBroken = `
qery {
  repository(name: "github-graphql-client", owner: "imsky") {
    name
  }
}
`;

test('fails without token', t => {
  const error = t.throws(() => {
    client({ query: '' });
  }, { instanceOf: Error });

  t.is(error.message, 'Missing GitHub token');
});

test('fails without query', t => {
  const error = t.throws(() => {
    client({ token: process.env.GITHUB_TOKEN });
  }, { instanceOf: Error });

  t.is(error.message, 'Missing query');
});
