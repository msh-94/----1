// ========================================== 데이터 샘플링 =====================================//

// 제품 등록/목록 const productList = [ { pno : 1 , pname : '돼지바' , pimg : http://placehold.co/100x100 , pprice : 500 } , 
//                                     { pno :  2, pname : '죠스바' , pimg : http://placehold.co/100x100 , pprice : 400 } ];



// ============================= 날짜 변수 만들기 ===================//
let now = new Date();
let y = now.getFullYear();
let m = now.getMonth() + 1;
let d = now.getDate();

// =========================== 오늘날짜 함수 ========================//

function today() {
    const date = document.querySelector('#nowDate');
    let html = `${y}-${m}-${d}`;
    date.innerHTML = html;
}

// ========================== 웹스토리지 함수 ===================== //
// 제품 웹스토리지
function getProduct() {
    let productList = localStorage.getItem('productList');
    if (productList == null) { productList = []; }
    else { productList = JSON.parse(productList); }
    return productList;
} // getProduct 함수 끝

function setProduct(productList) {
    localStorage.setItem('productList', JSON.stringify(productList));
}// setProduct 함수 끝


// ========================== 제품영역 ============================ //

// 제품 등록 함수
function productAdd() {
    const pname = document.querySelector('#pName').value;
    const pprice = document.querySelector('#pPrice').value;
    const pimg = document.querySelector('#pImg').files[0];
    //
    let productList = getProduct();
    let pno = productList.length == 0 ? 1 : productList[productList.length - 1].pno + 1;
    //
    const obj = {
        pno: pno,
        pname: pname,
        pprice: Number(pprice),
        pimg: pimg ? URL.createObjectURL(pimg) : 'https://placehold.co/100x100'
    };
    //
    productList.push(obj);
    setProduct(productList);
    alert(`등록 되었습니다.`);
    // productPrint();
    renderItems();
    document.querySelector('#pName').value = '';
    document.querySelector('#pPrice').value = '';
} // 제품 등록 함수 끝

// 엔터 키 눌렀을 때 제품 등록 함수 실행 (공통 이벤트 리스너)
function handleEnterKey(event) {
    if (event.key === 'Enter') {  // 엔터 키가 눌렸을 때
        productAdd();
    }
}

// 입력 필드에 엔터키 이벤트 리스너 추가
document.querySelector('#pName').addEventListener('keydown', handleEnterKey);
document.querySelector('#pPrice').addEventListener('keydown', handleEnterKey);

// 제품 출력 함수
// productPrint();
// function productPrint() {
//     const productTbody = document.querySelector('#productTbody');
//     let productList = getProduct();
//     let html = '';
//     //
//     for (let i = 0; i < productList.length; i++) {
//         let pro = productList[i]
//         html += `<tr>
//                     <td> <img src="${pro.pimg}"/></td>
//                     <td> ${pro.pno} </td>
//                     <td> ${pro.pname} </td>
//                     <td> ${pro.pprice} </td>
//                     <td> <button onclick="productEdit(${pro.pno})"> 수정 </button> 
//                         <button onclick="productDelete(${pro.pno})"> 삭제 </button>
//                     </td>
//                 </tr>`
//     } // for end
//     productTbody.innerHTML = html;
//     today()
// }// 제품 출력 함수 끝

// 제품 삭제 함수
function productDelete(pno) {
    let productList = getProduct();
    // 
    for (let i = 0; i < productList.length; i++) {
        if (productList[i].pno == pno) {
            productList.splice(i, 1);
            alert(' 제품이 삭제 되었습니다. ');
            setProduct(productList);
            // productPrint();
            renderItems();
            return;
        }// if end
    } // for end
    alert(' [실패] 제품을 찾지 못하였습니다. ')
} // 제품삭제함수 끝

// 제품 수정 함수
function productEdit(pno) {
    let productList = getProduct();
    //
    for (let i = 0; i < productList.length; i++) {
        const pro = productList[i]
        if (pro.pno == pno) {
            pro.pprice = prompt('수정할 금액을 입력해주세요.');
            setProduct(productList);
            alert('수정 성공');
            // productPrint();
            renderItems();
            return;
        }// if end
    } // for end
    alert('수정 실패')
} // 제품 수정함수 끝

// ============================= 페이지네이션 =================================== //
let productList = getProduct();  // 상품 목록을 가져오는 함수 호출
const itemsPerPage = 5; // 한 페이지에 보여줄 아이템 수
const pagesPerGroup = 10; // 한 페이지 그룹에 보여줄 페이지 수

let currentPage = 1; // 현재 페이지
let currentGroup = 1; // 현재 그룹

const totalItems = productList.length; // 전체 아이템 수
const totalPages = Math.ceil(totalItems / itemsPerPage); // 전체 페이지 수


