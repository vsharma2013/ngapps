var data = [
  {id: 1, name: "Pete Hunt", number: "This is one comment"},
  {id: 2, name: "Jordan Walke", number: "This is *another* comment"}
];

function renderComment(){
	return <li className='comment'>
		       <a href={'/api/doc/'+ this.props.id}>{this.props.name}</a>
		       <p>{this.props.number}</p>
		   </li>
}

function renderCommentList(){
	var comments = this.props.data.map(function(c){
		return <Comment name = {c.name}  key={c.id} number={c.number} id={c.id}></Comment>;
	});
	
	return <ul className='commentList'>{comments} </ul>;		  
}

function renderForm(){
	return <div className='commentForm'>Hello world, I am a comment form.</div>;
}

function renderCommentBox(){
	return <div className='commentBox'>
				<h2>Comments</h2>
				<CommentList data = {this.state.data}/>
				<CommentForm />
			</div>;
}

function gis_CommentBox(){
	return {data : data};
}

function cdm_CommentBox(){
	$.getJSON('/api/doc', function(res){
		this.setState({data : res.result});
	}.bind(this));
}

var Comment     = React.createClass({ render : renderComment });
var CommentList = React.createClass({ render : renderCommentList});
var CommentForm = React.createClass({ render : renderForm });

var CommentBox  = React.createClass({ 
	render : renderCommentBox, 
	getInitialState : gis_CommentBox, 
	componentDidMount : cdm_CommentBox
});


ReactDOM.render(
	<CommentBox data = {data}/>, 
	document.getElementById('content')
);