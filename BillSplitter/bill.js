var amount,friends = 0;
var count = 1;
var flagTable = true;
var flagRow = false;


document.getElementById("btn").addEventListener('click',readInput)

document.querySelector('.home').addEventListener('click', function() {
    location.href = "../home.html"; 
})

function readInput(){
    
    amount = Number(document.querySelector('.bill_amount').value);
    friends = Number(document.querySelector('.friends').value)

    if(amount && friends ){
        addEntry(amount,friends);
    }
    
}


function createTable(){
    var table = '<div style="overflow-y:auto;"><table id="list"><tr><th id="name">Name</th><th id="amount">Amount</th><th id="percent">%</th></tr></table></div>'
    var adjustButton = '<div ><button id="adjustBtn">ADJUST</button></div>'
    if (flagTable){
        document.querySelector('.box1').insertAdjacentHTML('beforeend', adjustButton);
        document.querySelector('.box1').insertAdjacentHTML('beforeend', table);
        document.getElementById("adjustBtn").addEventListener('click',adjust)

    }
}
function addEntry(amount,friends){
    var html, newHtml;
    var calc = amount/friends;
    var i =1;
    var per = Math.round(calculatePercentage(calc)*100)/100;
    deleteTable();
    createTable();
    flagTable = false;
    flagRow = true;
    i=count;
    //console.log(amount,friends);
    for(i ; i <= friends; i++){
        html = '<div class="id" id=%ID%><td><input type="text" class="name1" placeholder=%friend%></td><td><input type="number" class="%amount%" placeholder=%calculated%></td><td class=%percent%>%per%</td></div>'

        newHtml = html.replace('%ID%',i);
        newHtml = newHtml.replace('%friend%',"Friend-"+i);
        newHtml = newHtml.replace('%amount%',"amount"+i);
        newHtml = newHtml.replace('%calculated%',Math.round(calc));
        newHtml = newHtml.replace('%percent%',"per"+i);
        //newHtml = newHtml.replace('%per%'+i , per+'%');
        count++;
        document.querySelector('#list').insertAdjacentHTML('beforeend', newHtml);
        document.querySelector('.per'+i).textContent = per+"%";
   }
}

function deleteTable(){
    if(flagRow){
        document.getElementById("list").remove();
        document.getElementById("adjustBtn").remove();
        count = 1
        flagTable =true;
    }
}
function calculatePercentage(cut){
    return (cut * 100)/amount;
}



function adjust(){
    var newAmount = amount;
    var rowCount =0;
    for (var i =1; i <= friends; i++){
        
        var val = document.querySelector(".amount"+i).value;
        if(val > 0 && val <= newAmount){
            document.querySelector('.per'+i).textContent = Math.round(calculatePercentage(val)*100)/100+"%";
            newAmount -= val;
            rowCount++
        }
        else if (val > newAmount){
            alert("You are contributing more than required")
            document.querySelector(".amount"+i).value = "";
            document.querySelector(".amount"+i).placeholder = "Your contribution";
            document.querySelector('.per'+i).textContent = "";
        }
        
    }
    
    adjustRemaining();

    function adjustRemaining(){
        console.log(rowCount);
        rowCount = friends - rowCount;
        var newCalc = newAmount / rowCount;
        for(var i=1; i<= friends; i++){
            var val = document.querySelector(".amount"+i).value;
            if(!val){
                document.querySelector(".amount"+i).placeholder = Math.round(newCalc);
                document.querySelector('.per'+i).textContent = Math.round(calculatePercentage(newCalc)*100)/100+"%";
            }
        }
    }
    //console.log(newAmount,rowCount);
}