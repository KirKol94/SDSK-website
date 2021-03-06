const {
		src,
		dest,
		watch,
		series,
		parallel,
} = require('gulp')
const del = require('del')
const pug = require('gulp-pug')
const sass = require('gulp-sass')(require('sass'))
const gulpGroupCssMediaQueries = require('gulp-group-css-media-queries')
const cssNano = require('gulp-cssnano')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const webp = require('gulp-webp')
const svgSprite = require('gulp-svg-sprite')
const htmlWebp = require('gulp-webp-html-nosvg')
const browserSync = require('browser-sync')
		.create()
const gulpIf = require('gulp-if')
const rigger = require('gulp-rigger')
const uglify = require('gulp-uglify')

const isBuild = process.argv.includes('--build')
const isDev = !isBuild

const path = {
		pug: {
				src: 'src/pug',
				dist: 'build',
		},
		css: {
				src: 'src/styles',
				dist: 'build',
		},
		js: {
				src: 'src/js',
				dist: 'build/js',
		},
		img: {
				src: 'src/img',
				dist: 'build/img',
		},
		svg: {
				src: 'src/img/svg',
				dist: 'build/svg',
		},
		fonts: {
				src: 'src/fonts',
				dist: 'build/fonts',
		},
		favicon: {
				src: 'src/favicon',
				dist: 'build/favicon',
		},
		build: 'build',
		src: 'src',
}

function htmlGenerator() {
		return src(`${path.pug.src}/*.pug`)
				.pipe(pug(gulpIf(isDev, { pretty: true })))
				.pipe(gulpIf(isBuild, htmlWebp()))
				.pipe(dest(path.pug.dist))
				.pipe(browserSync.stream())
}

function styleGenerator() {
		return src(`${path.css.src}/index.scss`)
				.pipe(sass())
				.pipe(gulpIf(isBuild, gulpGroupCssMediaQueries()))
				.pipe(gulpIf(isBuild, cssNano()))
				.pipe(gulpIf(isBuild, autoprefixer({
						cascade: false,
				})))
				.pipe(rename('style.css'))
				.pipe(dest(path.css.dist))
				.pipe(browserSync.stream())
}

function bundleJsGenerator() {
		return src(`${path.js.src}/bundle.js`)
				.pipe(rigger())
				.pipe(gulpIf(isBuild, uglify()))
				.pipe(dest(path.js.dist))
				.pipe(browserSync.stream())
}

function imagesConverter() {
		return src(`${path.img.src}/**/*.{jpg,jpeg,png,gif,}`)
				.pipe(gulpIf(isBuild, webp()))
				.pipe(src(`${path.img.src}/**/*.{jpg,jpeg,png,gif,}`))
				.pipe(dest(path.img.dist))
				.pipe(browserSync.stream())
}

function svgConverter() {
		return src(`${path.svg.src}/**/*.svg`)
				.pipe(svgSprite({
						mode: {
								stack: {
										sprite: '../sprite.svg',
								},
						},
				}))
				.pipe(dest(path.svg.dist))
				.pipe(browserSync.stream())
}

function favicon() {
		return src(`${path.favicon.src}/**/*.*`)
				.pipe(dest(path.favicon.dist))
				.pipe(browserSync.stream())
}

function fonts() {
		return src(`${path.fonts.src}/**/*.{woff,woff2,ttf,otf}`)
				.pipe(dest(path.fonts.dist))
				.pipe(browserSync.stream())
}

function server() {
		browserSync.init({
				server: {
						baseDir: path.build,
				},
		})

		watch(`${path.src}/**/*.*`)
				.on('change', browserSync.reload)
}

function clear() {
		return del(path.build)
}

function clearImg() {
		return del(`${path.build}/img`)
}

function clearFonts() {
		return del(`${path.build}/fonts`)
}

function watcher() {
		watch(`${path.pug.src}/**/*.pug`, htmlGenerator)
		watch(`${path.css.src}/**/*.scss`, styleGenerator)
		watch(`${path.img.src}/**/*.{jpg,jpeg,png,gif,}`, series(clearImg, imagesConverter))
		watch(`${path.svg.src}/**/*.svg`, svgConverter)
		watch(`${path.fonts.src}/**/*.{woff, woff2, ttf, otf}`, series(clearFonts, fonts))
		watch(`${path.js.src}/**/*.js`, series(bundleJsGenerator, htmlGenerator, styleGenerator))
}

exports.build = series(
		clear,
		htmlGenerator,
		styleGenerator,
		bundleJsGenerator,
		svgConverter,
		imagesConverter,
		fonts,
		favicon,
)

exports.default = series(
		clear,
		htmlGenerator,
		styleGenerator,
		bundleJsGenerator,
		svgConverter,
		imagesConverter,
		fonts,
		favicon,
		parallel(server, watcher),
)
