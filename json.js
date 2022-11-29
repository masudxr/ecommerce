let text = '{ "employees" : [' +
'{ "firstName":"John" , "lastName":"Doe" },' +
'{ "firstName":"Anna" , "lastName":"Smith" },' +
'{ "firstName":"Peter" , "lastName":"Jones" } ]}'; 

const obj = JSON.parse(text); 

console.log(obj.employees[0].firstName + ' ' +obj.employees[2].lastName );
// console.log(obj.employees[2].lastName);

