let urlListRowCount = 0;
let urlList = [];
let emptyUrlListRowIds = [];
const deleteButton = `<button type="button" class="delete_row"> 削除 </button>`;

$(function () {

    init();

    $("#add_url_list_row").click(function () {
        if ($("li").length < 5) {
            addUrlListRow("");
            addDeleteRowButton();
        } else {
            alert("最大５つまでです。");
        }
    });

    $("#save").click(function () {
        if (hasUrl()) {
            if (emptyUrlListRowIds.length > 0) {
                emptyUrlListRowIds.reverse().forEach(function (value) {
                    $("li").eq(value).remove();
                });
            }
            localStorage["urlList"] = JSON.stringify(urlList);
            openCompleteDlg();
        }
    });

    $("#clear").click(function () {
        const res = confirm("登録したものを全て削除します。いいですか？");
        if (res) {
            localStorage.removeItem("urlList");
            chrome.tabs.update({ url: "options.html" });
        }
    });

});

function init() {
    //localStorageにURLが保存されている場合は、入力欄にURLが入力されている状態で表示する。
    if (localStorage["urlList"]) {
        JSON.parse(localStorage["urlList"]).forEach(function (url) {
            if (urlListRowCount == 0) {
                $("li").eq(0).children("input").val(url["url"]);
                urlListRowCount++;
            } else {
                addUrlListRow(url["url"]);
                addDeleteRowButton();
            }
        })
    } else {
        urlListRowCount++;
    }
}

function addUrlListRow(url) {
    let urlListRow = `<li><input type="text" value=` + url + `></li>`;
    $("ol").append(urlListRow);
    urlListRowCount++;
}

function addDeleteRowButton() {
    //削除ボタン一つごとにリスナーを登録できなかったため、一度全ての削除ボタンを削除し、入力欄の数だけ削除ボタンを追加
    $("li > button").remove();
    for (let i = 0; i < $("li").length; i++) {
        $("li").eq(i).append(deleteButton);
    }
    clickDeleteRowButtonListener();
}

function clickDeleteRowButtonListener() {
    $(".delete_row").click(function (ev) {
        let rowIndex = $(ev.target).parent().index();
        $("li").eq(rowIndex).remove();

        urlListRowCount = $("li").length;

        if (urlListRowCount === 1) {
            $(".delete_row").toggle();
        }
    });
}

function hasUrl() {
    for (let i = 0; i < $("li").length; i++) {
        let urlListRowValue = $("li").eq(i).children("input").val();
        if (urlListRowValue != "") {
            urlList.push({ url: urlListRowValue });
        } else {
            emptyUrlListRowIds.push(i);
        }
    }
    if (urlList.length == 0) {
        alert("入力されていません。");
        return false;
    }
    return true;
}

function openCompleteDlg() {
    const res = confirm("保存しました。このページを閉じますか？");
    if (res) {
        chrome.tabs.getSelected(null, tab => {
            chrome.tabs.remove(tab.id);
        });
    }
}
