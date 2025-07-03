// ===================== 시계함수 부분 시작 ======================== //


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
// =============================================================== //



//============================== logListAdd 전역변수 ==================================//

var logCurrentPage = 1;               // 입출고 로그 현재 페이지 번호 (1부터 시작)
const logPerPage   = 10;              // 페이지당 최대 행 수 
let inoutOption = 'logDesc';          // 입출고 로그 기본 정렬은 로그코드 내림차순
var keywordLog = '';                  // 검색값 기본값은 ''

//=====================================================================================//





//================================ stockList 전역 변수 ===================================//


var keywordStock = '';                 // 검색한 값 전역변수 - 이벤트리스너에서 활용 됨,       var를 쓴 이유 쿼리스트링 해야해서 통신을 해야하기 때문에 let 보다는 var가 좋다고 gpt가 말해줌 ,,
let sortOption = 'nameAsc';            // 정렬 변수 초기값 정해주기 : nameDesc는 제품번호 내림차순임 -> html value값 확인해보면 됨
var stockCurrentPage = 1;              // 현재 페이지 번호 (1부터 시작)
const stockPerPage   = 5;              // 페이지당 최대 행 수   


//=========================================================================================//





function outAdd(){                                                                      // 로그 배열 추가하는 함수 outAdd()
     // 마크업객체 가져오기
    const pName = document.querySelector('#pName');         console.log(pName);         // 제품명 DOM 객체화
    const amount = document.querySelector('#amount');           console.log(amount);    // 제품 수량 DOM 객체화
    const date = document.querySelector('#date');          console.log(date);           // 제품 날짜 DOM 객체화        
    const area = document.querySelector('#area');                                       // 제품 입출고 사유 DOM 객체화
    
    // value값 가져오기
    const nameV = pName.value.trim();                                       // value 값 가져오기 .trim()은 공백 제거
    const amountV = amount.value.trim();                                    // value 값 가져오기 .trim()은 공백 제거
    const dateV = date.value;                                               // value 값 가져오기
    const areaV = area.value.trim();                                        // value 값 가져오기 .trim()은 공백 제거


    // localStorage에서 productList 배열 가져오기
    let inoutLog = JSON.parse(localStorage.getItem('inoutLog') || '[]');  // inoutLog JSON.parse해서 호출하기 || 없다면 '[]' 배열추가 
    
    let logco = inoutLog.length === 0 ? 1 : inoutLog[inoutLog.length -1 ].logco + 1;    // logco는 가져오기 : inoutLog가 없으면 1부터 시작 있다면 배열의 마지막 logco에서 +1 해줌

    let productList = JSON.parse(localStorage.getItem('productList') || '[]');          // productList를 localStorage에서 불러오고 배열이 없다면 새 빈 배열 추가


    // value값 가져온거 객체화 하기
    if( nameV == '' || amountV == '' || dateV == '' || areaV == '' ){       // 유효성 검사 : name, amountV , dateV areaV가 공백이라면? 비어있다면?
        alert('항목을 모두 입력해주십시오');                                  // 제품 등록에 실패 알림창 띄우기
        return;                                                             // 함수 종료
    }
    
    let error = true;                                                       // error 변수 정의
    let pno = '';                                                           // pno 정의

    for(let i = 0; i < productList.length; i++){                            // product 리스트 배열 순회
        if(nameV == productList[i].pName){                                  // nameV랑 productList 에 있는 pName과 같다면?
            pno = productList[i].pno;                                       // pro는 productList[i].pno를 간소화한 것
            error = false;                                                  // error 변수 false로 바꾸기

            productList[i].pAmount -= amountV ;                             // productList 에서 pAmount 빼주기 : 출고한 양은 수량에서 빼줘야함.

            if(productList[i].pAmount < 0){                                 // 유효성 검사 : 만약 출고값이 현재수량보다 많아서 음수가 됐을 때
                alert('입력한 재고가 음수입니다. 다시 입력하세요.');           // 결과값이 음수라고 다시 치라고 알림
                return;                                                     // 함수 종료
            }

            localStorage.setItem( 'productList', JSON.stringify(productList) ); // 유효성 검사가 끝났다면 productList 배열 다시 localStorage에 저장해주기
            stockList (keywordStock , stockCurrentPage);             // 재고 리스트 렌더링
            break;                                                              // break;
        }
    }

    if(error == true){ alert('현재 등록 되어 있는 상품이 아닙니다.'); return;}      // 유효성 검사 : 만약 로그에 입력한 제품명이 productList에 없었다면? 없다고 하고 함수 종료
    

    // 객체 obj생성
    const obj = { logco , pno : pno , inOut : '출고' , amount : Number(amountV) , area : areaV , date : dateV }          // obj 객체에 value값 넣기
    

    // 객체화한거 배열에 추가
    inoutLog.push(obj);                                                                      // inoutLog obj 객체 넣기

    // localStorage에 넣기
    localStorage.setItem( 'inoutLog', JSON.stringify(inoutLog) );                         // localStorage에 inoutLog 배열 넣어서 저장
    
    alert('출고 등록이 완료 되었습니다.');                                                      // 성공 알림

    pName.value = '';                                                                   // value값 초기화
    amount.value = '';                                                                  // value값 초기화
    date.value = '';                                                                    // value값 초기화
    area.value = '';                                                                    // value값 초기화
    logListAdd(keywordLog , logCurrentPage);                                            // 입출고 로그 리스트 렌더링 , 검색한 값과 페이지네이션 부분은 그대로 불러와서 새로고침 안되게 하기
    LackBoard();                                                                        // 재고 부족 알림창 렌더링
    return;                                                                             // 함수종료

}



