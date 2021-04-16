document.querySelector('.estMonth').textContent = "";
document.querySelector('.estYear').textContent = "";
document.querySelector('.budget__income--value').textContent = " ";
document.querySelector('.budget__income--valuepass').textContent = " ";
document.querySelector('.budget__expenses--value').textContent = " ";
document.querySelector('.budget__expenses--valuepass').textContent = " ";
changeBackground("#28B9B5");

var activeAmt = 0;   //Total active amount.
var passiveAmt = 0;  //Total passive amount.

var totalInc = 0;  //Total income amount.
var totalExp = 0;  //Total expense amount.

var expActiveAmt = 0; //Active expense amount.
var expPassAmt = 0;   //Passive expense amount.
var incActiveAmt = 0; //Active income amount.
var incPassAmt = 0;   //Passive income amount.

var calculated = 0;
var target = 0;       //Target amount to achive
var incType = null;
var description = " ";
var value = 0;
var type = null;


document.querySelector('.add__value').addEventListener("keypress", enterBtn)
document.querySelector('.add__target').addEventListener("keypress", enterBtn)

document.querySelector('.add__btn').addEventListener('click',readInput)
document.querySelector('.container').addEventListener('click', ctrDeleteitem)
document.querySelector('.contain').addEventListener('click', ctrDeleteitem)

document.querySelector('.home').addEventListener('click', function() {
    location.href = "../home.html"; 
})


function enterBtn(event) {

    if (event.keyCode == 13) {
        readInput();
    }
}
//Read Toggle state
document.querySelector('.add__type').addEventListener('change', function(){
    var selection = document.querySelector('.add__type').value;
    if (selection === 'inc'){
        changeBackground("#28B9B5");
    }else if(selection === 'exp'){
        changeBackground("#FF5049");
    }
});

// change Input fields colour on toggle
function changeBackground(color) {
    document.querySelector('.add__type').style.backgroundColor = color;
    document.querySelector('.add__act_pas').style.backgroundColor = color;
    document.querySelector('.add__description').style.backgroundColor = color;
    document.querySelector('.add__value').style.backgroundColor = color;
    document.querySelector('.add__btn').style.color = color;
}

// Reading input from fields.
function readInput(){
    
    target = Number(document.querySelector('.add__target').value);
    incType = document.querySelector('.add__type').value;
    description = document.querySelector('.add__description').value;
    value = Number(document.querySelector('.add__value').value);
    type = document.querySelector('.add__act_pas').value;
    
    if(description){
        if(type === 'act' && value >0){
            active(incType,value,description,type)
        }else if(type === 'pas' && value >0){
            passive(incType,value,description,type)
        }
    }
    calcMonth();
}

//Calculate active amount.
function active(incType,value,description,type){
    if(incType === 'inc'){
        incActiveAmt += value;
        incomeList(description, value,type);

    }else if(incType === 'exp'){
        expActiveAmt += value;
        expenseList(description, value,type);  
    }
    calcMonth();
    reset();
    //console.log("active " + activeAmt);
}

//Calculate passive amount.
function passive(incType,value,description,type){
    if(incType === 'inc'){
        incPassAmt += value;
        incomeList(description, value,type);
       
    }else if(incType === 'exp'){
        expPassAmt += value;
        expenseList(description, value,type);  
    }
    calcMonth();
    reset();
    //console.log("passive " + passiveAmt);
}

//Resetting fields.
function reset(){
    document.querySelector('.add__type').value = "inc";
    document.querySelector('.add__description').value = null;
    document.querySelector('.add__value').value = null;
    document.querySelector('.add__act_pas').value ="act";
    changeBackground("#28B9B5");
}

//Update income list.
function incomeList(description, value,type){
var html, newHtml;

if(type === 'act'){
    html = '<div class="item clearfix" id="inc-%id%-act"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+%value% <small>A</small></div><div class="item__delete"><button class="item__delete--btn"><span class="iconify" data-icon="ion-ios-close-circle-outline" data-inline="false"></span></i></button></div></div></div>'
}else if(type === 'pas'){
    html = '<div class="item clearfix" id="inc-%id%-pass"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+%value% <small>P</small></div><div class="item__delete"><button class="item__delete--btn"><span class="iconify" data-icon="ion-ios-close-circle-outline" data-inline="false"></span></i></button></div></div></div>'
}

newHtml = html.replace('%id%',value);
newHtml = newHtml.replace('%description%',description);
newHtml = newHtml.replace('%value%', value);

document.querySelector('.income_list').insertAdjacentHTML('beforeend', newHtml);
}


