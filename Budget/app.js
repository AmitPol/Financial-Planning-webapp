

var budgetController = (function () {

    var Expense = function (id, description, value) {

        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;

    };
    
    Expense.prototype.calcPercentage = function(totalIncome) {
        if (totalIncome > 0) {
        
            this.percentage = Math.round((this.value / totalIncome) * 100);
            
        } else {
            
            this.percentage = -1;
            
        }
        
    };
    
    Expense.prototype.getPercentage = function(){
        return this.percentage;
        
    };
    

    var Income = function (id, description, value) {

        this.id = id;
        this.description = description;
        this.value = value;

    };
    
    var calculateTotal = function(type) {
        
        var sum = 0;
        
        // add all values in the array depending on if it's 'exp' or 'inc'
        data.allItems[type].forEach(function(currentElement){
            sum += currentElement.value;
        });
        

        data.totals[type] = sum;
        
    };


    var data = {

        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }, 
        budget: 0,
        percentage: -1 
    };
            

    // create public method to allow other modules to add new items to the data structure
    return {
        addItem: function (type, desc, val) {
            var newItem, ID;

            // assign a unique id to each new expense or income item
            // ID = last ID + 1

            // create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            //writeStorage(ID,type,desc,val);
            // console.log('The new ID for this item is: ' + ID);

            // create new item based on 'inc' or 'exp' type
            if (type === "exp") {
                newItem = new Expense(ID, desc, val);
            } else if (type === "inc") {
                newItem = new Income(ID, desc, val);
            }

            // add new exp or inc to the end of the allItems.exp or allItems.inc array
            data.allItems[type].push(newItem);

            // return the new item
            return newItem;

        },
        
        // delete item public method
        deleteItem: function(type, id) {
            // declare the variables
            var ids, index;

            ids = data.allItems[type].map(function(currentElement){
                
                return currentElement.id;
                
            });
            

            index = ids.indexOf(id);

            
            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }

        },
        
        calculateBudget: function() {
            
            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            
            data.budget = data.totals.inc - data.totals.exp;
            
            if (data.totals.inc > 0){ 
                data.percentage = Math.round( (data.totals.exp / data.totals.inc) * 100 );
                
            } else {

                data.percentage = -1;
                
            }
            
        },
        
        calculatePercentages: function() {

            
            data.allItems.exp.forEach(function(currentVar){
                
                currentVar.calcPercentage(data.totals.inc);
                
            });
            
        },
        
        getPercentages: function() {
          
            var allPercentages = data.allItems.exp.map(function(currentEl){
                return currentEl.getPercentage();
            });
            
            // return the variable
            return allPercentages;
            
        },
        
        getBudget: function(){
            
            // this method will just return the budget items
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
            
        },
        writeStorage: function (type,description,value){
            //keyCount = localStorage.getItem('keycount');
            for(var i = 0; i < 100; i++){
                check = localStorage.getItem("budgetEntry"+i);
                if (!check){
                    localStorage.setItem('budgetEntry'+ i, type+"-"+description+"-"+value);
                    break;
                }
            }
        },
        // readStorage: function (){
        //     var split,type,des,val,Item,ID;
        //     for(var i= 0;i<50;i++){
        //         data = localStorage.getItem("budgetEntry"+i);
        //         if(data != null){
        //             split = data.split('-');
        //             ID = Number(split[0]);
        //             type = String(split[1]);
        //             des = split[2];
        //             val = Number(split[3]);
        //         }else if (data == null){
                    
        //             continue;
        //         }
        //         addItem(type,des,val);
        //         // // create new item based on 'inc' or 'exp' type
        //         // if (type == 'exp') {
        //         //     Item = new Expense(ID, des, val);
        //         //     data.allItems.exp.push(Item);
        //         // } else if (type === 'inc') {
        //         //     Item = new Income(ID, des, val);
        //         //     //sdata.allItems[inc].push(Item);
        //         // }
    
        //         // // add new exp or inc to the end of the allItems.exp or allItems.inc array
        //         // //data.allItems[type].push(Item);
    
        //         // // return the new item
        //         // return Item;
        //     }   
        // },

        testing: function () {
            console.log(data);
        }

    }
    
    

    // function writeStorage(ID,type,description,value){
    //     //keyCount = localStorage.getItem('keycount');
    //     for(var i = 0; i < 100; i++){
    //         check = localStorage.getItem("budgetEntry"+i);
    //         if (!check){
    //             localStorage.setItem('budgetEntry'+ i, ID+"-"+type+"-"+description+"-"+value);
    //             break;
    //         }
    //     }
    // }



})();




