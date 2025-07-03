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






//===================== productAddList 전역 변수 ========================//



var keywordProduct = '';                  // 검색한 값 전역변수 - 이벤트리스너에서 활용 됨,       var를 쓴 이유 쿼리스트링 해야해서 통신을 해야하기 때문에 let 보다는 var가 좋다고 gpt가 말해줌 ,,
let productOption = 'codeAsc';            // 정렬 변수 초기값 정해주기 : nameDesc는 제품번호 내림차순임 -> html value값 확인해보면 됨
let productCurrentPage = 1;               // 현재 페이지 번호 (1부터 시작)
const productPerPage   = 5;               // 페이지당 최대 행 수   



//========================================================================//



function productAdd(){ console.log('productAdd');                                           // 제품 등록함수 productAdd
    
    // 마크업객체 가져오기
    const pName = document.querySelector('#pName');         console.log(pName);             // 제품명 DOM 객체화
    const pPrice = document.querySelector('#pPrice');           console.log(pPrice);        // 제품 가격 DOM 객체화
    const pImg = document.querySelector('#pImg');          console.log(pImg);               // 제품사진 DOM 객체화        

    
    // value값 가져오기
    const name = pName.value.trim();                                                        // value 값 가져오기
    const price = pPrice.value.trim();                                                      // value 값 가져오기
    const Image = pImg.files[0];                                                            // value 값 가져오기
    const img = Image ? URL.createObjectURL(Image) :'https://placehold.co/100x100';         // value 값 가져오기 이미지 가져오는데 없으면 100x100 그림 가져온다는 뜻

    // localStorage에서 productList 배열 가져오기
    let productList = JSON.parse(localStorage.getItem('productList') || '[]');              // productList JSON.parse해서 호출하기 || 없다면 '[]' 배열추가 
                                         
    let lastPno = Number(localStorage.getItem('lastPno') || 0);                             // lastPno localStorage에서 호출하기 || 없다면 0으로 선언
    const pno = ++lastPno                                                                   // pno 증감은 lastPno에서 가져옴

    // value값 가져온거 객체화 하기
    if( name == '' || price == '' ){                                                        // value값 가져온거 객체화 하기
        alert('항목을 모두 입력해주십시오');                                                // 유효성 검사 : name, price가 공백이라면 제품 등록에 실패 알림창 띄우기
        return;                                                                             // 함수 종료
    }
    if( price <= 0){ alert(" 0 이상만 등록가능합니다. "); return  productAdd(); }           // 등록 가격이 0이상이 아닐시 다시 입력     // 유효성검사

    let inputQuestion = false;                                                          // inputQuestion 일단 false로 지정
    
    for(let i =0; i < productList.length; i++){                                         // productList 배열 순회
        if(productList[i].pName == name ){                                              // 제품 안에 있는 pName과 value값이랑 일치하면
            if(!confirm('제품 목록에 있는 제품명과 일치합니다. 등록하시겠습니까?')){ alert(' 제품 등록을 취소하였습니다. ');   return; }        // 있다고 등록하냐고 물어보기
            inputQuestion = true;                                           // inputQuestion = true;
        }

    }
    if(inputQuestion === false){                                            // 질문이 없었다면? == 즉 일치하는 제품명을 입력하지 않았다면? 
        if(!confirm('해당 제품을 등록하시겠습니까?')){ alert(' 제품 등록을 취소하였습니다. ');   return; }  // 해당 제품 등록하냐고 물어보기
    }


    // 객체 obj생성
    const obj = { pno , pName : name , pPrice : Number(price) , pImg : img , pAmount : 0 }      // obj 객체에 value값 넣기
    
    // 객체화한거 배열에 추가
    productList.push(obj);                                                                      // productList에 obj 객체 넣기

    // localStorage에 넣기
    localStorage.setItem( 'productList', JSON.stringify(productList) );                         // localStorage에 producList 넣어서 저장
    localStorage.setItem('lastPno', String(lastPno));                                           // lastPno 저장 
    
    alert('제품이 등록되었습니다.');                                                        // 성공 표시

    pName.value = '';                                                                   // value값 초기화
    pPrice.value = '';                                                                  // value값 초기화
    pImg.value = '';                                                                    // value값 초기화

    productAddList( keywordProduct , productCurrentPage );                              // 제품 표시줄 렌더링 매개변수 넣어서 배열이랑 검색값 안 초기화 되도록 함
    stockList ();                                                                       // 재고 리스트 렌더링
    
    return;                                                                             // 함수종료
}

   

