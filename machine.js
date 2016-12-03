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
	this.refreshRegs();
}

//Don't look here pls
//Returns true if syntax is fine
Machine.prototype.isSyntaxCorrect = function()
{
	for(string in this.m.codeStrings){

		//Всевозможные проверки на лишние пробелы/табуляции
		var formatString = this.m.codeStrings[string].replace(/ *, */g,",");
		formatString = formatString.replace(/ +/g," ");
		formatString = formatString.replace(/^ +/g,"");
		formatString = formatString.replace(/ +;/g,";");

		this.m.codeStrings[string] = formatString;

		var regEx1 = /(^((\w*: \w{3})|(\w{3}))) r\d{1,2},r\d{1,2};\w*/;
		var regEx2 = /(^((\w*: \w{3})|(\w{3}))) (r\d{1,2});\w*/;
		var regEx3 = /(^((\w*: \w{3})|(\w{3}))) (r\d{1,2},[-]*\d+);\w*/;
		var regEx4 = /(^((\w*: \w{3})|(\w{3}))) (\D+);\w*/;
		var regEx5 = /(;(\w*.)*)$/;
		var regEx6 = /(^((\w*: EXT)|(EXT)));\w*/;
			
		console.log("Syntax check: " + this.m.codeStrings[string]);

		console.log("regEx check 1: " + regEx1.test(formatString));
		console.log("regEx check 2: " + regEx2.test(formatString));
		console.log("regEx check 3: " + regEx3.test(formatString));
		console.log("regEx check 4: " + regEx4.test(formatString));
		console.log("regEx check 5: " + regEx5.test(formatString));
		console.log("regEx check 6: " + regEx6.test(formatString));
		
		if(!regEx5.test(formatString)){//Если стрка не заканчивается ';'/';*comment*'
			alert("There is must be ';' at the end of the line "+ string + "!");
			this.p.flags["ERF"] = true;
			return false;
		}

		if(!((regEx1.test(formatString) || regEx2.test(formatString) || regEx3.test(formatString)  || regEx4.test(formatString) || regEx6.test(formatString)))){
			this.p.flags["ERF"] = true;
			return false;
		}
	}
}

Machine.prototype.checkCode = function()
{
	return this.isSyntaxCorrect();
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
			r.value = this.p.regsVal[reg];
	}
}

Machine.prototype.getRegsVal = function()
{	
	for (var i = 0; i < this.numOfRegisters; i++) {
		var reg = "r" + i; //Создаются регистры видa r1, r2..., ri
		var r = document.getElementById(reg);
		//Если в регистр пытаются пложить что-то кроме числа - ошибка
		if(!isNaN(Number(r.value))){
			this.p.regsVal[reg] = r.value;
		}else{
			alert("Error: Registers can only contain a number!!!");
			this.p.flags["ERF"] = true;
			return;
		}
	}
}

Machine.prototype.refreshFlags = function()
{	
	for (var key in this.p.flags) {
			var flag = document.getElementById(key);
			flag.innerHTML = key + " : " +this.p.flags[key];
	}
}

Machine.prototype.refreshIPInf = function()
{
	var IP = document.getElementById("IP");
	IP.value = this.p.IP;
}

Machine.prototype.refreshIPVal = function()
{
	var IP = document.getElementById("IP");
	if(!isNaN(IP.value)){
		this.p.IP = IP.value;
	}else{
		alert("Error: IP can be only a number!!!");
		this.p.flags["ERF"] = true;
		return;
	}
}

Machine.prototype.refreshInf = function()
{
	this.refreshRegs();
	this.refreshFlags();
	this.refreshIPInf();
}

function pasteGCDAlg()
{
	var codeWin = document.getElementById("codeWindow");
	codeWin.value = VM.m.GCDcode;
}

function pasteFactorialAlg()
{
	var codeWin = document.getElementById("codeWindow");
	codeWin.value = VM.m.FactorialCode;
}

Machine.prototype.step = function()
{
	var memStr = [];
	this.getRegsVal();
	this.refreshIPVal();
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
	VM.refreshInf();
	if(VM.makeCheckings() != 0)
		return;
}

function machineStep()
{
	//если не было ошибки в процессоре и не дошли до конца кода
	if((VM.p.flags["ERF"] == false) && (VM.p.IP < VM.m.codeStrings.length)){ 
		VM.step();
	}
}

function machineStart()
{
	VM.p.resetRegs();
	VM.p.IP = 0;
	VM.refreshInf();
	//если не было ошибки в процессоре и не дошли до конца кода
	while((VM.p.flags["ERF"] == false) && (VM.p.IP < VM.m.codeStrings.length)){ 
		VM.step();
	}
}


