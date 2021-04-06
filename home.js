// home page

document.getElementById("btn1").addEventListener('mouseover',function (){
    document.querySelector('.div1').style.borderColor = 'darkturquoise';
})
document.getElementById("btn1").addEventListener('mouseout',function (){
    document.querySelector('.div1').style.borderColor = '#f15b29';
})

document.getElementById("btn2").addEventListener('mouseover',function (){
    document.querySelector('.div2').style.borderColor = 'darkturquoise';
})
document.getElementById("btn2").addEventListener('mouseout',function (){
    document.querySelector('.div2').style.borderColor = '#f15b29';
})

document.getElementById("btn3").addEventListener('mouseover',function (){
    document.querySelector('.div3').style.borderColor = 'darkturquoise';
})
document.getElementById("btn3").addEventListener('mouseout',function (){
    document.querySelector('.div3').style.borderColor = '#f15b29';
})


document.getElementById("btn1").addEventListener('click', function() {
    console.log("budget calculate"); 
    location.href = "Budget/budget.html";
})

document.getElementById("btn2").addEventListener('click', function() {
    location.href = "SetTarget/target.html"; 
})

document.getElementById("btn3").addEventListener('click', function() {
    location.href = "BillSplitter/Bill.html"; 
})





