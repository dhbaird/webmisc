// TODO implement a metadata format which declares these dependencies, enforce with https://github.com/requirejs/requirejs/wiki/Internal-API:-onResourceLoad

//import foo from 'jsx-loader!foo' // to load jsx file (foo.jsx)

import jQuery from 'jquery';
import _bootstrap from 'bootstrap'; // make sure bootstrap is loaded
import React from 'react';
import ReactDOM from 'react-dom';
import GoldenLayout from 'goldenlayout';
import CodeMirror from 'codemirror';
// TODO raven and sentry.io

window.React = React; // XXX hack for goldenlayout
window.ReactDOM = ReactDOM; // XXX hack for goldenlayout

class MyApplicationState {
    constructor() {
    }
};

class MyCodeMirror extends React.Component {
    constructor()
    {
        super();
        this.codeMirror = null;
        this.divReady = this.divReady.bind(this);
    }

    divReady(elem)
    {
        console.log('READY', elem);
        var codeMirrorOptions = {
            lineNumbers: true,
        };
        this.codeMirror = new CodeMirror(function(codeMirrorElem) {
            elem.appendChild(codeMirrorElem);
        }, codeMirrorOptions);
    }
    render()
    {
        var self = this;
        return (<div style={{position: 'relative', height: '100%'}} ref={self.divReady}></div>);
    }
}

class MyCodeMirrorWindow extends React.Component {
    constructor()
    {
        super();
    }
    render()
    {
        return <MyCodeMirror/>;
    }
}

class MyHelloWindow extends React.Component {
    constructor()
    {
        super();
    }
    render()
    {
        return <h1>Hello World</h1>;
    }
}

class ApplicationWindowManager {
    constructor() {
        var appData = new MyApplicationState();
        var layoutConfig = {
            content: [ // https://www.golden-layout.com/docs/ItemConfig.html
                {
                    type: 'row',
                    content: [
                        {
                            type: 'react-component',
                            component: 'MyHelloWindow',
                            // XXX appData should be injected into the constructor...
                            props: { appData: appData }
                        },
                        {
                            type: 'react-component',
                            component: 'MyCodeMirrorWindow',
                            // XXX appData should be injected into the constructor...
                            props: { appData: appData }
                        },
                    ],
                },
            ],
        };
        this.d_goldenLayout = new GoldenLayout(layoutConfig, document.getElementById('main'));
        this.d_goldenLayout.registerComponent('MyHelloWindow', MyHelloWindow);
        this.d_goldenLayout.registerComponent('MyCodeMirrorWindow', MyCodeMirrorWindow);
        this.d_goldenLayout.init();
        console.log('xxx', this.d_goldenLayout);
    }
};

function main() {
    var windowManager = new ApplicationWindowManager();
}

main();