logListAdd();                                                                       // 시작할 때 떠야하니까 렌더링
function logListAdd(searchTerm = '', page = 1){                                     // logListAdd == 입출고 로그 출력함수                  

    let inoutLog = JSON.parse(localStorage.getItem('inoutLog') || '[]');            // inoutLog JSON.parse해서 호출하기 || 없다면 '[]' 배열추가 
    let productList = JSON.parse(localStorage.getItem('productList') || '[]');      // productList JSON.parse해서 호출하기 || 없다면 '[]' 배열추가 

    const inputLogTable = document.querySelector('#outTbody');                      // inputLogTable 선언 후 outTbody dom객체화

    if(searchTerm) {                                                               // 만약 입력값이 있다면?
        const key = searchTerm.toLowerCase();                                      // 매개변수의 값을 비교 편하게 전부 소문자로 바꿔주는 값을 key로 지정


        const pNameToPnoInoutLog = productList.filter(p => // productList 배열 객체(p)를 하나씩 순회하면서, 객체의 pName 소문자로 바꾸고 다 검사 , 검색한 값이 pName인지 포함(includes)하는지
        p.pName.toLowerCase().includes(key)                //포함된다면 true값 안 포함하면 false값 , true 값만 filter(함수)해서 배열 재생성, 그리고 그중에서 .map(p => p.pno) 즉 productList.pno만 쏙 뺴서
        ).map(p => p.pno);                                 // pNameToPnoInoutLog 배열을 다시 만든다 라는 뜻.

        inoutLog = inoutLog.filter(log => pNameToPnoInoutLog.includes(log.pno)); // inoutLog 배열은 검색한 제품이름만 남아있는 배열 중 pno만 남겨둔 pNameToPnoInoutLog 배열을 돌면서 같은 pno가 포함( = 일치 ) (아래까지)
    }                                                           // 되는 값만 다시 inoutLog에 재배치함 즉, productList에서 검색일치한 pName에서 pno만 남겨서 로그배열 pno랑 비교해서 같은 거만 남겨서 검색하겠단 뜻.




     // 정렬 하는 함수 부분
    inoutLog.sort((a, b) => { // inoutLog 배열에서 임의 a, b 두 값을 비교하는 sort함수 실행, a b를 비교해서 값이 양수값이 나오면 그 둘의 배열 위치를 바꾸는 함수식. for문과 비슷         
        // (a의 .pno)- (b의 pno), 예를 들어 a.pno가 1이고 b.pno가 2이면 1 - 2 이니까 -1이 뜨니 음수니까 배열을 교체하지 않음 그래서 1 2로 배열되게 함
        
        if(inoutOption){                                                    // inoutOption 존재한다면?
            if(inoutOption== 'logDesc'){ return b.logco - a.logco ;}        // 로그코드 내림차순
            else if(inoutOption == 'logAsc'){return a.logco - b.logco ;}    // 로그코드 오름차순
            else if(inoutOption == 'dateDesc'){return new Date(b.date) - new Date(a.date) ;}             // 날짜 내림차순
            else if(inoutOption == 'dateAsc'){return new Date(a.date) - new Date(b.date) ;}              // 날짜 오름차순
        }                                                                                                // 참고로 sort 함수는 리턴값이 꼭 필요함.
    });

    // 페이지네이션 동적으로 페이지 그리는 부분
    const totalLogArray = inoutLog.length;                         // totalProArray는 로그출력리스트 총 배열 갯수임, 즉 로그값 전체부분
    const ShowIndex = (page - 1)*logPerPage ;        // 페이지마다 보여줄 배열들 // page가 1페이지면 (1-1)*logPerPage(페이지당 보여줄 제품수) => 0*logPerPage = 0인덱스부터 시작
    const PageinoutLog = inoutLog.slice(ShowIndex , ShowIndex + logPerPage);    // slice를 값으로 정의해주면 자른 값이 나옴. 그 값부터 페이지당 보여줄 logPerPage값만큼 더해줘서 보여주면 됨




    let html ='' ;                                                                  // html 선언
    for(let i = 0 ; i < PageinoutLog.length ; i++){                                     // 페이지네이션으로 보여줘야할 PageinoutLog 배열 순회
        const Log = PageinoutLog[i];                                                    // Log로 간소화하기
        let pro ='';                                                                // pro 변수 지정
        for(let j =0; j < productList.length; j++ ){                                // productList 배열 순회
            if(Log.pno == productList[j].pno){                                      // inoutLog의 i번째 배열에서 pno랑 productList j번째 배열에서 pno랑 같으면
                pro = productList[j]                                                // 그 배열을 pro에 대입
                break;                                                              // 반복문 종료
            }
        }
        html += `<tr>   
                        <td> ${Log.logco} </td> <td> ${Log.inOut} </td> <td> ${pro.pName} </td> 
                        <td> ${Log.amount} </td> <td> ${Log.date} </td> <td> ${Log.area} </td>
                        <td><button onclick="inoutEdit(${Log.logco})"> 수정 </button>  
                </tr>`                                                                  // 입력함수에서 받은 값 html 추가하기 

    }

    inputLogTable.innerHTML = html;                                                  // inputLogTable html에 innerHTML 하기
    ShowLiEventner ( totalLogArray , logCurrentPage , logPerPage , logListAdd , 'log' );     // 페이지 네이션에 들어갈 매개변수들 다 넣어줌 (로그출력 페이지 전용) 그걸 재호출
}



