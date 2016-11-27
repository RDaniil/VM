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
	var regEx4 = /(^((\w*: \w{3})|(\w{3}))) (\w+);\w*/;
	var regEx5 = /(;(\w*.)*)$/;
	var regEx6 = /(^((\w*: EXT)|(EXT)));\w*/;
		
	console.log("Syntax check: " + string);

	console.log("regEx check 1: " + regEx1.test(string));
	console.log("regEx check 2: " + regEx2.test(string));
	console.log("regEx check 3: " + regEx3.test(string));
	console.log("regEx check 4: " + regEx4.test(string));
	console.log("regEx check 5: " + regEx5.test(string));
	console.log("regEx check 6: " + regEx6.test(string));
	
	if(!regEx5.test(string))//Если стрка не заканчивается ';'/';*comment*'
		return false;

	return ((regEx1.test(string) || regEx2.test(string) || regEx3.test(string)  || regEx4.test(string) || regEx6.test(string)));
}

Machine.prototype.checkCode = function()
{
	for(a in this.m.codeStrings){
		if(!this.isSyntaxCorrect(this.m.codeStrings[a])){
			alert("Syntax is incorrect! str: " + a);
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
			flag.innerHTML = key + " : " +this.p.flags[key];
	}
}

Machine.prototype.refreshIP = function()
{
	var IP = document.getElementById("IP");
	IP.innerHTML = "IP : " + this.p.IP;
}

Machine.prototype.refreshInf = function()
{
	this.refreshRegs();
	this.refreshFlags();
	this.refreshIP();
}

Machine.prototype.step = function()
{
	var memStr = [];
	this.p.getLabels(this.m.codeStrings);
	memStr = this.p.readMemory(this.m.codeStrings);
	this.p.step(memStr[0]);
    this.refreshInf();
}

//По-моему строка, на котрой стоит метка не выполняется при переходе
Machine.prototype.start = function()
{
	var memStr = [];
	this.p.getLabels(this.m.codeStrings);
	//Пока не было ошибки в процессоре и не дошли до конца кода
	while((this.p.flags["ERF"] == false) && (this.p.IP < this.m.codeStrings.length)){ 
		VM.step();
	}
}

var VM = new Machine();

function sumbitCode()
{
	var codeWin = document.getElementById("codeWindow");
	VM.init(codeWin.value);
	if(VM.makeCheckings() != 0)
		return;
}

function machineStep()
{
	// //если не было ошибки в процессоре и не дошли до конца кода
	if((VM.p.flags["ERF"] == false) && (VM.p.IP < VM.m.codeStrings.length)){ 
		VM.step();
	}
}

function machineStart()
{
	// //если не было ошибки в процессоре и не дошли до конца кода
	while((VM.p.flags["ERF"] == false) && (VM.p.IP < VM.m.codeStrings.length)){ 
		VM.step();
	}
}


