// A test file to perform complete genetic algorithmic operations.
require('console.table');// for using console.table
module.exports = {
        proceedForward: function(mat){
		startAlgo(mat);
        }
} 
var d1 = new Date();
const generate = require('./population_generation');
const mutate = require('./mutation');
const readTspFile = require('./readFile');
const fitness = require('./fitness');
const reproduct = require('./reproduction');
const co = require('./crossover');
var totalCities = 561;

//Enter the filename of the file, total cities below from which you have to read the data.
readTspFile.getMatrix('pa561.txt',totalCities);

function startAlgo(costMatrix){
   var populationCount = 50;
   var mutationProb = 10;
   var reproductionProb = 10;
   var crossoverProb = 80;
   var noOfGenerations = 100;
   var startCity = 1;
   var cx = 'wcx';
   var population = generate.generation(totalCities,populationCount,startCity);
   var newPop = [];
   //console.log(population);
   let cMat = [];
   //Initializing the cost Matrix
   for(let i=0;i<totalCities;i++){
        cMat[i] = [];
        for(let j=0;j<totalCities;j++){
                cMat[i][j]=Number(costMatrix[i][j]);
        }
   }
   console.log("Cost Matrix");
   
   //Displaying the COST MATRIX in form of table
   console.table(cMat);
   let popFit = fitness.calFitness(population,cMat);
   var counter = 0;
   
   //Looping for generations
   while(counter <= noOfGenerations){	   
	
	//Performing Reproduction
   	let reproductPop = reproduct.reproduction(popFit,reproductionProb);  
   	newPop = reproductPop;
	//console.log("Reproduction: ");console.table(newPop);
	//Performing Crossover
   	newPop = co.crossover(newPop,crossoverProb,popFit,cMat,cx);   
	//console.log("Crossover: ");console.table(newPop);
	//Performing Mutation
   	newPop = mutate.mutation(newPop,mutationProb,popFit,cMat);
  	//console.log("Mutation: ");console.table(newPop);
   	console.log("\nGeneration no: "+counter);
	//console.log("Population Generated: ");
	//console.table(popFit);
	console.log("Minimum Fitness: "+popFit[populationCount-1]['fitness']);
	console.log("Tour: "+popFit[populationCount-1]['pop']);
	popFit = newPop;
	newPop = [];
	counter++;
	
   } 
   var d2 = new Date();
	console.log("Time taken:  " + (d2.getTime() - d1.getTime()) + " milliseconds");
}