productAddList();                                                                       // productAddList 새로고침때 가져오기
function productAddList(searchTerm = '' , page = 1 ){       //제품 출력함수 , searchTerm : 입력값 매개변수 없다면 '' , page 기본값 1
    
    let productList = JSON.parse(localStorage.getItem('productList') || '[]');          // localStorage에서 producList 호출해서 productList 변수 만들기
    
    // 검색하는 함수 부분
    if(searchTerm) {                                                                             // 검색을 한 입력값이 있다면
        const key = searchTerm.toLowerCase();                                                    // 매개변수 값 비교가 편하게 전부 소문자로 바꿔준 걸 key 대입

        productList = productList.filter(p => // productList 배열의 각 객체(p)를 하나씩 순회함, 객체의 pName을 다 검사 하는데, toLowerCase인 소문자로 다 바꿔서 검사함(소문자로 다 바꿔서 비교가 쉽게)
        p.pName.toLowerCase().includes(key)   // key 즉, 매개변수(검색한 값)이 pName에 포함되어있는지(includes함수), 포함되어 있다면 true로 나타내고 없으면 false로 나타낸다. filter는 배열을 재배치하는 거.
        );                                  // 즉 그냥 filter해서 검색에 빠삐코를 친다면 빠만 쳐도 빠삐코라는 pName에 빠가 들어가니까 그것만 true가 됨
    }                                         // 그리고 그 true된 것들만 filter해서 배열을 다시 만든걸 productList에 넣어주고 보여줌 

    
    // 정렬 하는 함수 부분
    productList.sort((a, b) => { // productList 배열에서 임의 a, b 두 값을 비교하는 sort함수 실행, a b를 비교해서 값이 양수값이 나오면 그 둘의 배열 위치를 바꾸는 함수식. for문과 비슷         
                                // (a의 .pno)- (b의 pno), 예를 들어 a.pno가 1이고 b.pno가 2이면 1 - 2 이니까 -1이 뜨니 음수니까 배열을 교체하지 않음 그래서 1 2로 배열되게 함
        
        if(productOption){                 // productOption이 존재한다면? productOption 정렬 전역변수임.
            
            if(productOption== 'codeDesc'){ return b.pno - a.pno ;}                         // codeDesc ( 코드 내림차순 )
            else if(productOption == 'codeAsc'){return a.pno - b.pno ;}                     // codeASC ( 코드 오름차순 ) (기본값)
            else if(productOption == 'priceDesc'){return b.pPrice -a.pPrice ;}              // priceDesc (가격 내림차순)
            else if(productOption == 'priceAsc'){return a.pPrice -b.pPrice ;}             // priceAsc (가격 오름차순)

        }                                                                                  // sort 함수는 리턴값이 꼭 있어야함
    });
    

    // 페이지네이션 동적으로 페이지 그리는 부분
    const totalProArray = productList.length;                           // totalProArray = productList 배열 길이 즉, 제품 수
    const ShowIndex = (page - 1)*productPerPage ;                       // 페이지마다 보여줄 배열 // page가 1페이지면 (1-1)*stockPerPage(페이지당 보여줄 제품수) => 0*stockPerpage = 0인덱스부터 시작 ,, 1페이지니까 0인덱스부터
    const PageProducList = productList.slice(ShowIndex , ShowIndex + productPerPage);    // slice를 값으로 정의해주면 자른 값이 나옴. 보여줄 배열은 그 배열부터 + 한 페이지당 보여줄 배열 수 


    const productListTable = document.querySelector('#productTbody');                    // productListTable 선언 후 productTbody dom객체화

    let html ='' ;                                                                       // html 선언
    for(let i = 0 ; i < PageProducList.length ; i++){                                         // 페이지네이션으로 자른 배열인 PageProducList 배열 순회
        const proArray = PageProducList[i];                                                // proArray로 간소화하기
        html += `<tr>   
                        <td> <img src=${proArray.pImg} </td> <td> ${proArray.pno} </td> <td> ${proArray.pName} </td> 
                        <td> ${proArray.pPrice}원 </td> <td><button onclick="productEdit(${proArray.pno})"> 수정 </button> 
                         <button type="button" onclick="productDelete(${proArray.pno})"> 삭제 </button> </td>
                </tr>`                                                                  // 추가하기 

    }
    
    const maxRows = productPerPage;
    const emptyRows = maxRows - PageProducList.length;
    for (let i = 0; i < emptyRows; i++) {
        html += `<tr><td colspan="7" style="height: 91px;"></td></tr>`;
    }

    productListTable.innerHTML = html;                                                  // productListTable html에 넣기
    //showProductList();
    ShowLiEventner(totalProArray);                                                      // 페이지 네이션 html 쪽 그려줄 총 제품수( totalProArray )를 매개변수로 한 ShowLiEventer 함수 호출
}




