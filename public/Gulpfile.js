var fs = require('fs'),
    gulp = require("gulp"),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins();

var serverPath = './static/',//服务器资源路径
    rootPath = './static',//根性
    staticDir = 'static/app/',//静态资源根目录
    lessFiles = staticDir + '**/*.less',//less文件路径
    hashFiles = staticDir + '**/*.min',//hash处理文件 hashFiles+".js"
    htmlDir = './static/app/index.html',//页面基础路径
    jsArr = [
        "static/app/config/config.js",
        "static/app/controller/**/*.js"
    ];

gulp.task('look', function () {
    plugins.livereload.listen();
    gulp.watch([lessFiles], ['less-min']);
    gulp.watch([jsArr], ['js-min']);
    // gulp.watch( [jsArr] ).on('change',function(e){
    //   jsHintrc(e);
    // });
});
gulp.task('less-min',function(){
    var onError = function(err) {
        plugins.notify.onError({
            title: "Gulp",
            subtitle: "Failure!",
            message: "less error: <%= error.message %>",
            sound: "Beep"
        })(err);
        this.emit('end');
    };
  return gulp.src( [lessFiles] )
        .pipe(plugins.plumber({
            errorHandler: onError
        }))
        .pipe(plugins.less({
            relativeUrls: true
        }))
        .pipe(plugins.autoprefixer({
            browsers: ['last 20 versions'],
            cascade: true
        }))
        .pipe(plugins.minifyCss())
        .pipe(plugins.concat("app.min.css"))
        .pipe(gulp.dest( staticDir ))
        .pipe(plugins.notify({
            title: 'Gulp',
            subtitle: 'success',
            message: 'less OK',
            sound: "Pop"
        }))
        .pipe(plugins.livereload());
});

gulp.task("js-min",function(){
   return gulp.src(jsArr)
        // .pipe(plugins.uglify({
        //     mangle: true,
        //     compress: {
        //         drop_console: true
        //     }
        // }))
        .pipe(plugins.concat("app.min.js"))
        .pipe(gulp.dest("static/app/"));
});

function jsHintrc(e){
    var onError = function(err) {
        plugins.notify.onError({
            title:    "Gulp",
            subtitle: "Failure!",
            message:  "js代码不规范,看控制台先!!!",
            sound:    "Beep"
        })(err);
        this.emit('end');
    };
    gulp.src( e.path,{ base: rootPath } )
        .pipe(plugins.plumber({errorHandler: onError}))
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter(function (result, data, opt){
            if( result ){
                console.log( result );
            }
            return result;
        }))
        .pipe(plugins.jshint.reporter('fail'))
        .pipe(plugins.notify({
            title: 'Gulp',
            subtitle: 'success',
            message: 'js OK now',
            sound: "Pop"
        }))
}


var connect = plugins.connect;
gulp.task('localhost', function() {
    connect.server({
        root: serverPath,
        port: 8081
    });
});

gulp.task("default",['look','less-min','js-min']);

gulp.task("clean",function(){
    return gulp.src(staticDir + '*.min-*', {read: false})
    .pipe(plugins.clean());
});

gulp.task("rev",["min"],function(){
    return gulp.src( [ staticDir + "*.min.css", staticDir + "*.min.js"] )
        .pipe(plugins.rev())
        .pipe(gulp.dest( staticDir ));
});

gulp.task('min',["clean"],function(){
    gulp.run('less-min','js-min');
});

gulp.task('inject',["rev"],function(){
    var target = gulp.src( 'static/app/index.html' );
    var sources = gulp.src( ['static/app/app.min-*.js','static/app/app.min-*.css'] , {read: false});
    return target.pipe(plugins.inject(sources , {
        ignorePath : ['.','static']
    }))
    .pipe(gulp.dest( 'static/app/' ));
});



