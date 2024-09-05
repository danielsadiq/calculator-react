// let btnArr = toObj(buttons);
// const buttons = ['DEL', '÷', 7,8,9,"×", 4, 5, 6, '+', 1, 2, 3, '-', '.', 0];

export const btnArr = [
	{
		"char": 7,
		"special": false,
		"oper": false
	},
	{
		"char": 8,
		"special": false,
		"oper": false
	},
	{
		"char": 9,
		"special": false,
		"oper": false
	},
	{
		"char": "DEL",
		"special": true,
		"oper": false
	},
	{
		"char": 4,
		"special": false,
		"oper": false
	},
	{
		"char": 5,
		"special": false,
		"oper": false
	},
	{
		"char": 6,
		"special": false,
		"oper": false
	},
	{
		"char": "+",
		"special": true,
		"oper": "+"
	},
	{
		"char": 1,
		"special": false,
		"oper": false
	},
	{
		"char": 2,
		"special": false,
		"oper": false
	},
	{
		"char": 3,
		"special": false,
		"oper": false
	},
	{
		"char": "-",
		"special": true,
		"oper": "-"
	},
	{
		"char": ".",
		"special": false,
		"oper": false,
	},
	{
		"char": 0,
		"special": false,
		"oper": false
	},
	{
		"char": "/",
		"special": true,
		"oper": "/"
	},
	{
		"char": "x",
		"special": true,
		"oper": "x"
	},
];

// function toObj(arr){
// 	let rv = [];
// 	for (let i=0; i<arr.length; i++){
// 		rv.push({char:arr[i], special:(typeof(arr[i])=="number" ? false : true), oper: (arr[i] === '÷'||"×"||'+'||"'-'" ? arr[i]: false)}
// 		)
// 	};
// 	return rv
// };