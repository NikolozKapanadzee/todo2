let input = document.getElementById("search-input");
let addBtn = document.getElementById("add-btn");
let listContainer = document.querySelector(".list-container");

listContainer.innerHTML = localStorage.getItem("value");

addBtn.addEventListener("click", () => {
    if (input.value === '') {
        alert("You have to write something");
    } else {
        createElements();
        saveData();
    }
});
function createElements() {
    let li = document.createElement("li");
    let addedList = document.createElement("div");
    let leftSide = document.createElement("div");
    let taskAdditionTime = document.createElement("p");
    let rightSide = document.createElement("div");
    let checkedDivSec = document.createElement("div");
    let checkedIcon = document.createElement("img");
    let trash = document.createElement("img");
    li.classList.add("checked");
    li.textContent = input.value;
    addedList.classList.add("added-list");
    leftSide.classList.add("left-side");
    taskAdditionTime.classList.add("task-addition-time");
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let AmOrPm = hours >= 12 ? "PM" : "AM";
    hours = hours > 12 ? hours % 12 : hours === 0 ? 12 : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let finalTime = `${hours}:${minutes} ${AmOrPm}`;
    taskAdditionTime.textContent = `today at ${finalTime}`;
    rightSide.classList.add("right-side");
    checkedDivSec.classList.add("checked-div-sec");
    checkedIcon.src = "./images/Vector.svg";
    trash.src = "./images/akar-icons_trash-can.svg";
    checkedDivSec.appendChild(checkedIcon);
    rightSide.appendChild(checkedDivSec);
    rightSide.appendChild(trash);
    leftSide.appendChild(li);
    leftSide.appendChild(taskAdditionTime);
    addedList.appendChild(leftSide);
    addedList.appendChild(rightSide);
    listContainer.appendChild(addedList);
    checkedDivSec.addEventListener("click", () => {
        let isChecked = checkedDivSec.classList.contains("checkedSec");
        if (isChecked) {
            checkedDivSec.classList.remove("checkedSec");
            li.style.textDecoration = "none";
        } else {
            checkedDivSec.classList.add("checkedSec");
            li.style.textDecoration = "line-through";
        }
        saveData();
    });
    trash.addEventListener("click", () => {
        listContainer.removeChild(addedList);
        saveData();
    });
    input.value = "";
}
function saveData() {
    localStorage.setItem("value", listContainer.innerHTML);
}
function getTime() {
    let dateSec = new Date();
    let hoursSec = dateSec.getHours();
    let minutesSec = dateSec.getMinutes();
    let daySec = dateSec.getDay();
    let dateNum = dateSec.getDate();
    let AmOrPm;
    if (hoursSec >= 12) {
        AmOrPm = "PM";
    } else {
        AmOrPm = "AM";
    }
    if (hoursSec > 12) {
        hoursSec = hoursSec % 12;
    } else if (hoursSec === 0) {
        hoursSec = 12;
    }
    if (minutesSec < 10) {
        minutesSec = "0" + minutesSec;
    }
    let dayName;
    if (daySec === 0) {
        dayName = "Sun";
    } else if (daySec === 1) {
        dayName = "Mon";
    } else if (daySec === 2) {
        dayName = "Tue";
    } else if (daySec === 3) {
        dayName = "Wed";
    } else if (daySec === 4) {
        dayName = "Thu";
    } else if (daySec === 5) {
        dayName = "Fri";
    } else if (daySec === 6) {
        dayName = "Sat";
    }
    let mainTime = document.createElement("div");
    mainTime.classList.add("time-div");
    let days = document.createElement("p");
    days.classList.add("day");
    days.textContent = `${dayName} ${dateNum}`;
    let hr = document.createElement("h1");
    hr.classList.add("hr");
    hr.textContent = `${hoursSec}:${minutesSec} ${AmOrPm}`;
    mainTime.textContent = "";
    mainTime.appendChild(days);
    mainTime.appendChild(hr);
    let main = document.querySelector(".main");
    main.appendChild(mainTime);
}
getTime();
setInterval(getTime, 60000);