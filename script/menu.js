/*
    Authors:
        Santiago Kiril Cenkov Stoyanov / 100472051@alumnos.uc3m.es
        Oscar Hontoria Herrador / 100471920@alumnos.uc3m.es
*/
var ShopingList = [];

function add_product(nombre) 
{
    /**/
    var Cantidad = document.getElementsByClassName("Quantity")[0].value
    for (let i = 0; i < ShopingList.length; i++)
        {
        
        if (ShopingList[i][0] == nombre) {
            ShopingList[i][1] = Math.min(Number(ShopingList[i][1]) + Number(Number),100);/*por implemetar limite de compra superior*/
            nombre = '';
        }
        }
    if(nombre!='')
    {
        ShopingList.push([nombre,Number(Cantidad)]);
    };/*para append  si no esta en la lista*/
};
    
function remove_product(nombre) {
    var Cantidad = document.getElementsByClassName("Quantity")[0].value
    for (let i = 0; i < ShopingList.length; i++)
    {

        if (ShopingList[i][0] == nombre) {
            ShopingList[i][1] = Math.max(Number(ShopingList[i][1]) - Number(Cantidad),0);
        }
        if (ShopingList[i][1]== 0){
            ShopingList.splice(i,1);
        }
    }

};

let list = document.getElementById("myList");
for (i = 0; i < ShopingList.length; ++i) {
    let li = document.createElement('li');
    li.innerText = ShopingList[i][0]+ShopingList[i][1];
    list.appendChild(li);
}
