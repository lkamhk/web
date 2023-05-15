'use strict'
let list
let ah
let am
let as
let noticeON = false
let selectedAudio = document.querySelector('#alarm1')
setInterval(() => {
	showTime()
}, 0)
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
	let Task_list = [
		[0, 19, "Test End"],
		[1, 19, "Test End"],
		[2, 19, "Test End"],
		[3, 29, "Test End"],
		[4, 54, "Test End"],
		[23, 54, "Test End"],
		[23, 55, "Test End"]
	];
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
