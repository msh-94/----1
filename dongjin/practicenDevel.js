// 1. 특정 차트 컨테이너만 열리게 하는 함수
function showOnlyContainer(targetId) {

    // 1) 모든 차트 컨테이너는 기본으로 닫힌 상태
    document.querySelector('#ChartContainer').style.display = 'none';
    document.querySelector('#branchChartContainer').style.display = 'none';

    // 2) 호버를 통해 요청한 컨테이너를 연다
    const target = document.querySelector(targetId);
    if (target) { target.style.display = 'block'; }
}

// 2. 버튼 호버를 통해 차트 보여주는 함수
function showChart(chartIdToShow) {

    // 1) 모든 차트(캔버스) 숨기기
    const canvases = document.querySelectorAll('#ChartContainer canvas , #branchChartContainer canvas');
    canvases.forEach(c => c.style.display = 'none');

    // 2) 특정 차트만 보이게 하기
    const target = document.querySelector(chartIdToShow);
    if (target) { target.style.display = 'bloack'; }
}

// 3. 시계 함수
function dateFunc() {
    // 1) 현재 날짜/시간 구하기 : new Date() 객체
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    // 2) 현재 시간 출력 장소 지정 후 HTML화
    const nowDate = document.querySelector('#nowDate');
    let html = `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
    nowDate.innerHTML = html;
}

// 4. 월간 차트 정보 입력 및 출력
function jan24Chart() {
    // saleData 속성값을 상수로 만들기
    const keys = Object.keys(saleData);
    // 1월에 넣을 빈 객체 만들기
    const saleMap = {};

    // 1. 월 데이터 입력 라인
    for (let i = 0; i <= keys.length - 1; i++) {
        const key = keys[i]; // 속성값의 인덱스 상수 선언
        if (key.startsWith('d2401')) {// saleData의 속성값 중 d2401로 시작하는(1월) 배열 찾기
            const array = saleData[key]; // saleData의 속성값 인덱스를 배열로 지정
            for(let j = 0; j <= array.length - 1; j++){
                const item = array[j]; // 같은 pno의 psell 값을 더하기 위한 item 상수 선언
                if (saleMap[item.pno]){ // 배열의 pno 값이 같을 때
                    saleMap[item.pno] += item.psell;    // psell값을 더한다.
                } else {
                    saleMap[item.pno] = item.psell;     // 배열의 pno 값이 같은 게 없으면, psell 값은 종료. 
                }
            }
        }
    }

    // saleMap -> pno, psell, pName 배열로 변환하기
    const pno = Object.keys(saleMap).map(Number);   // 문자열로 된 숫자를 숫자형으로 변환
    const psell = Object.values(saleMap);           // 합산 수량

    // pno(제품넘버)를 pName(제품명)으로 바꿔출력할 수 있도록 빈 배열을 생성
    const pName = [];
    // 2. 출력함수 : chartInfo의 pno가 productList의 pName과 같다면, pno 대신 pName을 출력한다.





}

