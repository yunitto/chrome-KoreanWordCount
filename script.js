var userInput = document.getElementById('userInput');
var clearBtn = document.getElementById('clearBtn');
var copyBtn = document.getElementById('copyBtn');

window.onload = function(){
  chrome.storage.sync.get(function(saved){
    saved_data = saved.data;
    if (saved_data === undefined){
      saved_data = '';
    }
    userInput.value = saved_data;
    countWords(saved_data);
    textAreaResize();
  });
};

function countWords(user_words){
  var length = user_words.length;
  document.getElementById('result').innerText = length + ' 자';
};

function textAreaResize(){
  var text_area = document.getElementById('userInput');
  text_area.style.height = 'auto';
  text_area.style.height = (text_area.scrollHeight) + 'px';
  chrome.storage.sync.set({
    'data': userInput.value
   });
};

clearBtn.addEventListener('click', function(event){
  userInput.value = '';
  countWords(userInput.value);
  textAreaResize();
});

copyBtn.addEventListener('click', function(event){
  var copyText = document.getElementById('userInput')
  copyText.select();
  document.execCommand("Copy");
});

userInput.oninput = function(){
  countWords(userInput.value);
  textAreaResize();
};
