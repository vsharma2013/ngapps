(function(ns){

function renderComment(){
	return <div className='comment'>
		       <a href={'/api/doc/'+ this.props.id}>{this.props.name}</a>
		       <p>{this.props.number}</p>
		   </div>
}

var Comment = React.createClass({ render : renderComment });

ns.add('core.Comment', Comment);

})(NS);