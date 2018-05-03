const package = require("./package.json");

const env = {
    WEBPACK_PROD_MODE: false
};

const          gulp = require("gulp"),
                del = require("del"),
                iff = require("gulp-if"),
            plumber = require("gulp-plumber"),
              newer = require("gulp-newer"),
             cached = require("gulp-cached"),
           fancyLog = require("fancy-log"),
              print = require("gulp-print").default,
             moment = require("moment"),
         gitRevSync = require("git-rev-sync"),
             header = require("gulp-header"),
         sourcemaps = require("gulp-sourcemaps"),
             uglify = require("gulp-uglify"),
            cssnano = require("gulp-cssnano"),
             concat = require("gulp-concat"),
               size = require("gulp-size"),
            compass = require("gulp-compass"),
           imagemin = require("gulp-imagemin"),
               svgo = require("gulp-svgmin"),
        runSequence = require("run-sequence").use(gulp),
      webpackStream = require("webpack-stream"),
            webpack = require("webpack"),
      webpackConfig = require("./webpack.config.js")(env);

const onError = err => {
    console.error(err);
};

const banner =
`/**
 * @project     ${package.name}
 * @author      ${package.author}
 * @build       ${moment().format("LLLL")}
 * @release     ${gitRevSync.short()} [${gitRevSync.branch()}]
 * @copyright   Copyright (c) ${moment().format("YYYY")}, ${package.author}
*/
`;

gulp.task("clean", () => {
    fancyLog("-> Clean assets directory");
    del.sync([ 
        package.paths.assets + "assets/**/*", package.paths.assets + "scripts/**/*" 
    ]);
});

gulp.task("compile:scss", () => {
    fancyLog("-> Compiling scss");
    return gulp.src(package.paths.src.scss + package.vars.scss)
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(compass({
            config_file: package.vars.compass,
            sass: package.paths.src.scss,
            css: package.paths.build.css
        }))
        .pipe(cached("sass"))
        .pipe(sourcemaps.write("./"))
        .pipe(size({ gzip: true, showFiles: true }))
        .pipe(gulp.dest(package.paths.build.css));
});

gulp.task("styles", ["compile:scss"], () => {
    fancyLog("-> Build all styles");
    return gulp.src(package.globs.distCss)
        .pipe(plumber({ errorHandler: onError }))
        .pipe(newer({ dest: package.paths.assets + package.paths.dist.css + "*.css" }))
        .pipe(print())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(concat("styles.css"))
        .pipe(cssnano({
            discardComments: {
                removeAll: true
            },
            discardDuplicates: true,
            discardEmpty: true,
            minifyFontValues: true,
            minifySelectors: true
        }))
        .pipe(header(banner))
        .pipe(sourcemaps.write("./"))
        .pipe(size({ gzip: true, showFiles: true }))
        .pipe(gulp.dest(package.paths.assets + package.paths.dist.css));
});

gulp.task("images", () => {
    fancyLog("-> Images optimizing");
    return gulp.src(package.paths.src.images + "**/*.{png,jpg,ico,svg}")
        .pipe(plumber({ errorHandler: onError }))
        .pipe(iff(["**/*.{png,jpg}"], imagemin({
            progressive: true,
            interlaced: true,
            optimizationLevel: 7,
            svgoPlugins: [{ removeViewBox: false }],
            verbose: true,
            use: []
        })))
        .pipe(iff(["**/*.svg"], svgo({
            plugins: [{
                cleanupIDs: { remove: false }
            }]
        })))
        .pipe(gulp.dest(package.paths.assets + package.paths.dist.images));
});

gulp.task("fonts", () => {
    fancyLog("-> Fonts copying & optimizing");
    return gulp.src(package.globs.distFonts)
        .pipe(plumber({ errorHandler: onError }))
        .pipe(iff(["**/*.svg"], svgo({
            plugins: [{
                cleanupIDs: { remove: false }
            }]
        })))
        .pipe(print())
        .pipe(gulp.dest(package.paths.assets + package.paths.dist.fonts));
});

gulp.task("es6-scripts", () => {
    fancyLog("-> Compile all scripts using Webpack");
    return gulp.src(package.paths.src.js + "**/*.js")
        .pipe(plumber({ errorHandler: onError }))
        .pipe(newer({ dest: package.paths.build.js + "*.js" }))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(print())
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(header(banner))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(package.paths.build.js));
});

gulp.task("inline-scripts", () => {
    fancyLog("-> Build external scripts");
    return gulp.src(package.globs.distLibs)
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(print())
        .pipe(concat("libs.js"))
        .pipe(uglify())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(package.paths.build.js));
});

gulp.task("scripts", ["inline-scripts", "es6-scripts"], () => {
    fancyLog("-> Build all scripts");
    return gulp.src(package.globs.distJs)
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write("./"))
        .pipe(size({ gzip: true, showFiles: true }))
        .pipe(gulp.dest(package.paths.assets + package.paths.dist.js));
});

gulp.task("build", done => {
    runSequence("clean", "images", "fonts", "styles", "scripts", done);
});

gulp.task("default", ["build"], () => {
    gulp.watch([
        package.paths.src.scss + "**/*.scss"
    ], ["styles"]);
    gulp.watch([
        package.paths.src.js + "**/*.js"
    ], ["scripts"]);
});