function inoutEdit(logco) {                                                         // inoutEdit(logco) 매개변수 logco를 이용한 입출고 로그함수수정함수
    
    let productList = JSON.parse(localStorage.getItem('productList') || '[]');      // productList 배열을 localStorage에서 가져오기
    let inoutLog = JSON.parse(localStorage.getItem('inoutLog') || '[]');            // inoutLog 배열을 localStorage에서 가져오기

    for(let i = 0; i< inoutLog.length; i++){                                             // inoutLog 배열 순회
        if(inoutLog[i].logco === logco){                                                 // 매개변수 logco랑 inoutLog[i].logco랑 값이 같다면?
            let newAmount = prompt('수정할 수량을 입력하세요.' , inoutLog[i].amount);                       // 수정할 prompt값 입력
            if(newAmount == null){ return; }                                                              // prompt 값이 없다면 함수 종료 취소한다면
            if (!/^\d+$/.test(newAmount)){                                                               // prompt값이 숫자가 아니라면
                alert('숫자만 입력하세요.');                                                              // 숫자 입력하라고 alert 해줌 
                return inoutEdit(logco);                                                                // 같은 상품 다시 재호출 = 반환값 함수;
            }
            
            newAmount = Number(newAmount.trim());                                                       // 받았다면 입력값 변수인 newAmount를 공백을 제거한 걸 다시 newAmount로 해줌

            if(!Number.isInteger(newAmount) || newAmount <= 0 ){                                // Number.isInteger() 은 정수인지 아닌지 검사하는 것 정수라면 true 정수가 아니라면 false 
                alert('올바른 숫자를 입력하세요.');                                               // 정수 외 실수나 0 이하면 안됨 , 만약 잘못 입력했다면 alert값 주기
                return inoutEdit(logco)                                                         // 같은 상품 다시 재호출 = 반환값 함수;
            }                                                                                                       
            if(newAmount == inoutLog[i].amount){ 
                if(!confirm('수량이 동일합니다 계속 수정하시겠습니까?')){                           // 동일 수량을 입력했다면?
                    alert(' 로그 등록을 취소하였습니다. '); return;                                  // 수정한다고 하면 계속 수정, 아니라고 하면 함수종료
                }                                                      
                                                        
            }
              
            
            const oldAmount = inoutLog[i].amount;                                               // oldAmount는 기존 수정하기 전 있던 수량
            const different = newAmount - oldAmount ;                                           // different는 수정한 값 - 원래 있던 값 : 왜 만드냐면 차이로 productList 수량 변경해야해서

            for(let j = 0; j < productList.length; j++){                                        // productList 배열 순회
                if (productList[j].pno === inoutLog[i].pno){                                    // 입출고 로그배열 pno랑 제품배열 pno랑 같다면 
                    if (inoutLog[i].inOut === '입고'){                                          // 만약 입고 배열이라면?
                        productList[j].pAmount += different;                                    // productList 배열 안 pMount에 차이를 더해주고 대입
                    } 
                    else{                                                                       // 만약 출고 배열이라면?
                        productList[j].pAmount -= different;                                    // productList 배열 안 pMount에 차이를 빼주고 대입
                    }                 

                    if(productList[j].pAmount < 0){                                             // 유효성 검사 : 만약 입고면 더해주고 출고면 빼주고 나서의 값이 음수면 안됨
                    alert('수정값 재고가 음수입니다. 다시 입력하세요.');                            // 만약 음수라면 음수라고 알리고
                    return inoutEdit(logco);                                                     // 함수 재호출
                    }

                    break;                                                                      // 유효성 검사 다 괜찮다면 반복문 종료
                }
            }
            
            inoutLog[i].amount = newAmount;                                                     // 새로운 로그값에 변경 값 대입
            
            //////////////////////////////////////////////////////

            let ReasonEdit = prompt('입출고 사유를 입력하세요.' , inoutLog[i].area );               // 입출고 사유 수정 prompt              
            
            // 입출고 사유 물어보는 prompt 함수 실행
            if (ReasonEdit.trim() === '') return;                                                   // 아무 것도 입력 안하면 함수 종료
            inoutLog[i].area = ReasonEdit.trim();                                                   // 함수의 입출사유 prompt 받은 값 넣기 .trim()은 공백 제거
            
            localStorage.setItem('productList', JSON.stringify(productList));                       // localStorage에 productList 넣어주기
            localStorage.setItem('inoutLog', JSON.stringify(inoutLog));                             // localStorage에 inoutLog 넣어주기
            alert('[성공] 수정 되었습니다.');                                                         // 수정 성공 알림
            
            stockList(keywordStock , stockCurrentPage);                                              // 재고 리스트 렌더링 ,입력값과 정렬부분 수정시 초기화 안되게 매개변수도 넣어줌
            logListAdd(keywordLog , logCurrentPage);                                                 // 입출고 로그 출력함수 렌더링 ,입력값과 정렬부분 수정시 초기화 안되게 매개변수도 넣어줌
            LackBoard();                                                                            // 재고 부족 알림 Board 렌더링            
            return;                                                                                 // 함수 종료하기
        }
    }
    alert("해당 로그를 찾을 수 없습니다.");                                                           // 만약 오류나면 실패 알림
}


