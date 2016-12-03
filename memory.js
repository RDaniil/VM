Memory = function(){
	this.codeStrings = [];
	this.GCDcode = "mov r1, 13; \nmov r2, 2; \nmov r4, r2;Make copy of r2, for using it later \n\ncmp r1, r2; \n\nmainLoop: rdv r1, r2;\ncmp r1, 0;\njpe result;\njpu swap;\n\nswap: mov r5, r1;\nmov r1, r2;\nmov r2, r5;\njmp mainLoop;\n\nresult: mov r5, r2;GCD placed in r5";
	this.FactorialCode = "mov r0, 5;Output: r0!\nmov r1, 1;Iterator\nmov r5, 1;Here will be result\n\nmainLoop: cmp r1, r0;\njpg stop;when iterator>r0 - stop\nmul r5, r1;\ninc r1;\njmp mainLoop;\n\nstop: EXT;";}

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
