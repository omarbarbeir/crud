let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let create = document.getElementById('create')

let mood = 'create'
let tmp = 'i'

function getTotal()
{
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value)
        - +discount.value;
        total.innerHTML = result;
        total.style.background = 'green'
    }
    else{
        total.innerHTML = '';
        total.style.background = 'red'
    }
}

let dataPro ;
if(localStorage.product !=null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = [];
}

create.onclick = function()
{
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(title.value != '' && price.value !='' && category.value!= '' && newPro.count < 100){
       if(mood==='create'){
        if(newPro.count>1){
            for(let i =0; i<newPro.count;i+=1){
                dataPro.push(newPro);
            }
        }else{
            dataPro.push(newPro);
        }
    }else{
        dataPro[tmp] = newPro;
        mood = 'create';
        create.innerHTML = 'create';
        count.style.display = 'block'
    }
    ClearData()

    }
   
   
    localStorage.setItem('product',JSON.stringify(dataPro))
    
    ReadData()
}


function ClearData()
{
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

function ReadData()
{
   let table = '';
   for(let i =0; i<dataPro.length; i+=1){
    table+=`
    <tr>
    <td>${i}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].count}</td>
    <td>${dataPro[i].category}</td>
    <td><button onclick='DeleteData(${i})'>delete</button></td>
    <td><button onclick='UpdateData(${i})'>update</button></td>
    </tr>`
   }
   document.getElementById('tbody').innerHTML = table;
   let btnDA = document.getElementById('DeleteAll')
   if(dataPro.length>0){
    btnDA.innerHTML=`
    <button onclick='DeleteAll()'>Delete All (${dataPro.length})</button>`
   }else{
    btnDA.innerHTML = ''
   }
   getTotal()
   
}
ReadData()

function DeleteData(i)
{
   dataPro.splice(i,1);
   localStorage.product = JSON.stringify(dataPro)
   ReadData()
}

function DeleteAll()
{
    dataPro.splice(0);
    localStorage.clear()
    ReadData()
}

function UpdateData(i)
{
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    create.innerHTML = 'Update';
    count.style.display = 'block';
    mood = 'update'
    tmp = i
}


let Mood = 'title'
function SearchMood(id)
{
    let search = document.getElementById('search')
    if(id == 'searchbytitle'){
        mood = 'title';
        search.placeholder = 'Search By title';
    }else{
        mood = 'category';
        search.placeholder = 'Search By Category';
    }
search.focus();
search.value = '';
ReadData()
}

function SearchData(value)
{
    let table = '';
    if(Mood == 'title'){


        for(let i =0; i<dataPro.length; i+=1){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table+=`
                    <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].count}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick='DeleteData(${i})'>delete</button></td>
                    <td><button onclick='UpdateData(${i})'>update</button></td>
                    </tr>`
            }
        }
    }
    else{
        for(let i =0; i<dataPro.length; i+=1){
            if(dataPro[i].category.includes(value.toLowerCase())){
                table+=`
                    <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].count}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick='DeleteData(${i})'>delete</button></td>
                    <td><button onclick='UpdateData(${i})'>update</button></td>
                    </tr>`
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}