stockList ();                                                                                       // 제품 재고 확인 함수 새로고침시 렌더링
function stockList(searchTerm = '' , page = 1){                        // 제품 재고 출력 함수  (SearchTerm = '') 이거는 매개변수(SearchTerm)이 없으면 기본이 ()이거란 소리임  
    
    let productList = JSON.parse(localStorage.getItem('productList') || '[]');                     // productList localStorage에서 가져오기
    // 검색하는 함수 부분
    if(searchTerm) {                                                                             // 만약 입력값이 있다면?
        const key = searchTerm.toLowerCase();                                                     // 매개변수의 값을 비교 편하게 전부 소문자로 바꿔주는 값을 key로 지정

        productList = productList.filter(p => // productList 배열의 각 객체(p)를 하나씩 순회함, 객체의 pName을 다 검사 하는데, toLowerCase인 소문자로 다 바꿔서 검사함(소문자로 다 바꿔서 비교가 쉽게)
        p.pName.toLowerCase().includes(key)   // key 즉, 매개변수(검색한 값)이 pName에 포함되어있는지(includes함수), 포함되어 있다면 true로 나타내고 없으면 false로 나타낸다. filter는 배열을 재배치하는 거.
        );                                  // 즉 그냥 filter해서 검색에 빠삐코를 친다면 빠만 쳐도 빠삐코라는 pName에 빠가 들어가니까 그것만 true가 됨
    }                                         // 그리고 그 true된 것들만 filter해서 배열을 다시 만든걸 productList에 넣어주고 보여줌 

    
    // 정렬 하는 함수 부분
    productList.sort((a, b) => { // productList 배열에서 임의 a, b 두 값을 비교하는 sort함수 실행, a b를 비교해서 값이 양수값이 나오면 그 둘의 배열 위치를 바꾸는 함수식. for문과 비슷         
        // sortOption이라는 변수가 nameDesc라면 (pno 내림차순, 즉 기본정렬)
        // (a의 .pno)- (b의 pno), 예를 들어 a.pno가 1이고 b.pno가 2이면 1 - 2 이니까 -1이 뜨니 음수니까 배열을 교체하지 않음 그래서 1 2로 배열되게 함
        
        if(sortOption){                 // sortOption이 존재한다면? sortOption은 stockList함수 위에 존재함 참고 바람.
            if(sortOption== 'stockDesc'){ return b.pAmount - a.pAmount ;}   // 만약 stockDesc (재고 내림차순) 이라면 (b재고량 - a재고량)해줌 , a재고량이 10, b재고량이 30일 때 30 - 10 = 20이니 b( 30, a보다 큰 수 )가 앞으로 감 이런 원리. 
            else if(sortOption == 'stockAsc'){return a.pAmount - b.pAmount ;}    // 이건 stockAsc , 즉 재고 오름차순
            else if(sortOption == 'nameDesc'){return b.pno -a.pno ;}              // 이건 pno 내림차순
            else if(sortOption == 'nameAsc'){return a.pno -b.pno ;}             // 이건 pno 오름차순
        }                                                                        // 참고로 sort 함수는 리턴값이 꼭 필요함.
    });
    

    // 페이지네이션 동적으로 페이지 그리는 부분
    const totalProArray = productList.length;                         // totalProArray는 제품리스트 총 배열 갯수임
    const ShowIndex = (page - 1)*stockPerPage ;        // 페이지마다 보여줄 배열들 // page가 1페이지면 (1-1)*stockPerPage(페이지당 보여줄 제품수) => 0*stockPerpage = 0인덱스부터 시작 ,, 1페이지니까 0인덱스부터 해야겠지?
    const PageProducList = productList.slice(ShowIndex , ShowIndex + stockPerPage);    // slice를 값으로 정의해주면 자른 값이 나옴. (보여줄 배열들부터, 페이지당 보여줄 제품수 즉 10부터 시작하면 10인덱스부터 쫙 그만큼 보여줌) 

    
    //const productList = document.querySelector('#productList');
    const stockTable = document.querySelector('#inTbody');               // stockTable 선언 후 inTbody dom객체화
 
    let html ='' ;                                                                       // html 선언
    
    for(let i = 0 ; i < PageProducList.length ; i++){                                       // pageProductList = 페이지네이션으로부터 자른 배열들 순회
        const proArray = PageProducList[i];                                                //  proArray로 간소화
        
        let amountAlert , color = '';                                                   // 부족 적정 여유에 따라 색을 다르게 부여할 거니까 변수 지정
        
        if(proArray.pAmount >= 100 ){ amountAlert = '여유' ; color ='green';}           // 수량이 100개가 넘는다면, 여유 (초록색)
        else if(proArray.pAmount >= 50){ amountAlert = '적정' ; color ='gold';}         // 수량이 100개 미만 50개 이상이면, 적정 (노랑색) 
        else{amountAlert = '부족' ; color ='red';}                                      // 50개 미만이면, 부족 (빨강색)

        html += `<tr>   
                    <td> ${proArray.pno} </td> <td> ${proArray.pName} </td> <td> ${proArray.pAmount}개 </td> 
                    <td><strong style="color: ${color};">${amountAlert}</strong></td>
                    <td><button onclick="orderBtn(${proArray.pno})"> 주문 </button></td>
                </tr>`                                                                  // html 추가하기 
    }

    stockTable.innerHTML = html;                                                  // stockTable에 innerHTML해서 html에 넣기

    ShowLiEventner( totalProArray , stockCurrentPage , stockPerPage , stockList , 'stock' );            // 이건 페이지네이션 동적으로 productList갯수에 따라 페이지 <12345> 만들어줄 함수, 매개변수는 당연히 제품리스트 총 배열 갯수를 매개변수로 함 
    //showProductList();
}


