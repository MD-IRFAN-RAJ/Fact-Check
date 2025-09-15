const BACKEND_URL = "http://localhost:8080";
chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.type === "analyze") {
    fetch(`${BACKEND_URL}/analyze`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(msg.payload)
    }).then(r=>r.json()).then(result=>{
      chrome.tabs.sendMessage(sender.tab.id, {type:"analysisResult", result});
    });
  }
});