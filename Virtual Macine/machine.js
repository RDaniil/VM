//var code = "lable: MOV r1,10;\nMOV r3,2;\nMUL r1,r3;\n";

Machine = function(){
	this.p = new Proc();
	this.m = new Memory();
	this.numOfRegisters;
}

Machine.prototype.init = function(code)
{
	this.numOfRegisters = 6; //При изменении числа регистров не забудь в хтмл заглянуть
	this.p.initProc(this.numOfRegisters);
	this.m.initMemory(code);
}

//Don't look here pls
//Returns true if syntax is fine
Machine.prototype.isSyntaxCorrect = function(string)
{
	var regEx1 = /(^((\w*: \w{3})|(\w{3}))) r\d{1,2},r\d{1,2};\w*/;
	var regEx2 = /(^((\w*: \w{3})|(\w{3}))) (r\d{1,2});\w*/;
	var regEx3 = /(^((\w*: \w{3})|(\w{3}))) (r\d{1,2},\d+);\w*/;
	var regEx5 = /(;(\w*.)*)$/;
	
	console.log(string);

	console.log(regEx1.test(string));
	console.log(regEx2.test(string));
	console.log(regEx3.test(string));
	console.log(regEx5.test(string));
	
	if(!regEx5.test(string))//Если стрка не заканчивается ';'/';*comment*'
		return false;

	return ((regEx1.test(string) || regEx2.test(string) || regEx3.test(string)));
}

Machine.prototype.checkCode = function()
{
	for(a in this.m.codeStrings){
		if(!this.isSyntaxCorrect(this.m.codeStrings[a])){
			alert("Syntax is incorrect! str: "+a);
			return false;
		}	
	}
	return true;
}

Machine.prototype.makeCheckings = function()
{
	if(!this.checkCode()){ //Проверка кода на правильность
		return 1;
	}
	return 0;
}

Machine.prototype.refreshRegs = function()
{	
	for (var i = 0; i < this.numOfRegisters; i++) {
		var reg = "r" + i; //Создаются регистры видa r1, r2..., ri
			var r = document.getElementById(reg);
			r.innerHTML = reg + " : " +this.p.regsVal[reg];
	}
}

Machine.prototype.refreshFlags = function()
{	
	for (var key in this.p.flags) {
			var flag = document.getElementById(key);
			console.log("Flags: "+key);
			flag.innerHTML = key + " : " +this.p.flags[key];
	}
}

Machine.prototype.refreshInf = function()
{
	this.refreshRegs();
	this.refreshFlags();
}


Machine.prototype.start = function()
{
	var memStr = [];

	//Пока не было ошибки в процессоре и не дошли до конца кода
	while((this.p.flags["ERF"] == false) && (this.p.IP < this.m.codeStrings.length)){ 
		memStr = this.p.readMemory(this.m.codeStrings);
		this.p.step(memStr[0]);
		this.refreshInf();
	}
	return;
}

function sumbitCode()
{
	var codeWin = document.getElementById("codeWindow");
	var VM = new Machine();
	VM.init(codeWin.value);
	if(VM.makeCheckings() == 0)
		VM.start();
}