LackBoard();                                                                            // LackBoard 새로고침과 동시에 출력
function LackBoard(){                                                                   // 부족한 재고 알림창 출력 함수
    
    let productList = JSON.parse(localStorage.getItem('productList') || '[]' );         // productList localStorage에서 가져오기

    const lackTbody = document.querySelector('#lackTbody');                             // dom객체화 하기

    let html ='';                                                                       // html 선언
    
    for(let i = 0 ; i < productList.length ; i++){                                       // productList 배열 순회
        const proArray = productList[i];                                                // proArray로 간소화하기
        if(proArray.pAmount < 50){                                                      // 만약 pAmount가 50개 이하라면 ? ==> 부족이란 거임
            html += `<tr>   
                    <td> ${proArray.pno} </td> <td> ${proArray.pName} </td> <td> ${proArray.pAmount}개 </td> 
                    <td><button onclick="orderBtn(${proArray.pno})"> 주문 </button></td>
                </tr>`                                                                  // html 그리기
        }
    }

    lackTbody.innerHTML = html;                                                  // productListTable html에 넣기

}

function orderBtn(pno) {                                                        // 주문 버튼 함수
  const url = `orderStock.html?no=${pno}`;                                      // url 쿼리스트링 만드는 거임 no = pno로 가시오
  window.open(url, '_blank', 'width=800,height=600');                           // window를 오픈하겠습니다,  _blank =새 탭  , width와 height 지정은 팝업창 생성
}




