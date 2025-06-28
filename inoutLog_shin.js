/*
const y = now.getFullYear();              // 2025
const m = String(now.getMonth()+1).padStart(2,'0');  // 06
const d = String(now.getDate()).padStart(2,'0');     // 26
const hh = String(now.getHours()).padStart(2,'0');   // 15
const mm = String(now.getMinutes()).padStart(2,'0'); // 14
const ss = String(now.getSeconds()).padStart(2,'0'); // 07

const stamp = `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
console.log(stamp);   // "2025-06-26 15:14:07" */

function dateFunc(){                // 시계함수
    // 1. 현재 날짜/시간을 구하기 : new Date() 객체
    const now = new Date();
    const y = now.getFullYear();     
    const m  = String(now.getMonth() + 1).padStart(2, '0');
    const d  = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    // 2. 
    const nowDate = document.querySelector('#nowDate');// (1)
    let html = `${y}-${m}-${d} ${hh}:${mm}:${ss}`; 
    nowDate.innerHTML = html; // (3)
} // func end 

// *** 1초 마다 시계함수 호출하기 ***
setInterval( dateFunc , 1000 );





function outAdd(){
     // 마크업객체 가져오기
    const pName = document.querySelector('#pName');         console.log(pName);             // 제품명 DOM 객체화
    const amount = document.querySelector('#amount');           console.log(amount);      // 제품 가격 DOM 객체화
    const date = document.querySelector('#date');          console.log(date);           // 제품사진 DOM 객체화        
    const area = document.querySelector('#area');
    
    // value값 가져오기
    const nameV = pName.value.trim();                                    // value 값 가져오기
    const amountV = amount.value.trim();                                  // value 값 가져오기
    const dateV = date.value;                                        // value 값 가져오기
    const areaV = area.value;
    let pno = '';    

    // localStorage에서 productList 배열 가져오기
    let inoutLog = JSON.parse(localStorage.getItem('inoutLog') || '[]');  // inoutLog JSON.parse해서 호출하기 || 없다면 '[]' 배열추가 
    
    let logco = inoutLog.length === 0 ? 1 : inoutLog[inoutLog.length -1 ].logco + 1;

    let productList = JSON.parse(localStorage.getItem('productList') || '[]');


    // value값 가져온거 객체화 하기
    if( nameV == '' || amountV == '' || dateV == '' || areaV == '' ){                            // value값 가져온거 객체화 하기
        alert('항목을 모두 입력해주십시오');                                  // 유효성 검사 : name, price가 공백이라면 제품 등록에 실패 알림창 띄우기
        return;                                                             // 함수 종료
    }
    
    let error = true;

    for(let i = 0; i < productList.length; i++){
        if(nameV == productList[i].pName){
            pno = productList[i].pno;
            error = false;

            productList[i].pAmount -= amountV ;
            localStorage.setItem( 'productList', JSON.stringify(productList) );
            stockList ();
            break;
        }
    }

    if(error == true){ alert('현재 등록 되어 있는 상품이 아닙니다.'); return;}
    

    // 객체 obj생성
    const obj = { logco , pno : pno , inOut : '출고' , pName : nameV , amount : Number(amountV) , area : areaV , date : dateV }          // obj 객체에 value값 넣기
    

    // 객체화한거 배열에 추가
    inoutLog.push(obj);                                                                      // inoutLog obj 객체 넣기

    // localStorage에 넣기
    localStorage.setItem( 'inoutLog', JSON.stringify(inoutLog) );                         // localStorage에 producList 넣어서 저장
    
    alert('제품이 등록되었습니다.');                                                      // 성공 표시

    pName.value = '';                                                               // value값 초기화
    amount.value = '';                                                                // value값 초기화
    date.value = '';                                                                // value값 초기화
    area.value = ''; 
    logListAdd();
    return;                                                                             // 함수종료

}

logListAdd();
function logListAdd(){

    let inoutLog = JSON.parse(localStorage.getItem('inoutLog') || '[]');  // inoutLog JSON.parse해서 호출하기 || 없다면 '[]' 배열추가 


    const inputLogTable = document.querySelector('#outTbody');                    // inputLogTable 선언 후 outTbody dom객체화

    let html ='' ;                                                                       // html 선언
    for(let i = 0 ; i < inoutLog.length ; i++){                                         // productList 배열 순회
        const Log = inoutLog[i];                                                // proArray로 간소화하기
        html += `<tr>   
                        <td> ${Log.logco} </td> <td> ${Log.inOut} </td> <td> ${Log.pName} </td> 
                        <td> ${Log.amount} </td> <td> ${Log.date} </td> <td> ${Log.area} </td>
                        <td><button onclick="inoutEdit(${Log.logco})"> 수정 </button>  
                </tr>`                                                                  // 추가하기 

    }

    inputLogTable.innerHTML = html;                                                  // inputLogTable html에 넣기
    //showProductList();

}

