(function () {
  /* ---------------- 0. LocalStorage helper ------------------- */
  const SALE_KEY = 'saleData';
  const PROD_KEY = 'productList';

  // ▶ seed 데이터 (예시): 실제 프로젝트에 맞게 교체/추가하세요
  //   - 날짜키 규칙 : dYYMMDD  (ex. 2024‑01‑15 → d240115)
  //   - pno : product number / psell : 판매량
  const seedSale = {
    d240101: [ { pno: 1, psell: 12 }, { pno: 2, psell: 5 } ],
    d240102: [ { pno: 1, psell: 7  }, { pno: 3, psell: 4 } ],
    // … 필요한 만큼 추가 …
  };

  // 제품 목록 (pno ↔ pName 매핑용)
  const seedProd = [
  { pno: 1, pName: "돼지바", pImg: "https://placehold.co/100x100", pPrice: 500, pMount: 0 },
  { pno: 2, pName: "빠삐코", pImg: "https://placehold.co/100x100", pPrice: 700, pMount: 0 },
  { pno: 3, pName: "월드콘", pImg: "https://placehold.co/100x100", pPrice: 1200, pMount: 0 },
  { pno: 4, pName: "메로나", pImg: "https://placehold.co/100x100", pPrice: 600, pMount: 0 },
  { pno: 5, pName: "비비빅", pImg: "https://placehold.co/100x100", pPrice: 500, pMount: 0 },
  { pno: 6, pName: "스크류바", pImg: "https://placehold.co/100x100", pPrice: 800, pMount: 0 },
  { pno: 7, pName: "죠스바", pImg: "https://placehold.co/100x100", pPrice: 800, pMount: 0 },
  { pno: 8, pName: "수박바", pImg: "https://placehold.co/100x100", pPrice: 1000, pMount: 0 },
  { pno: 9, pName: "폴라포", pImg: "https://placehold.co/100x100", pPrice: 500, pMount: 0 },
  { pno: 10, pName: "와", pImg: "https://placehold.co/100x100", pPrice: 1200, pMount: 0 },
  { pno: 11, pName: "붕어싸만코", pImg: "https://placehold.co/100x100", pPrice: 1200, pMount: 0 },
  { pno: 12, pName: "더위사냥", pImg: "https://placehold.co/100x100", pPrice: 700, pMount: 0 },
  { pno: 13, pName: "돼지콘", pImg: "https://placehold.co/100x100", pPrice: 900, pMount: 0 },
  { pno: 14, pName: "쿠앤크콘", pImg: "https://placehold.co/100x100", pPrice: 1000, pMount: 0 },
  { pno: 15, pName: "찰떡아이스", pImg: "https://placehold.co/100x100", pPrice: 1100, pMount: 0 },
  { pno: 16, pName: "옥동자", pImg: "https://placehold.co/100x100", pPrice: 700, pMount: 0 },
  { pno: 17, pName: "아맛나", pImg: "https://placehold.co/100x100", pPrice: 500, pMount: 0 },
  { pno: 18, pName: "투게더", pImg: "https://placehold.co/100x100", pPrice: 1500, pMount: 0 },
  { pno: 19, pName: "누가바", pImg: "https://placehold.co/100x100", pPrice: 600, pMount: 0 },
  { pno: 20, pName: "엔초", pImg: "https://placehold.co/100x100", pPrice: 1000, pMount: 0 },
  { pno: 21, pName: "그린티몬스터", pImg: "https://placehold.co/100x100", pPrice: 1300, pMount: 0 },
  { pno: 22, pName: "탱크보이", pImg: "https://placehold.co/100x100", pPrice: 1000, pMount: 0 },
  { pno: 23, pName: "쿠앤크바", pImg: "https://placehold.co/100x100", pPrice: 1000, pMount: 0 },
  { pno: 24, pName: "브라보콘", pImg: "https://placehold.co/100x100", pPrice: 1200, pMount: 0 },
  { pno: 25, pName: "크런키바", pImg: "https://placehold.co/100x100", pPrice: 900, pMount: 0 },
  { pno: 26, pName: "마이쮸아이스", pImg: "https://placehold.co/100x100", pPrice: 800, pMount: 0 },
  { pno: 27, pName: "젤리슬러시", pImg: "https://placehold.co/100x100", pPrice: 600, pMount: 0 },
  { pno: 28, pName: "망고탱고", pImg: "https://placehold.co/100x100", pPrice: 1000, pMount: 0 },
  { pno: 29, pName: "팥빙수바", pImg: "https://placehold.co/100x100", pPrice: 1300, pMount: 0 },
  { pno: 30, pName: "초코퍼지", pImg: "https://placehold.co/100x100", pPrice: 900, pMount: 0 },
  { pno: 31, pName: "민트초코콘", pImg: "https://placehold.co/100x100", pPrice: 1000, pMount: 0 },
  { pno: 32, pName: "블루베리바", pImg: "https://placehold.co/100x100", pPrice: 800, pMount: 0 },
  { pno: 33, pName: "망고셔벗", pImg: "https://placehold.co/100x100", pPrice: 1100, pMount: 0 },
  { pno: 34, pName: "요거트아이스", pImg: "https://placehold.co/100x100", pPrice: 1100, pMount: 0 },
  { pno: 35, pName: "딸기크림콘", pImg: "https://placehold.co/100x100", pPrice: 1000, pMount: 0 },
  { pno: 36, pName: "오렌지팝", pImg: "https://placehold.co/100x100", pPrice: 900, pMount: 0 },
  { pno: 37, pName: "콜라슬러시", pImg: "https://placehold.co/100x100", pPrice: 700, pMount: 0 },
  { pno: 38, pName: "커피바", pImg: "https://placehold.co/100x100", pPrice: 800, pMount: 0 },
  { pno: 39, pName: "마카롱아이스", pImg: "https://placehold.co/100x100", pPrice: 1200, pMount: 0 },
  { pno: 40, pName: "메론콘", pImg: "https://placehold.co/100x100", pPrice: 1000, pMount: 0 },
  { pno: 41, pName: "모찌롤아이스", pImg: "https://placehold.co/100x100", pPrice: 1200, pMount: 0 },
  { pno: 42, pName: "레인보우바", pImg: "https://placehold.co/100x100", pPrice: 900, pMount: 0 },
  { pno: 43, pName: "초코킹", pImg: "https://placehold.co/100x100", pPrice: 1000, pMount: 0 },
  { pno: 44, pName: "체리바", pImg: "https://placehold.co/100x100", pPrice: 700, pMount: 0 },
  { pno: 45, pName: "피스타치오콘", pImg: "https://placehold.co/100x100", pPrice: 1100, pMount: 0 },
  { pno: 46, pName: "복숭아바", pImg: "https://placehold.co/100x100", pPrice: 900, pMount: 0 },
  { pno: 47, pName: "청포도슬러시", pImg: "https://placehold.co/100x100", pPrice: 800, pMount: 0 },
  { pno: 48, pName: "요구르트콘", pImg: "https://placehold.co/100x100", pPrice: 1000, pMount: 0 },
  { pno: 49, pName: "카라멜콘", pImg: "https://placehold.co/100x100", pPrice: 1000, pMount: 0 },
  { pno: 50, pName: "초코칩아이스", pImg: "https://placehold.co/100x100", pPrice: 1000, pMount: 0 }
];

  // LocalStorage 초기화 (최초 방문 시에만 seed 저장)
  if (!localStorage.getItem(SALE_KEY)) {
    localStorage.setItem(SALE_KEY, JSON.stringify(seedSale));
  }
  if (!localStorage.getItem(PROD_KEY)) {
    localStorage.setItem(PROD_KEY, JSON.stringify(seedProd));
  }

  // 메모리로 로드
  const saleData    = JSON.parse(localStorage.getItem(SALE_KEY));
  const productList = JSON.parse(localStorage.getItem(PROD_KEY));

  /* ---------------- 1. 유틸 함수 --------------------------- */
  const pnoToName = (pno) =>
    (productList.find((p) => p.pno === Number(pno)) || {}).pName || `제품#${pno}`;

  const sumByPno = (rows) =>
    rows.reduce((acc, { pno, psell }) => {
      acc[pno] = (acc[pno] || 0) + psell;
      return acc;
    }, {});

  /* ---------------- 2. 월/분기 매핑 ------------------------ */
  const monthCfg = [
    { btn: 'janToggleBtn',  canvas: 'jan24Input', code: '2401', label: '24년 1월' },
    { btn: 'febToggleBtn',  canvas: 'feb24Input', code: '2402', label: '24년 2월' },
    { btn: 'marToggleBtn',  canvas: 'mar24Input', code: '2403', label: '24년 3월' },
    { btn: 'aprToggleBtn',  canvas: 'apr24Input', code: '2404', label: '24년 4월' },
    { btn: 'mayToggleBtn',  canvas: 'may24Input', code: '2405', label: '24년 5월' },
    { btn: 'junToggleBtn',  canvas: 'jun24Input', code: '2406', label: '24년 6월' },
    { btn: 'julToggleBtn',  canvas: 'jul24Input', code: '2407', label: '24년 7월' },
    { btn: 'augToggleBtn',  canvas: 'aug24Input', code: '2408', label: '24년 8월' },
    { btn: 'sepToggleBtn',  canvas: 'sep24Input', code: '2409', label: '24년 9월' },
    { btn: 'octToggleBtn',  canvas: 'oct24Input', code: '2410', label: '24년 10월' },
    { btn: 'novToggleBtn',  canvas: 'nov24Input', code: '2411', label: '24년 11월' },
    { btn: 'decToggleBtn',  canvas: 'dec24Input', code: '2412', label: '24년 12월' },
    { btn: 'jan25ToggleBtn', canvas: 'jan25Input', code: '2501', label: '25년 1월' },
    { btn: 'feb25ToggleBtn', canvas: 'feb25Input', code: '2502', label: '25년 2월' },
    { btn: 'mar25ToggleBtn', canvas: 'mar25Input', code: '2503', label: '25년 3월' },
    { btn: 'apr25ToggleBtn', canvas: 'apr25Input', code: '2504', label: '25년 4월' },
    { btn: 'may25ToggleBtn', canvas: 'may25Input', code: '2505', label: '25년 5월' },
    { btn: 'jun25ToggleBtn', canvas: 'jun25Input', code: '2506', label: '25년 6월' },
    { btn: 'jul25ToggleBtn', canvas: 'jul25Input', code: '2507', label: '25년 7월' },
  ];

  const quarterCfg = [
    { btn: 'fst24ToggleBtn', canvas: 'fst24Input', codes: ['2401','2402','2403'], label: '24년 1분기' },
    { btn: 'snd24ToggleBtn', canvas: 'snd24Input', codes: ['2404','2405','2406'], label: '24년 2분기' },
    { btn: 'trd24ToggleBtn', canvas: 'trd24Input', codes: ['2407','2408','2409'], label: '24년 3분기' },
    { btn: 'fth24ToggleBtn', canvas: 'fth24Input', codes: ['2410','2411','2412'], label: '24년 4분기' },
    { btn: 'fst25ToggleBtn', canvas: 'fst25Input', codes: ['2501','2502','2503'], label: '25년 1분기' },
    { btn: 'snd25ToggleBtn', canvas: 'snd25Input', codes: ['2504','2505','2506'], label: '25년 2분기' },
  ];

  /* ---------------- 3. Chart 렌더 ------------------------ */
  function buildChart(canvasId, title, map) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(map).map(pnoToName),
        datasets: [{
          label: title,
          data: Object.values(map),
          backgroundColor: 'rgba(13,110,253,0.6)',
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, title: { display: true, text: '판매 수량' } } },
      }
    });
  }

  /* ---------------- 4. 데이터 집계 ----------------------- */
  function rowsForCodes(codes) {
    const prefixes = codes.map(c => 'd' + c);
    return Object.entries(saleData)
      .filter(([k]) => prefixes.some(p => k.startsWith(p)))
      .flatMap(([, v]) => v);
  }

  /* ---------------- 5. UI 토글 -------------------------- */
  const chartContainer  = document.getElementById('ChartContainer');
  const branchContainer = document.getElementById('branchChartContainer');

  function hideAllCanvas() {
    [...chartContainer.querySelectorAll('canvas'),
     ...branchContainer.querySelectorAll('canvas')]
     .forEach(c => c.style.display = 'none');
  }

  function show(container, canvasId) {
    chartContainer.style.display  = (container === chartContainer) ? 'block' : 'none';
    branchContainer.style.display = (container === branchContainer) ? 'block' : 'none';
    hideAllCanvas();
    document.getElementById(canvasId).style.display = 'block';
  }

  /* ---------------- 6. 초기화 --------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    // 오늘 날짜 출력
    const nowSpan = document.getElementById('nowDate');
    if (nowSpan) nowSpan.textContent = new Date().toLocaleDateString('ko-KR');

    // 월별 차트 준비 및 버튼 바인딩
    monthCfg.forEach(({ btn, canvas, code, label }) => {
      buildChart(canvas, label, sumByPno(rowsForCodes([code])));
      document.getElementById(btn).addEventListener('click', () => {
        show(chartContainer, canvas);
      });
    });

    // 분기별 차트 준비 및 버튼 바인딩
    quarterCfg.forEach(({ btn, canvas, codes, label }) => {
      buildChart(canvas, label, sumByPno(rowsForCodes(codes)));
      document.getElementById(btn).addEventListener('click', () => {
        show(branchContainer, canvas);
      });
    });
  });
})();



