const now = new Date();
const y = now.getFullYear();     
const m  = String(now.getMonth() + 1).padStart(2, '0');
const d  = String(now.getDate()).padStart(2, '0');
// 2. 
const nowDate = document.querySelector('#nowDate');// (1)
const dateV = `${y}-${m}-${d}`; 



setBoard ();
function setBoard (){
    const url = new URLSearchParams(location.search);
    const selectno = url.get('no');

    let productList = JSON.parse(localStorage.getItem('productList') || '[]');
    
    
    for(let i = 0; i < productList.length ; i++){
        const pArray = productList[i] ;
        if(selectno == productList[i].pno){
            document.querySelector('#stockId').innerHTML = `pNo. ${pArray.pno} ${pArray.pName} `
            document.querySelector('#currentStock').value = pArray.pAmount ;
        }
    }
}

const DAMAGE_RATE = 3;   // 파손  3%



function boardEdit(){

    const selectno = new URLSearchParams(location.search).get('no');
    if (!selectno) { alert('상품 코드가 없습니다'); return; }

    let productList = JSON.parse(localStorage.getItem('productList') || '[]');
    let inoutLog = JSON.parse(localStorage.getItem('inoutLog') || '[]');  // inoutLog JSON.parse해서 호출하기 || 없다면 '[]' 배열추가 

    const quantity = document.querySelector('#quantity');
    const reason = document.querySelector('#reason');

    const quantityV = quantity.value.trim();
    const reasonV = reason.value.trim();

    const error = [];
    if (!quantityV || quantityV < 1 || isNaN(Number(quantityV))){error.push('수량');}
    if (!reasonV){error.push('사유');}

    if (error.length > 0){
        alert(`${error.join(' 및 ')}을(를) 입력하세요`);  // join은 배열에 join(내용) 에서 내용을 넣어서 해줌 예시 ['08','30','15'].join(':') -> "08:30:15"
        (error[0] === '수량' ? quantity : reason).focus();                     // focus는 그 쪽을 강조해줌
        return;
    }

    const qtyTotal = Number(quantityV);

    let normalCnt = 0; let damageCnt = 0;
    
    for(let k = 0; k < qtyTotal ; k++){

        const ramdom = Math.random() * 100; // Math.ramdom * 100 은 0~100까지의 난수를 만들어라임

        if(ramdom < DAMAGE_RATE ){
            damageCnt++
        }
        else{ normalCnt++ }
        //  카운터의 합은 qtyTotal 과 반드시 같음!
    }


    for(let i = 0; i < productList.length; i++){
        const pArray = productList[i] ;
        
        if(selectno == pArray.pno){
            pArray.pAmount += qtyTotal;

            let logco = inoutLog.length === 0 ? 1 : inoutLog[inoutLog.length -1 ].logco + 1;
            
            inoutLog.push({ logco , pno : Number(selectno) , inOut : '입고' ,
            pName : pArray.pName , amount : normalCnt , area : `${reasonV} ( 정상품 )` , date : dateV  });
            
            logco++;

            if(damageCnt > 0){
                inoutLog.push({ logco : logco++ , pno : Number(selectno) , inOut : '입고' ,
                pName : pArray.pName , amount : damageCnt , area : `${reasonV} ( 파손품 )` , date : dateV  });
            }
            
            localStorage.setItem('productList' , JSON.stringify(productList));
                                                                                     
            localStorage.setItem( 'inoutLog', JSON.stringify(inoutLog) ); 
            break;
        }
    }

    if (window.opener){
        window.opener.stockList?.();
        window.opener.logListAdd?.(); }

     alert(`입고 완료!\n - 정상 : ${normalCnt}\n - 파손 : ${damageCnt}`);
    window.close();                      // 팝업이라면 닫아 주기   
}

