(function() {
    // See also: https://github.com/requirejs/requirejs/blob/4316f8f19f981c726eb32b5335c36237e0125948/require.js#L2016

    function splitPath(path) {
        var j = path.lastIndexOf('/');
        var baseUrl = j > 0 ? path.substring(0, j) + '/' : './';
        var filename = path.substring(j + 1);
        return {
            baseUrl: baseUrl,
            filename: filename,
        };
    }

    function parse(s) {
        var i = s.lastIndexOf('!');
        var prefix = i >= 0 ? s.substring(0, i) + '!' : '';
        var path = s.substring(i + 1);
        var x = splitPath(path);
        return {
            prefix: prefix,
            baseUrl: x.baseUrl,
            path: path,
            modulizedFilename: x.filename.replace(/\.jsx?$/, ''),
        };
    }

    var dataWebmiscMain;
    var dataMain;
    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length -1; i > -1; --i) {
        var dataWebmiscMain = scripts[i].getAttribute('data-webmisc-main');
        var dataMain = scripts[i].getAttribute('data-main');
        if (!dataWebmiscMain || !dataMain) {
        }
        break;
    }

    var pDataWebmiscMain = parse(dataWebmiscMain);
    var pDataMain = parse(dataMain);

    var baseUrl1;
    if (pDataMain.baseUrl[0] === '/') {
        baseUrl = pDataMain.baseUrl;
    }
    else {
        baseUrl = splitPath(window.location.pathname).baseUrl;
    }

    var cfg = {
        baseUrl: pDataWebmiscMain.baseUrl,
        paths: {
            "jquery":                 baseUrl + "jquery-3/dist/jquery.min",
            //"es6":                  baseUrl + "requirejs-babel/es6",
            "jsx-loader":             baseUrl + "requirejs-babel-jsx",
            "babel":                  baseUrl + "babel-standalone-6/babel.min",
            "babel-standalone":       baseUrl + "babel-standalone-6/babel.min",
            "bootstrap":              baseUrl + "bootstrap-3/dist/js/bootstrap.min",
            "react":                  baseUrl + "react-15/dist/react-with-addons.min",
            "react-dom":              baseUrl + "react-dom-15/dist/react-dom.min",
            "codemirror":             baseUrl + "codemirror-5/lib/codemirror",
            "codemirror-javascript":  baseUrl + "codemirror-5/mode/javascript/javascript",
            "codemirror-jsx":         baseUrl + "codemirror-5/mode/jsx/jsx",
            "codemirror-clike":       baseUrl + "codemirror-5/mode/clike/clike",
            "codemirror-sql":         baseUrl + "codemirror-5/mode/sql/sql",
            "codemirror-sql-hint":    baseUrl + "codemirror-5/addon/hint/sql-hint",
            "goldenlayout":           baseUrl + "golden-layout-1/dist/goldenlayout.min",
            //"babel-plugin-transform-es2015-modules-amd": "babel-plugin-transform-es2015-modules-amd/lib/index", // http://babeljs.io/docs/plugins/transform-es2015-modules-amd/
        },
        //shim: {
        //    bootstrap: ['jquery'],
        //},
    };
    require.config(cfg);

    var main =
        pDataWebmiscMain.prefix +
        pDataWebmiscMain.modulizedFilename
        ;

    (define([main], function(main, require) {
        // do nothing...
    }));

}());
