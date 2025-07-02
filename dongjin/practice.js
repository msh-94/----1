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

    // 모든 차트 숨기기
    const canvases = document.querySelectorAll('#ChartContainer canvas , #branchChartContainer canvas');
    canvases.forEach(c => c.style.display = 'none');
}