//Reproduction function to reproduce the chromosomes in the new population as per their fitness
module.exports = {
	reproduction : function(popFit,reproductionProb){
		let len = popFit.length;
		//Calculating the number of chromosomes to be reproduced on the basis of probability of reproduction.
		let reproductionNo = (reproductionProb * len)/100;
		popFit.sort(function(a,b){if(a.fitness < b.fitness) {return 1} return -1 });
		//console.log(popFit);
		let reproductPop = [];
		for(let i = 0;i<reproductionNo;i++){
			reproductPop[i] = popFit[len - i - 1];
		}
		return reproductPop;
	}
}
