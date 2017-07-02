var copy = require('./lib/metalsmith-copy')

var srcRegexp = /^src[\/|\\]/g
var libRegexp = /^(.*\.)(lib\.)(ts|js)$/g
var componentsRegexp = /^(.*)([\/|\\]components)([\/|\\].*)$/g

module.exports = function (metalsmith, opts, helpers) {
  function libraryProjectCopy (files, metalsmith, done) {
    if (metalsmith.metadata().projectType === 'lib') {
      copy({
        move: true,
        transform: function (file) {
          // Move all files but .lib files and components directory to app directory
          if (file.match(srcRegexp)) {
            console.log(file)
            if (!file.match(libRegexp) && !file.match(componentsRegexp)) {
              file = 'app' + file.substring(3)
            }

            // Rename .lib files
            file = file.replace(libRegexp, '$1$3')
          }
          return file;
        }
      })(files, metalsmith, done)
    } else {
      done(null, files);
    }
  }
  metalsmith.use(libraryProjectCopy);
}