Memory = function(){
	this.mem;
	this.codeStrings = [];
}

Memory.prototype.initMemory = function(code){
	var codeStr = code.split("\n");
	//Удаление пустых строк(что бы можно было делать много переносов)
	this.codeStrings = codeStr.filter( function(item){ return item != ''; } );
	
	for(a in this.codeStrings){
		console.log("Memory str " + a + " is " + "'" + this.codeStrings[a] + "'");
	}
	var code = document.getElementById("codeWindow");
			console.log(code.innerHTML);
}
