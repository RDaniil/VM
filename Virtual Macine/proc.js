Proc = function(){
	this.flags = [];
	this.regsVal = [];
	this.regsList = [];
	this.IP = 0;
	this.lables = [];
	this.instrList = [];
}

/*Принимает масив операндов, их должно быть два:
*(*регистр,регистр*)/(*регистр,число*)
*(Первый ОБЯЗАТЕЛЬНО регистр),
* складывает значение второго операнда с значением первого регистра.
*/
Proc.prototype.procADD = function(arrOP)
{
	if(arrOP.length != 2){
		this.flags["ERF"] = true;
		alert("Error: 'ADD' takes 2 arguments!");
		return;
	}
	var op1 = arrOP[0];
	var op2 = arrOP[1];

	var firstIsReg  = this.regsList.some( function(item){ return item == op1; } ) //Является ли первый операнд регистром
	var secondIsReg = this.regsList.some( function(item){ return item == op2; } ) //Является ли второй операнд регистром

	if(firstIsReg){
		if(secondIsReg){ //Если оба оператора - регистры, берем из второго, прибавляем к первому
			this.regsVal[op1] += this.regsVal[op2];
			return 0;
		}
		if(Number(op2) != NaN){ //Если второй оператор число - прибавляем его к знач. регистра
			this.regsVal[op1] += Number(op2);
			return 0;
		}
	}

	alert("Unknown Error!!! Command - 'ADD' IP = "+ this.IP);
}

/* Работает аналогично ADD, только вычитает
*/
Proc.prototype.procSUB = function(arrOP)
{
	if(arrOP.length != 2){
		this.flags["ERF"] = true;
		alert("Error: 'SUB' takes 2 arguments!");
		return;
	}
	var op1 = arrOP[0];
	var op2 = arrOP[1];

	var firstIsReg  = this.regsList.some( function(item){ return item == op1; } ) //Является ли первый операнд регистром
	var secondIsReg = this.regsList.some( function(item){ return item == op2; } ) //Является ли второй операнд регистром

	if(firstIsReg){
		if(secondIsReg){ //Если оба оператора - регистры, берем из второго, прибавляем к первому
			this.regsVal[op1] -= this.regsVal[op2];
			return 0;
		}
		if(Number(op2) != NaN){ //Если второй оператор число - прибавляем его к знач. регистра
			this.regsVal[op1] -= Number(op2);
			return 0;
		}
	}

	alert("Unknown Error!!! Command - 'SUB' IP = "+ this.IP);
}

/*Принимает масив операндов, их должно быть два:
*(*регистр,регистр*)/(*регистр,число*)
*(Первый ОБЯЗАТЕЛЬНО регистр),
*Умножает первое на второе
*/
Proc.prototype.procMUL = function(arrOP)
{
	if(arrOP.length != 2){
		this.flags["ERF"] = true;
		alert("Error: 'MUL' takes 2 arguments!");
		return;
	}
	var op1 = arrOP[0];
	var op2 = arrOP[1];

	var firstIsReg  = this.regsList.some( function(item){ return item == op1; } ) //Является ли первый операнд регистром
	var secondIsReg = this.regsList.some( function(item){ return item == op2; } ) //Является ли второй операнд регистром

	if(firstIsReg){
		if(secondIsReg){ //Если оба оператора - регистры, первый умножаем на второй
			this.regsVal[op1] *= this.regsVal[op2];
			return 0;
		}
		if(Number(op2) != NaN){ //Если второй оператор число - умножаем знач. регистра на него
			this.regsVal[op1] *= Number(op2);
			return 0;
		}
	}

	alert("Unknown Error!!! Command - 'MUL' IP = "+ this.IP);
}

/*Принимает масив операндов, их должно быть два:
*(*регистр,регистр*)/(*регистр,число*)
*(Первый ОБЯЗАТЕЛЬНО регистр),
*Делит первое на второе
*/
Proc.prototype.procDIV = function(arrOP)
{
	if(arrOP.length != 2){
		this.flags["ERF"] = true;
		alert("Error: 'DIV' takes 2 arguments!");
		return;
	}
	var op1 = arrOP[0];
	var op2 = arrOP[1];

	var firstIsReg  = this.regsList.some( function(item){ return item == op1; } ) //Является ли первый операнд регистром
	var secondIsReg = this.regsList.some( function(item){ return item == op2; } ) //Является ли второй операнд регистром

	if(firstIsReg){
		if(secondIsReg){ //Если оба оператора - регистры, первый делим на второй
			this.regsVal[op1] /= this.regsVal[op2];
			return 0;
		}
		if(Number(op2) != NaN){ //Если второй оператор число - делим знач. регистра на него
			this.regsVal[op1] /= Number(op2);
			return 0;
		}
	}

	alert("Unknown Error!!! Command - 'DIV' IP = "+ this.IP);
}

