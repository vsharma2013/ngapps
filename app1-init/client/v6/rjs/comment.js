(function(ns){

function render(){
	return <div className='comment'>
		       <a href={'/api/doc/'+ this.props.id}>{this.props.name}</a>
		       <p>{this.props.number}</p>
		   </div>
}

var Comment = React.createClass({ render : render });

ns.add('core.Comment', Comment);

})(NS);