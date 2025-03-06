var WordToFind = "AUREO";
var words = ["PAREO", "FALHA", "NEVOA","NUTRE","CORTE","ARTES","RATOS","SALVO","SALVE","RAMPA",
"RALOS","RAMOS","RASGO","AUTOR","ANTRO","ASTRO","PASTO","ROUCA","LOIRA","LORDE","SALMO","TAMPA",
"LOTAR", "LOGAR","ALGUM","ALGAS","LISAS","PINHO", "VINHO", "LINHO","SOLOS","TOLOS","FOICE","CAMPO",
"NINHO","MANCO","TANGO","FANHO", "BANCO","BANDA", "BANDO", "PALHA","GALHO","TALCO","COICE","VERDE",
"FALSO", "BALAO","PEDRA","DEDAO","PAUTA", "TIGRE", "TIARA", "TURMA", "TURNO", "TCHAU","BOATE",
"POMAR", "SOMAR", "DOMAR", "POLVO", "POMBO", "COPOS","MORNA", "MORCA","PALMA", "GAITA","COISA",
"MULTA", "CHUVA", "DUNAS", "UNHAS","RUMOR", "TUMOR", "TUTOR", "PUNHO","ROUBO","CONDE","DOIDA", 
"PUDOR", "PAVOR", "OUVIR", "TEMER", "TEMOR", "TENTE", "PENSA", "LENTE", "LENTO","CIANO","DOIDO",
"GENTE", "FELIZ",  "NORTE","MENTA", "LENTA", "OESTE", "LESTE", "LETRA", "CERTA","TIROS","DORES",
"ARMAS", "AUREO", "AUREA","CUIDA","CULPA", "LAMBE", "LAVAR", "GRITO","GENIO","GENTE","TONTA","CORES",
"GEMEO", "PENTE", "GRUTA", "LAMBER","TRENO","REINO", "ROUPA", "RATOS","DENTE","MILHO","RONCA",
"MOUSE", "OUROS", "TOURO", "COURO", "LEITE", "PORCO", "LOTES", "LEIGO", "COUVE","VENTO","RONCO",
"BOSTA", "GOSTA","COSTA", "LINHA", "LENHA", "LIMBO", "QUEIJO", "LIRIO", "RAMOS","FACIL","VELHO","SEPIA",
"NAVAL", "NATAL", "POUCO","JEITO", "SAUDE", "CHORO", "TEIAS", "TIRAS", "POEMA","BURRO","TABUA","BUNDA", "MUNDO",
"PORTA", "JEITO", "GIRIA", "XEROX", "ENTES", "ANTES", "ALTOS", "ALVOS", "CALVO","CURVO","RASPA","RIFLE",
"CALMO", "PATAS", "MANTO", "LITIO", "BORIO", "TORIO","TORAS", "MINHA", "PATOS","AUDIO","CASPA","CASCO",
"MANHA","BOINA","NOITE", "SITIO", "OXIDO","MUTUA", "POETA","PONEI", "POLEN", "RUINA","SURTO",
"LUTAR", "LUGAR","MUITO", "NUNCA","SUADA","OUTRA","OUTRO", "MUTUO", "RITMO","ROSTO", "GOSTO","POSTO","PENTE",
"MIMOS","RASGO","IRMAO","RIMAR","DOMAR","POMAR","AMORA","POTRO","FRUTA","PLUMA","GATOS", "MORTA","BRITA",
"SALDO", "MOITA", "COIFA", "NOIVA","NOIVO","TERRA","PALCO", "FARDA", "PERNA", "METRO", "MENOR", "MENOS", "MEDOS",
 "HEROI", "FAROL", "SONHO", "PAVOR", "LIMPA", "PAMPA", "VULTO", "CULTO", "CURTA", "CURTO", "TURVO", "PINGO", "PILHA", "FAUNA", "FLORA"]
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

function Click(letter) {
  
  if(board[0][0]===null){
    
    WordToFind = words[Math.floor(Math.random() * words.length)];
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
      if (WordToFind.indexOf(character) > -1) {
        if (WordToFind[i] === character) {
          //alert("SAME POS!!!");
          document.getElementById(boardIds[currentRow][i]).style.backgroundColor = "rgb(93, 230, 13)";
          document.getElementById(character).style.backgroundColor = "rgb(93, 230, 13)";
          document.getElementById(character).style.boxShadow="inset 0 -5px 0  rgb(51, 125, 7)";

          document.getElementById(winBoardIds[currentRow][i]).style.backgroundColor = "rgb(93, 230, 13)";
          foundCont++;
        } else {
          document.getElementById(boardIds[currentRow][i]).style.backgroundColor = "rgb(224, 177, 21)";
          document.getElementById(winBoardIds[currentRow][i]).style.backgroundColor = "rgb(224, 177, 21)";
          document.getElementById(character).style.backgroundColor = "rgb(224, 177, 21)";
          document.getElementById(character).style.boxShadow="inset 0 -5px 0 rgb(150, 118, 15)";
        }
        //alert(WordToFind + " caracter -" + character + " - hello found inside your_string: " + currentWord.indexOf(character));
      } else {
        document.getElementById(boardIds[currentRow][i]).style.backgroundColor = "rgb(146, 150, 146)";
        document.getElementById(winBoardIds[currentRow][i]).style.backgroundColor = "rgb(146, 150, 146)";
        document.getElementById(character).style.backgroundColor = "rgb(146, 150, 146)";
        document.getElementById(character).style.boxShadow="inset 0 -5px 0 rgb(83, 83, 83)";
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

function DisplayWinState(){
  wonOrLose = true;
  gameIsOver=true;
  document.getElementById("victory").style.display = "block"; 
  document.getElementById("blackContainer").style.display = "block"; 

  document.getElementById("victoryIcon").innerHTML ="<img src='"+winImage+"' width='70'><br>";
  document.getElementById("victoryMessage").innerHTML =winMessage;
  document.getElementById("wordOrSequence").innerHTML = winFeedback+"<b>"+sequence+"</b><br>";

  
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
  for(var i=0;i<=4;i++){
    for(var j=0;j<=4;j++){   
      document.getElementById( boardIds[i][j]).innerHTML = "&nbsp;";
      document.getElementById( boardIds[i][j]).style.boxShadow = "inset 0 0 0 2px rgb(175, 172, 172)";
      document.getElementById( boardIds[i][j]).style.backgroundColor = "rgb(235, 243, 235)";
      document.getElementById( winBoardIds[i][j]).style.backgroundColor = "rgb(235, 243, 235)";
    }   
  }
  for(var i=0;i<=4;i++){
    for(var j=0;j<=4;j++){  
      if(board[i][j]!==null){
        document.getElementById( board[i][j]).style.backgroundColor =  "rgb(197, 191, 191)";
        document.getElementById( board[i][j]).style.boxShadow ="inset 0 -5px 0 rgb(159, 154, 154)";
      }
      }
    }
  board = [
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ];
   gameIsOver = false;

  currentWord = "";
  currentRow = 0;
  currentColumn = 0;
  CloseWindow();


}