/*Принимает регистр, увеличивает значение на 1
*/
Proc.prototype.procINC = function(arrOP)
{
	if(arrOP.length != 1){
		this.flags["ERF"] = true;
		alert("Error: 'INC' takes 1 argument!");
		return;
	}

	var op1 = arrOP[0];
	var firstIsReg  = this.regsList.some( function(item){ return item == op1; } ) //Является ли первый операнд регистром

	if(firstIsReg){
			this.regsVal[op1] += 1;
			return 0;
	}

	alert("Operand is not register!!! Command - 'INC'");
}

/*Принимает регистр, уменьшает значение на 1
*/
Proc.prototype.procDEC = function(arrOP)
{
	if(arrOP.length != 1){
		this.flags["ERF"] = true;
		alert("Error: 'DEC' takes 1 argument!");
		return;
	}

	var op1 = arrOP[0];
	var firstIsReg  = this.regsList.some( function(item){ return item == op1; } ) //Является ли первый операнд регистром

	if(firstIsReg){
			this.regsVal[op1] -= 1;
			return 0;
	}

	alert("Operand is not register!!! Command - 'DEC'");
}

/*Принимает масив операндов, кладет в 
*первый регистр значние второго операнда
*/
Proc.prototype.procMOV = function(arrOP)
{
	if(arrOP.length != 2){
		this.flags["ERF"] = true;
		alert("Error: 'MOV' takes 2 argument!");
		return;
	}

	var op1 = arrOP[0];
	var op2 = arrOP[1];

	var firstIsReg  = this.regsList.some( function(item){ return item == op1; } ) //Является ли первый операнд регистром
	var secondIsReg = this.regsList.some( function(item){ return item == op2; } ) //Является ли второй операнд регистром

	if(firstIsReg){
		if(secondIsReg){ //Если оба оператора - регистры присваиваем знач. 2регистра 1регистру
			this.regsVal[op1] = this.regsVal[op2];
			return 0;
		}
		if(Number(op2) != NaN){ //Если второй оператор число - кладем его в регистр
			this.regsVal[op1] = Number(op2);
			return 0;
		}
	}

	alert("Unknown Error!!! Command - 'MOV' IP = "+ this.IP);
}

//Делает из отрицательного положительное
Proc.prototype.procPOS = function(arrOP)
{
	if(arrOP.length != 1){
		this.flags["ERF"] = true;
		alert("Error: 'POS' takes 1 argument!");
		return;
	}

	var op1 = arrOP[0];
	var firstIsReg  = this.regsList.some( function(item){ return item == op1; } ) //Является ли первый операнд регистром

	//Если значение в регисре меньше нуля, то делаем положителным, иначе ничего неделаем
	if(firstIsReg){
		if(this.regsVal[op1] < 0){
			this.regsVal[op1] = -this.regsVal[op1];
			return 0;
		}
	}

	alert("Unknown Error!!! Command - 'POS' IP = "+ this.IP);
}

//Делает из положительного отрицаельное
Proc.prototype.procNEG = function(arrOP)
{
	if(arrOP.length != 1){
		this.flags["ERF"] = true;
		alert("Error: 'NEG' takes 1 argument!");
		return;
	}

	var op1 = arrOP[0];
	var firstIsReg  = this.regsList.some( function(item){ return item == op1; } ) //Является ли первый операнд регистром

	if(firstIsReg){
		if(this.regsVal[op1] > 0){
			this.regsVal[op1] = (-this.regsVal[op1]);
			return 0;
		}
	}

	alert("Unknown Error!!! Command - 'NEG' IP = "+ this.IP);
}