//Update expense list.
function expenseList(description, value,type){
var html, newHtml;

if(type === 'act'){
    html = '<div class="item clearfix" id="exp-%id%-act"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">-%value% <small>A</small></div><div class="item__delete"><button class="item__delete--btn"><span class="iconify" data-icon="ion-ios-close-circle-outline" data-inline="false"></span></i></button></div></div></div>'
}else if(type === 'pas'){
    html = '<div class="item clearfix" id="exp-%id%-pass"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">-%value% <small>P</small></div><div class="item__delete"><button class="item__delete--btn"><span class="iconify" data-icon="ion-ios-close-circle-outline" data-inline="false"></span></i></button></div></div></div>'
}
newHtml = html.replace('%id%',value);
newHtml = newHtml.replace('%description%',description);
newHtml = newHtml.replace('%value%', value);

document.querySelector('.expenses_list').insertAdjacentHTML('beforeend', newHtml);
}

//Update fields.
function updateFields(){
    document.querySelector('.budget__income--value').textContent = incActiveAmt;
    document.querySelector('.budget__expenses--value').textContent = expActiveAmt;
    document.querySelector('.budget__income--valuepass').textContent = incPassAmt;
    document.querySelector('.budget__expenses--valuepass').textContent = expPassAmt;
    //console.log("activeAmtExp " + expActiveAmt);
    //console.log("passiveAmtExp " + expPassAmt);
}

//Deleteing items.
function ctrDeleteitem(event){
    var splitId,typeId,valueId,actPass;
    var del = (event.target.parentNode.parentNode.parentNode.parentNode.id);
    splitId = del.split('-');
    typeId = splitId[0];
    valueId = splitId[1];
    actPass = splitId[2];

    if(typeId==='inc' && actPass =='act'){
        incActiveAmt -= valueId;

    }else if(typeId==='inc' && actPass =='pass'){
        incPassAmt -= valueId;

    }else if(typeId==='exp' && actPass =='act'){
        expActiveAmt -= valueId;

    }else if(typeId==='exp' && actPass =='pass'){
        expPassAmt -= valueId;
                
    }
    calcMonth()
    console.log(del);
    while(del != 'box4' && del != 'box5'){
        document.getElementById(del).remove();
    }
    
}

//Calculating number of months.
function calcMonth(){
    var monthCount = 0;
    activeAmt = incActiveAmt - expActiveAmt;
    passiveAmt = incPassAmt - expPassAmt;
    calculated = activeAmt + passiveAmt;

    // totalInc = incActiveAmt+incPassAmt;
    // totalExp = expActiveAmt+ expPassAmt;

   console.log("Active amount"+ activeAmt);
   console.log("Passive amount"+ passiveAmt);
   console.log("Active amount total"+ incPassAmt);
   console.log("Active amount total"+ expPassAmt);




    if (passiveAmt < 0 && activeAmt > 0) {
        monthCount = Math.ceil((passiveAmt/activeAmt)*-1);
        for(var i = 1 ; calculated < target ; i++){
            calculated += activeAmt;
            monthCount = i+1;
            //console.log(monthCount2);
        }
        //console.log(monthCount1);
    }
    else if (calculated > 0) {
        for(var i = 1 ; calculated < target ; i++){
            calculated += activeAmt;
            monthCount = i+1;
            //console.log(monthCount2);
        }
    }

    //console.log(monthCount1,monthCount2)
    //month = (monthCount1 + monthCount2);
    document.querySelector('.estMonth').textContent = monthCount;
    updateFields();
}

// function largePassive(){
//     //var count;
//     for(var i = 1;passiveAmt <0 ;i++){
//         passiveAmt = passiveAmt-activeAmt;
//         monthCount = i+1;
//     }

// }




