(function(ns){
	function MyApp(){
		var validations = new ns.core.utils.validations();
		function run(){
			console.log('MyApp::run()')
			validations.execute();
		}

		this.run = run;
	}

	ns.add("core.app", MyApp);
})(NS);