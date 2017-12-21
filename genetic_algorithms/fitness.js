//Function to calculate fitness of the chromosome
module.exports = {
	calFitness : function(population,costMatrix){
		//calculate fitness - return popFit which is array of objects. Object has two keys: pop (solution) & fitness (totalCost)
		var len = population.length;
		var chromosomeSize = population[0].length;
		var counter1 = 0;
		var sum,counter2;
                var popFit = [];
		chromosomeSize--;

		// loop for population size(number of solutions)
		while(counter1 < len){
			popFit[counter1] = {};
			sum = 0;
			counter2 = 0;
	
			//loop for chromosome size(total number of cities)
			while(counter2 < chromosomeSize){
		         	sum += costMatrix[population[counter1][counter2] - 1][population[counter1][counter2+1] - 1]; //add cost of city to city
				counter2++;
			}
			sum += costMatrix[population[counter1][counter2]- 1][population[counter1][0]-1]; //add cost of last city to first city			
			popFit[counter1]['pop'] = population[counter1];
			popFit[counter1]['fitness'] = sum;
			counter1++;
		}
		//console.log("In fitness");
		//console.log(popFit);
		return popFit;
	}
}
