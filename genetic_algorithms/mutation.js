// Function to perform mutation
const fitness = require('./fitness');

module.exports = {
  mutation : function(newPop,mutationProb,popFit,cMat){
  	
	let counter = 0;
        let index,swapIndex1,swapIndex2,temp;
        let chromosomeSize = popFit[0].pop.length;
   	let len = popFit.length;
	
	//Mutation Number
	let mutationNum = (mutationProb * len)/100; 
  	let temp1 = [];
	while(counter < mutationNum){
		// select a chromosome
		index = Math.floor(Math.random() * len); 
		
 		//select two indices to swap
		swapIndex1 = Math.floor(Math.random()*chromosomeSize);  
 		swapIndex2 = Math.floor(Math.random()*chromosomeSize);	

		//indices should not be 0(because source cannot be mutated) and also not be equal to each other
		//swap two indices
		if(swapIndex1 != swapIndex2 && swapIndex1 != 0 && swapIndex2 !=0){
			let mutatedIndividual = popFit.slice(index,index+1);
			temp = mutatedIndividual[0]['pop'][swapIndex1];
			mutatedIndividual[0]['pop'][swapIndex1] = mutatedIndividual[0]['pop'][swapIndex2];
			mutatedIndividual[0]['pop'][swapIndex2] = temp;
			temp1.push(mutatedIndividual[0]['pop']);
			counter++;
		}
		 
	}
	//calculate fitness of Mutated Individuals and push them into newPopulation
	let temp3 = fitness.calFitness(temp1,cMat);
        for(let c=0;c < temp3.length;c++){
		newPop.push(temp3[c]);
	}
	return newPop;
 }
}
