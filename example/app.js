/*!
 * connect-markdown - example/app.js
 * Copyright(c) 2013 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var connect = require('connect');
var connectMarkdown = require('../');

var app = connect();

/**
 * GET /docs       <= marked() = /docs/index.md 
 * GET /docs/rest  <= marked() = /docs/rest.md
 */
app.use('/docs', connectMarkdown({
  root: __dirname + '/docs',
  layout: __dirname + '/docs/layout.html', // {TITLE}, {BODY}
  cache: false,
}));

/**
 * GET /docs2      <= marked() = /docs/readme.md 
 * GET /docs/rest  <= marked() = /docs/rest.md
 */
app.use('/docs2', connectMarkdown({
  root: __dirname + '/docs',
  layout: __dirname + '/docs/layout.html', // {TITLE}, {BODY}
  cache: false,
  indexName: 'readme'
}));

module.exports = app;

if (process.env.NODE_ENV !== 'test') {
  app.listen(1984);
  console.log('app listening on 1984, http://localhost:1984/docs');
}
