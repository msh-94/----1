// 로그 출고/목록 const inoutLog = [ { logco : 1 , pno : 1 , amount : 30 , inout : 1 , date : ${y}-${m}-${d} } , 
//                                  { logco : 2  , pno : 2 , amount : 40 , inout : 2 , date : ${y}-${m}-${d} } ];

// ============================= 날짜 변수 만들기 ===================//
let now = new Date();
let y = now.getFullYear();
let m = now.getMonth() + 1 ;
let d = now.getDate();      

// =========================== 오늘날짜 함수 ========================//

function today(){
    const date = document.querySelector('#nowDate');
    let html = `${y}-${m}-${d}`;
    date.innerHTML = html;
}// 날짜함수 끝


// ========================== 웹스토리지 함수 ===================== //

// 제품 웹스토리지
function getProduct(){
    let productList = localStorage.getItem('productList');
    if( productList == null){ productList = []; }
    else{ productList = JSON.parse(productList);}
    return productList;
} // getProduct 함수 끝

function setProduct(productList){
    localStorage.setItem('productList' , JSON.stringify(productList));
}// setProduct 함수 끝


// 로그 웹스토리지
function getInoutLog(){
    let inoutLog = localStorage.getItem('inoutLog');
    if( inoutLog == null){ inoutLog = []; }
    else{ inoutLog = JSON.parse(inoutLog);}
    return inoutLog;
} // getInoutLog 함수 끝

function setInoutLog(inoutLog){
    localStorage.setItem('inoutLog' , JSON.stringify(inoutLog));
} // setInoutLog 함수 끝


// ======================== 입출고 로그 영역 ====================== //

// 출고 등록 함수
function outAdd(){
    const pname = document.querySelector('#pName').value;
    const amount = document.querySelector('#amount').value;
    const date = document.querySelector('#date').value;
    const area = document.querySelector('#area').value;    
    //
    let productList = getProduct();
    let inoutLog =  getInoutLog();
    let logco = inoutLog.length == 0 ? 1 : inoutLog[inoutLog.length - 1].logco + 1;
    // 
    
    for(let i = 0 ; i < productList.length; i++){
        let pro = productList[i]
        if(pro.pname == pname ){            
            const obj = {
                logco : logco ,
                pno : pro.pno ,
                amount : amount ,
                inout : 2 ,
                area : area ,
                date : date }
            //
            inoutLog.push(obj);
            setInoutLog(inoutLog);
            logPrint();
            alert('출고 되었습니다.');            
            return;
        }// if end
    } // for end
} // 출고 등록 함수

// 입출고 로그 출력 함수
logPrint()
function logPrint(){
    const outTbody = document.querySelector('#outTbody');
    let inoutLog =  getInoutLog();
    let productList = getProduct();
    let html = '';
    
    for( let i = 0; i < inoutLog.length; i++){
        let iol = inoutLog[i];
        for(let a = 0; a < productList.length; a++){
            let pro = productList[a];
            if(iol.pno == pro.pno){
                if( iol.inout == 2){
                    iol.inout = '출고'
                    } // if1 end
                html += `<tr>
                            <td> ${iol.logco} </td>
                            <td> ${iol.inout} </td>
                            <td> ${pro.pname} </td>
                            <td> ${iol.amount} </td>
                            <td> ${iol.date} </td>
                            <td> ${iol.area} </td>
                            <td> <button onclick="inoutEdit(${iol.logco})"> 수정 </button></td>
                        </tr>`
            }// if2 end
        }// for2 end
    }// for1 end
    outTbody.innerHTML = html;
    today()
}// 로그 출력함수 끝

// 입출고사유 수정 함수

function inoutEdit(logco){
    let inoutLog =  getInoutLog();
    for( let i = 0; i < inoutLog.length; i++){
        const iol = inoutLog[i];
        if(iol.logco == logco){
            iol.amount = prompt('수량 : ');
            iol.area = prompt('입출고사유 : ');
            setInoutLog(inoutLog);
            alert('수정 되었습니다.');
            logPrint();
            return;
        }// if end
    }// for end
}// 입출고사유 수정함수 끝

// ======================================== 페이지네이션 ===================================== //
let inoutLog = getInoutLog();
console.log(inoutLog);
const COUNT_PER_PAGE = 5; // 한 페이지 당 최대 5개의 요소를 보여줄 것
// 필요한 페이지 번호 수 구하기
const getTotalPageCount = () => {
  return Math.ceil(inoutLog.length / COUNT_PER_PAGE);
};
// 페이지 번호 버튼 동적으로 생성ㅇ하기
const numberButtonWrapper = document.querySelector('.number-button-wrapper');
const setPageButtons = () => {
  numberButtonWrapper.innerHTML = ''; // 페이지 번호 wrapper 내부를 비워줌
  for (let i = 1; i <= getTotalPageCount(); i++) {
    numberButtonWrapper.innerHTML += `<span class="number-button"> ${i} </span`;
  }
};