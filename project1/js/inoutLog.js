// 로그 출고/목록 const inoutLog = [ { logco : 1 , pno : 1 , amount : 30 , inout : 1 , date : ${y}-${m}-${d} } , 
//                                  { logco : 2  , pno : 2 , amount : 40 , inout : 2 , date : ${y}-${m}-${d} } ];

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
}// 날짜함수 끝


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


// 로그 웹스토리지
function getInoutLog() {
    let inoutLog = localStorage.getItem('inoutLog');
    if (inoutLog == null) { inoutLog = []; }
    else { inoutLog = JSON.parse(inoutLog); }
    return inoutLog;
} // getInoutLog 함수 끝

function setInoutLog(inoutLog) {
    localStorage.setItem('inoutLog', JSON.stringify(inoutLog));
} // setInoutLog 함수 끝


// ======================== 입출고 로그 영역 ====================== //

// 출고 등록 함수
function outAdd() {
    const pname = document.querySelector('#pName').value;
    const amount = document.querySelector('#amount').value;
    const date = document.querySelector('#date').value; 
    const area = document.querySelector('#area').value;
    //
    let productList = getProduct();
    let inoutLog = getInoutLog();
    let logco = inoutLog.length == 0 ? 1 : inoutLog[inoutLog.length - 1].logco + 1;
    // 

    for (let i = 0; i < productList.length; i++) {
        let pro = productList[i]
        if (pro.pname == pname) {
            const obj = {
                logco: logco,
                pno: pro.pno,
                amount: amount,
                inout: 2,
                area: area,
                date: date
            }
            //
            inoutLog.push(obj);
            setInoutLog(inoutLog);
            // logPrint();
            renderInoutLogItems();
            alert('출고 되었습니다.');
            return;
        }// if end
    } // for end
} // 출고 등록 함수

// 입출고 로그 출력 함수
// logPrint()
// function logPrint() {
//     const outTbody = document.querySelector('#outTbody');
//     let inoutLog = getInoutLog();
//     let productList = getProduct();
//     let html = '';

//     for (let i = 0; i < inoutLog.length; i++) {
//         let iol = inoutLog[i];
//         for (let a = 0; a < productList.length; a++) {
//             let pro = productList[a];
//             if (iol.pno == pro.pno) {
//                 if (iol.inout == 2) {
//                     iol.inout = '출고'
//                 } // if1 end
//                 html += `<tr>
//                             <td> ${iol.logco} </td>
//                             <td> ${iol.inout} </td>
//                             <td> ${pro.pname} </td>
//                             <td> ${iol.amount} </td>
//                             <td> ${iol.date} </td>
//                             <td> ${iol.area} </td>
//                             <td> <button onclick="inoutEdit(${iol.logco})"> 수정 </button></td>
//                         </tr>`
//             }// if2 end
//         }// for2 end
//     }// for1 end
//     outTbody.innerHTML = html;
//     today()
// }// 로그 출력함수 끝

// 입출고사유 수정 함수

function inoutEdit(logco) {
    let inoutLog = getInoutLog();
    for (let i = 0; i < inoutLog.length; i++) {
        const iol = inoutLog[i];
        if (iol.logco == logco) {
            iol.amount = prompt('수량 : ');
            iol.area = prompt('입출고사유 : ');
            setInoutLog(inoutLog);
            alert('수정 되었습니다.');
            // logPrint();
            renderInoutLogItems();
            return;
        }// if end
    }// for end
}// 입출고사유 수정함수 끝

// ============================= 페이지네이션 =================================== //
let inoutLog = getInoutLog();
let productList = getProduct();
const itemsPerPage = 5; // 한 페이지에 보여줄 아이템 수
const pagesPerGroup = 10; // 한 페이지 그룹에 보여줄 페이지 수

let currentPage = 1; // 현재 페이지
let currentGroup = 1; // 현재 그룹

const totalItems = inoutLog.length; // 전체 아이템 수
const totalPages = Math.ceil(totalItems / itemsPerPage); // 전체 페이지 수



// 페이지 번호와 그룹을 동적으로 생성
function renderPagination() {
    const pageGroupElement = document.getElementById('page-group');
    pageGroupElement.innerHTML = ''; // 기존 페이지 목록 초기화

    const startPage = (currentGroup - 1) * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
        const pageItem = document.createElement('div');
        pageItem.classList.add('page-item');
        pageItem.textContent = i;

        if (i === currentPage) {
            pageItem.classList.add('active');
        }

        pageItem.addEventListener('click', () => {
            currentPage = i;
            renderPagination();
            renderInoutLogItems();
        });

        pageGroupElement.appendChild(pageItem);
    }

    // 이전 버튼과 다음 버튼을 활성화/비활성화
    document.getElementById('prev-btn').disabled = currentPage === 1;
    document.getElementById('next-btn').disabled = currentPage === totalPages;
}

// 페이지 변경 함수
function changePage(direction) {
    currentPage += direction;

    if (currentPage < 1) {
        currentPage = 1;
    } else if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    // 현재 그룹을 조정
    const groupStartPage = (currentGroup - 1) * pagesPerGroup + 1;
    const groupEndPage = Math.min(groupStartPage + pagesPerGroup - 1, totalPages);
    if (currentPage > groupEndPage) {
        currentGroup++;
    } else if (currentPage < groupStartPage) {
        currentGroup--;
    }

    renderPagination();
    renderInoutLogItems();
}

// 현재 페이지에 맞는 아이템을 테이블의 tbody에 출력하는 함수
renderInoutLogItems();
function renderInoutLogItems() {
    const tableBody = document.getElementById('outTbody');
    tableBody.innerHTML = ''; // 기존 테이블 내용 초기화
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const pageItems = inoutLog.slice(startIndex, endIndex);

    // 예시로 'pageItems'라는 배열을 사용
    pageItems.forEach(iol => {
        // iol.pno를 통해 해당 상품을 찾기 (상품 목록인 productList에서 찾음)
        const pro = productList.find(product => product.pno === iol.pno);
        if (iol.inout == 2) {iol.inout = '출고'}
        

        // 테이블 행을 템플릿 리터럴로 생성
        const rowContent = `
                            <tr>
                                <td> ${iol.logco} </td>
                                <td> ${iol.inout} </td>
                                <td> ${pro ? pro.pname : '상품 미발견'} </td> <!-- 상품명을 찾아서 표시 -->
                                <td> ${iol.amount} </td>
                                <td> ${iol.date} </td> <!-- 날짜를 표시 -->
                                <td> ${iol.area || '미지정'} </td> <!-- 지역 (값이 없을 경우 '미지정' 표시) -->
                                <td> <button class="btnEdit" onclick="inoutEdit(${iol.logco})">수정</button> </td>
                            </tr>
                            `;

        // 행을 테이블에 추가
        tableBody.insertAdjacentHTML('beforeend', rowContent);
    });
    today();

}

// 페이지 초기화
renderPagination();
renderInoutLogItems();