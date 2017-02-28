# GitHub GraphQL Client

Node.js client for the GitHub GraphQL API with zero dependencies.

## Usage

```js
var client = require('github-graphql-client');

var request = client({
  token: 'your GitHub token',
  query: 'your GraphQL query'
}, function (err, res) {
  if (err) {
    // handle errors
  } else {
    // handle results
  }
});

```

## License

[MIT](http://opensource.org/licenses/MIT)

## Credits

Made by [Ivan Malopinsky](http://imsky.co).