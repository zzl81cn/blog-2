var Redux = require('redux');
var React = require('react');

// 传说中的action creator
var addTodoActions = function(text){
	return {
		type: 'add_todo',
		text: text
	};
};

// 传说中的reducers
var todoReducer = function(state, action){
	
	if(typeof state === 'undefined'){
		return [];
	}
	
	switch(action.type){
		case 'add_todo':
			return state.slice(0).concat({
				text: action.text,
				completed: false
			});
			break;
		default:
			return state;
	}
};

// 定义store
// var store = Redux.createStore(todoReducer);
// var unsubscribe = store.subscribe(function(){
// 	console.log(store.getState());
// });


// store.dispatch(addTodoActions('吃早餐'));
// store.dispatch(addTodoActions('上班'));
// store.dispatch(addTodoActions('吃午餐'));

// unsubscribe();

var store = Redux.createStore(todoReducer);
var App = React.createClass({
	getInitialState: function(){
		return {
			items: store.getState()
		};
	},
	componentDidMount: function(){
		var unsubscribe = store.subscribe(this.onChange);
	},
	onChange: function(){
		this.setState({
			items: store.getState()
		});
	},
	handleAdd: function(){
		var value = this.findDOMNode(this.refs.todo).value.trim();
		if(value)
			store.dispatch(addTodoActions(value));
	},
	render: function(){
		return (
			<div>
				<input ref="todo" type="text" placeholder="输入todo项" />
				<button onClick={this.handleAdd}>点击添加</button>
				<ul>
					{this.state.items.map(function(item){
						return <li>{item.text}</li>;
					})}
				</ul>
			</div>			
			);
	}
});

React.render(
	<App />, 
	document.getElementById('container')
	);

