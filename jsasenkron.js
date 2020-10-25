
function Merhaba(){
    console.log('Merhaba JS!');
}

//Merhaba();

async function gulegule(){
    console.log('Güle Güle');
}



let data = [];

function dataCek(){
    fetch('https://northwind.now.sh/api/products')
    .then((res)=>res.json())
    .then((result)=>{
         data = result;
    })
}

dataCek();
console.log(data);

