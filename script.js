var userInput = document.getElementById('user-input');
var clearButton = document.getElementById('clear-button');
var copyButton = document.getElementById('copy-button');

userInput.oninput = function () {
  countWords(userInput.value);
  textAreaResize();
  syncStorage(userInput.value);
};

copyButton.addEventListener('click', function (event) {
  userInput.select();
  document.execCommand('copy');
});

clearButton.addEventListener('click', function (event) {
  userInput.select();
  document.execCommand('delete');
  countWords(userInput.value);
  chrome.storage.local.clear();
  textAreaResize();
});

window.onload = function () {
  chrome.storage.local.get('words', function (item) {
    if (item.words === undefined) {
      userInput.value = '';
    } else {
      userInput.value = item.words;
    }
    countWords(userInput.value);
    textAreaResize();
  });
};

function countWords(userWords) {
  var length = userWords.length;
  var lengthNoSpace = userWords.replace(/\s/g,'').length;
  document.getElementById('result-space').innerText = `공백 포함 ${length} 자`;
  document.getElementById('result-no-space').innerText = `공백 제외 ${lengthNoSpace} 자`;
};

function textAreaResize() {
  var textArea = document.getElementById('user-input');
  textArea.style.height = 'auto';
  textArea.style.height = `${textArea.scrollHeight}px`;
};

function syncStorage(userInput){
  chrome.storage.local.set({'words': userInput});
};