// 페이지 번호와 그룹을 동적으로 생성
function renderPagination() {
    const pageGroupElement = document.getElementById('page-group');// 페이지 그룹을 표시할 DOM 요소 선택
    pageGroupElement.innerHTML = ''; // 기존 페이지 목록 초기화

    const startPage = (currentGroup - 1) * pagesPerGroup + 1; // 현재 그룹에서 시작하는 페이지 번호
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages); // 현재 그룹에서 끝나는 페이지 번호
     // 페이지 번호를 동적으로 생성
    for (let i = startPage; i <= endPage; i++) {
        const pageItem = document.createElement('div');   // 페이지 번호를 담을 div 요소 생성
        pageItem.classList.add('page-item');  // 페이지 항목 클래스 추가
        pageItem.textContent = i;  // 페이지 번호 텍스트 추가

        if (i === currentPage) { // 현재 페이지에 해당하는 경우
            pageItem.classList.add('active'); // 'active' 클래스를 추가하여 현재 페이지를 강조
        }
        // 페이지 번호 클릭 시 동작
        pageItem.addEventListener('click', () => {
            currentPage = i;  // 클릭한 페이지 번호로 현재 페이지 업데이트
            renderPagination();  // 페이지네이션 다시 렌더링
            renderItems(); // 현재 페이지에 맞는 아이템을 렌더링
        });

        pageGroupElement.appendChild(pageItem);  // 페이지 항목을 페이지 그룹에 추가
    }

    // 이전 버튼과 다음 버튼을 활성화/비활성화
    document.getElementById('prev-btn').disabled = currentPage === 1;  // 첫 페이지인 경우 이전 버튼 비활성화
    document.getElementById('next-btn').disabled = currentPage === totalPages;  // 마지막 페이지인 경우 다음 버튼 비활성화
}

// 페이지 변경 함수
function changePage(direction) {
    currentPage += direction;   // 페이지 번호를 direction만큼 변경

    if (currentPage < 1) {
        currentPage = 1;     // 첫 페이지 이상으로 내려가지 않도록 제한
    } else if (currentPage > totalPages) {
        currentPage = totalPages;    // 마지막 페이지 이상으로 넘어가지 않도록 제한
    }

     // 현재 그룹을 조정 (현재 페이지가 새로운 그룹의 범위에 들어가면 그룹을 변경)
    const groupStartPage = (currentGroup - 1) * pagesPerGroup + 1;   // 현재 그룹의 시작 페이지
    const groupEndPage = Math.min(groupStartPage + pagesPerGroup - 1, totalPages);  // 현재 그룹의 끝 페이지
    if (currentPage > groupEndPage) {
        currentGroup++;  // 현재 페이지가 그룹 끝을 넘어가면 그룹을 증가
    } else if (currentPage < groupStartPage) {
        currentGroup--; // 현재 페이지가 그룹 시작을 넘지 않으면 그룹을 감소
    }

    renderPagination(); // 페이지네이션 다시 렌더링
    renderItems();  // 현재 페이지에 맞는 아이템 렌더링
}

// 현재 페이지에 맞는 아이템을 테이블의 tbody에 출력하는 함수
 renderItems()
function renderItems() {
  const tableBody = document.getElementById('productTbody');  // id가 'productTbody'인 tbody를 선택
  tableBody.innerHTML = ''; // 기존 테이블 내용 초기화
  // 현재 페이지에 해당하는 상품 아이템들의 시작 인덱스와 끝 인덱스 계산
  let productList = getProduct();
  productList.sort((a, b) => b.pno - a.pno);    // 제품코드 내림차순 정렬
  const totalItems = productList.length; // 전체 아이템 수
  const startIndex = (currentPage - 1) * itemsPerPage;  
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const pageItems = productList.slice(startIndex, endIndex);  // 해당 페이지의 상품 목록을 슬라이싱하여 추출
  // 추출된 아이템들을 테이블에 추가
  pageItems.forEach(pro => {
    const row = document.createElement('tr'); // 새로운 테이블 행(tr) 생성
    
    // 상품 이미지, 번호, 이름, 가격, 수정 및 삭제 버튼을 포함한 HTML 문자열
    const rowContent = `
      <td> <img src="${pro.pimg}" width="50" height="50" alt="${pro.pname}"/> </td>
      <td> ${pro.pno} </td>
      <td> ${pro.pname} </td>
      <td> ${pro.pprice}원 </td>
      <td> 
        <button class="btnEdit" onclick="productEdit(${pro.pno})">수정</button>
        <button class="btnDelete" onclick="productDelete(${pro.pno})">삭제</button> 
      </td>
    `;
    
    // 행에 HTML 문자열 삽입
    row.innerHTML = rowContent;
    
    // 생성된 행을 tbody에 추가
    tableBody.appendChild(row);
    today();
  });
}

// 페이지 초기화: 페이지네이션과 아이템 렌더링 함수 호출
renderPagination();
renderItems();