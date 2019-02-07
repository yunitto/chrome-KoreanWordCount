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
  document.execCommand('Copy');
});

clearButton.addEventListener('click', function (event) {
  userInput.select();
  document.execCommand('delete');
  countWords(userInput.value);
  chrome.storage.sync.clear();
  textAreaResize();
});

window.onload = function () {
  chrome.storage.sync.get(function (segments) {
    userInput.value = Object.values(segments).join('');
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
  function splitByLength (str, length) {
    return str.match(new RegExp(`(.|[\r\n]){1,${length}}`, 'g'));
  };

  const itemSize = chrome.storage.sync.QUOTA_BYTES_PER_ITEM / 4
  const chunks = splitByLength(userInput, itemSize);
  const segments = Object.assign({}, chunks);
  console.log(segments);

  chrome.storage.sync.set(segments)
};
