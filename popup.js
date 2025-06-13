document.getElementById("startBtn").addEventListener("click", () => {
  const weight = parseFloat(document.getElementById("weight").value);
  const activity = document.getElementById("activity").value;
  const climate = document.getElementById("climate").value;

  if (!weight || weight < 20 || weight > 200) {
    alert("Vui lòng nhập cân nặng hợp lệ (20–200kg)!");
    return;
  }

  // Tính lượng nước cơ bản: 35ml / kg
  let ml = weight * 35;

  if (activity === "medium") ml += 250;
  else if (activity === "high") ml += 500;

  if (climate === "hot") ml += 500;
  else if (climate === "cold") ml -= 250;

  // Chia theo cốc 250ml
  const reminderCount = Math.floor(ml / 250);
  const totalMinutes = 14 * 60; // từ 8h sáng đến 22h
  const interval = Math.floor(totalMinutes / reminderCount);

  chrome.storage.local.set({intervalMinutes: interval});
  chrome.runtime.sendMessage({start: true});

  alert(`Bạn nên uống khoảng ${Math.round(ml)}ml/ngày.\nHệ thống sẽ nhắc mỗi ${interval} phút.`);
});
