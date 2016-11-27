Proc = function(){
	this.flags = [];
	this.regsVal = [];
	this.regsList = [];
	this.IP = 0;
	this.labels = [];
	this.instrList = [];
}

var procINSTR = function(labels){
	return function(flags){
		return function(regs){
			return function(instr){
				return function(operation){
					return function(operators){
						return instr(labels, flags, regs, operation, operators);
					}
				}
			}
		}
	}
}

var procBinaryInstr = function(labels, flags, regs, operation, arrOP){
	if(arrOP.length != 2){
		flags["ERF"] = true;
		alert("Error: binary operation takes 2 arguments!");
		return;
	}
	var op1 = arrOP[0];
	var op2 = arrOP[1];
	var isReg1Exist = false;
	var isReg2Exist = false;
	for(reg in regs){
		if(reg == op1){
			isReg1Exist = true;
		}
		if(reg == op2){
			isReg2Exist = true;
		}	
	}

	if(!isReg1Exist){
		alert(op1 + " Must be a register!");
		flags["ERF"] = true;
		return;
	}
	if(isReg2Exist){
		var operators = [regs[op1], regs[op2]];
		regs[op1] = operation(operators);
		return;
	}
	if(Number(op2) != NaN){
		var operators = [regs[op1], op2];
		regs[op1] = operation(operators);
		return;
	}
	alert("Unknown error!! binary instr");
	flags["ERF"] = true;
}

var procUnaryInstr = function(labels, flags, regs, operation, arrOP){
	if(arrOP.length != 1){
		flags["ERF"] = true;
		alert("Error: unary operation takes 1 arguments!");
		return;
	}
	var op1 = arrOP[0];
	var isReg1Exist = false;
	for(reg in regs){
		if(reg == op1){
			isReg1Exist = true;
		}	
	}

	if(!isReg1Exist){
		alert(op1 + " Must be a register!");
		flags["ERF"] = true;
		return;
	}
	if(isReg1Exist){
		var operators = [regs[op1]];
		regs[op1] = operation(operators);
		return;
	}
	alert("Unknown error!! unary instr");
	flags["ERF"] = true;
}

var procCompareInstr = function(labels, flags, regs, operation, arrOP){
	if(arrOP.length != 2){
		flags["ERF"] = true;
		alert("Error: Compare operation takes 2 arguments!");
		return;
	}
	var op1 = arrOP[0];
	var op2 = arrOP[1];
	var isReg1Exist = false;
	var isReg2Exist = false;
	for(reg in regs){
		if(reg == op1){
			isReg1Exist = true;
		}
		if(reg == op2){
			isReg2Exist = true;
		}	
	}

	if(!isReg1Exist){
		alert(op1 + " Must be a register!");
		flags["ERF"] = true;
		return;
	}
	if(isReg2Exist){
		var operators = [regs[op1], regs[op2]];
		var cmpResult = operation(operators);
	}else{
		if(Number(op2) != NaN){
			var operators = [regs[op1], op2];
			var cmpResult = operation(operators);
		}
	}
	flags["CMPEF"] = cmpResult[0];
	flags["CMPUF"] = cmpResult[1];
	flags["CMPGF"] = cmpResult[2];
	flags["CMPLF"] = cmpResult[3];
	return;
}

var procJumpInstr = function(labels, flags, regs, operation, arrOP){
	if(arrOP.length != 1){
		flags["ERF"] = true;
		alert("Error: Jumps operations takes 1 arguments!");
		return;
	}
	
	var label = arrOP[0];
	console.log("Label in Jump is: " + label);

	var isLabelExist = false;
	for(l in labels){
		if(l == label){
			isLabelExist = true;
		}
	}

	if(!isLabelExist){
		alert(label + " This label is not exists");
		flags["ERF"] = true;
		return -1;
	}

	//Если условия для прыжка выполнены, то возвращается номер строки метки
	if(operation(flags)){
		console.log("Label " + label + " EXIST !! Label number is " + labels[label]);
		return labels[label];
	}else return -1;
}

