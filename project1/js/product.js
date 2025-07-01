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
    alert(`등록 되었습니다.`);
    setProduct(productList);
    productPrint();
    document.querySelector('#pName').value = '';
    document.querySelector('#pPrice').value = '';
} // 제품 등록 함수 끝

// 제품 출력 함수
productPrint();
function productPrint() {
    const productTbody = document.querySelector('#productTbody');
    let productList = getProduct();
    let html = '';
    //
    for (let i = 0; i < productList.length; i++) {
        let pro = productList[i]
        html += `<tr>
                    <td> <img src="${pro.pimg}"/></td>
                    <td> ${pro.pno} </td>
                    <td> ${pro.pname} </td>
                    <td> ${pro.pprice} </td>
                    <td> <button onclick="productEdit(${pro.pno})"> 수정 </button> 
                        <button onclick="productDelete(${pro.pno})"> 삭제 </button>
                    </td>
                </tr>`
    } // for end
    productTbody.innerHTML = html;
    today()
}// 제품 출력 함수 끝

// 제품 삭제 함수
function productDelete(pno) {
    let productList = getProduct();
    // 
    for (let i = 0; i < productList.length; i++) {
        if (productList[i].pno == pno) {
            productList.splice(i, 1);
            alert(' 제품이 삭제 되었습니다. ');
            setProduct(productList);
            productPrint();
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
            productPrint();
            return;
        }// if end
    } // for end
    alert('수정 실패')
} // 제품 수정함수 끝

// ============================= 페이지네이션 =================================== //


pageNation()
function pageNation() {
    let productList = getProduct();
    const page = document.querySelector('.page');
    let html = '';
    const currentPage = 1;  //  현재 페이지
    const totalCount = productList;  // 총 자료수
    const pageContent = 5;  // 한 페이지의 나타날 자료수
    const pageCount = 5;    //  한 화면에 보이는 페이지개수
    let totalPage = Math.ceil(totalCount / pageContent); // 총 페이지수
    let pageGroup = Math.ceil(currentPage / pageCount); // 현재 페이지 그룹 찾기
    let first = ((pageGroup - 1) * pageCount) + 1;  // 현재 페이지그룹의 첫번째
    let last = pageGroup * pageCount;   // 현재 페이지그룹의 마지막
    if (last > totalPage) {
        last = totalPage
    }   // 페이지그룹의 마지막이 총 페이지 수보다 높으면 마지막페이지가 총페이지
    const next = last + 1;  // 다음 페이지그룹
    const prev = first - 1  // 이전 페이지그룹
    for (let i = first; i <= last; i++) {
        html += `<li>${i}</li>`
    }
    page.innerHTML = html;

}