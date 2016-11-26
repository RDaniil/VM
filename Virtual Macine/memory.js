Memory = function(){
	this.mem;
	this.codeStrings = [];
}

Memory.prototype.initMemory = function(code){
	this.codeStrings = code.split("\n");
	//Костыль. Если код закончен переносом строки, надо его удалить
	//именно вот атк я это и сделаю, пожалуй
	if(this.codeStrings[this.codeStrings.length] == null)
		this.codeStrings.pop();
	for(a in this.codeStrings){
		console.log(this.codeStrings[a]);
	}
	var code = document.getElementById("codeWindow");
			console.log(code.innerHTML);
}
