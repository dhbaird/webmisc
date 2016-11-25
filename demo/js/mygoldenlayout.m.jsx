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

class BindUtil { }
BindUtil.rebind = function(obj, memberFunctionName) {
    obj[memberFunctionName] = obj[memberFunctionName].bind(obj);
}

class EventUtil { }
EventUtil.coalesce = function(func) {
    var ready = true;
    var savedArg = null;
    var newFunc = function() {
        ready = true;
        func(savedArg);
    }
    return function(arg) { // forwards at most one argument
        savedArg = arg;
        if (ready) {
            ready = false;
            window.requestAnimationFrame(newFunc);
        }
    }
}

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
    constructor(window, appData, contentContainerElement, goldenLayout) {
        this.d_appData = appData;
        this.d_contentContainerElement = contentContainerElement;
        this.d_goldenLayout = goldenLayout;
        this.d_jWindow = jQuery(window);
        this.d_jContentContainerElement = jQuery(contentContainerElement);
        console.log('HERE');

        this.recomputeSize = EventUtil.coalesce(this.recomputeSize.bind(this));
    }

    init() {
        this.d_jWindow.on('resize', this.recomputeSize);
        this.recomputeSize();
    }

    recomputeSize() {
        var winHeight = this.d_jWindow.height();
        var contentTop = this.d_jContentContainerElement.offset().top;
        var newSize = Math.max(winHeight - contentTop, 0);
        this.d_contentContainerElement.style.height =  newSize + 'px';
        //this.d_jContentContainerElement.height(newSize);
        this.d_goldenLayout.updateSize();
        console.log('adjusted to', newSize);
    }
};

ApplicationWindowManager.create = function() {
        var appData = new MyApplicationState();
        var layoutConfig = {
            content: [ // https://www.golden-layout.com/docs/ItemConfig.html
                {
                    type: 'row',
                    content: [
                        {
                            type: 'react-component',
                            component: 'MyHelloWindow',
                            props: { appData: appData }
                        },
                        {
                            type: 'react-component',
                            component: 'MyCodeMirrorWindow',
                            props: { appData: appData }
                        },
                    ],
                },
            ],
        };
        var contentContainerElement = document.getElementById('main');
        var goldenLayout = new GoldenLayout(layoutConfig, contentContainerElement);
        goldenLayout.registerComponent('MyHelloWindow', MyHelloWindow);
        goldenLayout.registerComponent('MyCodeMirrorWindow', MyCodeMirrorWindow);
        goldenLayout.init();
        var result = new ApplicationWindowManager(
            window,
            appData,
            contentContainerElement,
            goldenLayout
        );
        result.init();
        return result;
}

function main() {
    var windowManager = ApplicationWindowManager.create();
}

main();
