//Generating random sequences of cities
var total_cities = 7;
var population_count = 10;

//creating population matrix
var population = [];
for(var i = 0; i < 10; i++) {
	population[i] = new Array(7);
}

//Initialize population arrays's 1st element as 1.
for(var i = 0; i < 10; i++) {
	population[i][0] = 1;
}

//Initialize rest elements
for(var i = 0; i < 10; i++) {
	for(var j = 1; j < 7; j++) {
		population[i][j] = 0;
	}
}

//creating left element set
var left_element = [];
for (var i = 2; i <= total_cities; i++) {
	left_element.push(i);
}
//creating the entire population of random elements
for(var i = 0; i < 10; i++) {
	var counter = 1;
	var dup_left_element = left_element.slice();      //duplicate of left element
	//console.log("Iteration "+i+" : dup_initial : "+dup_left_element);
	var epoch = 0;
	while(epoch < 6)
	{
		//generate a random number in range of dup_left_element
		var index;
		var element;
		var flag = 1;
		var size_left_element = dup_left_element.length;
		while(flag > 0)
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
console.log("Generated population");
console.log(population);
