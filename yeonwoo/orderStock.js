const now = new Date();
const y = now.getFullYear();     
const m  = String(now.getMonth() + 1).padStart(2, '0');
const d  = String(now.getDate()).padStart(2, '0');
// 2. 
const nowDate = document.querySelector('#nowDate');
const dateV = `${y}-${m}-${d}`;                                 // 날짜 가져오는 것들



setBoard ();                                                    // 재고 주문 출력 함수 렌더링
function setBoard (){                                           // 재고 주문 출력 함수 setBoard()
    const url = new URLSearchParams(location.search);           // new URLSearchParams(location.search); 즉  html? 뒤에 있는 부분 가져와라는 걸 url 상수로 지정
    const selectno = url.get('no');                             // selectno는 no 즉 숫자부분만 따로 지정한 것

    let productList = JSON.parse(localStorage.getItem('productList') || '[]');  // productList localStorage에서 가져오기
    
    
    for(let i = 0; i < productList.length ; i++){                               // productList 배열 순회
        const pArray = productList[i] ;                                         // pArray로 간소화하기
        if(selectno == pArray.pno){                                             // selectno와 pno가 같다면
            document.querySelector('#stockId').innerHTML = `pNo. ${pArray.pno} ${pArray.pName} `;
            document.querySelector('#currentStock').value = pArray.pAmount ;
        }                                                                       // 그 pno에 알맞은 정보를 해당 쿼리스트링에 할당
    }
}

const DAMAGE_RATE = 2;                                                          // 파손률 지정 2% 아래 함수에서 쓸거임!

