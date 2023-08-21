
// Declarations
const currTime = document.querySelector('.timer');
const audio = new Audio('./Assets/Alarm.mp3');
audio.loop = true;
const Alarms = document.querySelector('.list');
const addAlarm = document.getElementById('btn1');
const allAlarms = []; // Stores all the alarms being set


let ringTimeout;

function ring() {
    audio.play();
    ringTimeout = setTimeout(() => {
        stopAlarm(); // Manually stop the alarm if it's not already stopped
        alert("Alarm turned off after 60 seconds.");
    }, 60000); // 60 seconds
}





// Shows the current time and triggers the alarm
function Timer() {
    let today = new Date();
    let hour = TimeHelp(today.getHours() % 12);
    if(hour==0){
       hour=12;// to handle edge case when its 12 am hour==0 so we make it 12;
    }
    const minutes = TimeHelp(today.getMinutes());
    const seconds = TimeHelp(today.getSeconds());
    const ampm = today.getHours() >= 12 ? 'PM' : 'AM'; // Determine AM/PM
    const Time = `${hour}:${minutes}:${seconds} ${ampm}`;
    console.log(Time);
    currTime.innerText = Time;

    if (allAlarms.includes(Time)) {
        ring();
    }
}

function TimeHelp(time) {
    if (time < 10) {
        return '0' + time;
    }
    return time;
}

//formatting time to make it in format of HH-MM-SS

function formatTime(time) {
    if (time < 10&& time.length<2) {
       return '0'+time;
    }
    else if(time.length>2){
        return time.replace(/^0+/, '');
    }
    return time;
}




//Stopping the Alaram

let Timeout = null;
function stopAlarm() {
    audio.pause();
    if (Timeout) {
    clearTimeout(Timeout);
    }
   
}


// deleting Alaram 
Alarms.addEventListener('click', e => {
    if (e.target.classList.contains("deleteAlarm")) {
       // console.log(allAlarms);
        e.target.parentElement.remove();
        console.log(allAlarms);
    }
});

//function to remove the alaram from allAlarams List so that we can add it again later
// when needed.

function remove(value) {
    console.log(value);
    let newList = allAlarms.filter(function(time) {
        const formattedTime = time.replace(/\s[AP]M$/, ''); 
        const formattedValue = value.replace(/\s[AP]M$/, ''); 
        return formattedTime !== formattedValue;
    });
    allAlarms.length = 0; // Clear contents
    allAlarms.push.apply(allAlarms, newList);
}


// Adds the new alaram to our HTML document its basically a list item.
function addNewAlarm(newAlarm) {
    console.log(newAlarm)
    const html = 
    `<li class = "timeList">        
        <span class="time">${newAlarm}</span>
        <button class="deleteAlarm" onclick = "remove(this.value)" value=${newAlarm}>Delete Alarm</button>       
    </li>`
    Alarms.innerHTML += html
};


// Adding  new Alarm to Alarm list and also calling addnewAlarm function to make changes to List of Upcoming Alarms.
addAlarm.addEventListener('click', event => {
    event.preventDefault();

    let hourInput = document.getElementById('hour');
    let minuteInput = document.getElementById('min');
    let secondInput = document.getElementById('sec');
    let ampmInput = document.getElementById('ampm');

    let hour = formatTime(hourInput.value);
    let minute = formatTime(minuteInput.value);
    let second = formatTime(secondInput.value);
    let ampm = ampmInput.value;
   
    if (hour == '0') {
        hour='00'
    }
    if (minute == '0') {
        minute='00'
    }
    if (second == '0') {
        second = '00'
    }
    if (isValidTime(hour, minute, second, ampm)) {
        const newAlarm = `${hour}:${minute}:${second} ${ampm}`;
        console.log(newAlarm);
        if (!allAlarms.includes(newAlarm)) {
            allAlarms.push(newAlarm);
            addNewAlarm(newAlarm);
            hourInput.value = '';
            minuteInput.value = '';
            secondInput.value = '';
            ampmInput.value = 'AM';
        } else {
            alert(`Alarm for ${newAlarm} already set.`);
        }
    } else {
        alert("Invalid Time Entered");
    }
});

// Function to check if the entered time is valid
function isValidTime(hour, minute, second, ampm) {
   
    let res= (hour >= 1 && hour <= 12) && (minute >= 0 && minute <= 59) && (second >= 0 && second <= 59) && (ampm === 'AM' || ampm === 'PM');
    
     return res;
}




// Calls updateTime() every second
setInterval(Timer, 1000);
