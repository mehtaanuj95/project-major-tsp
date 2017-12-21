//Functions to read the file and convert the data into desirable form
const proceed = require('./test');
var fs = require('fs');
module.exports = { 
     getMatrix : function(fileName,totalCities){
	var text;
	
	//read File 'fileName'
	fs.readFile(fileName, 'utf8', function(err, data) {  
    	if (err) throw err;
    	
	//convert data into matrix form
	let mat;
	mat = convertToMatrix(data,totalCities);
	proceed.proceedForward(mat); //start genetic algorithm

	});
	}
}

function convertToMatrix(text,totalCities){ //convert data into matrix form
    let arr=text.split(/[\s\n]+/); //split delimiters - space and \n
    let matrix = [];
    for(let i=0;i<totalCities;i++){	//create array of arrays
     	matrix[i] = new Array(totalCities);
    }
    let k=0;
    for(let i=0;i<totalCities;i++){	//fill up the lower diagonal
    	for(let j=0;j<=i;j++){
		matrix[i][j] = arr[k];
		k++;
	}
    }
    
    for(let i=0;i<totalCities;i++){   //fill up the upper diagonal
    	for(let j=totalCities-1;j>i;j--){
		matrix[i][j]=matrix[j][i];
	}
    }
    //console.log(matrix);
    return matrix;			
}
