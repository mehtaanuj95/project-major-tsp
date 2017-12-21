/*Function to perform Neighbor-based crossover
The algorithm for the NBX is as follows:
Step 1: - Start from 'node 1’ (i.e., current node p =1).
Step 2: - Search both of the parent chromosomes and consider the neighboring ‘legitimate nodes' (the nodes that are not yet visited) of  'node p’ in each parent. If no 'legitimate node' after 'node p’ is present in any of the parent, search sequentially the nodes {2, 3, …, n} and consider the first 'legitimate' node, and go to Step 3.
Step 3: Suppose the 'node α', ‘node β' and ‘node γ‘, ‘node δ’ are found in 1st and 2nd parent respectively, then for selecting the next node go to Step 4.
Step 4: Compare of the costs of adding all nodes ‘node p’ and then select the node with the minimum cost and concatenate it to the partially constructed offspring chromosome. If the offspring is a complete chromosome, then stop, otherwise, rename the present node as 'node p' and go to Step 2.
*/

function onlyUnique(value, index, self) { //filter to remove duplicates 
    return self.indexOf(value) === index;
}

function neighborBasedCrossover(initialParent1, initialParent2, costMatrix){
		parent1 = initialParent1.pop; //get the path stored in initialParent1
		parent2 = initialParent2.pop; // get the path stored in initialParent2 
		var dup_p1 = parent1.slice(); //duplicate copy of parent1
		var dup_p2 = parent2.slice(); //duplicate copy of parent2

		//add starting and ending 1 window elements to them

		parent1.unshift(parent1[(parent1.length) - 1]);
		parent1.push(dup_p1[0]);
		parent2.unshift(parent2[(parent2.length) - 1]);
		parent2.push(dup_p2[0]);
		
		var counter = 1;
		var total_cost = 0;
		var considered = [dup_p1[0]];
		var current_position_p1 = 1;
		var current_position_p2 = 1;
		var element_window = [];
		var len = dup_p1.length;
		
		//Do crossover until the whole new offspring is formed
		while(counter <  len)
		{
			//create window of neighboring elements
			//first array
			element_window.push(parent1[current_position_p1-1]);
			element_window.push(parent1[current_position_p1+1]);
	
			//second array
			element_window.push(parent2[current_position_p2-1]);
			element_window.push(parent2[current_position_p2+1]);
			element_window = element_window.filter( onlyUnique );
			//console.log("iteration "+counter + "window - [ "+ element_window + " ]");
			
			//find the minimum distance
			var min = Infinity;
			var index;
			var flag = 0;
			var temp_cost = 0;
			var current_element = parent1[current_position_p1];
			for(var i = 0; i < element_window.length; i++)
			{	
				var current_window_element = element_window[i];
				//console.log("current_window_element " +current_window_element);
		
				if(costMatrix[current_element-1][current_window_element - 1] <= min && (considered.includes(current_window_element) == false))
				{
					flag++;
					min = costMatrix[current_element-1][current_window_element-1];
					//console.log(min);
					index = current_window_element;
					temp_cost = min;
				}
		
			}
			if(flag > 0) //an legitimate element with a minimum value is found
			{
				//console.log(index);
				considered.push(index); //add in the partially constructed solution
				counter++;
			}
			else	//no legitimate element found	
			{
				for(var k = 1; k <= len; k++) //find the first legitimate node sequentially
				{
					if(considered.includes(k) == false)
					{	index = k;
						temp_cost = costMatrix[current_element-1][k-1];	
						//console.log("_________________________________");
						break;
					}
				}
				counter++;
				//console.log(index);
  				considered.push(index); //add in partially constructed solution
			}
		//console.log(temp_cost);
		total_cost+= temp_cost;
		flag = 0;

		//find the position of index element
		current_position_p1 = dup_p1.indexOf(index)+1;
		current_position_p2 = dup_p2.indexOf(index);
		current_position_p2+=1;
		element_window = [];
		//console.log("current_pos_p1 = "+current_position_p1 + " current_pos_p2 = "+current_position_p2 );
		//console.log("current considered = [ "+considered + " ]");

	}
        total_cost += costMatrix[index-1][0]; //add cost of last node to the first node
	//console.log("Total Cost = "+total_cost);
	let offspring = {		//create offspring object
		pop : considered,		
		fitness : total_cost
	}
	parent1.shift();	//convert parents back to their original form
	parent1.pop();
	parent2.shift();
	parent2.pop();
	return offspring;
}
/* Function to perform SCX
The algorithm for SCX is - 
Step 1: - Start from 'node 1’ (i.e., current node p =1).
Step 2: - Sequentially search both of the parent chromosomes and consider the first ‘legitimate node' (the node that is not yet visited) appeared after 'node p’ in each parent. If no legitimate node after 'node p’ is present in any of the parent, search sequentially the nodes {2, 3, ..., n} and consider the first 'legitimate' node, and go to Step 3.
Step 3: Suppose the 'node α' and the 'node β' are found in 1st and 2nd parent respectively, then for selecting the next node go to Step 4.
Step 4: If c pα < c pβ , then select 'node α', otherwise, 'node β' as the next node and concatenate it to the partially constructed offspring chromosome. If the offspring is a complete chromosome, then stop, otherwise, rename the present node as 'node p' and go to Step 2.
*/
function sequentialConstructiveCrossover(initialParent1, initialParent2, costMatrix){
		parent1 = initialParent1.pop; //get the path stored in initialParent1
		parent2 = initialParent2.pop; // get the path stored in initialParent2 
		//var dup_p1 = parent1.slice(); //duplicate copy of parent1
		//var dup_p2 = parent2.slice(); //duplicate copy of parent2

		//add starting and ending 1 window elements to them

		//parent1.unshift(parent1[(parent1.length) - 1]);
		//parent1.unshift(parent1[(parent1.length) - 2]);

		//parent1.push(dup_p1[0]);
		//parent1.push(dup_p1[1]);

		//parent2.unshift(parent2[(parent2.length) - 1]);
		//parent2.unshift(parent2[(parent2.length) - 2]);
		//parent2.push(dup_p2[0]);
		//parent2.push(dup_p2[1]);
		//console.table(parent1);console.table(parent2);
		var counter = 1;
		var total_cost = 0;
		var considered = [parent1[0]];
		var current_position_p1 = 0;
		var current_position_p2 = 0;
		var element_window = [];
		var len = parent1.length;
		
		//Do crossover until the whole new offspring is formed
		while(counter <  len)
		{
			//push next legitimate node occuring sequentially
			element_window.push(parent1[current_position_p1+1]);
	
			//second array
			//element_window.push(parent2[current_position_p2-1]);
			element_window.push(parent2[current_position_p2+1]);
			element_window = element_window.filter( onlyUnique );
			//console.log("iteration "+counter + "window - [ "+ element_window + " ]");
			
			//find the minimum distance
			var min = Infinity;
			var index;
			var flag = 0;
			var temp_cost = 0;
			var current_element = parent1[current_position_p1];
			for(var i = 0; i < element_window.length; i++)
			{	
				var current_window_element = element_window[i];
				//console.log("current_window_element " +current_window_element);
				//console.log("current element "+current_element);
				if(costMatrix[current_element-1][current_window_element - 1] <= min && (considered.includes(current_window_element) == false))
				{
					flag++;
					min = costMatrix[current_element-1][current_window_element-1];
					//console.log(min);
					index = current_window_element;
					temp_cost = min;
				}
		
			}
			if(flag > 0) //an legitimate element with a minimum value is found
			{
				//console.log("Pushed "+index);
				considered.push(index); //add in the partially constructed solution
				counter++;
			}
			else	//no legitimate element found	
			{
				for(var k = 1; k <= len; k++) //find the first legitimate node sequentially
				{	//console.log("k="+k);
					if(considered.includes(k) == false)
					{	index = k;
						temp_cost = costMatrix[current_element-1][k-1];
						break;	
						//console.log("_________________________________");
					}
				}
				counter++;
				//console.log("Pushed Sequential Minimum"+index);
  				considered.push(index); //add in partially constructed solution
			}
		//console.log(temp_cost);
		total_cost+= temp_cost;
		flag = 0;

		//find the position of index element
		current_position_p1 = parent1.indexOf(index);
		current_position_p2 = parent2.indexOf(index);
		element_window = [];

		//console.log("current_pos_p1 = "+current_position_p1 + " current_pos_p2 = "+current_position_p2 );
		//console.log("current considered = [ "+considered + " ]");


	}
        total_cost += costMatrix[index-1][0]; //add cost of last node to the first node
	//console.log("Total Cost = "+total_cost);
	let offspring = {		//create offspring object
		pop : considered,		
		fitness : total_cost
	}
	//parent1.shift();	//convert parents back to their original form
	//parent1.pop();
	//parent2.shift();
	//parent2.pop();
	return offspring;
}

module.exports = {
	crossover : function(newPop,crossoverProb,popFit,cMat,cx){ //perform crossover
        let len = popFit.length;
        let crossoverNo = (crossoverProb * len)/100;
        let counter = 0;
	if(cx == 'nbx'){
        	while(counter < crossoverNo){
			//take two random elements
                	let index1 = Math.floor(Math.random() * len);
                	let index2 = Math.floor(Math.random() * len);
                	if(index1 == index2){
                 	       continue;
               	 	}
			//Do crossover and add the new offspring to the newPop
                	newPop.push(neighborBasedCrossover(popFit[index1],popFit[index2],cMat));
                	counter++;
       		}
	}else if(cx == 'scx'){
		while(counter < crossoverNo){
			//take two random elements
                	let index1 = Math.floor(Math.random() * len);
                	let index2 = Math.floor(Math.random() * len);
                	if(index1 == index2){
                 	       continue;
               	 	}
			//Do crossover and add the new offspring to the newPop
                	newPop.push(sequentialConstructiveCrossover(popFit[index1],popFit[index2],cMat));
                	counter++;
       		}

	}
        return newPop;
	}
}
