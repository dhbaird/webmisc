(function main(React, ReactDOM, CodeMirror, window) {

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
        return <div style={{position: 'relative', height: '100%'}} ref={self.divReady}></div>
    }
}

class Application extends React.Component {
    constructor()
    {
        super();
        this.ready = this.ready.bind(this);
        this.recomputeSize = EventUtil.coalesce(this.recomputeSize.bind(this));
        this.state = {
            contentHeight: 0,
        };
    }

    componentDidMount()
    {
        jQuery(window).on('resize', this.recomputeSize);
    }

    ready(element)
    {
        this.contentTopElement = element;
        this.recomputeSize();
    }

    recomputeSize()
    {
        var winHeight = jQuery(window).height();
        var contentTop = jQuery(this.contentTopElement).offset().top;
        console.log([winHeight, contentTop]);
        this.setState({
            contentHeight: Math.max(winHeight - contentTop, 0),
        });
    }

    render()
    {
        var self = this;
        return (
          <div>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <h1>Hello, world!</h1>
                </div>
              </div>
            </div>
            <div className="container-fluid" style={{height: self.state.contentHeight + 'px'}} ref={self.ready}>
              <div style={{height: '100%'}} className="row">
                <div style={{height: '100%'}} className="col-md-6">
                  <h1>Hello, world!</h1>
                </div>
                <div style={{height: '100%'}} className="col-md-6">
                  <MyCodeMirror/>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

ReactDOM.render(<Application/>, document.getElementById('main'));

}(React, ReactDOM, CodeMirror, window));
