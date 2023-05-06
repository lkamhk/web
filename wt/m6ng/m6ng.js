let localMode = localStorage.getItem("genMode")

if (!localMode) {
    localStorage.setItem("genMode", "allRandom")
    localMode = localStorage.getItem("genMode")
}

//screen
! function () {
    var viewport = document.getElementById('viewport')
    var dw = null
    var screenChange = document.getElementById('screen-change')
    function a () {
        if (document.body.clientHeight > document.body.clientWidth) {
            dw = 750
            screenChange.classList.remove('h')
            screenChange.classList.add('w')
        } else if (document.body.clientHeight < document.body.clientWidth) {
            dw = 1334
        }
        viewport.setAttribute('content', 'width=' + dw + ', user-scalable=no')
    }
    a()
    window.addEventListener("orientationchange", function () {
        if (window.orientation == 0) {
            screenChange.classList.remove('h')
            screenChange.classList.add('w')
            dw = 750
            viewport.setAttribute('content', 'width=' + dw + ', user-scalable=no')
        } else if (window.orientation == 90) {
            screenChange.classList.remove('w')
            screenChange.classList.add('h')
            dw = 1334
            viewport.setAttribute('content', 'width=' + dw + ', user-scalable=no')
        }
    }, false)
}(window)

let genMode = {
    allRandam: '',
    metaphysics: '',
}
let allNumArr = []
let resultArr = []
let finalResult = []

//switch mode
if (localMode == 'allRandom') {
    // creat number 1-49
    for (let i = 0; i < 49; i++) {
        allNumArr.push(i + 1)
    }
    finalResult = gen6Num(allNumArr)

    webRender()
    reRen()
}



//refresh number
const refreshBTN = document.querySelector('.refreshBTN')

refreshBTN.addEventListener('click', function () {
  
    if (localMode == 'allRandom') {
    finalResult = gen6Num(allNumArr)
    reRen()
    }

    if (localMode == 'metaphysics') {
        genControl()
        reRen()
        }
   
})




//gen a random 6 number
function gen6Num (allNumArr) {
    let result = []
    for (let i = allNumArr.length - 1; i > 0; i--) {
        let r = Math.floor(Math.random() * (i + 1));
        [allNumArr[i], allNumArr[r]] = [allNumArr[r], allNumArr[i]]
    }

    for (let i = 0; i < 6; i++) {
        let r = Math.floor(Math.random() * 49)


        while (result.includes(allNumArr[r])) {
            r = Math.floor(Math.random() * 49)
        }

        result.push(allNumArr[r])


    }

    return result
}

function genControl () {
    // creat number 1-49
    for (let i = 0; i < 49; i++) {
        allNumArr.push(i + 1)
    }

    

    //gen 6 set number
    for (let i = 0; i < 6; i++) {
        resultArr[i] = gen6Num(allNumArr)
        // console.log(resultArr[i])

    }

    function checkLuckyNumber (arr) {
        let myLuckyNumber = [1, 2, 3, 24, 15, 33]
        let allCount = []
        for (let i = arr.length - 1; i >= 0; i--) {
            let count = 0
            for (let j = 0; j <= 5; j++) {

                if (myLuckyNumber.includes(arr[i][j])) {
                    count++
                }

            }

            allCount[i] = count
            count = 0
        }
        // console.log(allCount)

        let bestResult = Math.max(...allCount)
        let selectNum = 0
        // console.log(bestResult)
        let countSameLN = 0
        for (let i = 0; i < allCount.length; i++) {
            if (allCount[i] == bestResult) {
                countSameLN++
                selectNum = i
            }

        }

        if (countSameLN > 1) {

            for (let i = 0; i < 6; i++) {
                resultArr[i] = gen6Num(allNumArr)

            }
            checkLuckyNumber(resultArr)
        }


        return arr[selectNum]
    }

    finalResult = checkLuckyNumber(resultArr)
    finalResult.sort((a, b) => { return a - b })
    // console.log(finalResult)

}

function webRender () {
    let Rtext = []
    for (let i = 1; i <= 6; i++) {

        Rtext[i] = document.querySelector(`.Rtext${i}`)
        Rtext[i].innerHTML = `<div class="wrapper"><div class="circle">
            </div>
            <div class="number${i}">${finalResult[i - 1]}</div></div>`
    }
}
function reRen () {
    let reText = []
    for (let i = 1; i <= 6; i++) {

        reText[i] = document.querySelector(`.number${i}`)
        reText[i].innerHTML = `
            <div class="number">${finalResult[i - 1]}</div></div>`
    }
}
