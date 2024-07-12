export default function handler() {
  function generateRandomData(length: number, min: number, max: number) {
    const data = [];
    for (let i = 0; i < length; i++) {
      const randomValue = (Math.random() * (max - min) + min).toFixed(2);
      data.push(parseFloat(randomValue));
    }
    return data;
  }

  const randomWeeklyData = generateRandomData(70, 62000, 80800);
  const data = {
    current: 63179.71,
    change: 2161.42,
    percentageChange: 3.54,
    weeklyData: randomWeeklyData,
  };

  return data;
}
