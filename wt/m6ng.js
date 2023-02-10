 
    let allNumArr = [];
    let resultArr = [];
    // creat number 1-49
    for(let i = 0; i <49 ; i++)
    {             
       allNumArr.push(i+1)
    }

    //gen a random 6 number
    function gen6Num(allNumArr){
        let result = [];
        for(let i = allNumArr.length - 1; i > 0 ; i--)
    {
       let r = Math.floor(Math.random() * (i + 1) );
        [allNumArr[i] , allNumArr[r]] = [allNumArr[r] , allNumArr[i]];
    }

    for(let i = 0; i < 6 ; i++)
    {
        let r = Math.floor(Math.random() * 49  );
        
            while(result.includes(allNumArr[r])){
                r = Math.floor(Math.random() * 49  );
            }
       
          result.push(allNumArr[r])
        
       
    }
    
    return result
    }

    //gen 6 set number
    for(let i = 0; i < 6 ; i++)
    {
        resultArr[i] = gen6Num(allNumArr)
        console.log(resultArr[i])
        
    }

   function checkLuckyNumber(arr){
     let myLuckyNumber = [6,10,19,25,33];
     let allCount =[];
    for(let i = arr.length - 1; i >= 0 ; i--)
    {
        let count = 0
        for(let j = 0; j <=  5; j++)
        {
            
        if(myLuckyNumber.includes(arr[i][j])){
            count++
        }

        }
       
        allCount[i] = count;
        count = 0;
    }
    console.log(allCount)
    
    let bestResult = Math.max(...allCount)
    let selectNum = 0;
    console.log(bestResult)
    let countSameLN = 0;
    for(let i = 0; i < allCount.length ; i++)
    {   
        if(allCount[i] == bestResult){
            countSameLN ++;
            selectNum = i;
        }
       
    }
    
   if (countSameLN > 1){

    for(let i = 0; i < 6 ; i++)
    {
        resultArr[i] = gen6Num(allNumArr)
        
    }
    checkLuckyNumber(resultArr)
   }

   
    return arr[selectNum]
   }

   let finalResult = checkLuckyNumber(resultArr);
finalResult.sort((a, b) => { return a - b } );
  console.log(finalResult);

  let Rtext = [];
    for(let i = 1; i <= 6 ; i++)
    {       
       
        Rtext[i] =  document.querySelector(`.Rtext${i}`)
        Rtext[i].innerHTML = `<div class="wrapper"><div class="circle">
        </div>
        <div class="number">${finalResult[i-1]}</div></div>`
    }


    function reloadPage(){
        window.location.reload();
    }
    const refreshBTN = document.querySelector('.refreshBTN')
    refreshBTN.addEventListener('click',function(){reloadPage()})
