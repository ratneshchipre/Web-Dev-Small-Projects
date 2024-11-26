import { Country_List } from "./countries.js";

const amountInput = document.querySelector('.input');
const fromCurr = document.querySelector('.from select');
const toCurr = document.querySelector('.to select');
const exImg = document.querySelector('#exchangeImg');
const exRateTxt = document.querySelector('.output');
const getExchangeBut = document.querySelector('.exchangeButton');

const apiKey = "f05eb049804eca7db2a7c91e";

[fromCurr, toCurr].forEach((select, i) => {
    for (let currCode in Country_List) {
        const selected = (i === 0 && currCode === "USD") || (i === 1 && currCode === "INR") ? "selected" : "";
        const optionTag = `<option value="${currCode}" ${selected}>${currCode}</option>`
        select.insertAdjacentHTML("beforeend", optionTag);
    }
    
    select.addEventListener("change", () => {
        const code = select.value;
        const imgTag = select.parentElement.querySelector("img");
        imgTag.src = `https://flagsapi.com/${Country_List[code]}/flat/64.png`;
    });
})

getExchangeBut.addEventListener("click", (e) => {
    if (amountInput.value === "" || amountInput.value === "0") {
        amountInput.value = 1;
        amountInput = 1;
    }
    e.preventDefault();
    getExchangeRate();
});

window.addEventListener("load", () => {
    getExchangeRate();
});

async function getExchangeRate() {
    const amount = amountInput.value || 1;
    exRateTxt.innerText = "Getting Exchange Rate...";

    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurr.value}`);
        const result = await response.json();
        const exchangeRate = result.conversion_rates[toCurr.value];
        const totalExchangeRate = (amountInput.value * exchangeRate).toFixed(2);
        exRateTxt.innerText = `${amountInput.value} ${fromCurr.value} = ${totalExchangeRate} ${toCurr.value}`
    } catch (error) {
        exRateTxt.innerText = "Something went wrong...";
    };

}

exImg.addEventListener("click", () => {
    [fromCurr.value, toCurr.value] = [toCurr.value, fromCurr.value];
    [fromCurr, toCurr].forEach((select) => {
        const code = select.value;
        const imgTag = select.parentElement.querySelector("img");
        imgTag.src = `https://flagsapi.com/${Country_List[code]}/flat/64.png`;
    });
    getExchangeRate();
});