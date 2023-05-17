'use strict'
//declare
let list;
let ah;
let am;
let as;
let noticeON = false;
let Task_list = [];
const winWidth = window.innerWidth;
const winHeight = window.innerHeight;
// let selectedAudio = document.querySelector('#alarm1');
// const playAudio = document.querySelector('.playAudio');
// const stopAudio = document.querySelector('.stopAudio');
// const changeAudio = document.querySelector('#alarm-clock');
const addTaskHandle = document.querySelector('.addtask');
const addTaskMenu = document.querySelector('.addTaskMenu');
const addTaskbtn = document.querySelector('.add-btn');
const printlist = document.querySelector('.write-in-div');

const input_text = document.querySelector('#input-text');
const input_time = document.querySelector('#input-time');
const closemenubtn = document.querySelector('.close-menu-btn');


setInterval(() => {
  showTime()
}, 0)

//show and close add task menu
closemenubtn.addEventListener('click', function () {
  addTaskMenu.style.display = 'none'
})
let localTask = window.sessionStorage.userLoaclTask
addTaskHandle.addEventListener('click', () => {
  addTaskMenu.style.display = 'block'
})
//add task
addTaskbtn.addEventListener('click', function () {
  if (input_time.value && input_text.value) {
    let valueToNum = input_time.value.split(':')
    let newTask = [valueToNum[0], valueToNum[1], input_text.value]

    if (!Task_list.includes(newTask)) {
      Task_list.push(newTask)
      Task_list.sort()
      printTaskForItem()
      input_text.value = ''
    }
  }
})

function printTaskForItem() {
  let temp='';
  for (const key in Task_list) {
    
  temp += `<li class='id-${key}' onClick='delTask(this.className)'><div class="write-in-time">${Task_list[key][0]}:${Task_list[key][1]}</div><div class="write-in-content">${Task_list[key][2]}</div></li>`
  
    
  }

  printlist.innerHTML = temp
}

//delect task
function delTask(n) {
  let str = n.split('-')
  str[1] = Number(str[1])
  Task_list.splice(str[1], 1)
  Task_list.sort()
  printTaskForItem()
}

function showTime() {
  let Sdate = new Date()
  let h = Sdate.getHours() // 0 - 23
  let m = Sdate.getMinutes() // 0 - 59
  let s = Sdate.getSeconds() // 0 - 59

  ah = h
  am = m
  as = s
  h = h < 10 ? '0' + h : h
  m = m < 10 ? '0' + m : m
  s = s < 10 ? '0' + s : s
  let time = h + ':' + m + ':' + s + ' '
  document.getElementById('showbox').innerText = time

  nextTaskf(ah, am, as)
}


//check have task?
function nextTaskf(ah, am, aw, as) {
  list = Task_list
  let x
  let haveNextTask = []
  let temp

  if (!Task_list[0]) {
    document.getElementById('nextTask').innerText = 'Click + to add task'
  }

  //print Task and match task to notice

  for (x = 0; x < list.length; x++) {
    if (list[x][0] == ah && list[x][1] == am) {
      audioP()
      if (noticeON) {
        notifyMe(list[x][2])
      }
      Task_list.splice(x, 1)
      Task_list.sort()
      printTaskForItem()
    }

    if (list[x][0] > ah) {
      document.getElementById('nextTask').innerText =
        list[x][0] + ':' + list[x][1] + ' ' + list[x][2]
      temp = list[x][0] + ':' + list[x][1] + ' ' + list[x][2]

      haveNextTask.push(temp)

      if (haveNextTask.length > 1) {
        document.getElementById('pastTaskTittle').hidden = false
        document.getElementById('pastTask').innerText = haveNextTask[1]
        console.log(haveNextTask)

        haveNextTask.shift()
        console.log(haveNextTask)
        // document.getElementById("pastTask").innerText =  ( list[x - 1][0] + ":" + list[x - 1][1] + " " + list[x - 1][2] )
      } else {
        document.getElementById('pastTaskTittle').hidden = true
      }

      break
    } else if (list[x][0] == ah) {
      if (list[x][1] > am) {
        document.getElementById('nextTask').innerText =
          list[x][0] + ':' + list[x][1] + ' ' + list[x][2]
        temp = list[x][0] + ':' + list[x][1] + ' ' + list[x][2]

        haveNextTask.push(temp)

        if (haveNextTask.length > 1) {
          document.getElementById('pastTaskTittle').hidden = false
          document.getElementById('pastTask').innerText = haveNextTask[x - 1]
          haveNextTask.shift()
          // document.getElementById("pastTask").innerText =  ( list[x - 1][0] + ":" + list[x - 1][1] + " " + list[x - 1][2] )
        } else {
          document.getElementById('pastTaskTittle').hidden = true
        }
        break
      }
    }
  }
}

//audio's  initial , change , control
let selectedAudio = document.querySelector('#alarm1');
const playAudio = document.querySelector('.playAudio');
const stopAudio = document.querySelector('.stopAudio');


// playAudio.addEventListener('click', () => tryAudio())
stopAudio.addEventListener('click', () => selectedAudio.pause())


function onchangeAudio(n){
    if (selectedAudio) selectedAudio.pause()
  selectedAudio = document.querySelector(`${n}`)
  tryAudio()
}
function tryAudio() {
  selectedAudio.play()
}
function audioP() {
  let adate = new Date()
  let vs = adate.getSeconds() // 0 - 59
  if (vs >= 0 && vs < 3) {
    selectedAudio.play()
  }
}

//notice on desktop
const noticeBTN = document.querySelector('.noticeBTN')

noticeBTN.addEventListener('click', function () {
  if (!noticeON) {
    if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(function () {
        noticeON = true
        noticeBTN.classList.add('on')
      })
    } else if (Notification.permission === 'granted') {
      noticeON = true
      noticeBTN.classList.add('on')
    }
  } else if (noticeON) {
    noticeON = false
    // Notification.permission = "denied";
    noticeBTN.classList.remove('on')
  }
})

function notifyMe(ntTask) {
  let adate = new Date()
  let vs = adate.getSeconds()

  if (!('Notification' in window)) {
    alert('This browser does not support desktop notification')
  } else if (Notification.permission === 'granted' && vs >= 0 && vs < 3) {
    let notification = new Notification(ntTask)
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(function (permission) {
      if (ntTask)
        if (permission === 'granted' && vs >= 0 && vs < 3) {
          let notification = new Notification(ntTask)
        }
    })
  }
}

