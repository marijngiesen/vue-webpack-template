var copy = require('./lib/metalsmith-copy')
var minimatch = require('minimatch')

module.exports = function (metalsmith, opts, helpers) {
  function libraryProjectCopy (files, metalsmith, done) {
    if (metalsmith.metadata().projectType === 'lib') {
      var libRegexp = /^(.*\.)(lib\.)(ts|js)$/g;

      copy({
        move: true,
        pattern: "src/**/*",
        transform: function (file) {
          // Move all files but .lib files and components directory to app directory
          if (!minimatch(file, "**/*.lib.+(ts|js)") && !minimatch(file, "**/components/**/*")) {
            file = 'app' + file.substring(3)
          }

          // Rename .lib files
          file = file.replace(libRegexp, '$1$3')
          return file;
        }
      })(files, metalsmith, done)
    } else {
      done(null, files);
    }
  }
  metalsmith.use(libraryProjectCopy);
}