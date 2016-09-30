var gulp = require('gulp');
var sass = require('gulp-sass');
var rsp = require('remove-svg-properties').stream;
var svgSprite = require('gulp-svg-sprite');

/**
 * Compile styles
 */
gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});


/**
 * SvgSprite Config
 */
var svgConfig = {
  mode: {
    symbol: { // symbol mode to build the SVG
      inline: true, // Prepare for inline embedding, adds display none;
      dest: '', // destination folder
      prefix: "mo-svg-%s",
      sprite: 'sprite.liquid', //sprite name
      example: false, // Build sample page
      bust: false,
      render: {
        scss: false,
      }
    }
  },
  svg: {
    xmlDeclaration: false, // strip out the XML attribute
    doctypeDeclaration: false // don't include the !DOCTYPE declaration
  }
};

gulp.task('svg', function() {
  gulp.src("src/svg/*.svg" )
  .pipe(rsp.remove({
      properties: [rsp.PROPS_FILL]
  }))
  .pipe(svgSprite(svgConfig))
  .pipe(gulp.dest("snippets/"))
});


gulp.task('default', ['svg', 'sass', 'sass:watch'])
