connect-markdown
=======

[![Build Status](https://secure.travis-ci.org/fengmk2/connect-markdown.png)](http://travis-ci.org/fengmk2/connect-markdown) [![Coverage Status](https://coveralls.io/repos/fengmk2/connect-markdown/badge.png)](https://coveralls.io/r/fengmk2/connect-markdown) [![Build Status](https://drone.io/github.com/fengmk2/connect-markdown/status.png)](https://drone.io/github.com/fengmk2/connect-markdown/latest)

![logo](https://raw.github.com/fengmk2/connect-markdown/master/logo.png)

Auto convert markdown to html for connect.

* [test rest api doc](/docs/rest)

## Install

```bash
$ npm install connect-markdown
```

## Usage

```js
var connectMarkdown = require('connect-markdown');

var app = connect();

/**
 * GET /docs      <= marked() = /docs/index.md 
 * GET /docs/rest <= marked() = /docs/rest.md
 */
app.use('/docs', connectMarkdown({
  root: __dirname + '/docs',
  layout: __dirname + '/docs/layout.html', // {TITLE}, {BODY}
}));

app.listen();
```

## TODO

* [ ] cache layout and markdown page
* [ ] http 304 cache, etag
* [ ] benchmarks

## License 

(The MIT License)

Copyright (c) 2013 fengmk2 &lt;fengmk2@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
