const API="http://localhost:3000/api";

async function getProducts(){

const response=await fetch(`${API}/products`);

return await response.json();

}

async function createProduct(data){

return await fetch(`${API}/products`,{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(data)

});

}