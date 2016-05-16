
var CommentBoxClass = {
	render : function(){
		return (
			<div className='commentBox'>
				Hello world, I am a comment box.
			</div>
		);
	}
};

var CommentBox = React.createClass(CommentBoxClass);

ReactDOM.render(<CommentBox/>, document.getElementById('content'));