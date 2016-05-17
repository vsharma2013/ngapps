(function(ns){

var data = [
  {id: 1, name: "Pete Hunt", number: "This is one comment"},
  {id: 2, name: "Jordan Walke", number: "This is *another* comment"}
];

var CommentList = ns.core.CommentList;

function render(){
	return <div className='commentBox'>
				<h2>Comments</h2>
				<CommentList data = {this.state.data}/>
			</div>;
}

function getInitialState(){
	return {data : data};
}

function componentDidMount(){
	$.getJSON('/api/doc', function(res){
		this.setState({data : res.result});
	}.bind(this));
}

var CommentBoxClass = {
	render : render, 
	getInitialState : getInitialState, 
	componentDidMount : componentDidMount
};

var CommentBox  = React.createClass(CommentBoxClass);

ns.add('core.CommentBox', CommentBox);

})(NS);