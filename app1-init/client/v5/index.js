var data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];

function renderComment(){
	return <div className='comment'>
		       <h4>{this.props.author}</h4>
		       {this.props.children}
		   </div>
}


function renderCommentList(){
	var comments = this.props.data.map(function(c){
		return <Comment author = {c.cuthor}  key={c.id}>{c.text}</Comment>;
	});
	
	return <div className='commentList'>{comments} </div>;		  
}

function renderCommentBox(){
	return <div className='commentBox'>
				<h2>Comments</h2>
				<CommentList data = {this.props.data}/>
				<CommentForm />
			</div>;
}

function renderForm(){
	return <div className='commentForm'>Hello world, I am a comment form.</div>;
}

var Comment     = React.createClass({ render : renderComment });
var CommentList = React.createClass({ render : renderCommentList});
var CommentBox  = React.createClass({ render : renderCommentBox});
var CommentForm = React.createClass({ render : renderForm });


ReactDOM.render(
	<CommentBox data = {data}/>, 
	document.getElementById('content')
);