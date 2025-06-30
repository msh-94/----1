function getSeasonalPsell(month) {
  if (month >= 5 && month <= 8) return Math.floor(Math.random() * 13) + 8;     // 여름
  else if (month === 12 || month <= 2) return Math.floor(Math.random() * 8) + 1; // 겨울
  else return Math.floor(Math.random() * 12) + 4;                                // 봄/가을
}

function generateDailySales(dateStr) {
  const month = new Date(dateStr).getMonth() + 1;
  const pnos = Array.from({ length: 50 }, (_, i) => i + 1);
  const selected = pnos.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 8) + 3);
  return selected.map(pno => ({ pno, psell: getSeasonalPsell(month) }));
}

function generateQuarterData(startDateStr, endDateStr) {
  const data = [];
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const key = `d${d.getFullYear().toString().slice(2)}${(d.getMonth() + 1).toString().padStart(2, '0')}${d.getDate().toString().padStart(2, '0')}`;
    const daily = generateDailySales(d.toISOString().split("T")[0]);
    data.push(`const ${key} = ${JSON.stringify(daily)};`);
  }
  return data.join("\n");
}

// 예시: 2024년 1월 1일 ~ 3월 31일
console.log(generateQuarterData("2024-01-01", "2025-07-01"));