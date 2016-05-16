var NS = {};
NS.add = function(key, value){
	var parts = key.split(".");
    var root = NS;
    
    for(var i=0;i<parts.length;i++) {
      if(typeof root[parts[i]] != "object") {
        root[parts[i]] = (i == parts.length - 1 && value) ? value : {};
      }
      root = root[parts[i]];
    }
    return root;
}