function productEdit(pno) {
    
    let productList = JSON.parse(localStorage.getItem('productList') || '[]');          // localStorage에서 productList 배열 가져오기

    for(let i = 0; i< productList.length; i++){                                         // productList 배열 순회
        if(productList[i].pno === pno){                                                 // 매개변수 pno랑 product[i].pno랑 값이 같다면?
            let proEdit = prompt('수정할 가격을 입력하세요. ');
            if(proEdit == null){ return; }                                                              // prompt 값이 없다면 함수 종료
            if (!/^\d+$/.test(proEdit)){                                                                // 숫자가 아니라면
                alert('숫자만 입력하세요.');                                                             // 숫자 입력하라고 alert 해줌 
                return productEdit(pno);                                                                // 같은 상품 다시 재호출 = 반환값 함수;
            }                                                         
            if(proEdit == productList[i].amount){ alert('가격이 동일합니다');                            // 동일 수량을 입력했다면?
                return productEdit(pno);                                                                // 같은 상품 다시 재호출 = 반환값 함수;
            }
            
            proEdit = Number(proEdit);                                                                  // 받은 prompt 값 숫자 변환 해주고 대입해줌
            productList[i].pPrice = proEdit;                                                            // productList localStorage에 문자형식으로 넣어줌
            localStorage.setItem('productList', JSON.stringify(productList));
            
            alert(`${proEdit}원으로 변경 되었습니다.`);                                   // 변경 됐다고 알림
            productAddList( keywordProduct , productCurrentPage );                      // productAddList 제품출력함수 렌더링                 
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
            let Qusetion = confirm('제품을 삭제하시겠습니까?');                          // 삭제하겠냐고 물어봄
            if(!Qusetion){return;}                                                      // 

            productList.splice( i , 1 );                                                // i 배열 삭제
            localStorage.setItem('productList' , JSON.stringify(productList));          // 그거 localStorage에 저장
            
            alert("삭제되었습니다.");                                                    // 삭제 알림
            productAddList( keywordProduct , productCurrentPage );                       // productAddList 제품출력함수 렌더링, 매개변수 넣어서 배열이랑 검색값 안 초기화 되도록 함                 
            return;                                                                     // 함수 종료하기
        }
    }
    alert("실패하였습니다.");                                                            // 실패 알림
    return;                                                                             // 함수 종료하기
}





