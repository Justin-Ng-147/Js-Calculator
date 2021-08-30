const buttons = document.querySelector('#buttons');
const screen = document.querySelector('#screen');
const decimalCutoff = 3;

let displayValue = '0';
let currentOp = null;
let num1 = 0;
let num2 = 0;
let numMode = true;

function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

function operate( a, b){
    a = Number(a);
    b = Number(b);
    
    return currentOp(a,b);
}

function roundDecimalSix(result){
    if(result.toString().split(".")[1] && result.toString().split(".")[1].length >decimalCutoff){
        // console.log(result.toString().split(".")[0].length)
        return result.toString().slice(0,result.toString().split(".")[0].length+decimalCutoff+1);
    }
    return result
}

function operateAction(operator){
    // console.log('test');
    if(numMode){
        if(currentOp){
            num2 = displayValue;
            let result = currentOp(num1,num2);
            displayValue =  roundDecimalSix(result);
            // displayValue = result;
            refreshView();
        }
        currentOp = operator;
        num1 = Number(displayValue);
        displayValue = 0;
        numMode=false;
    }
    else{
        currentOp = operator;
    }
}

function equalOp(){
    // console.log('test');
    if(numMode){
        if(currentOp){
            num2 = displayValue;
            let result = currentOp(num1,num2);
            displayValue =  roundDecimalSix(result);
            // displayValue = result;
            refreshView();
        }
        numMode = true;
        currentOp = null; 
    }
    else{
        displayValue = num1;
        refreshView();
        numMode = true;
        currentOp = null;   
    }
}

function addButtonEvents(){
    buttons.children[0].onclick = () => {
        displayValue = '0';
        currentOp = null;
        refreshView();
    };
    buttons.children[1].onclick = () => {
        // console.log(displayValue.length)
        if(displayValue.length==1) displayValue='0';
        if(displayValue!='0') displayValue = displayValue.slice(0,-1);
        refreshView();
    };
    for(let i = 2; i<buttons.children.length; i++){
        buttons.children[i].onclick = () =>{
            if(displayValue=='0') displayValue = buttons.children[i].innerHTML;
            else displayValue += buttons.children[i].innerHTML;
            refreshView();
            numMode = true;
        };
    }
    buttons.children[5].onclick = () => operateAction(divide);

    buttons.children[9].onclick = () => operateAction(multiply);

    buttons.children[13].onclick = () => operateAction(subtract);

    buttons.children[16].onclick = () => operateAction(add);

    buttons.children[17].onclick = () => equalOp();

}

function refreshView(){
    screen.innerHTML=displayValue;
}

function main(){
    refreshView()
    addButtonEvents();
}

document.onload = main();

    