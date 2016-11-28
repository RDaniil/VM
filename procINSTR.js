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
	(ops[0] == ops[1]) ? cmpRes.push(true) : cmpRes.push(false);
	(ops[0] != ops[1]) ? cmpRes.push(true) : cmpRes.push(false);
	(ops[0] > ops[1]) ? cmpRes.push(true) : cmpRes.push(false);
	(ops[0] < ops[1]) ? cmpRes.push(true) : cmpRes.push(false);
	return cmpRes;
}
//BinaryInstructions
function ADD(operators){
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
	return operators[0] + 1;
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