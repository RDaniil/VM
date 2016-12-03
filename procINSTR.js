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


//JumpInstructions
function JMP(operators){
	return true;
}
function JPU(operators){
	return operators["CMPUF"] == true;
}
function JPE(operators){
	return operators["CMPEF"] == true;
}
function JPL(operators){
	return operators["CMPLF"] == true;
}
function JPG(operators){
	return operators["CMPGF"] == true;
}

//CondiTionalInstrucions
function CMP(ops){
	var cmpRes= [];
	console.log("IN COMPARE 0: "+ ops[0] + " 1: " + ops[1]);
	ops[0] = Number(ops[0]);
	ops[1] = Number(ops[1]);

	(ops[0] == ops[1]) ? cmpRes.push(true) : cmpRes.push(false);
	(ops[0] != ops[1]) ? cmpRes.push(true) : cmpRes.push(false);
	(ops[0] > ops[1]) ? cmpRes.push(true) : cmpRes.push(false);
	(ops[0] < ops[1]) ? cmpRes.push(true) : cmpRes.push(false);
	return cmpRes;
}
//BinaryInstructions
function ADD(operators){
	//Ипспользование NUmber, что бы было сложение чисел а не строк
	return Number(operators[0]) + Number(operators[1]);
}
function SUB(operators){
	return operators[0] - operators[1];
}
function MUL(operators){
	return operators[0] * operators[1];
}
function DIV(operators){
	return operators[0] / operators[1];
}
function RDV(operators){
	return operators[0] % operators[1];
}
function MOV(operators){
	return operators[1];
}

//UnaryInstructions
function INC(operators){
	return Number(operators[0]) + 1;
}
function DEC(operators){
	return operators[0] - 1;
}
function POS(operators){
	return (operators[0]>0) ? operators[0] : (-operators[0]);
}
function NEG(operators){
	return (operators[0]<0) ? operators[0] : (-operators[0]);
}