// UI CONTROLLER
var UIController = (function () {

    // create private variable/object to store DOM strings
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expPercentageLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    }; 

    // private function
    var formatNumber = function(num, type) {
        var numSplit, int, dec;

        num = Math.abs(num); 
        num = num.toFixed(2); 
        numSplit = num.split('.');
        int = numSplit[0];

        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
        }

        // find the decimal
        dec = numSplit[1];

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec; 

    };
    
    

    var nodeListForEach = function(list, callbackFn) {
                
                for (var i = 0; i < list.length; i++) {

                    callbackFn(list[i], i);    
                    
                }
                
                
    };


    return {
        getInput: function () {

            return { // return an object with three properties instead of having 3 separate variables
                type: document.querySelector(DOMstrings.inputType).value, // will be either income or expense
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value) // the reads a string, so need to convert to a number
            };

        },

        addListItem: function (obj, type) {
            
            // declare variables
            var html, newHtml, element;
            
            // create HTML string with placeholder text
            if (type === 'inc') {
                
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%-%val%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><span class="iconify" data-icon="ion-ios-close-circle-outline" data-inline="false"></span></i></button></div></div></div>'
                
            } else if (type === 'exp') {
                
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%-%val%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><span class="iconify" data-icon="ion-ios-close-circle-outline" data-inline="false"></span></i></button></div></div></div>'
                
            }
            
            // replace placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
            newHtml = newHtml.replace('%val%', obj.value);
            
            // insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);  
            
            
        },
        
        deleteListItem: function(selectorID) {
           
            var el = document.getElementById(selectorID); 
            
            el.parentNode.removeChild(el);
                
        },
        
        clearFields: function() {
            
            var fields, fieldsArray;
            
            fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);
            

            fieldsArray = Array.prototype.slice.call(fields);

            fieldsArray.forEach(function(currentValue, index, array){

                currentValue.value = "";
            });
            
            fieldsArray[0].focus();
            
        },
        
        displayBudget: function(obj) {
            var type;
            if (obj.budget > 0) {
                type = 'inc';
            } else {
                type = 'exp';
            }
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');
            
            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
                
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
            
        },
        
        
        displayPercentages: function(percentagesArr) {
            
            var fields = document.querySelectorAll(DOMstrings.expPercentageLabel); // this returns a node list
            
            
            nodeListForEach(fields, function(current, index){ 
                
                if (percentagesArr[index] > 0) {

                    // display percentages
                    current.textContent = percentagesArr[index] + '%';
                    
                } else {
                    
                    current.textContent = '---';
                    
                }
            
            });
            
            
        },
        
        
        displayMonth: function() {
            var now, year, month, months;
            
            
            now = new Date();

            months = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ];
            month = now.getMonth();
            year = now.getFullYear();
            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
        },
        
        changedType: function() {
          
            var fields = document.querySelectorAll(
                DOMstrings.inputType + ',' + 
                DOMstrings.inputDescription + ',' + 
                DOMstrings.inputValue);
            
            nodeListForEach(fields, function(current){
                current.classList.toggle('red-focus');
            });
            
            document.querySelector(DOMstrings.inputButton).classList.toggle('red');
            
        },


        getDOMstrings: function () {
            return DOMstrings;
        }

    };

})();


var controller = (function (budgetCntrl, UICntrl) {

    var setUpEventListeners = function () {

        var DOM = UICntrl.getDOMstrings();
        
        document.querySelector(DOM.inputButton).addEventListener('click', controlAddItem);

        document.addEventListener('keypress', function (event) {

            if (event.keyCode === 13 || event.which === 13) {
                controlAddItem();
            }

        });
        
    document.querySelector('.home').addEventListener('click', function() {
        location.href = "../home.html"; 
    })

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        
        document.querySelector(DOM.inputType).addEventListener('change', UICntrl.changedType);
 
    };

    
     var updateBudget = function(){
        
        budgetCntrl.calculateBudget();

        var budget = budgetCntrl.getBudget();
        
        UICntrl.displayBudget(budget);
        
    };
    
    
    var updateExpPercentages = function() {
        
        budgetCntrl.calculatePercentages();
        
        var percentages = budgetCntrl.getPercentages();
        
        UICntrl.displayPercentages(percentages);

    };


    var controlAddItem = function () {
        var input, newItem;
        input = UICntrl.getInput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            
            newItem = budgetCntrl.addItem(input.type, input.description, input.value);

            budgetCntrl.writeStorage(input.type, input.description, input.value);// write to local storage.

            UICntrl.addListItem(newItem, input.type);

            UICntrl.clearFields();

            updateBudget();

            updateExpPercentages();

        }

    };
    
    
    var ctrlDeleteItem = function(event){
        
        var itemID, splitID, type, ID,val;
        
        // use parentNode to traverse up the DOM and then get the unique #id#
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id; // target = i.ion-ios-close-outline
        
        
        if (itemID) {
            

            splitID = itemID.split('-');
            
            type = splitID[0];            
            ID = parseInt(splitID[1]); // use parseInt to convert the string '1' to number 1
            val = splitID[2];
        }

        budgetCntrl.deleteItem(type, ID);

        clearEntry(type,val)
        

        UICntrl.deleteListItem(itemID);

        updateBudget();

        updateExpPercentages();
        
        
    };

    function clearEntry(typeId,valueId){
        var split,type,des,val;
    
        for(var i= 0;i<50;i++){
            data = localStorage.getItem("budgetEntry"+i);
            if(data != null){
                split = data.split('-');
                type = split[0];
                des = split[1];
                val = Number(split[2]);
    
                if(type == typeId  && val == valueId){
                    localStorage.removeItem("budgetEntry"+i);
                }
            }else if (data == null){
                
                continue;
            }
        }    
    }

    readStorage = function (){
        var split,type,des,val,newItem;
        for(var i= 0;i<50;i++){
            data = localStorage.getItem("budgetEntry"+i);
            if(data != null){
                split = data.split('-');
                //ID = Number(split[0]);
                type = String(split[0]);
                des = split[1];
                val = Number(split[2]);
            }else if (data == null){
                
                continue;
            }
            newItem = budgetCntrl.addItem(type,des,val);

            UICntrl.addListItem(newItem, type);

            UICntrl.clearFields();

            updateBudget();
            
            updateExpPercentages();

        }   
    };
    

    return {
        init: function () {
            //console.log('Application has begun.');
            UICntrl.displayMonth();
            // set initial budget to zero upon application start
            UICntrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setUpEventListeners();
            readStorage();

        }
    }



})(budgetController, UIController);



// begin the app or nothing will ever run because the event listeners are in a private function

controller.init();