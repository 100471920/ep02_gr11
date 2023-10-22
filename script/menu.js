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
    console.log(ShopingList,"total",Total_price);

};


let list = document.getElementById("myList");
for (i = 0; i < ShopingList.length; ++i) {
    let li = document.createElement('li');
    li.innerText = ShopingList[i][0]+ShopingList[i][1];
    list.appendChild(li);
}