Proc.prototype.initInstructionList = function()
{
	this.instrList.push("MOV");//MOVE
	this.instrList.push("ADD");//ADD
	this.instrList.push("SUB");//SUBSTRACT
	this.instrList.push("MUL");//MULTIPLY
	this.instrList.push("DIV");//DIVIDE
	this.instrList.push("RDV");//REST of DIVIIDING

	this.instrList.push("DEC");//DECREMENT
	this.instrList.push("INC");//INCREMENT
	this.instrList.push("NEG");//to NEGATIVE
	this.instrList.push("POS");//to POSITIVE

	this.instrList.push("CMP");//COMPARE 
	this.instrList.push("JMP");//JUMP to
	this.instrList.push("JPU");//JUMP if UNEQUAL
	this.instrList.push("JPE");//JUMP if EQUAL
	this.instrList.push("JPL");//JUMP if LESSER
	this.instrList.push("JPG");//JUMP if GREATER

	this.instrList.push("EXT");//EXIT

}

Proc.prototype.initRegsisters = function(nRegisters)
{
	for (var i = 0; i < nRegisters; i++) {
		var reg = "r" + i; //Создаются регистры видa r1, r2..., ri
		this.regsList.push(reg);
		this.regsVal[reg] = 0;
	}
}

Proc.prototype.initFlags = function()
{
	//Compare Unequal Flag - true - сравнение показало, что операнды не равны
	this.flags["CMPUF"] = false;
	//Compare Equal Flag - true - сравнение показало, что операнды равны 
	this.flags["CMPEF"] = false;
	//Compare Lesser Flag - true - сравнение показало, что оп1 меньше чем оп2 
	this.flags["CMPLF"] = false;
	//Compare Greater Flag - true - сравнение показало, что оп1 больше чем оп2 
	this.flags["CMPGF"] = false;
	//Error Flag - true если была совершена ошибка в синтаксисе
	this.flags["ERF"] = false; 
}

Proc.prototype.initInstructions = function(nRegisters)
{
	//null потому что метки не нужны в этих операциях
	var binInstrCurry = procINSTR(null)(this.flags)(this.regsVal)(procBinaryInstr);
	Proc.prototype.procADD = binInstrCurry(ADD);
	Proc.prototype.procSUB = binInstrCurry(SUB);
	Proc.prototype.procMUL = binInstrCurry(MUL);
	Proc.prototype.procDIV = binInstrCurry(DIV);
	Proc.prototype.procRDV = binInstrCurry(RDV);

	//null потому что метки не нужны в этих операциях
	var unaryInstrCurry = procINSTR(null)(this.flags)(this.regsVal)(procUnaryInstr);
	Proc.prototype.procINC = unaryInstrCurry(INC);
	Proc.prototype.procDEC = unaryInstrCurry(DEC);
	Proc.prototype.procPOS = unaryInstrCurry(POS);
	Proc.prototype.procNEG = unaryInstrCurry(NEG);

	var cmpInstrCurry = procINSTR(null)(this.flags)(this.regsVal)(procCompareInstr);
	Proc.prototype.procCMP = cmpInstrCurry(CMP);

	//null потому что здесь не нужны регистры
	var jumpInstrCurry = procINSTR(this.labels)(this.flags)(null)(procJumpInstr);
	Proc.prototype.procJMP = jumpInstrCurry(JMP);
	Proc.prototype.procJPU = jumpInstrCurry(JPU);
	Proc.prototype.procJPE = jumpInstrCurry(JPE);
	Proc.prototype.procJPL = jumpInstrCurry(JPL);
	Proc.prototype.procJPG = jumpInstrCurry(JPG);

}

Proc.prototype.initProc = function(nRegisters)
{
	this.initRegsisters(nRegisters);
	this.initFlags();
	this.initInstructionList();
	this.initInstructions();
}

Proc.prototype.getLabels = function(codeStrings)
{	
	for (var i = 0; i < codeStrings.length; i++) {
		var code = codeStrings[i].split(":");
		if(code.length > 1){
			this.labels[code[0]] = i;
			console.log("Getting Label: " + code[0] + ", label number: " + i);
		}
	}
}

