const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const slipName = document.getElementById('slipName');
const resultText = document.getElementById('resultText');
var noOfTries = 0;
var slips = [];

resultText.style.visibility = 'hidden';
function AddChoice() {
    if (inputBox.value.trim() === '') {
        alert("You must write something!");
    }
    else {
        if (slips.indexOf(inputBox.value.trim()) > -1) {
            alert("Item already in the list. Please give another name.")
        }
        else {
            let li = document.createElement("li");
            li.innerHTML = inputBox.value;
            listContainer.appendChild(li);
            let span = document.createElement("span");
            span.innerHTML = '\u00d7';
            li.appendChild(span);
            slips.push(inputBox.value);
            console.log(slips);
        }
    }
    inputBox.value = '';
    saveData();
}

function PickSlip() {
    if (slips.length == 0) {
        alert('Your list is empty. Please list down your slips.')
    }
    else if (localStorage.getItem('tries') === '3') {
        alert('The maximum limit for picking slips is 3. You have reached your limit. Please clear the list and try with another list.')
    } else if (slips.length < 3) {
        alert('Minimum number of slips is 3.')
    }
    else {
        const minNumber = 0;
        const maxNumber = slips.length - 1;
        const randomNumber = getRandomNumber(minNumber, maxNumber);
        // console.log(randomNumber);
        resultText.style.visibility = 'visible';
        slipName.innerText = slips[randomNumber];
        localStorage.setItem("tries", (++noOfTries).toString());
    }
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
listContainer.addEventListener('click', function (e) {
    let parentElement = e.target.parentElement;
    if (e.target.tagName === 'SPAN') {
        parentElement.remove();
        slips = slips.filter((item) => item !== parentElement.innerText.substring(0, parentElement.innerText.length - 1));
        if (slips.length == 0) {
            localStorage.setItem("tries", 0);
            slipName.innerText = '';
            resultText.style.visibility = 'hidden';
        }
    }
    console.log(slips);
    saveData();
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
    localStorage.setItem("slipsData", JSON.stringify(slips));
}

function getData() {
    listContainer.innerHTML = localStorage.getItem('data');
    const storedSlips = localStorage.getItem('slipsData');
    slips = storedSlips ? JSON.parse(storedSlips) : [];
}
getData();