/*
Bogdan Stefurak
Mauro Arena
Manuel Chavarry
11/05/2023
1er ASIXcA
Codi JS per fer una web d'una alarma i d'una ruleta.
*/

let alarmListArr = [];
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("#btn-setAlarm");
let alarmCount = 0;
let alarmTime;
let ring = new Audio("audio/Alarm-ringtone.mp3");




function updateClock(){
    var now = new Date();
    var dname = now.getDay(),
        mo = now.getMonth(),
        dnum = now.getDate(),
        yr = now.getFullYear(),
        hou = now.getHours(),
        min = now.getMinutes(),
        sec = now.getSeconds(),
        pe = "AM";

        if(hou==0){
            hou = 12;
        }

        if(hou>12){
            hou -=12;
            pe = "PM";
        }

        Number.prototype.pad = function(digits){
            for(var n = this.toString(); n.length<digits; n=0+n);
            return n;
        }

        var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        var week = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
        var ids =["dayName", "month", "dayNum", "year", "hour", "minutes", "seconds", "period"];
        var values = [week[dname], months[mo], dnum.pad(2),yr,hou.pad(2),min.pad(2),sec.pad(2),pe];
        
        for(var i=0; i<ids.length;i++){
            document.getElementById(ids[i]).firstChild.nodeValue = values[i];
        }

        for(let i=0; i<alarmListArr.length;i++){
            if(alarmListArr[i]==`${hou.pad(2)}:${min.pad(2)}:${sec.pad(2)} ${pe}`){
                console.log("Alarm ringing...");
                ring.load();
                ring.play();
                document.querySelector("#stopAlarm").style.visibility= "visible";
            }
        }
}

function initClock() {
    updateClock();
    window.setInterval("updateClock()",1000);
}




for(let i=12; i>0;i--){
    i=i<10 ? "0"+i :i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i=59; i>=0;i--){
    i=i<10 ? "0"+i :i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i=2; i>0;i--){
    let ampm = i== 1? "AM":"PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}



function setAlarm(){
    document.querySelector("#alarm-h3").innerText = "Alarms";
    let time = `${selectMenu[0].value}:${selectMenu[1].value}:00 ${selectMenu[2].value}`;
    if(time.includes("setHour") || time.includes("setMinute") || time.includes("AM/PM")){
        alert("Ponga los valores en las casillas para la alarma");
    }else{
        alarmCount++;
        document.querySelector(".alarmList").innerHTML += `
        <div class="alarmLog" id="alarm${alarmCount}">
            <span id="span${alarmCount}">${time}</span>
            <button class="btn-delete" id="${alarmCount}" onClick="deleteAlarm(this.id)">Delete</button>
        </div>`;

        alarmTime = `${selectMenu[0].value}:${selectMenu[1].value}:00 ${selectMenu[2].value}`;
        alarmListArr.push(alarmTime);
        console.log(document.querySelector(".btn-delete").value);
    }

}

setAlarmBtn.addEventListener("click",setAlarm);


function deleteAlarm(click_id){
    var element = document.getElementById("alarm"+click_id);
    var deleteIndex = alarmListArr.indexOf(document.querySelector("#span"+click_id).innerText);
    alarmListArr.splice(deleteIndex,1);
    element.remove();
}

function stopAlarm(){
    ring.pause();
    document.querySelector("#stopAlarm").style.visibility= "hidden";
}





// Codigo modo nocturno

function toggleTheme() {
    const body = document.body;
    const sunIcon = document.querySelector(".icon-sun");
    const moonIcon = document.querySelector(".icon-moon");

    body.classList.toggle("light-theme");
    body.classList.toggle("dark-theme");

    if (body.classList.contains("light-theme")) {
        sunIcon.style.display = "inline";
        moonIcon.style.display = "none";
    } else {
        sunIcon.style.display = "none";
        moonIcon.style.display = "inline";
    }
}



// Alarma sonido tipo
const alarmSound = document.querySelector("#alarmSound");

// Añade un event listener al elemento select
alarmSound.addEventListener("change", function() {
    ring = new Audio(this.value);
});



//Codigo JS Ruleta

let wheel = document.querySelector('.wheel');
let spinBtn = document.querySelector('.spinBtn');
let winSound = document.getElementById('winSound');
let value = Math.ceil(Math.random() * 3600);

spinBtn.onclick = function(){
    wheel.style.transform = "rotate(" + value + "deg)";
    value += Math.ceil(Math.random() * 3600);
    setTimeout(function() {
        winSound.play();
    }, 5000);  // Asume que la animación de la ruleta dura 5 segundos
}




let colors1 = ["green", "blue", "yellow", "purple", "orange", "pink", "brown", "gray", "black"];
let colors2 = ["green", "blue", "yellow", "purple", "orange", "pink", "brown", "gray", "black"];
let colors3 = ["green", "blue", "yellow", "purple", "orange", "pink", "brown", "gray", "black"];
let colors4 = ["green", "blue", "yellow", "purple", "orange", "pink", "gray", "black","green","red","yellow"];
let colors5 = ["green", "blue","orange"]; // un arreglo con los colores a ciclar
let currentColor = 0; // un contador para realizar un seguimiento del índice actual del arreglo

setInterval(function() {
  // cambiar el color de fondo del elemento a través de los colores en el arreglo
  document.getElementById("Apartado").style.backgroundColor = colors1[currentColor];
  
  // actualizar el contador para pasar al siguiente color en el arreglo
  currentColor = (currentColor + 1) % colors1.length;
}, 1);

setInterval(function() {
  // cambiar el color de fondo del elemento a través de los colores en el arreglo
  document.getElementById("Apartador").style.backgroundColor = colors2[currentColor];
  
  // actualizar el contador para pasar al siguiente color en el arreglo
  currentColor = (currentColor + 1) % colors1.length;
}, 1);
setInterval(function() {
    // cambiar el color de fondo del elemento a través de los colores en el arreglo
    document.getElementById("Apartadorr").style.backgroundColor = colors2[currentColor];
    
    // actualizar el contador para pasar al siguiente color en el arreglo
    currentColor = (currentColor + 1) % colors2.length;
  }, 1);
  setInterval(function() {
    // cambiar el color de fondo del elemento a través de los colores en el arreglo
    document.getElementById("Apartadorr").style.backgroundColor = colors2[currentColor];
    
    // actualizar el contador para pasar al siguiente color en el arreglo
    currentColor = (currentColor + 1) % colors3.length;
  }, 1);