// ==================== 검색창 이벤트 연결부분, 그리고 정렬부분  ==================== //

document.addEventListener('DOMContentLoaded', () => { // addEventListner(이벤트 , 함수)는 특정 이벤트가 발생하면 해당 함수를 실행하라는 뜻
            // DOMcontentLoaded는 HTML 문서 안 모든 DOM객체들이 로드 되면 실행하는 이벤트, 
            // () => {}는 {} 안에 있는 함수 실행이라는 뜻 , 즉 이벤트가 발생하면 {} 안에 있는 코드들을 실행한다는 것임.
  
    const searchInput = document.querySelector('#stockSearchInput');      // 검색 input창을 DOM 객체화 한 것
    const LogSearchInput = document.querySelector('#LogSearchInput');     // 검색 input창을 DOM 객체화 한 것

    // stockList 검색창 뜨는 부분임
    if( searchInput ){                                                     // 만약 검색 input(value값) 요소가 존재한다면?
        searchInput.addEventListener('input', e =>{                         // addEventListner() 실행하는데 input이벤트 즉, 값이 하나하나 입력될 때마다 e라는 객체에 대한 함수 실행함
        keywordStock = e.target.value.trim() ;                             // e라는 객체에 .target은 이벤트발생요소를 지칭 즉, input이벤트, .trim()은 공백제거 즉, 입력값의 공백을 제거한 것을 keywordStock 상수에 대입
        stockCurrentPage = 1 ;                                              // 검색할 때 마다 페이지네이션 페이지 1로 새로고침
        stockList(keywordStock , 1);                                        // 그런 input값과 페이지네이션 1값은 stockList 즉 제품 재고 리스트의 매개변수로 들어가서 함수 렌더링 즉, 재호출함
        });
    }
    
    // logListAdd 검색창 뜨는 부분임
    if( LogSearchInput ){                                                       // 만약 검색 input(value값) 요소가 존재한다면?
        LogSearchInput.addEventListener('input', e =>{                          // addEventListner() 실행하는데 input이벤트 즉, 값이 하나하나 입력될 때마다 e라는 객체에 대한 함수 실행함
        keywordLog = e.target.value.trim() ;                                    // e라는 객체에 .target은 이벤트발생요소를 지칭 즉, input이벤트, .trim()은 공백제거 즉, 입력값의 공백을 제거한 것을 keywordLog 상수에 대입
        logCurrentPage = 1 ;                                                    // 검색할 때 마다 페이지네이션 페이지 1로 새로고침
        logListAdd(keywordLog , 1 );                                            // 그런 input값은 logListAdd 즉 입출고 출력 리스트의 매개변수로 들어가서 함수 렌더링  //위랑 동일//
        });
    }
    
    // 정렬 버튼 바뀌는 부분임
    const sortSelect = document.querySelector('#sortSelect');           // 재고리스트 정렬 버튼을 DOM 객체화 한 것
    const logSelect = document.querySelector('#logSelect');             // 입출력로그 정렬 버튼을 DOM 객체화 한 것
    
    if( sortSelect ){                                                    // 만약 sortSelect가 있다면? 즉 dom객체가 있다면? 
        
        sortSelect.addEventListener('change', e =>{                    // addEventLister는 특정 이벤트가 실행될 때 즉 change 교체 이벤트가 실행될 때 함수를 실행 
            sortOption = e.target.value;                                // sortOption 이라는 전역 변수에 이벤트요소 즉 sortSelect 벨류값을 넣어준다. 
            stockCurrentPage = 1 ;                                          // 정렬할 때 마다 페이지네이션 페이지 1로 새로고침
            stockList(keywordStock , 1 );                                  // 검색했을 때 정렬하면 검색값이 풀리니 stockList에는 검색창했던 keyword랑 페이지네이션 1넣어줌 그리고 stockList 매개변수로 다시 렌더링해준다.
        });
    } 
    if( logSelect ){                                                    // 만약 logSelect 있다면? 즉 dom객체가 있다면? 
        
        logSelect.addEventListener('change', e =>{                      // addEventLister는 특정 이벤트가 실행될 때 즉 change 교체 이벤트가 실행될 때 함수를 실행 
            inoutOption = e.target.value;                                // inoutOption 이라는 전역 변수에 이벤트요소 즉 logSelect 벨류값을 넣어준다.
            logCurrentPage = 1 ;                                          // 정렬할 때 마다 페이지네이션 페이지 1로 새로고침
            logListAdd(keywordLog , 1);                                  // 검색했을 때 정렬하면 검색값이 풀리니 stockList에는 검색창했던 keyword랑 페이지네이션 1넣어줌 그리고 stockList 매개변수로 다시 렌더링해준다.
        });
    } 

});                            

