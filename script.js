function countWord(){
  var userInput = document.getElementById('userInput').value;
  var length = userInput.length;
  document.getElementById('result').innerText = length + " 자";
}

document.getElementById('userInput').oninput = function(){
    countWord();
}
