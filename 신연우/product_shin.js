


function productAdd(){ console.log('productAdd');                                           // 1. 제품 등록함수
    
    // 마크업객체 가져오기
    const pName = document.querySelector('#pName');         console.log(pName);             // 제품명 DOM 객체화
    const pPrice = document.querySelector('#pPrice');           console.log(pPrice);      // 제품 가격 DOM 객체화
    const pImg = document.querySelector('#pImg');          console.log(pImg);           // 제품사진 DOM 객체화        

    
    // value값 가져오기
    const name = pName.value.trim();                                    // value 값 가져오기
    const price = pPrice.value.trim();                                  // value 값 가져오기
    const Image = pImg.files[0];                                        // value 값 가져오기
    const img = Image ? URL.createObjectURL(Image) :'https://placehold.co/100x100';   // value 값 가져오기

    // localStorage에서 productList 배열 가져오기
    let productList = JSON.parse(localStorage.getItem('productList') || '[]');  // productList JSON.parse해서 호출하기 || 없다면 '[]' 배열추가 
                                         
    let lastPno = Number(localStorage.getItem('lastPno') || 0);                 // lastPno localStorage에서 호출하기 || 없다면 0으로 선언
    const pno = ++lastPno                                                       // pno 증감은 lastPno에서 가져옴

    // value값 가져온거 객체화 하기
    if( name == '' || price == '' ){                                        // value값 가져온거 객체화 하기
        alert('항목을 모두 입력해주십시오');                                  // 유효성 검사 : name, price가 공백이라면 제품 등록에 실패 알림창 띄우기
        return;                                                             // 함수 종료
    }
    
    let inputQuestion = false;                                              // inputQuestion 일단 false로 지정
    
    for(let i =0; i < productList.length; i++){                             // productList 배열 순회
        if(productList[i].pName == name ){                                  // 제품 안에 있는 pName과 value값이랑 일치하면
            if(!confirm('제품 목록에 있는 제품명과 일치합니다. 등록하시겠습니까?')){ alert(' 제품 등록을 취소하였습니다. ');   return; }        // 있다고 등록하냐고 물어보기
            inputQuestion = true;                                           // inputQuestion = true;
        }

    }
    if(inputQuestion === false){                                            // 질문이 없었다면? == 즉 일치하는 제품명을 입력하지 않았다면? 
        if(!confirm('해당 제품을 등록하시겠습니까?')){ alert(' 제품 등록을 취소하였습니다. ');   return; }  // 해당 제품 등록하냐고 물어보기
    }


    // 객체 obj생성
    const obj = { pno , pName : name , pPrice : Number(price) , pImg : img , pAmount : 0 }                    // obj 객체에 value값 넣기
    
    // 객체화한거 배열에 추가
    productList.push(obj);                                                                      // productList에 obj 객체 넣기

    // localStorage에 넣기
    localStorage.setItem( 'productList', JSON.stringify(productList) );                         // localStorage에 producList 넣어서 저장
    localStorage.setItem('lastPno', String(lastPno));                                           // lastPno 저장 
    
    alert('제품이 등록되었습니다.');                                                      // 성공 표시

    pName.value = '';                                                               // value값 초기화
    pPrice.value = '';                                                                // value값 초기화
    pImg.value = '';                                                                // value값 초기화

    
    productAddList();                                                                   // 제품 표시줄 렌더링
    stockList ();
    
    return;                                                                             // 함수종료
}


productAddList();                                                                       // productAddList 새로고침때 가져오기
function productAddList(){ //제품 출력함수
    
    let productList = JSON.parse(localStorage.getItem('productList') || '[]');          // localStorage에서 producList 호출해서 productList 변수 만들기

    //const productList = document.querySelector('#productList');
    const productListTable = document.querySelector('#productTbody');                    // productListTable 선언 후 productTbody dom객체화

    let html ='' ;                                                                       // html 선언
    for(let i = 0 ; i < productList.length ; i++){                                         // productList 배열 순회
        const proArray = productList[i];                                                // proArray로 간소화하기
        html += `<tr>   
                        <td> <img src=${proArray.pImg} </td> <td> ${proArray.pno} </td> <td> ${proArray.pName} </td> 
                        <td> ${proArray.pPrice}원 </td> <td><button onclick="productEdit(${proArray.pno})"> 수정 </button>  <button type="button" onclick="productDelete(${proArray.pno})"> 삭제 </button> </td>
                </tr>`                                                                  // 추가하기 

    }

    productListTable.innerHTML = html;                                                  // productListTable html에 넣기
    //showProductList();
}

function productEdit(pno) {
    let productList = JSON.parse(localStorage.getItem('productList') || '[]');          // localStorage에서 productList 배열 가져오기

    for(let i = 0; i< productList.length; i++){                                         // productList 배열 순회
        if(productList[i].pno === pno){                                                 // 매개변수 pno랑 product[i].pno랑 값이 같다면?
            let proEdit = prompt('수정할 가격을 입력하세요. ');
            if(proEdit == null){ return; }                                                             // prompt 값이 없다면 함수 종료
            if (!/^\d+$/.test(proEdit)){                                                               // 숫자가 아니라면
                alert('숫자만 입력하세요.');                                                             // 숫자 입력하라고 alert 해줌 
                return productEdit(pno);                                                          // 같은 상품 다시 재호출 = 반환값 함수;
            }                                                         
            if(proEdit == productList[i].amount){ alert('가격이 동일합니다');                                 // 동일 수량을 입력했다면?
                return productEdit(pno);                                                          // 같은 상품 다시 재호출 = 반환값 함수;
            }
            
            proEdit = Number(proEdit);                                                                // 받은 prompt 값 숫자 변환 해주고 대입해줌
            productList[i].pPrice = proEdit;
            localStorage.setItem('productList', JSON.stringify(productList));
            
            alert(`${proEdit}원으로 변경 되었습니다.`);
            productAddList();                                                           // productAddList 제품출력함수 렌더링                 
            return;                                                                     // 함수 종료하기
        }
    }
    alert("실패하였습니다.");                                                            // 실패 알림
    return;                                                                             // 함수 종료하기
}


function productDelete(pno){                                                            // 제품 제거 함수
    let productList = JSON.parse(localStorage.getItem('productList') || '[]');          // localStorage에서 productList 배열 가져오기

    for(let i = 0; i< productList.length; i++){                                         // productList 배열 순회
        if(productList[i].pno === pno){                                                 // 매개변수 pno랑 product[i].pno랑 값이 같다면?
            let Qusetion = confirm('제품을 삭제하시겠습니까?');
            if(!Qusetion){return;}

            productList.splice( i , 1 );                                                // i 배열 삭제
            localStorage.setItem('productList' , JSON.stringify(productList));          // 그거 localStorage에 저장
            
            alert("삭제되었습니다.");                                                    // 삭제 알림
            productAddList();                                                           // productAddList 제품출력함수 렌더링                 
            return;                                                                     // 함수 종료하기
        }
    }
    alert("실패하였습니다.");                                                            // 실패 알림
    return;                                                                             // 함수 종료하기
}


//==================================================제품 등록 부분 끝==============================================================//

   

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

