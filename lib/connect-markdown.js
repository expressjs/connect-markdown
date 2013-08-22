/*!
 * connect-markdown - lib/connect-markdown.js
 * Copyright(c) 2013 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var path = require('path');
var fs = require('fs');
var urlparse = require('url').parse;
var marked = require('marked');
var eventproxy = require('eventproxy');

function markdownMiddleware(options) {
  if (!options || !options.root) {
    throw new Error('options.root required');
  }
  options.layout = options.layout || path.join(options.root, 'layout.html');
  options.cache = options.cache === false ? false : true;
  options.titleHolder = options.titleHolder || '{TITLE}';
  options.bodyHolder = options.bodyHolder || '{BODY}';
  options.indexName = options.indexName || 'index';

  var getContent = function getContent(filepath, callback) {
    var ep = eventproxy.create();
    ep.fail(callback);

    fs.readFile(filepath, 'utf8', ep.doneLater(function (content) {
      var title = content.slice(0, content.indexOf('\n')).trim().replace(/^[#\s]+/, '');
      var body = marked(content);
      ep.emit('data', {title: title, body: body});
    }));
    fs.readFile(options.layout, 'utf8', ep.done('layout'));

    ep.all('layout', 'data', function (layout, data) {
      var html = layout.replace(options.titleHolder, data.title)
       .replace(options.bodyHolder, data.body);
      callback(null, html);
    });
  };

  return function markdown(req, res, next) {
    var urlinfo = urlparse(req.url);
    var pathname = urlinfo.pathname;
    if (pathname === '/') {
      pathname = '/' + options.indexName;
    }
    pathname = path.join(options.root, pathname + '.md');
    getContent(pathname, function (err, html) {
      if (err) {
        return next(err.code === 'ENOENT' ? null : err);
      }
      res.charset = res.charset || 'utf-8';
      res.setHeader('Content-Type', 'text/html');
      res.end(html);
    });
  };
}

module.exports = markdownMiddleware;
