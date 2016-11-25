// TODO rename to main-require.js
require.config({
    paths: {
        "jquery": "/~dbaird/webmisc/lib/jquery-3/dist/jquery.min",
        //"es6": "/~dbaird/webmisc/lib/requirejs-babel/es6",
        "jsx-loader": "/~dbaird/webmisc/lib/requirejs-babel-jsx",
        "babel": "/~dbaird/webmisc/lib/babel-standalone-6/babel.min",
        "babel-standalone": "/~dbaird/webmisc/lib/babel-standalone-6/babel.min",
        "bootstrap": "/~dbaird/webmisc/lib/bootstrap-3/dist/js/bootstrap.min",
        "react": "/~dbaird/webmisc/lib/react-15/dist/react-with-addons.min",
        "react-dom": "/~dbaird/webmisc/lib/react-dom-15/dist/react-dom.min",
        "codemirror": "/~dbaird/webmisc/lib/codemirror-5/lib/codemirror",
        "codemirror-javascript": "/~dbaird/webmisc/lib/codemirror-5/mode/javascript/javascript",
        "codemirror-jsx": "/~dbaird/webmisc/lib/codemirror-5/mode/jsx/jsx",
        "codemirror-clike": "/~dbaird/webmisc/lib/codemirror-5/mode/clike/clike",
        "codemirror-sql": "/~dbaird/webmisc/lib/codemirror-5/mode/sql/sql",
        "codemirror-sql-hint": "/~dbaird/webmisc/lib/codemirror-5/addon/hint/sql-hint",
        "goldenlayout": "/~dbaird/webmisc/lib/golden-layout-1/dist/goldenlayout.min",
        //"babel-plugin-transform-es2015-modules-amd": "/~dbaird16/webmisc/lib/babel-plugin-transform-es2015-modules-amd/lib/index", // http://babeljs.io/docs/plugins/transform-es2015-modules-amd/
    },
    shim: {
        bootstrap: ['jquery'],
    },
});

(define(function(require) {

    var jQuery = require('jquery');
    require('oof');
    var mygoldenlayout = require('jsx-loader!mygoldenlayout');
    console.log('>>>', mygoldenlayout);
    //var goldenlayout = require('goldenlayout');
    //console.log('HERE', jQuery);

}));