// ==================================== 끝 =========================================== //





// 페이지네이션 html 그리는 부분-------------------------------------------------------//
function ShowLiEventner(totalArray, currentPage, perPage, onPageClick, type) {  // 페이지네이션 html 그려줄 함수, 매개변수는 ( 총배열수 , 현재페이지값 , 그 페이지에 몇개를 보여줄지 ,  어느 함수에서 호출했는지 , 호출했던 함수이름)
    
    const totalPages = Math.ceil(totalArray / perPage);     // 총 페이지 수는 Math.ceil 함수로 배열의 총 수 / 페이지당 보여줄 배열을 나누고 그걸 올림한 값을 보여줌
    
    let html = '';                                          // 그릴 html 선언

    const add = function(pageNumber){                       // add 함수 선언 , 매개변수는 페이지 숫자
        html += `<div ${pageNumber === currentPage ? 'class="active"' : ''}>    
                    <a href="#" onclick="clickPage(${pageNumber}, '${onPageClick.name}'); return false;">
                        ${pageNumber}
                    </a> 
                </div>`;    // html 그리는데 선택된 페이지는 강조의 효과인 active 클래스 부여, active 클래스는 css를 통해 강조 효과 font-height 같은 걸 주면 됨
    };

    for(let p = 1; p <= totalPages; p++) add(p);   // 반복문 돌려서 총배열 총페이지 수만큼 html 그려냄

    if(type === 'stock') {  // 만약 호출한 함수가 재고출력함수라면
        document.querySelector('#stock-page-item').innerHTML = html;    // 재고출력 페이지 네이션 dom객체 선택
        document.getElementById('stock-prev-btn').disabled = (stockCurrentPage === 1);  // 재고출력 페이지 네이션 이전 버튼이고 만약 페이지가 1이라면 버튼 비활성화
        document.getElementById('stock-next-btn').disabled = (stockCurrentPage === totalPages); // 재고출력 페이지 네이션 다음 버튼이고 만약 마지막 페이지라면 버튼 비활성화
    }
    if(type === 'log') {    // 만약 호출한 함수가 입출고로그 함수라면
        document.querySelector('#log-page-item').innerHTML = html;       // 입출고 로그 페이지네이션 dom객체 선택 
        document.getElementById('log-prev-btn').disabled = (logCurrentPage === 1);      // 입출고 로그 페이지 네이션 이전 버튼이고 만약 페이지가 1이라면 버튼 비활성화
        document.getElementById('log-next-btn').disabled = (logCurrentPage === totalPages); // 입출고 로그 페이지 네이션 다음 버튼이고 만약 마지막 페이지라면 버튼 비활성화
    }
}
//-----------------------------------------------------------------------------------//




// ============== 페이지네이션에서 html 클릭시 그 값을 각 리스트함수에다가 실질적으로 전달해주는 함수====== //



function clickPage(page , onPageClick){   // html에 있던 ${}클릭 함수 클릭시 클릭한 페이지 숫자와 어떤 함수에서 클릭을 원하는지 매개변수로 받음
    if(onPageClick == 'stockList'){       // 클릭한 함수가 재고리스트라면?
        stockCurrentPage = page;          // 그 재고리스트 페이지 숫자를 바꿔줌
        stockList(keywordStock , page);   // 재고리스트 렌더링해주면서 검색한 부분과 그 페이지매개변수를 넣어 호출해줌
    }
    if(onPageClick == 'logListAdd'){      // 클릭한 함수가 입출고리스트라면?
        logCurrentPage = page;            // 그 입출고리스트 페이지 숫자를 바꿔줌
        logListAdd(keywordLog, page);     // 입출고리스트 렌더링해주면서 검색한 부분과 그 페이지매개변수를 넣어 호출해줌
    }  
}
//======================================================================================================//
