function analyzeText(text) {
  chrome.runtime.sendMessage({type:"analyze", payload:{content:text}});
  chrome.runtime.onMessage.addListener(function cb(msg){
    if (msg.type==="analysisResult") {
      alert(`Credibility: ${msg.result.score??"N/A"}% - ${msg.result.label}`);
      chrome.runtime.onMessage.removeListener(cb);
    }
  });
}
document.addEventListener("mouseup", () => {
  const sel = window.getSelection().toString().trim();
  if (sel.length > 10) analyzeText(sel);
});