//Function to generate population 
module.exports = {
 generation: function(total_cities,population_count,startCity){
	//Generating random sequences of cities

	//creating population matrix
	var population = [];
	for(var i = 0; i < population_count; i++) {
		population[i] = new Array(total_cities);
	}

	//Initialize population arrays's 1st element as startCity.
	for(var i = 0; i < population_count; i++) {
		population[i][0] = startCity;
	}

	//Initialize rest elements
	for(var i = 0; i < population_count; i++) {
		for(var j = 1; j < total_cities; j++) {
			population[i][j] = 0;
		}
	}

	//creating left element set
	var left_element = [];
	for (var i = 1; i <= total_cities; i++) {
		if(i!=startCity){
			left_element.push(i);
		}
	}

	//creating the entire population of random elements
	for(var i = 0; i < population_count; i++) {
		var counter = 1;
		var dup_left_element = left_element.slice();      //duplicate of left element
		//console.log("Iteration "+i+" : dup_initial : "+dup_left_element);
		var epoch = 0;
		var temp = total_cities - 1;
		while(epoch < temp)	
		{
			//generate a random number in range of dup_left_element
			var index;
			var element;
			var flag = 1;
			var size_left_element = dup_left_element.length;
			while(flag > 0)		//get an element which is not added in the current Individual
			{
				
				index = Math.floor((Math.random() * size_left_element));
				if(dup_left_element[index] != -1)
				{	
					element = dup_left_element[index];
					flag = 0;
				}
			}
			//add that element in population array
			population[i][counter] = element;
			counter++;

			//Set that element in dup_left_element as -1
			dup_left_element[index] = -1;
			epoch++;
		}
	}

	//console.log("Generated population");
	return population;
        //console.log(population);
 }
}

