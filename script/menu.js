/*
    Authors:
        Santiago Kiril Cenkov Stoyanov / 100472051@alumnos.uc3m.es
        Oscar Hontoria Herrador / 100471920@alumnos.uc3m.es
*/

var ShopingList = [];
var Total_price = 0;

const productname = document.getElementsByClassName('product-name');
const productprice = document.getElementsByClassName('product-price');
var names =[];
var prices =[];
var quatities=[];

for (let i = 0; i < productname.length; i++) {
    names.push(productname[i].innerText);
};
for (let i = 0; i< productprice.length;i++){
    prices.push(Number(productprice[i].innerText.replace('$','')));
};

function update_quantities(){
    var productquantities = document.getElementsByClassName('Quantity');
    quatities=[];
    for (let i = 0; i< productquantities.length;i++){
        quatities.push(Number(productquantities[i].value));
    }
}

function find_iterarion(nombre){
    for (let i = 0; i < names.length; i++){
        if (names[i] == nombre){
            return i;
        }
    }
};


function add_product(nombre) {
    update_quantities();
    let j = find_iterarion(nombre);

    for (let i = 0; i < ShopingList.length; i++){
        if (ShopingList[i][0] == nombre) {
            ShopingList[i][1] = Math.min(Number(ShopingList[i][1]) + quatities[j],100);/*maximo 100 de cada unidad*/
            nombre = '';
            ShopingList[i][2] = ShopingList[i][2] + Number((Math.min(quatities[j],100-Number(ShopingList[i][1]))*prices[j]).toFixed(2));
            Total_price = Total_price + Number((Math.min(quatities[j],100-Number(ShopingList[i][1]))*prices[j]).toFixed(2));
        }
    }
    if(nombre!=''){
        let price = Number((Math.min(quatities[j],100)*prices[j]).toFixed(2));
        Total_price = Total_price + price;
        ShopingList.push([nombre,Math.min(100,quatities[j]),price])};/*para append  si no esta en la lista*/
    update_cart();
    console.log(ShopingList,"total",Total_price);
      };
    
function remove_product(nombre) {
    update_quantities();
    let j = find_iterarion(nombre);

    for (let i = 0; i < ShopingList.length; i++){
        console.log(ShopingList.length,ShopingList[i][0],nombre,i);
        if (ShopingList.length <=0){return};
        if (ShopingList[i][0] == nombre) {

            console.log("cosasas",ShopingList[i][1],quatities[j]);
            if (quatities[j]>ShopingList[i][1]){
                quatities[j]=Number(ShopingList[i][1]);
            };
            ShopingList[i][1] = Number(ShopingList[i][1]) - quatities[j];
            ShopingList[i][2] = ShopingList[i][2] - Number(Math.min(ShopingList[i][1],quatities[j])*prices[j].toFixed(2));
            Total_price = Total_price - Number(quatities[j]*prices[j].toFixed(2));
        }
        if (ShopingList[i][1]<= 0){
            ShopingList.splice(i,1);
        };
    };
    update_cart();
    console.log(ShopingList,"total",Total_price);

};


function update_cart(){
    createTable(ShopingList,'ShopingList');
    
};

function removeTable(id)
    {
    var div = document.getElementById(id);
    while(div.firstChild)
        div.removeChild(div.firstChild);
    }


function createTable(data,id){
    removeTable(id);
    let list = document.getElementById(id);
    for (i = 0; i < data.length; ++i) {
        let li = document.createElement('li');
        if(id=='ShopingList'){
            li.innerText = data[i][0]+'  x'+data[i][1]};
        if(id=='ReviewList'){
            li.innerText = data[i][0]+'  x'+data[i][1] + ' $'+data[i][2]}
        list.appendChild(li);
    }
    if(id=='ReviewList'){
        let li = document.createElement('li');
        li.innerText ='Total a pagar :'+ Total_price+'$';
        list.appendChild(li);
    }
}

function showList()
{
    const shoping_list = document.getElementById("ShopingList");
    let shoping_list_style = getComputedStyle(shoping_list);
    if (shoping_list_style.display == "none")
    {
        shoping_list.style.display = "flex";
    }
    else
    {
        shoping_list.style.display = "none";
    }
}


function goForward(){
    if (document.getElementById("menu").style.display!="none"){
        document.getElementById("menu").style.display="none"
        document.getElementById("status").style.display="none"
        document.getElementById("pago").style.display="flex"
        document.getElementById("paso2").style.backgroundColor="rgb(95, 115, 135)"
        document.getElementById("paso1").style.backgroundColor="rgb(150, 150, 150)"
        createTable(ShopingList,'ReviewList')}
    
    else if (document.getElementById("pago").style.display!="none"){
        document.getElementById("pago").style.display="none"
        document.getElementById("menu").style.display="none"
        document.getElementById("status").style.display="flex"
        document.getElementById("paso3").style.backgroundColor="rgb(95, 115, 135)"
        document.getElementById("paso2").style.backgroundColor="rgb(150, 150, 150)"
        setTimeout(startTimer,5000)
        window.sessionStorage.setItem("shoping_list", ShopingList)
        }
}
function goBack(){
    if (document.getElementById("pago").style.display!="none" ){
        document.getElementById("menu").style.display="flex"
        document.getElementById("pago").style.display="none"
        document.getElementById("status").style.display="none"
        document.getElementById("paso1").style.backgroundColor="rgb(95, 115, 135)"
        document.getElementById("paso2").style.backgroundColor="rgb(150, 150, 150)"
    }
}

function parpadeo()
{   
    const clock = document.getElementById("clock");
    let clock_style = getComputedStyle(clock);
    clock.style.display = "none";
    setTimeout(function(){clock.style.display = "flex";},300)

}


function startTimer(){
    var countDownTime = 10*60;
    var seconds_passed = 0
    var x = setInterval(function() {

        parpadeo()
        var distance = (countDownTime - seconds_passed)*1000;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        seconds_passed = seconds_passed + 1    

        if(seconds<10){seconds= "0"+seconds}
        if(minutes<10){minutes= "0"+minutes}
        document.getElementById("clock").innerHTML = minutes + "m " + seconds + "s ";


        if (distance < 0) {
            clearInterval(x); 
            document.getElementById("clock").innerHTML = "REDIRECTING";
            endTimer();
            
        }
    }, 1000);
}

function endTimer(){
    var timer = setTimeout(function() {
    window.location.href = '../structure/index.html'
}, 3000);
}
