var commentList_tpl = <div className='commentList'>Hello world, I am a comment list.</div>;
var commentForm_tpl = <div className='commentForm'>Hello world, I am a comment form.</div>
				
			
var CommentListClass = { render : function(){ return commentList_tpl;} };
var CommentFormClass = { render : function(){ return commentForm_tpl; } };

var CommentForm = React.createClass(CommentFormClass);
var CommentList = React.createClass(CommentListClass);

var commnetBox_tpl = <div className='commentBox'>
						<h2>Comments</h2>
						<CommentList />
						<CommentForm />
					 </div>;

var CommentBoxClass = { render : function(){ return commnetBox_tpl ; }};
var CommentBox = React.createClass(CommentBoxClass);

ReactDOM.render(
	<CommentBox/>, 
	document.getElementById('content')
);