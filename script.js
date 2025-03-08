var WordToFind = "AUREO";

var words = [];

function loadWords() {
  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      words = data.words;
      console.log("Palavras carregadas:", words);
    })
    .catch(error => console.error("Erro ao carregar palavras:", error));
}

var currentRow = 0;
var currentColumn = 0;

var indexOfColumns = 4;
var sequence =0;
/*
var board = [
    [00, 01, 02, 03, 04],
    [10, 11, 12, 13, 14],
    [20, 21, 22, 23, 24],
    [30, 31, 32, 33, 34],
    [40, 41, 42, 43, 44],
  ];
*/
var defeatImage= "forbidden.png";
var winImage = "correct.png"
var winMessage = "Parabéns você acertou!";
var defeatMessage = "Não foi dessa vez!";

var defeatFeedback = "A palavra era:<br>";
var winFeedback ="Sequência atual: "

var board = [
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
];

var boardIds = [
  ["col00", "col01", "col02", "col03", "col04"],
  ["col10", "col11", "col12", "col13", "col14"],
  ["col20", "col21", "col22", "col23", "col24"],
  ["col30", "col31", "col32", "col33", "col34"],
  ["col40", "col41", "col42", "col43", "col44"],
];

var winBoardIds = [
  ["w00", "w01", "w02", "w03", "w04"],
  ["w10", "w11", "w12", "w13", "w14"],
  ["w20", "w21", "w22", "w23", "w24"],
  ["w30", "w31", "w32", "w33", "w34"],
  ["w40", "w41", "w42", "w43", "w44"],
];

var gameIsOver = false;
var wonOrLose =false;

var currentWord = "";

let idsToRestore = [];

function Click(letter) {
  
  if(board[0][0]===null){
    
    loadWords();
    WordToFind = words[Math.floor(Math.random() * words.length)];
    WordToFind = WordToFind.toUpperCase();
    //console.log("Palavra é "+WordToFind);
  }
  if (currentWord.length === 5 || gameIsOver===true) return;
  board[currentRow][currentColumn] = letter;
  document.getElementById(boardIds[currentRow][currentColumn]).innerHTML = "" + board[currentRow][currentColumn] + "";
  document.getElementById(boardIds[currentRow][currentColumn]).style.boxShadow = "inset 0 0 0 5px black";
  document.getElementById(boardIds[currentRow][currentColumn]).style.color = "black";
  document.getElementById(boardIds[currentRow][currentColumn]).style.textShadow = "none";
  //alert("At row" + currentRow + " col " + currentColumn + ": " + letter + "<b> board: " + board);
  currentColumn++;
  currentWord = currentWord + letter;

}

window.onload = function() {
  loadWords();
  WordToFind = words[Math.floor(Math.random() * words.length)];
  WordToFind = WordToFind.toUpperCase();
};


function Enter() {
  if(gameIsOver && wonOrLose){
    DisplayWinState();
    return;
  }else if(gameIsOver && !wonOrLose) {
    DisplayDefeatState();
    return;
  }
  if (currentColumn > indexOfColumns) {
    CheckWord();
    currentRow++;
    currentColumn = 0;
    currentWord = "";
    //alert("New collumn");
  } else {
    alert("Insira uma palavra com 5 letras");
  }

}

function CheckWord() {

  var foundCont = 0;
  for (var i = 0; i < 5; i++) {
      var character = board[currentRow][i];
      idsToRestore.push(character);
      if (WordToFind.indexOf(character) > -1) {
        if (WordToFind[i] === character) {
          //alert("SAME POS!!!");
          
          document.getElementById(boardIds[currentRow][i]).style.backgroundColor = "rgb(93, 230, 13)";   
          document.getElementById(winBoardIds[currentRow][i]).style.backgroundColor = "rgb(93, 230, 13)";  

          document.getElementById(character).classList.add("right");
          if (document.getElementById(character).classList.contains("wrong")) {
            document.getElementById(character).classList.remove("wrong");
          }
          if (document.getElementById(character).classList.contains("almost")) {
            document.getElementById(character).classList.remove("almost");
          }
          foundCont++;
        } else {
          
          document.getElementById(boardIds[currentRow][i]).style.backgroundColor = "rgb(224, 177, 21)";
          document.getElementById(winBoardIds[currentRow][i]).style.backgroundColor = "rgb(224, 177, 21)";

         if (!document.getElementById(character).classList.contains("right") || document.getElementById(character).classList.length === 0) {
            document.getElementById(character).classList.add("almost");
         }
         
         
        }
        //alert(WordToFind + " caracter -" + character + " - hello found inside your_string: " + currentWord.indexOf(character));
      } else {
        document.getElementById(boardIds[currentRow][i]).style.backgroundColor = "rgb(146, 150, 146)";
        document.getElementById(winBoardIds[currentRow][i]).style.backgroundColor = "rgb(146, 150, 146)";
          document.getElementById(character).classList.add("wrong");
        
      }
      document.getElementById(boardIds[currentRow][i]).style.color = "white";     
      document.getElementById(boardIds[currentRow][i]).style.textShadow ="2px 2px 2px rgb(25, 25, 25)";


  }
  if (foundCont === indexOfColumns + 1) {
    //alert("A palavra foi adivinhada! ");    
    sequence++;
    DisplayWinState();
  }
  if(foundCont<indexOfColumns+1 && currentRow===indexOfColumns){
    //alert("PERDEU, a palavra era "+WordToFind);
    DisplayDefeatState();
   
  }
}

