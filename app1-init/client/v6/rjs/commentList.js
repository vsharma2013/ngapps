(function(ns){

var Comment = ns.core.Comment;

function renderCommentList(){
	var comments = this.props.data.map(function(c){
		return <Comment name = {c.name}  key={c.id} number={c.number} id={c.id}></Comment>;
	});
	
	return <ul className='commentList'>{comments} </ul>;		  
}

var CommentList = React.createClass({ render : renderCommentList});

ns.add('core.CommentList', CommentList);

})(NS);