Proc.prototype.procCOMPARES = function(arrOP)
{
	if(arrOP.length != 2){
		this.flags["ERF"] = true;
		alert("Error: 'CO?' takes 2 arguments!");
		return;
	}
	var op1 = arrOP[0];
	var op2 = arrOP[1];

	var firstIsReg  = this.regsList.some( function(item){ return item == op1; } ) //Является ли первый операнд регистром
	var secondIsReg = this.regsList.some( function(item){ return item == op2; } ) //Является ли второй операнд регистром

	if(firstIsReg){
		if(secondIsReg){ //Если оба оператора - регистры, первый делим на второй
			this.regsVal[op1] /= this.regsVal[op2];
			return 0;
		}
		if(Number(op2) != NaN){ //Если второй оператор число - делим знач. регистра на него
			this.regsVal[op1] /= Number(op2);
			return 0;
		}
	}

	alert("Unknown Error!!! Command - 'DIV' IP = "+ this.IP);
}

Proc.prototype.initInstructions = function()
{
	/*this.instr["ADD"] = this.procADD;
	this.instr["DEC"] = this.procDEC;
	this.instr["INC"] = this.procINC;
	this.instr["SUB"] = this.procSUB;
	this.instr["MOV"] = this.procMOV;*/
	this.instrList.push("MOV");//MOVE

	this.instrList.push("ADD");//ADD
	this.instrList.push("DEC");//DECREMENT
	this.instrList.push("INC");//INCREMENT
	this.instrList.push("SUB");//SUBSTRACT
	this.instrList.push("MUL");//MULTIPLY
	this.instrList.push("DIV");//DIVIDE
	this.instrList.push("NEG");//to NEGATIVE
	this.instrList.push("POS");//to POSITIVE

	this.instrList.push("COU");//COMPARE UNEQUAL
	this.instrList.push("COG");//COMPARE GREATER
	this.instrList.push("COL");//COMPARE LESSER
	this.instrList.push("COE");//COMPARE EQUAL
	this.instrList.push("JMP");//JUMP to
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
	this.flags["ICF"] = false; //In Condition Flag - true - находимся в блоке с условием
	this.flags["CVF"] = false; //Condition Value Flag - true - условие верно, false - не верно
	this.flags["ERF"] = false; //Error Flag - true если была совершена ошибка в синтаксисе
}

Proc.prototype.initProc = function(nRegisters)
{
	this.initRegsisters(nRegisters);
	this.initFlags();
	this.initInstructions();
}

/*Метки - ассоциативный масив: ключ-метка, 
*значние-номер строки, на которой расположена метка
*/
Proc.prototype.addLable = function(lable)
{
	this.lables[lable] = this.IP;
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
	//console.log("Format mem str:"+formatMemStr[0]);
	return formatMemStr;
}

Proc.prototype.isRegExist = function(arrOP)
{
	for (var i = 0; i < arrOP.length; i++) {
		if(arrOP[i].charAt(0) == "r"){
			if(arrOP[i].charAt(1) <= this.regsList.length)
				return true;
			alert("Invalid register name: "+ arrOP[i]);
			this.flags["ERF"] = true;
			return false;
		}
	};
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

	var arrOP = OpStr[0].split(',');//Операторы разделены запятой
	if(!this.isRegExist(arrOP)){
		return;
	}

	switch(instruction){
		case "ADD":
			this.procADD(arrOP);
			this.IP++;
			console.log("IN SWITCH"+ this.IP);
			break
		case "SUB":
			this.procSUB(arrOP);
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
		var label = arrOfInstr.splice(0,1);//Первый эл.(метка в этом случае) выбрасывается
		this.addLable(label); //И добавляеся в массив меток
	}
	/*На этом этапе массив инструкий должен состоять только из
	*инструкции и операнда(ов). В функцию выталкиывается
	*инструкция, а оставшийся массив и есть операнды
	*
	*Если находимся в условии, необходимо проверить выполнено ли оно
	*если да, выполняем инструкцию в стандартном режиме
	*если нет, перепрыгиваем строку и выходим из этой функции
	*/
	if(this.flags["ICF"] == true){
		if(this.flags["CVF"] == true){
			applyInstr(arrOfInstr.splice(0,1), arrOfInstr);
			return;
		}else{ //Если условие не верное, то перепрыгиваем строку
			this.IP++; 
			return;
		}
	}
	this.applyInstr(arrOfInstr.splice(0,1), arrOfInstr);
}

Proc.prototype.step = function(memStr)
{
	console.log("STEP " + memStr);
	this.executeInstr(memStr);
}

