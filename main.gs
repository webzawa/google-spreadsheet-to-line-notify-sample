// 通知対象とするスプレッドシートのID
var TARGET_SPREADSHEET_ID = "foobar";

// LINE NotifyのToken https://notify-bot.line.me/my　から発行する
var LINE_NOTIFY_TOKEN = "hogehoge";

// 任意のメッセージをLINE Notifyを使って通知する関数
function sendLineNotify(message) {
  var token = LINE_NOTIFY_TOKEN; // トークンをここに入力してください

  var options = {
    method: "post",
    headers: {
      Authorization: "Bearer " + token,
    },
    payload: {
      message: message,
    },
  };

  UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
}

// Google Spreadsheetのセルが編集されたときに呼び出される関数
function onEdit(e) {
  var sheet = e.source.getActiveSheet();
  var currentSpreadsheetId = e.source.getId();

  // 現在のスプレッドシートのIDが対象のIDと一致するかチェック
  if (currentSpreadsheetId !== TARGET_SPREADSHEET_ID) {
    return; // 対象外のスプレッドシートの場合、関数の実行を終了
  }

  var editedRange = e.range;

  // A列のみを対象とする
  if (editedRange.getColumn() === 1) {
    // 編集されたセルがA列の最後の行である場合
    if (editedRange.getRow() === sheet.getLastRow()) {
      var message = editedRange.getValue();
      sendLineNotify(message);
    }
  }
}
