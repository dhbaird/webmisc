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

    // Process:
    // 1. Use bower or npm to update package.json or bower.json, and fetch the source.
    // 2. Rename the source to include its package major version number.
    // 3. Symlink it into lib/.
    // 4. Identify the source to load.
    // 5. Code the source from #4 into cfg, below.
    // - Future work: Automate these steps (with prompt to get extra information for step #4).
    // - Future work: Visibility of these sources must be metadata-controlled. See: https://github.com/requirejs/requirejs/wiki/Internal-API:-onResourceLoad
    var cfg = {
        baseUrl: pDataWebmiscMain.baseUrl,
        urlArgs: "bust=" + (new Date).getTime(), // do cache busting, for developmeny purposes only
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
            "clipboard":              baseUrl + "clipboard-1/dist/clipboard",
            "events":                 baseUrl + "eventEmitter-5/EventEmitter",
            "lz-string":              baseUrl + "lz-string-1/",
            "microplugin":            baseUrl + "microplugin-0/src/microplugin",
            "raven-js":               baseUrl + "raven-js-3/dist/raven",
            "selectize":              baseUrl + "selectize-0/dist/js/selectize",
            "sifter":                 baseUrl + "sifter-0/sifter",
            "underscore":             baseUrl + "underscore-1/underscore",
            "rison":                  baseUrl + "rison-0/js/rison", // vs jsurl vs json
            // TODO core.js-2
        },
        shim: {
            bootstrap: ['jquery'], // ensure jquery is loaded before bootstrap
            goldenlayout: ['react-dom'], // only needed if using type:'react-component' in goldenlayout
        },
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
