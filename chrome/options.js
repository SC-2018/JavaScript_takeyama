let frm_cnt = 0;
let url_list = [];
let notIds = [];
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
            if (notIds.length > 0) {
                notIds.reverse().forEach(function (value) {
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
    $('#list> li > button').remove();
    for (i = 0; i < len_list; i += 1) {
        $('#list > li').eq(i).append(deleteButton);
    }
    clickDeleteRowButtonListener();
}

function clickDeleteRowButtonListener() {
    $(".delete_row").click(function (ev) {
        let idx = $(ev.target).parent().index();
        $('#list > li').eq(idx).remove();

        let len_list = $('#list > li').length;
        frm_cnt = len_list;

        if (len_list === 1) {
            $('.delete_row').toggle();
        }

        for (let i = 0; i < len_list; i += 1) {
            $('#list > li').eq(i)
                .attr("id", "bar_" + i)
                .children('input').attr('id', "page_url_" + i);
        }
    });
}

function checkInput() {
    let isOk = true;
    for (var i = 0; i < $('#list > li').length; i++) {
        if ($("#page_url_" + i).val() != "") {
            url_list.push({ url: $("#page_url_" + i).val() });
        } else {
            notIds.push(i);
        }
    }
    if (url_list.length == 0) {
        alert("入力されていません。");
        isOk = false;
    }
    return isOk;
}

function openCompleteDlg() {
    const res = confirm("保存しました。このページを閉じますか？");
    if (res) {
        chrome.tabs.getSelected(null, tab => {
            chrome.tabs.remove(tab.id);
        });
    }
}
