const mode = document.querySelector(".mode");
const input = document.querySelector("input");
const tickCircle = document.querySelector(".circle");
const planArea = document.querySelector(".plan");
const leftDoesCounter = document.querySelector(".dos_left");
const showAll = document.querySelector("#all");
const filterActive = document.querySelector("#active");
const filterCompleted = document.querySelector("#completed");
const clearCompleted = document.querySelector("#clear_completed");
const circleIcon = document.querySelector(".circle_icon");
const errorPanel = document.querySelector(".error_panel");

let chosen = "all";

let data = [];
let filteredArray = [];
let checkDivs;
let checkIcons;
let descriptions;
let crossIcons = [];
let counter = 0;

class Do {
    constructor(text, completed,) {
        this.text = text;
        this.completed = completed;
    }
}

function ragaca() {
    for (let i = 0; i < filteredArray.length; i++) {
        planArea.innerHTML += `<div class="single_do">
        <div class="check_div ${filteredArray[i].completed == true ? "checked" : ""}"><img src="./images/icon-check.svg" alt="" class="check_icon ${filteredArray[i].completed == true ? "show" : ""}"></div>
        <p class="description ${filteredArray[i].completed == true ? "done" : ""}">${filteredArray[i].text}</p>
        <img src="./images/icon-cross.svg" alt="" class="cross_icon">
        </div>`
    }
}

function createDoDiv(filter) {
    planArea.innerHTML = null;
    if (filter == "all") {
        filteredArray = data;
        ragaca();
    } else if (filter == "active") {
        filteredArray = data.filter((element) => element.completed == false);
        ragaca();
    } else {
        filteredArray = data.filter((element) => element.completed == true);
        ragaca();
    }
}

tickCircle.addEventListener("click", function () {
    tickCircle.classList.toggle("checked");
    circleIcon.classList.toggle("show");
    input.focus();
})

let does;
input.addEventListener("keypress", function (e) {
    errorPanel.textContent = ""
    let value = input.value;
    let completed = true;
    if (tickCircle.className != "circle checked") {
        completed = false;
    }
    if (value) {
        if (e.keyCode == 13) {
            does = [];
            for (let k = 0; k < data.length; k++) {
                does.push(data[k].text)
            }
            if (does.includes(value)) {
                errorPanel.textContent = "This do already exists!"
                setTimeout(() => {
                    errorPanel.textContent = ""
                }, 1000);
            } else {
                data.push(new Do(value, completed));
                createDoDiv(chosen);
                input.value = "";
                tickCircle.classList.remove("checked");
                circleIcon.classList.remove("show");

                if (data[data.length - 1].completed == false) {
                    counter++
                    leftDoesCounter.textContent = counter
                }

                attachCheckListeners();

                attachDeleteListeners();
            }

            console.log(does);
            console.log(data);

        }
    }

})

function attachCheckListeners() {
    checkIcons = document.querySelectorAll(".check_icon");
    descriptions = document.querySelectorAll(".description");
    checkDivs = document.querySelectorAll(".check_div");
    crossIcons = document.querySelectorAll(".cross_icon")


    for (let i = 0; i < checkDivs.length; i++) {
        checkDivs[i].addEventListener("click", function () {
            checkDoes(i);
        })
    }
}

function checkDoes(index) {
    checkDivs[index].classList.toggle("checked");
    checkIcons[index].classList.toggle("show");
    descriptions[index].classList.toggle("done");

    if (checkDivs[index].className == "check_div checked") {
        counter--
    } else {
        counter++
    }

    leftDoesCounter.textContent = counter


    for (let x = 0; x < data.length; x++) {
        if (data[x].text == descriptions[index].textContent) {
            if (data[x].completed == false) {
                data[x].completed = true
            } else {
                data[x].completed = false
            }
        }
    }

}

attachCheckListeners();

function all() {
    filterActive.classList.remove("active");
    filterCompleted.classList.remove("active");
    showAll.classList.add("active");
    planArea.innerHTML = null;
    filteredArray = data;

    ragaca();
    attachCheckListeners();
    attachDeleteListeners();
    chosen = "all";
}
showAll.addEventListener("click", all)

function filter1() {
    filterCompleted.classList.remove("active");
    showAll.classList.remove("active");
    filterActive.classList.add("active");
    planArea.innerHTML = null;

    filteredArray = data.filter((element) => element.completed == false);
    ragaca();

    attachCheckListeners();
    attachDeleteListeners();
    chosen = "active"
}
filterActive.addEventListener("click", filter1)

function filter2() {
    showAll.classList.remove("active");
    filterActive.classList.remove("active");
    filterCompleted.classList.add("active");
    planArea.innerHTML = null;
    filteredArray = data.filter((element) => element.completed == true);
    ragaca();
    chosen = "completed"

    attachCheckListeners();
    attachDeleteListeners();
}

filterCompleted.addEventListener("click", filter2)

clearCompleted.addEventListener("click", function () {
    filteredArray = data.filter((element) => element.completed == false);
    planArea.innerHTML = null;
    data = filteredArray;
    all();
})




function deleteDo(index) {
    if (filteredArray[index].completed == false) {
        counter--;
        leftDoesCounter.textContent = counter;
    }
    filteredArray.splice(index, 1)
    for (let j = 0; j < data.length; j++) {
        if (data[j].text == descriptions[index].textContent) {
            data.splice(j, 1);
        }
    }

    planArea.innerHTML = null;
    ragaca();
    attachDeleteListeners();
}

function attachDeleteListeners() {
    crossIcons = document.querySelectorAll(".cross_icon");
    descriptions = document.querySelectorAll(".description");
    for (let i = 0; i < crossIcons.length; i++) {
        crossIcons[i].addEventListener("click", function () {
            deleteDo(i);
        });
    }
}

attachDeleteListeners();

mode.addEventListener("click", function () {
    const container = document.querySelector(".container");
    container.classList.toggle("cont_light");
    const inputDiv = document.querySelector(".input");
    const lower = document.querySelector(".lower");
    inputDiv.classList.toggle("dark_div");
    lower.classList.toggle("dark_div");
    input.classList.toggle("dark_div");
    const ul = document.querySelector("ul");
    ul.classList.toggle("dark_div");
    const headerImg = document.querySelector("#header");

    if (headerImg.src.includes('light')) {
        headerImg.src = "./images/bg-desktop-dark.jpg"
    } else {
        headerImg.src = "./images/bg-desktop-light.jpg"
    }

    const modeIcon = document.querySelector(".mode_icon")
    if (modeIcon.src.includes("moon")) {
        modeIcon.src = './images/icon-sun.svg'
    } else {
        modeIcon.src = './images/icon-moon.svg'
    }
})