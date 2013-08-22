/*!
 * connect-markdown - test/connect-markdown.test.js
 * Copyright(c) 2013 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var should = require('should');
var request = require('supertest');
var connectMarkdown = require('../');
var app = require('../example/app');

describe('connect-markdown.test.js', function () {
  it('should throw err when root is empty', function () {
    (function () {
      connectMarkdown();
    }).should.throw('options.root required');
    (function () {
      connectMarkdown({});
    }).should.throw('options.root required');
  });

  describe('GET root path /docs <= /docs/index.md', function () {
    it('should GET /docs status 200', function (done) {
      request(app)
      .get('/docs')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(/<title>connect-markdown<\/title>/)
      .expect(200, done);
    });

    it('should GET /docs/ status 200', function (done) {
      request(app)
      .get('/docs/')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(/<title>connect-markdown<\/title>/)
      .expect(200, done);
    });

    it('should GET /docs/index status 200', function (done) {
      request(app)
      .get('/docs/index')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(/<title>connect-markdown<\/title>/)
      .expect(200, done);
    });

    it('should GET /docs/index.md status 404', function (done) {
      request(app)
      .get('/docs/index.md')
      .expect(404, done);
    });
  });

  describe('GET /docs/rest', function () {
    it('should GET /docs/rest 200', function (done) {
      request(app)
      .get('/docs/rest')
      .expect(/<title>RESTful API<\/title>/)
      .expect(200, done);
    });

    it('should GET /docs/rest/ 404', function (done) {
      request(app)
      .get('/docs/rest/')
      .expect(404, done);
    });

    it('should GET /docs/rest.md 404', function (done) {
      request(app)
      .get('/docs/rest.md')
      .expect(404, done);
    });
  });

  describe('Change indexName to readme', function () {
    it('should GET /docs2 => readme.md', function (done) {
      request(app)
      .get('/docs2')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(/<title>connect-markdown readme<\/title>/)
      .expect(200, done);
    });
  });
});