function inoutEdit(logco) {
    
    let productList = JSON.parse(localStorage.getItem('productList') || '[]');
    let inoutLog = JSON.parse(localStorage.getItem('inoutLog') || '[]');         // localStorage에서 productList 배열 가져오기

    for(let i = 0; i< inoutLog.length; i++){                                         // productList 배열 순회
        if(inoutLog[i].logco === logco){                                                 // 매개변수 pno랑 product[i].pno랑 값이 같다면?
            let newAmount = prompt('수정할 수량을 입력하세요.' , inoutLog[i].amount);
            if(newAmount == null){ return; }                                                             // prompt 값이 없다면 함수 종료
            if (!/^\d+$/.test(newAmount)){                                                               // 숫자가 아니라면
                alert('숫자만 입력하세요.');                                                             // 숫자 입력하라고 alert 해줌 
                return inoutEdit(logco);                                                          // 같은 상품 다시 재호출 = 반환값 함수;
            }
            
            newAmount = Number(newAmount.trim());

            if(!Number.isInteger(newAmount) || newAmount <= 0 ){                                // Number.isInteger() 은 정수인지 아닌지 검사하는 것 정수라면 true 정수가 아니라면 false 
                alert('올바른 숫자를 입력하세요.');                                                              // 정수 외 실수나 0 이하면 안됨 
                return inoutEdit(logco)
            }                                                                                                       
            if(newAmount == inoutLog[i].amount){ alert('수량이 동일합니다');                                 // 동일 수량을 입력했다면?
                return inoutEdit(logco);                                                          // 같은 상품 다시 재호출 = 반환값 함수;
            }
              
            
            const oldAmount = inoutLog[i].amount;
            const different = newAmount - oldAmount ;

            for(let j = 0; j < productList.length; j++){
                if (productList[j].pno === inoutLog[i].pno){
                    if (inoutLog[i].inOut === '입고'){
                        productList[j].pAmount += different;
                    } 
                    else{
                        productList[j].pAmount -= different;
                    }                 

                    if(productList[j].pAmount < 0){
                    alert('수정값 재고가 음수입니다. 다시 입력하세요.');
                    return inoutEdit(logco);
                    }

                    break;
                }
            }
            
            inoutLog[i].amount = newAmount;
            
            //////////////////////////////////////////////////////

            let ReasonEdit = prompt('입출고 사유를 입력하세요.' , inoutLog[i].area );                   // 입출고 사유 물어보는 prompt 함수 실행
            if (ReasonEdit.trim() === '') return;                                      // 아무 것도 입력 안하면 함수 종료
            inoutLog[i].area = ReasonEdit.trim();                                            // 함수의 입출사유 prompt 받은 값 넣기
            
            localStorage.setItem('productList', JSON.stringify(productList));
            localStorage.setItem('inoutLog', JSON.stringify(inoutLog));           // localStorage에 저장
            alert('[성공] 수정 되었습니다.');                          // 수정 성공 알림
            
            stockList();     // 재고 테이블 다시 그리기
            logListAdd();                                                           // productAddList 제품출력함수 렌더링                 
            return;                                                                     // 함수 종료하기
        }
    }
    alert("해당 로그를 찾을 수 없습니다.");                                                            // 실패 알림
}


stockList ();
function stockList (){
    
    let productList = JSON.parse(localStorage.getItem('productList') || '[]');

    //const productList = document.querySelector('#productList');
    const stockTable = document.querySelector('#inTbody');                    // productListTable 선언 후 productTbody dom객체화
 
    let html ='' ;                                                                       // html 선언
    
    for(let i = 0 ; i < productList.length ; i++){                                         // productList 배열 순회
        const proArray = productList[i];                                                // proArray로 간소화하기
        
        let amountAlert , color = ''; 
        
        if(proArray.pAmount > 100 ){ amountAlert = '여유' ; color ='green';}
        else if(proArray.pAmount > 50){ amountAlert = '적정' ; color ='gold';}
        else{amountAlert = '부족' ; color ='red';}

        html += `<tr>   
                    <td> ${proArray.pno} </td> <td> ${proArray.pName} </td> <td> ${proArray.pAmount}개 </td> 
                    <td><strong style="color: ${color};">${amountAlert}</strong></td>
                    <td><button onclick="orderBtn(${proArray.pno})"> 주문 </button></td>
                </tr>`                                                                  // 추가하기 
    }

    stockTable.innerHTML = html;                                                  // productListTable html에 넣기
    //showProductList();
}

function orderBtn(pno) {
  const url = `orderStock.html?no=${pno}`;
  window.open(url, '_blank', 'width=800,height=600');   // popup / 새 탭

}