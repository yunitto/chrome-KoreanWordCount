window.onload = function(){
  chrome.storage.sync.get(function(saved){
    document.getElementById('userInput').value = saved.data;
    countWords(saved.data);
    textAreaResize();
  });
};

function countWords(user_words){
  var length = user_words.length;
  document.getElementById('result').innerText = length + " 자";
};

function textAreaResize(){
  var text_area = document.getElementById('userInput');
  text_area.style.height = 'auto';
  text_area.style.height = (text_area.scrollHeight) + 'px';
};

document.getElementById('userInput').oninput = function(){
  var user_words = document.getElementById('userInput').value;
  countWords(user_words);
  textAreaResize();
  chrome.storage.sync.set({
    data:user_words
   });
};
