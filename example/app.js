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