/* Формат строки: label:_INSTR_op1,op2_;comment
*строка сплитится по ';' часть с комментарием откидывается
*/
Proc.prototype.readMemory = function(memory)
{
	var memStr = memory[this.IP];
	var formatMemStr = [];
	formatMemStr = memStr.split(";"); //Сплит по ; разделит комментарий от кода
	formatMemStr.pop();//Выкидываем комментарий
	console.log("Processor read memory: " + formatMemStr[0]);
	return formatMemStr;
}

/*Проверяется существование инструкции, наличие регистров
*Выполнение инструкции
*/
Proc.prototype.applyInstr = function(instr, OpStr)
{
	//Маленький костыль, но сплайс возвращает массив, поэтоу так
	var instruction = instr[0];

	if(!this.instrList.some( function(item){ return item == instruction; } )){ //Определена ли передаваемая инструкция
		alert("Instruction is not defined! "+instruction);
		this.flags["ERF"] = true;
		return;
	}

	//Длина массива операндов мб равна 0, в случае операторов без аргументов напр. EXT
	if(OpStr.length != 0){
		var arrOP = OpStr[0].split(',');//Операторы разделены запятой
		console.log("IP: " + this.IP + " Instr: " + instruction+ " operands: " + arrOP);
	}
	switch(instruction){
		case "ADD":
			this.procADD(arrOP);
			this.IP++;
			break
		case "SUB":
			this.procSUB(arrOP);
			this.IP++;
			break
		case "MOV":
			this.procMOV(arrOP);
			this.IP++;
			break
		case "DIV":
			this.procDIV(arrOP);
			this.IP++;
			break
		case "MUL":
			this.procMUL(arrOP);
			this.IP++;
			break
		case "RDV":
			this.procRDV(arrOP);
			this.IP++;
			break
		case "INC":
			this.procINC(arrOP);
			this.IP++;
			break
		case "DEC":
			this.procDEC(arrOP);
			this.IP++;
			break	
		case "POS":
			this.procPOS(arrOP);
			this.IP++;
			break
		case "NEG":
			this.procNEG(arrOP);
			this.IP++;
			break
		case "CMP":
			this.procCMP(arrOP);
			this.IP++;
			break
		case "JMP":
			var res = this.procJMP(arrOP);
			(res == -1) ? this.IP++ : (this.IP = res);
			break
		case "JPU":
			var res = this.procJPU(arrOP);
			(res == -1) ? this.IP++ : (this.IP = res);
			break	
		case "JPE":
			var res = this.procJPE(arrOP);
			(res == -1) ? this.IP++ : (this.IP = res);
			break
		case "JPL":
			var res = this.procJPL(arrOP);
			(res == -1) ? this.IP++ : (this.IP = res);
			break
		case "JPG":
			var res = this.procJPG(arrOP);
			(res == -1) ? this.IP++ : (this.IP = res);
			break
		//Костыль, для выхода меняем флаг ошибки на "true"
		case "EXT":
			console.log("IN EXIT");
			this.flags["ERF"] =true;
			break
		default:
			alert("There is no instr: "+instruction);
			this.flags["ERF"]= true;
			break
	}
}

Proc.prototype.executeInstr = function(memStr)
{
	var arrOfInstr = memStr.split(" ");
	var isInstrDefined = this.instrList.some( function(item){ return item == arrOfInstr[0]; } )
	if(!isInstrDefined){//Если первая инструкция не определенная команда, то это должна быть метка
		console.log("Deleted : " + arrOfInstr[0]);
		arrOfInstr.splice(0,1);//Первый эл.(метка в этом случае) выбрасывается
	}
	/*На этом этапе массив инструкий должен состоять только из
	*инструкции и операнда(ов). В функцию выталкиывается
	*инструкция, а оставшийся массив и есть операнды
	*/
	this.applyInstr(arrOfInstr.splice(0,1), arrOfInstr);
}

Proc.prototype.step = function(memStr)
{
	//console.log("STEP " + memStr);
	this.executeInstr(memStr);
}

