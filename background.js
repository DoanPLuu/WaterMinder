chrome.runtime.onMessage.addListener((msg) => {
  if (msg.start) {
    chrome.alarms.clearAll(() => {
      chrome.storage.local.get("intervalMinutes", ({intervalMinutes}) => {
        chrome.alarms.create("drinkReminder", {
          periodInMinutes: intervalMinutes
        });
      });
    });
  }
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "drinkReminder") {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon.png",
      title: "💧 Uống nước nào!",
      message: "Đã đến lúc uống 1 cốc nước (~250ml)",
      priority: 2
    });
  }
});
