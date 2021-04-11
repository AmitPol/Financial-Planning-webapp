var amount,friends = 0;
var count = 1;
var flagTable = true;
var flagRow = false;

document.getElementById("btn").addEventListener('click',readInput)

function readInput(){
    
    amount = Number(document.querySelector('.bill_amount').value);
    friends = Number(document.querySelector('.friends').value)
    addEntry(amount,friends);
}


function createTable(){
    var table = '<div style="overflow-y:auto;"><table id="list"><tr><th id="name">Name</th><th id="amount">Amount</th><th id="percent">%</th></tr></table></div>'
    var adjustButton = '<div ><button id="adjustBtn">Adjust</button></div>'
    if (flagTable){
        document.querySelector('.box1').insertAdjacentHTML('beforeend', adjustButton);
        document.querySelector('.box1').insertAdjacentHTML('beforeend', table);
        document.getElementById("adjustBtn").addEventListener('click',adjust)

    }
}
function addEntry(amount,friends){
    var html, newHtml;
    var calc = Math.round(amount/friends);
    var i =1;
    var per = calculatePercentage(calc);
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
        newHtml = newHtml.replace('%calculated%',calc);
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
    //console.log(del);
    //document.getElementById("1").remove();
}
function calculatePercentage(cut){
    return Math.round((cut * 100)/amount);
}



function adjust(){
    var newAmount = amount;
    var rowCount =0;
    //var oldVal = element.defaultValue;
    for (var i =1; i <= friends; i++){
        
        var val = document.querySelector(".amount"+i).value;
        //oldVal = val;
        if(val > 0 && val <= newAmount){
            document.querySelector('.per'+i).textContent = calculatePercentage(val)+"%";
            newAmount -= val;
            rowCount++
            //document.querySelector(".amount"+i).defaultValue = val;
            
            //console.log(newAmount);
        }
        else if (val > newAmount){
            alert("You are contributing more than required")
            document.querySelector(".amount"+i).value = "";
            document.querySelector(".amount"+i).placeholder = "";
            document.querySelector('.per'+i).textContent = "";
            //break;
        }
        
    }
    adjustRemaining();

    function adjustRemaining(){
        console.log(rowCount);
        rowCount = friends - rowCount;
        var newCalc = Math.round(newAmount / rowCount);
        for(var i=1; i<= friends; i++){
            var val = document.querySelector(".amount"+i).value;
            if(!val){
                document.querySelector(".amount"+i).placeholder = newCalc;
                document.querySelector('.per'+i).textContent = calculatePercentage(newCalc)+"%";
            }
        }
    }
    //console.log(newAmount,rowCount);
}