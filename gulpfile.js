const { src, dest, watch, parallel } = require("gulp"); //src = identificar un archivo dest = almacenar el archivo
// Dependencias CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");

// Dependencias Imagenes
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

function css(cb) {
  src("src/scss/**/*.scss") //1. Identificar el archivo de SASS
    .pipe(plumber())
    .pipe(sass()) //2. Compilar el archivo
    .pipe(dest("build/css")); //3. Almacenar en el disco duro
  cb(); //Callback para indicarle a gulp cuando termina
}

function imagenes(cb) {
  const opciones = {
    optimizationLevel: 3,
  };
  src("src/img/**/*.{png,jpg}")
    .pipe(cache(imagemin(opciones)))
    .pipe(dest("build/img"));
  cb();
}

function versionWebp(cb) {
  const opciones = {
    quality: 50,
  };

  src("src/img/**/*.{png,jpg}").pipe(webp(opciones)).pipe(dest("build/img"));

  cb();
}

function versionAvif(cb) {
  const opciones = {
    quality: 50,
  };

  src("src/img/**/*.{png,jpg}").pipe(avif(opciones)).pipe(dest("build/img"));

  cb();
}

function javascript(cb) {
  src("src/js/**/*.js").pipe(dest("build/js"));

  cb();
}

function dev(cb) {
  watch("src/scss/**/*.scss", css);
  watch("src/js/**/*.js", javascript);
  cb();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev);
