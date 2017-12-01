
//function to return only unique elements
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

var matrix = [];
for(var i=0; i<9; i++) {
    matrix[i] = new Array(7);
}

//initializing the matrix
for(var i = 0; i < 7;i++)
{
	for(var j = 0; j < 7; j++)
	{
		matrix[i][j] = 0;
	}
}

matrix[0][0] = 999; matrix[0][1] = 75; matrix[0][2] = 99; matrix[0][3] = 9; matrix[0][4] = 35; matrix[0][5] = 63; matrix[0][6] = 8;
matrix[1][0] = 51; matrix[1][1] = 999; matrix[1][2] = 86; matrix[1][3] = 46; matrix[1][4] = 88; matrix[1][5] = 29; matrix[1][6] = 20;
matrix[2][0] = 100; matrix[2][1] = 5; matrix[2][2] = 999; matrix[2][3] = 16; matrix[2][4] = 28; matrix[2][5] = 35; matrix[2][6] = 28;
matrix[3][0] = 20; matrix[3][1] = 45; matrix[3][2] = 11; matrix[3][3] = 999; matrix[3][4] = 59; matrix[3][5] = 53; matrix[3][6] = 49;
matrix[4][0] = 86; matrix[4][1] = 63; matrix[4][2] = 33; matrix[4][3] = 65; matrix[4][4] = 999; matrix[4][5] = 76; matrix[4][6] = 72;
matrix[5][0] = 36; matrix[5][1] = 53; matrix[5][2] = 89; matrix[5][3] = 31; matrix[5][4] = 21; matrix[5][5] = 999; matrix[5][6] = 52;
matrix[6][0] = 58; matrix[6][1] = 31; matrix[6][2] = 43; matrix[6][3] = 67; matrix[6][4] = 52; matrix[6][5] = 60; matrix[6][6] = 999;

console.log(matrix);


////generate 2 random chromosomes
var a = [1,5,7,3,6,4,2];
var b = [1,6,2,4,3,5,7];

//creating duplicates of original arrays

var dup_a = a.slice(); //duplicate copy of a
var dup_b = b.slice(); //duplicate copy of b

//add starting and ending 2 window elements to them

a.unshift(a[(a.length) - 1]);
a.unshift(a[(a.length) - 2]);

a.push(dup_a[0]);
a.push(dup_a[1]);

b.unshift(b[(b.length) - 1]);
b.unshift(b[(b.length) - 2]);
b.push(dup_b[0]);
b.push(dup_b[1]);

console.log(a);
console.log(b);

var counter = 1;
var total_cost = 0;
var considered = [1];
var current_position = 2;
var current_position_b = 2;
var element_window = [];
while(counter <= 6 )
{
	//create window of neighboring elements
	//first array
	//[ 4, 2, 1, 5, 7, 3, 6, 4, 2, 1, 5 ]
	element_window.push(a[current_position-1], a[current_position - 2]);
	element_window.push(a[current_position+1], a[current_position + 2]);

	element_window.push(b[current_position_b-1], b[current_position_b - 2]);
	element_window.push(b[current_position_b+1], b[current_position_b + 2]);
	element_window = element_window.filter( onlyUnique );
	console.log("iteration "+counter + "window - [ "+ element_window + " ]");
	//find the minimum distance
	var min = Infinity;
	var index;
	var flag = 0;
	var temp_cost = 0;
	var current_element = a[current_position];
	for(var i = 0; i < element_window.length; i++)
	{	
		var current_window_element = element_window[i];
		//console.log("current_window_element " +current_window_element);
		
			if(matrix[current_element-1][current_window_element - 1] <= min && (considered.includes(current_window_element) == false))
			{
				flag++;
				min = matrix[current_element-1][current_window_element-1];
				console.log(min);
				index = current_window_element;
				temp_cost = min;
			}
		
	}
	if(flag > 0)
	{
		considered.push(index);
		counter++;
	}
	else	
	{
		for(var k = 0; k < dup_a.length; k++)
		{
			if(considered.includes(dup_a[k]) == false)
				index = dup_a[k];
			console.log("_________________________________");
		}
		counter++;
	}
	total_cost+= temp_cost;
	flag = 0;
	//find the position of index element
	/*for(var i = 2; i <( a.length - 2); i++)
	{
		if(a[i] === index)
			current_position = i;
	}*/
	current_position = dup_a.indexOf(index) + 2;
	current_position_b = dup_b.indexOf(index);
	current_position_b+=2;
	element_window = [];
	//console.log("current_pos = "+current_position + " current_pos_b = "+current_position_b );
	console.log("current considered = [ "+considered + " ]");

}
total_cost += matrix[index-1][0];
console.log("Total Cost = "+total_cost);
