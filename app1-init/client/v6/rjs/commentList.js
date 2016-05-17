(function(ns){

var Comment = ns.core.Comment;

function render(){
	var comments = this.props.data.map(function(c){
		return <Comment name = {c.name}  key={c.id} number={c.number} id={c.id}></Comment>;
	});
	
	return <ul className='commentList'>{comments} </ul>;		  
}

var CommentList = React.createClass({ render : render});

ns.add('core.CommentList', CommentList);

})(NS);