function boardEdit(){                                                           // 상품 주문한 거 추가하는 함수 boardEdit()

    const selectno = new URLSearchParams(location.search).get('no');            // html? 뒤에 있는 부분 가져와, 그 중에서 no 즉 숫자부분만 가져온 것을 selectno로 지정
    if (!selectno) { alert('상품 코드가 없습니다'); return; }                    // 만약의 오류로 인하여 select를 읽지 못하는 경우는 없다하고 함수종료

    let productList = JSON.parse(localStorage.getItem('productList') || '[]');  // productList localStorage에서 가져오기 없다면 '[]' 배열추가
    let inoutLog = JSON.parse(localStorage.getItem('inoutLog') || '[]');        // inoutLog JSON.parse해서 호출하기 || 없다면 '[]' 배열추가 

    const quantity = document.querySelector('#quantity');                       // dom객체화 수량 입력칸
    const reason = document.querySelector('#reason');                           // dom객체화 입고사유 입력칸

    const quantityV = quantity.value.trim();                                    // 입력값 즉 value값 다 공백제거
    const reasonV = reason.value.trim();                                        // 입력값 즉 value값 다 공백제거

    const error = [];                                                                               // error 빈배열 추가
    if (!quantityV || quantityV < 1 || isNaN(Number(quantityV))){error.push('수량');}               // 만약 수량입력이 없거나 수량이 음수거나 0이거나 숫자가 아니라면 수량을 error배열에 넣어줌
    if (!reasonV){error.push('사유');}                                                              // 입출고사유가 없다면 사유를 error배열에 추가

    if (error.length > 0){                               // error 배열이 존재한다면? 즉 오류가 있었다면?
        alert(`${error.join(' 및 ')}을(를) 입력하세요`);  // join은 배열에 join(내용)을 넣어서 나열 해줌 예시 ['수량','사유'].join(' 및 ') -> 수량  및  사유 
        (error[0] === '수량' ? quantity : reason).focus();                      // error 배열 첫번째가 수량이라면 수량에 focus 아니라면 배열에 focus해줌 , focus는 그 쪽을 강조해줌 !
        return;                                                                 // 함수 종료!
    }
    if(reasonV == '판매'){ alert("'판매' 사유는 입력할 수 없습니다."); return; } // 사유가 판매일시 판매는 안된다고 명시

    const qtyTotal = Number(quantityV);                 // 입력한 입고수량을 정수화 한 것을 qtyTotal로 지정

    let normalCnt = 0; let damageCnt = 0;               // 정상 제품들은 normalCnt로 파손이나 불량 제품은 damageCnt로 지정
    
    for(let k = 0; k < qtyTotal ; k++){                 // 총 수량을 반복문 돌림

        const ramdom = Math.random() * 100;             // Math.ramdom * 100 은 0~100까지의 난수를 만들어라임 

        if(ramdom < DAMAGE_RATE ){                      // 그 0~100까지 난수가 DAMAGE_RATE보다 낮다면? 현재는 2로 지정되어 있으니 난수중에 0 1이 뜬다면? = 2퍼확률
            damageCnt++                                // 파손 제품 증감 
        }
        else{ normalCnt++ }                             // 나머지 2~100 뜨면 정상제품 증감, 즉 98퍼는 정상품이라는 뜻
        //  카운터의 합은 qtyTotal 과 반드시 같음!
    }
    
    const qtyTotalResult = qtyTotal - damageCnt;        // 총 재고주문량에서 파손량 뺀 값을 qtyTotalResult로 지정

    for(let i = 0; i < productList.length; i++){        // productList 배열 순회
        const pArray = productList[i] ;                 // pArray로 간소화
        
        if(selectno == pArray.pno){                     // selectno와 pno가 일치한다면
            pArray.pAmount += qtyTotalResult;           // 그 제품 수량에다가 (전체입고재고량 - 파손량) 해서 나온 정상제품량만 수량추가해줌

            let logco = inoutLog.length === 0 ? 1 : inoutLog[inoutLog.length -1 ].logco + 1;    // logco 번호 할당함 
            
            inoutLog.push({ logco , pno : Number(selectno) , inOut : '입고' ,                   // 입고된 건 입력한 수량값으로 넣어줌 inoutLog에 
             amount : qtyTotal , area : `${reasonV}` , date : dateV  });                                                                            

            if(damageCnt > 0){                                                                  // 만약 파손제품이 존재한다면 즉시 환불처리
                logco++;                                                                        // 그래서 출고로 넣고 이유에는 파손 및 불량을 넣어줌 로그는 두개로 들어가니 logco++, 증감 시켜줌
                inoutLog.push({ logco : logco++ , pno : Number(selectno) , inOut : '출고' ,
                 amount : damageCnt , area : `${reasonV} ( 파손반품 )` , date : dateV  });
            }
            
            localStorage.setItem('productList' , JSON.stringify(productList));                  // productList에 변경값 넣어줌
                                                                                     
            localStorage.setItem( 'inoutLog', JSON.stringify(inoutLog) );                       // inoutLog도 변경값 넣어줌
            break;                                                                              // break;
        }
    }

    if (window.opener){                                                                         // window.opener은 이창을 열게 해준 기존 재고로그 영역을 참조하는것 
        window.opener.stockList?.(window.opener.keywordStock ,window.opener.stockCurrentPage);  // ?.()는 이 함수가 있다면 실행해줘라 즉 렌더링 해줘 라는 뜻
        window.opener.logListAdd?.(window.opener.keywordLog , window.opener.logCurrentPage);    // 근데 당연히 제품 하나 입고했다고 검색값이랑 정렬을 없앨 필요없으니 매개변수 그대로 전달
        window.opener.LackBoard?.();                        
    }

    alert(`입고 완료!\n - 정상품 : ${normalCnt}\n - 파손품 : ${damageCnt}`);                        // 정상제품 파손제품 알려주고 
    window.close();                                                                           // 팝업이라면 닫아줌    
}


// 엔터 키 눌렀을 때 제품 등록 함수 실행 (공통 이벤트 리스너)
function EnterKey(event) {
    if (event.key === 'Enter') {  // 엔터 키가 눌렸을 때
        boardEdit();
    }// if end
}// func end

// 입력 필드에 엔터키 이벤트 리스너 추가
document.querySelector('#quantity').addEventListener('keydown', EnterKey);
document.querySelector('#reason').addEventListener('keydown', EnterKey);