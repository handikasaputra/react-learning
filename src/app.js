var React = require('react/addons');
var Router = require('director').Router;
var TodoStorage = require('./storage.js');
var Perf = React.addons.Perf;
var CSSTransitionGroup = React.addons.CSSTransitionGroup;

var Todo = React.createClass({
  handleClick: function() {
    TodoStorage.complete(this.props.todo.id);
  },
  render: function() {
    var todo = this.props.todo;
    var doneButton = todo.done ? null : (
      <button className="btn btn-default pull-right" onClick={this.handleClick}>
        <span className="glyphicon glyphicon-ok text-success" aria-hidden="true"/>Done
      </button>
    );
    return (<li className="list-group-item clearfix">{todo.name}{doneButton}</li>);
  }
});

var TodoForm = React.createClass({
  getInitialState: function() {
    return {
      name: '' 
    };
  },
  handleNameChange: function(e) {
    this.setState({
      name: e.target.value
    });
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var name = this.state.name.trim();
    TodoStorage.create(name, function(error) {
      if(!error) {
        this.setState({
          name: ''
        });
      }
    }.bind(this));
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    return this.state.name !== nextState.name;
  },
  render: function() {
    var disabled = this.state.name.trim().length <= 0;
    return (
      <form className="form-horizontal" onSubmit={this.handleSubmit}>
        <input type="text" className="form-control" value={this.state.name} placeholder="What needs to be done?" onChange={this.handleNameChange}></input>
        <input type="submit" value="Add" className="btn btn-primary" disabled={disabled}></input>
      </form>
    );
  }
});

var TodoList = React.createClass({
  render: function() {
    var rows = this.props.todos.filter(function(todo) {
      return !todo.done;
    }).map(function(todo) {
      return (<Todo key={todo.id} todo={todo}></Todo>);
    });
    return (
      <div className="active-todos">
        <h2>Active Todos</h2>
        <CSSTransitionGroup component="ul" transitionEnter={false}　transitionName="example" className="list-group">
          {rows}
        </CSSTransitionGroup>
        <TodoForm/>
      </div>
    );
  }
});

var CompletedTodoList = React.createClass({
  render: function() {
    var rows = this.props.todos.filter(function(todo) {
      return todo.done;
    }).map(function(todo) {
      return (<Todo key={todo.id} todo={todo}></Todo>);
    });
    return (
      <div className="completed-todos">
        <h2>Completed Todos</h2>
        <ul className="list-group">{rows}</ul>
      </div>
    );
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {
      todos: [],
      page: 'active'
    };
  },
  componentDidMount: function() {
    var setTodoState = function(){
      TodoStorage.getAll(function(todos) {
        Perf.start();
        this.setState({
          todos: todos
        }, function(){
          Perf.stop();
          Perf.printWasted();
        });
      }.bind(this));
    }.bind(this);
    TodoStorage.on('change', setTodoState);
    setTodoState();

    var setActivePage = function() {
      this.setState({ page: 'active'});
    }.bind(this);
    var setCompletedPage = function() {
      this.setState({ page: 'completed' });
    }.bind(this);
    var router = Router({
      '/active': setActivePage,
      '/completed': setCompletedPage,
      '*': setActivePage,
    });
    router.init();
  },
  render: function() {
    var page = this.state.page === 'active' ?
      <TodoList todos={this.state.todos}/> :
      <CompletedTodoList todos={this.state.todos}/>;
      
    return (
      <div className="app">
        <nav className="navbar navbar-inverse navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
              <a className="navbar-brand" href="#">My Todo</a>
            </div>
            <div className="collapse navbar-collapse" id="navbar-collapse">
              <ul className="nav navbar-nav">
                <li className={this.state.page === 'active' ? 'active' : ''}><a href="#/active">Active<span className="sr-only">(current)</span></a></li>
                <li className={this.state.page === 'completed' ? 'active':''}><a href="#/completed">Completed</a></li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          {page}
        </div>
      </div>
    );
  }
});

React.render(
  <App></App>,
  document.getElementById('app-container')
);

