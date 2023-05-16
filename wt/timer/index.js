'use strict'
//declare
let list
let ah
let am
let as
let noticeON = false
let selectedAudio = document.querySelector('#alarm1')
let Task_list = [
];

const addTaskHandle = document.querySelector('.addtask')
const addTaskMenu = document.querySelector('.addTaskMenu')
const addTaskbtn = document.querySelector('.add-btn')
const printlist = document.querySelector('.write-in-div')
const input_text = document.querySelector('#input-text')
const input_time = document.querySelector('#input-time')
const closemenubtn = document.querySelector('.close-menu-btn')

setInterval(() => {
	showTime()
}, 0)


//show and close add task menu
closemenubtn.addEventListener('click',function(){
	addTaskMenu.style.display = 'none';
})
let localTask = window.sessionStorage.userLoaclTask;
addTaskHandle.addEventListener('click',()=> { openaddTask()})
addTaskbtn.addEventListener('click',function(){

	if(input_time.value && input_text.value){
		let valueToNum = input_time.value.split(':');
		let newTask = [valueToNum[0],valueToNum[1],input_text.value];
		console.log(Task_list.includes([valueToNum[0],valueToNum[1],input_text.value]))
		
		if(!Task_list.includes(newTask)){
			Task_list.push(newTask)
			Task_list.sort()
			printTaskForItem()
			input_text.value = ''
		}

	}
	
	

})

function printTaskForItem(){
	let temp =''
	for (const key in Task_list) {
		temp += `<li class='id-${key}'><div class="write-in-time">${Task_list[key][0]}:${Task_list[key][1]}</div><div class="write-in-content">${Task_list[key][2]}</div><li>`
	}

		printlist.innerHTML = temp
	
}
function openaddTask(){
	addTaskMenu.style.display = 'block';

}

function showTime () {
	let Sdate = new Date()
	let h = Sdate.getHours() // 0 - 23 
	let m = Sdate.getMinutes() // 0 - 59
	let s = Sdate.getSeconds() // 0 - 59

	ah = h
	am = m
	as = s
	h = (h < 10) ? "0" + h : h
	m = (m < 10) ? "0" + m : m
	s = (s < 10) ? "0" + s : s
	let time = h + ":" + m + ":" + s + " "
	document.getElementById('showbox').innerText = time
	// if (h == 0 && m == 0 && s == 0 && w == 0) { fixtshow() }
	// if (h == 0 && m == 0 && s == 0 && w == 6) { fixtshow() }
	// if (h == 0 && m == 0 && s == 0 && w == 1) { fixtshow() }
	nextTaskf(ah, am, as)
}
function fixtshow () {
	let pdate = new Date()
	let sw = pdate.getDay() //0 - 6 (week)(0=sun,1=mon,6=sat etc.)
	pw = sw
	list = day_list
	for (y = 0; y < list.length; y++) {
		if (list[y][0] < 10) {
			list[y][0] = "0" + list[y][0]
		}
		if (list[y][1] < 10) {
			list[y][1] = "0" + list[y][1]
		}
	}
}

function nextTaskf (ah, am, aw, as) {

	list = Task_list;
	let x;
	let haveNextTask = [];
	let temp;

	//print Task and match task to notice
	for (x = 0; x < list.length; x++) {

		if (list[x][0] == ah && list[x][1] == am) {
			audioP()
			if (noticeON)
				notifyMe(list[x][2])
		}

			if (list[x][0] > ah) {
				
				document.getElementById("nextTask").innerText =  list[x][0] + ":" + list[x][1] + " " + list[x][2]
				temp = list[x][0] + ":" + list[x][1] + " " + list[x][2]
				
					haveNextTask.push(temp)
				
				if (haveNextTask.length > 1) {		
					document.getElementById("pastTaskTittle").hidden = false		
					document.getElementById("pastTask").innerText = haveNextTask[1]
					console.log(haveNextTask)
					
					haveNextTask.shift()
					console.log(haveNextTask)
					// document.getElementById("pastTask").innerText =  ( list[x - 1][0] + ":" + list[x - 1][1] + " " + list[x - 1][2] ) 
				}else{
					document.getElementById("pastTaskTittle").hidden = true
				}
				
				break
			} else if (list[x][0] == ah) {
			if (list[x][1] > am) {
				document.getElementById("nextTask").innerText = list[x][0] + ":" + list[x][1] + " " + list[x][2]
				temp = list[x][0] + ":" + list[x][1] + " " + list[x][2]
				
					haveNextTask.push(temp)
				
				if (haveNextTask.length > 1) {		
					document.getElementById("pastTaskTittle").hidden = false		
					document.getElementById("pastTask").innerText = haveNextTask[x - 1]
					haveNextTask.shift()
					// document.getElementById("pastTask").innerText =  ( list[x - 1][0] + ":" + list[x - 1][1] + " " + list[x - 1][2] ) 
				}else{
					document.getElementById("pastTaskTittle").hidden = true
				}					
				break
			}
		}
	}
}
//audio's  initial , change , control 
const playAudio = document.querySelector('.playAudio')
playAudio.addEventListener('click', () => tryAudio())
const stopAudio = document.querySelector('.stopAudio')
stopAudio.addEventListener('click', () => selectedAudio.pause())
const changeAudio = document.querySelector('#alarm-clock')
changeAudio.addEventListener('change', (e) => {
	selectedAudio = document.querySelector(`#${e.target.value}`)
})
function tryAudio () {
	selectedAudio.play()
}
function audioP () {
	let adate = new Date()
	let vs = adate.getSeconds() // 0 - 59
	if (vs >= 0 && vs < 3) {
		selectedAudio.play()
	}
}
function notifyMe (ntTask) {
	let adate = new Date()
	let vs = adate.getSeconds() // 0 - 59
	// Let's check if the browser supports notifications
	if (!("Notification" in window)) {
		alert("This browser does not support desktop notification")
	}
	// Let's check whether notification permissions have already been granted
	else if (Notification.permission === "granted" && vs >= 0 && vs < 1) {
		// If it's okay let's create a notification
		let notification = new Notification(ntTask)
	}
	// Otherwise, we need to ask the user for permission
	else if (Notification.permission !== "denied") {
		Notification.requestPermission().then(function (permission) {
			// If the user accepts, let's create a notification
			if (ntTask)
				if (permission === "granted" && vs >= 0 && vs < 1) {
					let notification = new Notification(ntTask)
				}
		})
	}
}
