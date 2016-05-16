(function(ns){
	function Validations(){
		this.execute = function(){
			console.log('Validations::execute()');
		}
	}
	ns.add('core.utils.validations', Validations);
})(NS);