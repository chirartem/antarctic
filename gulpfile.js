const { src, dest, watch, parallel, series } = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const del = require('del');

function browsersync() {
	browserSync.init({
		server: {
			baseDir: "src/"
		},
		notify: false
	})
}

function styles() {
	return src('src/scss/style.scss')
	.pipe(scss({ outputStyle: 'compressed' }))
	.pipe(concat('style.min.css'))
	.pipe(autoprefixer({
		overrideBrowserslist: ['last 10 versions'],
		grid: true
	}))
	.pipe(dest('src/css'))
	.pipe(browserSync.stream())
}

function scripts() {
	return src([
		'node_modules/jquery/dist/jquery.js',
		'src/js/main.js'
	])
	.pipe(concat('main.min.js'))
	.pipe(uglify())
	.pipe(dest('src/js'))
	.pipe(browserSync.stream())
}

function images() {
	return src('src/images/**/*.*')
	.pipe(imagemin([
		imagemin.gifsicle({ interlaced: true }),
		imagemin.mozjpeg({ quality: 75, progressive: true }),
		imagemin.optipng({ optimizationLevel: 5 }),
		imagemin.svgo({
			plugins: [
			{ removeViewBox: true },
			{ cleanupIDs: false }
			]
		})
		]))
	.pipe(dest('dist/images'))
}

function build() {
	return src([
		'src/**/*.html',
		'src/css/style.min.css',
		'src/js/main.min.js'
		], { base: 'src' })
	.pipe(dest('dist'))
}

function cleanDist() {
	return del('dist')
}

function watching() {
	watch(['src/scss/**/*.scss'], styles);
	watch(['src/js/**/*.js', '!src/js/main.min.js'], scripts);
	watch(['src/**/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.images = images;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist, images, build);

exports.default = parallel(styles, scripts, browsersync, watching);

// let project_folder = "dist";
// let source_folder = "src";
// 
// let path = {
//     build: {
//         html: project_folder + "/",
//         css: project_folder + "/css/",
//         js: project_folder + "/js/",
//         images: project_folder + "/images/",
//         fonts: project_folder + "/fonts/"
//     },
//     src: {
//         html: source_folder + "/*.html",
//         css: source_folder + "/scss/style.scss",
//         js: source_folder + "/js/main.js/",
//         images: source_folder + "/images/**/*.{jpg,png,svg,gif,ico,webp}",
//         fonts: source_folder + "/fonts/*.ttf"
//     },
//     watch: {
//         html: source_folder + "/**/*.html",
//         css: source_folder + "/scss/**/*.scss",
//         js: source_folder + "/js/**/*.js/",
//         images: source_folder + "/images/**/*.{jpg,png,svg,gif,ico,webp}"
//     },
//     clean: "./" + project_folder + "/"
// }
// 
// let { src, dest } = require('gulp'),
//     gulp = require('gulp'),
//     browsersync = require("browser-sync").create();
// fileinclude = require("gulp-file-include");
// 
// function browserSync(params) {
//     browsersync.init({
//         server: {
//             baseDir: "./" + project_folder + "/"
//         },
//         port: 3000,
//         notify: false
//     })
// }
// 
// function html() {
//     return src(path.src.html)
//         .pipe(dest(path.build.html))
//         .pipe(browsersync.stream())
// }
// 
// let build = gulp.series(html);
// let watch = gulp.parallel(build, browserSync);
// 
// exports.html = html;
// exports.build = build;
// exports.watch = watch;
// exports.default = watch;