function RemoveKeyboardFormatting(){

  for(let i=0; i<idsToRestore.length; i++){
    let id = idsToRestore[i];
    console.log("Pegando a letra: "+id);
    let element = document.getElementById(id);
    
    if (element) {
      if (element.classList.contains("right")) {
        element.classList.remove("right");
      }
      if (element.classList.contains("wrong")) {
        element.classList.remove("wrong");
      }
      if (element.classList.contains("almost")) {
        element.classList.remove("almost");
      }
    }
  }

}

function DisplayWinState(){
  wonOrLose = true;
  gameIsOver=true;
  document.getElementById("victory").style.display = "block"; 
  document.getElementById("blackContainer").style.display = "block"; 

  document.getElementById("victoryIcon").innerHTML ="<img src='"+winImage+"' width='70'><br>";
  document.getElementById("victoryMessage").innerHTML =winMessage;
  document.getElementById("wordOrSequence").innerHTML = winFeedback+"<b>"+sequence+"</b><br>";

  if(sequence>0){
    document.getElementById("sequence").innerHTML = "Sequencia atual: <strong>"+sequence+"</strong>";
  }
}

function DisplayDefeatState(){
  wonOrLose = false;
  gameIsOver=true;
  sequence=0;
  document.getElementById("victory").style.display = "block"; 
  document.getElementById("blackContainer").style.display = "block"; 

  document.getElementById("victoryIcon").innerHTML ="<img src='"+defeatImage+"' width='70'><br>";
  document.getElementById("victoryMessage").innerHTML =defeatMessage;
  document.getElementById("wordOrSequence").innerHTML = defeatFeedback+"<br><b>"+WordToFind+"</b><br>";

    document.getElementById("sequence").innerHTML = "";

}

function Erase() {
  if (currentWord.length < 1) return;
  currentColumn--;
  document.getElementById(boardIds[currentRow][currentColumn]).innerHTML = "&nbsp;";
  document.getElementById(boardIds[currentRow][currentColumn]).style.boxShadow = "inset 0 0 0 2px rgb(175, 172, 172)";
  currentWord = currentWord.slice(0, -1);
  //Apaga uma letra do currentWord
}

function CloseWindow(){
  document.getElementById("victory").style.display = "none"; 
  document.getElementById("blackContainer").style.display = "none"; 
}

function RestartGame(){
  RemoveKeyboardFormatting();
  loadWords(); // Garante que novas palavras são carregadas a cada novo jogo

  WordToFind = words[Math.floor(Math.random() * words.length)];
  WordToFind = WordToFind.toUpperCase();
  console.log(idsToRestore);
  currentRow = 0;
  currentColumn = 0;
  gameIsOver = false;
  wonOrLose = false;
  currentWord = "";

  for(var i=0;i<=4;i++){
    for(var j=0;j<=4;j++){   
      document.getElementById( boardIds[i][j]).innerHTML = "&nbsp;";
      document.getElementById( boardIds[i][j]).style.boxShadow = "inset 0 0 0 2px rgb(175, 172, 172)";
      document.getElementById( boardIds[i][j]).style.backgroundColor = "rgb(235, 243, 235)";
      document.getElementById( winBoardIds[i][j]).style.backgroundColor = "rgb(235, 243, 235)";
    }   
  }

  board = [
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ];

  CloseWindow();


}
