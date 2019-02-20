chrome.browserAction.onClicked.addListener(function () {
    let localStrageUrlList = JSON.parse(localStorage["url_list"]);
    localStrageUrlList.forEach(function (url) {
        chrome.tabs.create({ "url": url["url"] }, tab => { });
    })
});

chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        type: 'normal',
        id: 'test',
        title: 'みさとの機能'
    });
});

chrome.contextMenus.onClicked.addListener(function () {
    chrome.tabs.create({ "url": "options.html" }, tab => { });
});