////////////old//////
/*
document.querySelector('.estMonth').textContent = "";
document.querySelector('.estYear').textContent = "";
document.querySelector('.budget__income--value').textContent = " ";
document.querySelector('.budget__income--valuepass').textContent = " ";
document.querySelector('.budget__expenses--value').textContent = " ";
document.querySelector('.budget__expenses--valuepass').textContent = " ";


var activeAmt = 0;
var passiveAmt = 0;

var activeAmtExp = 0;
var passiveAmtExp = 0;
var activeAmtInc = 0;
var passiveAmtInc = 0;

var calculated = 0;

var target = 0;
var incType = null;
var description = " ";
var value = 0;
var type = null;

document.querySelector('.add__btn').addEventListener('click',readInput)
document.querySelector('.container').addEventListener('click', ctrDeleteitem)
document.querySelector('.contain').addEventListener('click', ctrDeleteitem)

document.querySelector('.home').addEventListener('click', function() {
    location.href = "../home.html"; 
})

function readInput(){

    target = Number(document.querySelector('.add__target').value);
    incType = document.querySelector('.add__type').value;
    description = document.querySelector('.add__description').value;
    value = Number(document.querySelector('.add__value').value);
    type = document.querySelector('.add__act_pas').value;
    
    
    if(type === 'act' && value >0){
        active(incType,value,description,type)
    }else if(type === 'pas' && value >0){
        passive(incType,value,description,type)
    }

    calcMonth();

}

function active(incType,value,description,type){
    if(incType === 'inc'){
        activeAmt += value;
        activeAmtInc += value;
        calcMonth();
        reset();
        incomeList(description, value,type);
        
    }else if(incType === 'exp' && activeAmt > value){
        activeAmt -= value;
        activeAmtExp += value;
        calcMonth();
        reset();
        expenseList(description, value,type);  
    }else{
        reset();
        alert("Expense can't be greater than Income")
    }
    updateFields();
    //console.log("active " + activeAmt);
    
    
}


function passive(incType,value,description,type){
    if(incType === 'inc'){
        passiveAmt += value;
        passiveAmtInc += value;
        calcMonth();
        reset();
        incomeList(description, value,type);
        
    }else if(incType === 'exp' && activeAmtInc+passiveAmt > value){
        passiveAmt -= value;
        passiveAmtExp += value;
        calcMonth();
        reset();
        expenseList(description, value,type);  
    }else{
        reset();
        alert("Expense can't be greater than Income")
    }
    updateFields();
    console.log("passive " + passiveAmt);
    
}


function reset(){
    document.querySelector('.add__type').value = "inc";
    document.querySelector('.add__description').value = null;
    document.querySelector('.add__value').value = null;
    document.querySelector('.add__act_pas').value ="act";
}


/// developing ///////////////////////////////////
function calcMonth(){
    var monthCount = 0;
    calculated = activeAmt + passiveAmt;
    for(var i = 1 ; calculated < target ; i++){
        calculated += activeAmt;
        monthCount = i+1;
    }
    document.querySelector('.estMonth').textContent = monthCount;
    //console.log("calculates " + calculated);
    //console.log("count " + monthCount);
}
///////////////////////////////////////////////

function incomeList(description, value,type){
var id = 0;
var html, newHtml;

if(type === 'act'){
    html = '<div class="item clearfix" id="inc-%id%-act"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+%value% <small>A</small></div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
}else if(type === 'pas'){
    html = '<div class="item clearfix" id="inc-%id%-pass"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+%value% <small>P</small></div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
}

newHtml = html.replace('%id%',value);
newHtml = newHtml.replace('%description%',description);
newHtml = newHtml.replace('%value%', value);

document.querySelector('.income_list').insertAdjacentHTML('beforeend', newHtml);
}

function expenseList(description, value,type){
var id = 0;
var html, newHtml;

if(type === 'act'){
    html = '<div class="item clearfix" id="exp-%id%-act"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">-%value% <small>A</small></div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
}else if(type === 'pas'){
    html = '<div class="item clearfix" id="exp-%id%-pass"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">-%value% <small>P</small></div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
}
newHtml = html.replace('%id%',value);
newHtml = newHtml.replace('%description%',description);
newHtml = newHtml.replace('%value%', value);

document.querySelector('.expenses_list').insertAdjacentHTML('beforeend', newHtml);
}


function updateFields(){
    document.querySelector('.budget__income--value').textContent = activeAmtInc;
    document.querySelector('.budget__expenses--value').textContent = activeAmtExp;
    document.querySelector('.budget__income--valuepass').textContent = passiveAmtInc;
    document.querySelector('.budget__expenses--valuepass').textContent = passiveAmtExp;
    console.log("activeAmtExp " + activeAmtExp);
    console.log("passiveAmtExp " + passiveAmtExp);
    
}




function ctrDeleteitem(event){
    var splitId,typeId,valueId,actPass;
    var del = (event.target.parentNode.parentNode.parentNode.parentNode.id);
    splitId = del.split('-');
    typeId = splitId[0];
    valueId = splitId[1];
    actPass = splitId[2];

    if(typeId==='inc' && actPass =='act'){
        activeAmt -= valueId;
        activeAmtInc -= valueId;
        calcMonth(); 

    }else if(typeId==='inc' && actPass =='pass'){
        passiveAmt -= valueId;
        passiveAmtInc -= valueId;
        calcMonth(); 

    }else if(typeId==='exp' && actPass =='act'){
        activeAmt += valueId;
        activeAmtExp -= valueId;
        calcMonth(); 

    }else if(typeId==='exp' && actPass =='pass'){
        passiveAmt += valueId;
        passiveAmtExp -= valueId;
        calcMonth(); 
    }
       
    updateFields();
    //console.log(del);
    document.getElementById(del).remove();
}
*/