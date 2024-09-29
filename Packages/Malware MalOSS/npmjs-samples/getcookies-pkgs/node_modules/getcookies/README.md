# getcookie

Basic HTTP cookie parser for HTTP servers.

## Installation

```sh
$ npm install getcookie
```

## API

```js
var getcookie = require('getcookies');
```

### getcookie(req, res, next)

Parse an HTTP `Cookie` header string and returning an object of all cookie name-value pairs.

```js
getcookies(req, res, err => {
    console.log(req.cookies);
    // { foo: 'bar', equation: 'E=mc^2' }
});
```

## Testing

```sh
$ npm test
```

## References

* [RFC 6265: HTTP State Management Mechanism][rfc-6265]
* [Same-site Cookies][draft-ietf-httpbis-cookie-same-site-00]

[draft-ietf-httpbis-cookie-same-site-00]: https://tools.ietf.org/html/draft-ietf-httpbis-cookie-same-site-00
[rfc-6265]: https://tools.ietf.org/html/rfc6265
[rfc-6265-5.1.4]: https://tools.ietf.org/html/rfc6265#section-5.1.4
[rfc-6265-5.2.1]: https://tools.ietf.org/html/rfc6265#section-5.2.1
[rfc-6265-5.2.2]: https://tools.ietf.org/html/rfc6265#section-5.2.2
[rfc-6265-5.2.3]: https://tools.ietf.org/html/rfc6265#section-5.2.3
[rfc-6265-5.2.4]: https://tools.ietf.org/html/rfc6265#section-5.2.4
[rfc-6265-5.2.5]: https://tools.ietf.org/html/rfc6265#section-5.2.5
[rfc-6265-5.3]: https://tools.ietf.org/html/rfc6265#section-5.3

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/cookie.svg
[npm-url]: https://npmjs.org/package/cookie
[node-version-image]: https://img.shields.io/node/v/cookie.svg
[node-version-url]: https://nodejs.org/en/download
[travis-image]: https://img.shields.io/travis/jshttp/cookie/master.svg
[travis-url]: https://travis-ci.org/jshttp/cookie
[coveralls-image]: https://img.shields.io/coveralls/jshttp/cookie/master.svg
[coveralls-url]: https://coveralls.io/r/jshttp/cookie?branch=master
[downloads-image]: https://img.shields.io/npm/dm/cookie.svg
[downloads-url]: https://npmjs.org/package/cookie
