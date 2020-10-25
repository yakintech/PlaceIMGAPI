let result = new Promise((resolve,reject)=>{
    //resim yüklüyor...
    //eğer resim yüklendiyse cevap olarak 'OK!' döneceğim. Hata verdiyse 'Error!' döneceğim
    let resimsonuc = false;

    if(resimsonuc){
        resolve('OK!')
    }
    else{
        reject('Error!');
    }
})

//then => yani promise sonucu doğru döndüyse( hata vermediyse )
result.then((msg)=>{
    console.log(msg);
})
.catch((err)=>{
    console.log(err);
})



