/*chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.create({ url: chrome.extension.getURL("tabs_api.html") });
});*/



chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { schemes: ['https', 'http'] },
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });

    var personName = chrome.contextMenus.create({
        id: "personName",
        title: "Save Name",
        contexts: ["selection"]
    });
    var personPosition = chrome.contextMenus.create({
        id: "personPosition",
        title: "Save Position",
        contexts: ["selection"]
    });
    var personEmail = chrome.contextMenus.create({
        id: "personEmail",
        title: "Save Email",
        contexts: ["selection"]
    });
    var personPhone = chrome.contextMenus.create({
        id: "personPhone",
        title: "Save Person's Phone",
        contexts: ["selection"]
    });
    var country = chrome.contextMenus.create({
        id: "country",
        title: "Save Country",
        contexts: ["selection"]
    });
    var companyName = chrome.contextMenus.create({
        id: "companyName",
        title: "Save Company",
        contexts: ["selection"]
    });
    var companyUrl = chrome.contextMenus.create({
        id: "companyUrl",
        title: "Save Website",
        contexts: ["selection"]
    });
    var companyEmail = chrome.contextMenus.create({
        id: "companyEmail",
        title: "Save Company Email",
        contexts: ["selection"]
    });
    var companyPhone = chrome.contextMenus.create({
        id: "companyPhone",
        title: "Save Company Phone",
        contexts: ["selection"]
    });



    chrome.contextMenus.onClicked.addListener(function (clickData) {
        var selectedVal = clickData.selectionText;

        if (clickData.selectionText) {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                var jsonMsg = { "msgType": clickData.menuItemId, "msgValue": selectedVal };
                chrome.tabs.sendMessage(tabs[0].id, jsonMsg, function (response) {
                    console.log(response.answer);
                });
            });
        }
    });
});

