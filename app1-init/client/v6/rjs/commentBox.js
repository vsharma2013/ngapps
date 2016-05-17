(function(ns){

var data = [
  {id: 1, name: "Pete Hunt", number: "This is one comment"},
  {id: 2, name: "Jordan Walke", number: "This is *another* comment"}
];

var CommentList = ns.core.CommentList;

function renderCommentBox(){
	return <div className='commentBox'>
				<h2>Comments</h2>
				<CommentList data = {this.state.data}/>
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

var CommentBoxClass = {
	render : renderCommentBox, 
	getInitialState : gis_CommentBox, 
	componentDidMount : cdm_CommentBox
};

var CommentBox  = React.createClass(CommentBoxClass);

ns.add('core.CommentBox', CommentBox);

})(NS);