document.addEventListener('DOMContentLoaded', () => { // addEventListner(이벤트 , 함수)는 특정 이벤트가 발생하면 해당 함수를 실행하라는 뜻
            // DOMcontentLoaded는 HTML 문서 안 모든 DOM객체들이 로드 되면 실행하는 이벤트, 
            // () => {}는 {} 안에 있는 함수 실행이라는 뜻 , 즉 이벤트가 발생하면 {} 안에 있는 코드들을 실행한다는 것임.
  
    const productInput = document.querySelector('#productSearchInput');      // 검색 input창을 DOM 객체화 한 것

    // stockList 검색창 뜨는 부분임
    if( productInput ){                                                     // 만약 검색 input(value값) 요소가 존재한다면?
        productInput.addEventListener('input', e =>{                         // addEventListner() 실행하는데 input이벤트 즉, 값이 하나하나 입력될 때마다 e라는 객체에 대한 함수 실행함
        keywordProduct = e.target.value.trim() ;                             // e라는 객체에 .target은 이벤트발생요소를 지칭 즉, input이벤트, .trim()은 공백제거 즉, 입력값의 공백을 제거한 것을 keyword 상수에 대입
        productCurrentPage = 1 ;                                              // 검색할 때 마다 페이지네이션 페이지 1로 새로고침
        productAddList(keywordProduct , 1);                                        // 그런 input값과 페이지네이션 1값은 productAddList 즉 제품 리스트의 매개변수로 들어가서 함수 렌더링 즉, 재호출함
        });
    }
    
    // 정렬 버튼 바뀌는 부분임
    const productSelect = document.querySelector('#productSelect');           // 정렬 버튼을 DOM 객체화 한 것
    
    if( productSelect ){                                                    // 만약 productSelect 있다면? 즉 dom객체가 있다면? 
        
        productSelect.addEventListener('change', e =>{                      // addEventLister는 특정 이벤트가 실행될 때 즉 change 교체 이벤트가 실행될 때 함수를 실행 
            productOption = e.target.value;                                 // productOption 이라는 전역 변수에 이벤트요소 즉 productSelect 벨류값을 넣어준다. 
            productCurrentPage = 1 ;                                        // 검색할 때 마다 페이지네이션 페이지 1로 새로고침                    
            productAddList(keywordProduct , 1 );                            // 검색했을 때 정렬하면 검색값이 풀리니 productAddList 검색창했던 keywordProduct 페이지네이션 1넣어줌 그리고 productAddList 매개변수로 다시 렌더링해준다.
        });
    } 

});                            




function ShowLiEventner(totalProArray) {                //페이지네이션 html 그려주는 함수 productList의 총 배열수를 매개변수로 함
    
    const totalPages = Math.ceil(totalProArray / productPerPage);   // Math.ceil 함수는 그 안의 값을 올림해줌, 총 배열수 / 페이지당 보여줄 배열수로 나눈후 1.7이라면 2로 해줌
    
    let html = '';                                                  // html 그려줌

    const add = function(pageNumber){                               // add함수는 페이지숫자를 매개변수로 함
        html += `<div ${pageNumber === productCurrentPage ? 'class="active"' : ''}>   
                    <a href="#" onclick="clickPage(${pageNumber}); return false;">
                        ${pageNumber}
                    </a> 
                </div>`;    // 삼항연산자는 선택된 페이지에게 active 클래스를 html에 부여해준다는 뜻으로 css에서 .active에 글씨 강조효과등을 넣으면 됨
    };

    for (let p = 1; p <= totalPages; p++) add(p);   // 실질적으로 매개변수에 그려줄 p, 총페이지만큼 증감해줘서 실질적으로 총페이지만큼 숫자를 만들어냄


    document.querySelector('#product-page-item').innerHTML = html;          // div에 그린 html을 innerHTML해줌 
    document.getElementById('product-prev-btn').disabled = (productCurrentPage === 1);  // 해당페이지가 1이라면 이전 버튼 disabled
    document.getElementById('product-next-btn').disabled = (productCurrentPage === totalPages); // 해당페이지가 마지막 페이지라면 다음 버튼 disabled

}


function clickPage( page ){   // 페이지네이션으로 hmtl 그린 애들을 실제로 해당 제품리스트 나타내는 곳에 호출해주는 함수 , 어디있냐고? html안에 재고량 수정함수마냥 들어가있음
    productCurrentPage = page;  // 현재 페이지를 클릭한 page 매개변수로 넣어줌
    productAddList(keywordProduct , page); // productAddList에 검색창을 유지한채 페이지 매개변수를 넘겨줌 
}

// 엔터 키 눌렀을 때 제품 등록 함수 실행 (공통 이벤트 리스너)
function EnterKey(event) {
    if (event.key === 'Enter') {  // 엔터 키가 눌렸을 때
        productAdd();
    }// if end
}// func end

// 입력 필드에 엔터키 이벤트 리스너 추가
document.querySelector('#pName').addEventListener('keydown',EnterKey);
document.querySelector('#pPrice').addEventListener('keydown', EnterKey);