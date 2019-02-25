let frm_cnt = 0;
let url_list = [];
let emptyListIds = [];
const deleteButton = `<button class="delete_row" type="button"> 削除 </button>`;

$(function () {

    init();

    $("#add_row").click(function () {
        let len_list = $('#list > li').length;
        if (len_list < 5) {
            addRow("");
            addDeleteRowButton();
        } else {
            alert("最大５つまでです。");
        }
    });

    $("#save").click(function () {
        if (checkInput()) {
            if (emptyListIds.length > 0) {
                emptyListIds.reverse().forEach(function (value) {
                    $('#list > li').eq(value).remove();
                });
            }
            localStorage["url_list"] = JSON.stringify(url_list);
            openCompleteDlg();
        }
    });

    $("#clear").click(function () {
        const res = confirm("登録したものを全て削除します。いいですか？");
        if (res) {
            localStorage.removeItem("url_list");
            chrome.tabs.update({ url: "options.html" });
        }
    });

});

function init() {
    //localStorageにURLが保存されている場合は、入力欄にURLが入力されている状態で表示する。
    if (localStorage["url_list"]) {
        let localStrageUrlList = JSON.parse(localStorage["url_list"]);
        localStrageUrlList.forEach(function (url) {
            if (frm_cnt == 0) {
                $("#page_url_0").val(url["url"]);
                frm_cnt++;
            } else {
                addRow(url["url"]);
                addDeleteRowButton();
            }
        })
    } else {
        frm_cnt++;
    }
}

function addRow(url) {
    let list = `<li><input type="text" id="page_url_` + frm_cnt + `" value=` + url + `>`
        + deleteButton + `</li>`;
    $("#list").append(list);
    frm_cnt++;
}

function addDeleteRowButton() {
    let len_list = $('#list > li').length;
    //一度全ての削除ボタンを削除し、その後入力欄の数だけ削除ボタンを追加
    $('#list> li > button').remove();
    for (i = 0; i < len_list; i += 1) {
        $('#list > li').eq(i).append(deleteButton);
    }
    clickDeleteRowButtonListener();
}

function clickDeleteRowButtonListener() {
    $(".delete_row").click(function (ev) {
        let idx = $(ev.target).parent().index();
        $('li').eq(idx).remove();

        let len_list = $('#list > li').length;
        frm_cnt = len_list;

        if (len_list === 1) {
            $('.delete_row').toggle();
        }

        //行を削除後、リストのindex番号をふり直す
        for (let i = 0; i < len_list; i += 1) {
            $('#list > li').eq(i)
                .attr("id", "bar_" + i)
                .children('input').attr('id', "page_url_" + i);
        }
    });
}

function checkInput() {
    for (var i = 0; i < $('#list > li').length; i++) {
        if ($("#page_url_" + i).val() != "") {
            url_list.push({ url: $("#page_url_" + i).val() });
        } else {
            emptyListIds.push(i);
        }
    }
    if (url_list.length == 0) {
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
