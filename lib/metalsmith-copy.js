/*
Fork from https://github.com/mattwidmann/metalsmith-copy with no dependency

The MIT License (MIT)

Copyright (c) 2014 Matt Widmann

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var debug = console.debug,
  path = require('path'),
  cloneDeep = require('./clone');

module.exports = plugin;

function plugin(options) {
  return function(files, metalsmith, done) {
    if (!options.directory && !options.extension && !options.transform) return done(new Error('metalsmith-copy: "directory" or "extension" option required'));
    if (!options.force) options.force = false;

    Object.keys(files).forEach(function (file) {
      debug('checking file: ' + file);
      var newName = file;

      // transform filename
      if (options.transform) {
        newName = options.transform(file);
      } else {
        if (options.extension) {
          var currentExt = path.extname(file);
          newName = path.join(path.dirname(file), path.basename(file, currentExt) + options.extension);
        }
        if (options.directory) {
          newName = path.join(options.directory, path.basename(newName));
        }
      }

      if (newName === file) {
        return;
      }

      if (files[newName] && options.force === false) return done(new Error('metalsmith-copy: copying ' + file + ' to ' + newName + ' would overwrite file'));

      debug('copying file: ' + newName);
      files[newName] = cloneDeep(files[file], function(value) {
        if (value instanceof Buffer) {
          return new Buffer(value);
        }
      });
      if (options.move) {
        delete files[file];
      }
    });

    done();
  }
}
