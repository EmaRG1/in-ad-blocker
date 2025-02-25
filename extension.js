chrome.webNavigation.onCommitted.addListener(function (tab) {
  
  if (tab.frameId == 0) {
    let queryOptions = { active: true, lastFocusedWindow: true };
    chrome.tabs.query(queryOptions, function (tabs) {
      if (tabs.length > 0) {
        
        let url = tabs[0].url;
  
        let parsedUrl = url
          .replace("https://", "")
          .replace("http://", "").replace("www.", "");
        
        let domain = parsedUrl
          .slice(0, parsedUrl.indexOf("/") == -1 ? parsedUrl.length : parsedUrl.indexOf("/"))
          .slice(0, parsedUrl.indexOf("?") == -1 ? parsedUrl.length : parsedUrl.indexOf("?"));
        
        try {
          if (domain.length < 1 || domain === null || domain === undefined) {
            return;
          }
          else if (domain == "linkedin.com") {
            runLinkedinScript(tabs);
            return
          }
        } catch (error) {
          throw error
        }
      }

    })
  }
})

function runLinkedinScript(tabs) {
  chrome.scripting.executeScript({
    target: { tabId: tabs[0].id },
    files: ['linkedin.js']
  });
  return true;
}