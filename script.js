var userInput = document.getElementById('user-input');
var clearBtn = document.getElementById('clear-button');
var copyBtn = document.getElementById('copy-button');

window.onload = function(){
  chrome.storage.sync.get(function(saved){
    savedData = saved.data;
    if (savedData === undefined){
      savedData = '';
    }
    userInput.value = savedData;
    countWords(savedData);
    textAreaResize();
  });
};

function countWords(userWords){
  var length = userWords.length;
  var lengthNoSpace = userWords.replace(/\s/g,'').length;
  document.getElementById('result-space').innerText = '공백 포함 ' + length + ' 자';
  document.getElementById('result-no-space').innerText = '공백 제외 ' + lengthNoSpace + ' 자';
};

function textAreaResize(){
  var textArea = document.getElementById('user-input');
  textArea.style.height = 'auto';
  textArea.style.height = (textArea.scrollHeight) + 'px';
  chrome.storage.sync.set({
    'data': userInput.value
   });
};

function syncStorage(userInput){
  var segments = {}
  var k = 0, v, idx = 0;
  while(userInput > 0){
    var length = chrome.storage.sync.QUOTA_BYTES_PER_ITEM - k.toString.length - 1;
    v = userInput.substring(idx, idx + length);
    var overflow = JSON.stringify(v).length - chrome.storage.sync.QUOTA_BYTES_PER_ITEM
    if (overflow > 0){
      length = length - overflow
    }

    segments[k] = v;
    userInput = userInput.substring(idx + length + 1)
    k++;
  }
  chrome.storage.sync.set(segments)
}

clearBtn.addEventListener('click', function(event){
  var deleteText = document.getElementById('user-input')
  deleteText.select()
  document.execCommand("delete")
  countWords(userInput.value);
  textAreaResize();
});

copyBtn.addEventListener('click', function(event){
  var copyText = document.getElementById('user-input')
  copyText.select();
  document.execCommand("Copy");
});

userInput.oninput = function(){
  countWords(userInput.value);
  textAreaResize();
};
