// JavaScript Document
	var spots;
	var turn;
	var clickable=true;
	var moveCount;
	var playerWin;
	var computerWin;
	var tie;
	var pCount=0;
	var cCount=0;
	var tCount=0;
	var won=false;
function winMsg()
{
var txtFile = new XMLHttpRequest();
txtFile.open("GET", "player_win.txt", true);
txtFile.onreadystatechange = function() {
  if (txtFile.readyState === 4) {  
    if (txtFile.status === 200) {  
      playerWin = txtFile.responseText; 
    }
  }
}
	txtFile.send(null);	
}
function lossMsg()
{
var txtFile = new XMLHttpRequest();
txtFile.open("GET", "computer_win.txt", true);
txtFile.onreadystatechange = function() {
  if (txtFile.readyState === 4) {  
    if (txtFile.status === 200) {  
      computerWin = txtFile.responseText; 
    }
  }
}
	txtFile.send(null);
}
function tieMsg()
{
	var txtFile = new XMLHttpRequest();
txtFile.open("GET", "tie.txt", true);
txtFile.onreadystatechange = function() {
  if (txtFile.readyState === 4) {  
    if (txtFile.status === 200) {  
      tie = txtFile.responseText; 
    }
  }
}
	txtFile.send(null);
}
function start()
	{
	won =false;
	moveCount=0;
	clickable=true;
	spots = [["_","_","_"],["_","_","_"],["_","_","_"]];
	update();
	turn = 1;
	if(turn == 1)
		{
		document.getElementById("pTurn").innerHTML="Player One's <br> Turn";	
		}
	}

function pWin(x, y){
    	spots[x][y] = "X";
    	moveCount++;
		winMsg();
   	//check col
    	for(var i = 0; i < 3; i++){
    		if(spots[x][i] != "X")
    			break;
    		if(i == 2){
    		//display win for X
			spots[x][0] = "<span id='win'>X<span>";
			spots[x][1] = "<span id='win'>X<span>";
			spots[x][2] = "<span id='win'>X<span>";
			update();
			pCount++;
			document.getElementById("pCount").innerHTML=pCount;
			document.getElementById("pTurn").innerHTML=playerWin;
			clickable=false;
			won = true;
    		}
    	}
	//check row
    	for(var i = 0; i < 3; i++){
    		if(spots[i][y] != "X")
    			break;
    		if(i == 2){
    		//display win for X
			spots[0][y] = "<span id='win'>X<span>";
			spots[1][y] = "<span id='win'>X<span>";
			spots[2][y] = "<span id='win'>X<span>";
			update();
			pCount++;
			document.getElementById("pCount").innerHTML=pCount;
			document.getElementById("pTurn").innerHTML=playerWin;
			clickable=false;
			won = true;
    		}
    	}
		//check diag
    	if(x == y){
    		for(var i = 0; i < 3; i++){
    			if(spots[i][i] != "X")
    				break;
    			if(i == 2){
    				//display win for s
				spots[0][0] = "<span id='win'>X<span>";
				spots[1][1] = "<span id='win'>X<span>";
				spots[2][2] = "<span id='win'>X<span>";
				update();
				pCount++;
				document.getElementById("pCount").innerHTML=pCount;
				document.getElementById("pTurn").innerHTML=playerWin;
				clickable=false;
				won = true;
    			}
    		}
    	}
    	for(var i = 0;i<3;i++){
    		if(spots[i][(2)-i] != "X")
    			break;
    		if(i == 2){
    		//display win for X
			spots[2][0] = "<span id='win'>X<span>";
			spots[1][1] = "<span id='win'>X<span>";
			spots[0][2] = "<span id='win'>X<span>";
			update();
			pCount++;
			document.getElementById("pCount").innerHTML=pCount;
			document.getElementById("pTurn").innerHTML=playerWin;
			clickable=false;
			won = true;
    		}
    	}
		if(moveCount === 9 && won===false){
    		//display draw msg
			update();
			tCount++;
			document.getElementById("tCount").innerHTML=tCount;
			tieMsg();
			document.getElementById("pTurn").innerHTML=tie;	
			clickable=false;
    	}	
}
function cWin(x, y){
		lossMsg();
    	spots[x][y] = "O";
    	moveCount++;
   	//check col
    	for(var i = 0; i < 3; i++){
    		if(spots[x][i] != "O")
    			break;
    		if(i == 2){
    		//display win for O
			spots[x][0] = "<span id='loss'>O<span>";
			spots[x][1] = "<span id='loss'>O<span>";
			spots[x][2] = "<span id='loss'>O<span>";
			update();
			cCount++;
			document.getElementById("cCount").innerHTML=cCount;
			document.getElementById("pTurn").innerHTML=computerWin;
			clickable=false;
			won = true;
    		}
    	}
	//check row
    	for(var i = 0; i < 3; i++){
    		if(spots[i][y] != "O")
    			break;
    		if(i == 2){
    		//display win for O
			spots[0][y] = "<span id='loss'>O<span>";
			spots[1][y] = "<span id='loss'>O<span>";
			spots[2][y] = "<span id='loss'>O<span>";
			update();
			cCount++;
			document.getElementById("cCount").innerHTML=cCount;
			document.getElementById("pTurn").innerHTML=computerWin;
			clickable=false;
			won = true;
    		}
    	}
		//check diag
    	if(x == y){
    		for(var i = 0; i < 3; i++){
    			if(spots[i][i] != "O")
    				break;
    			if(i == 2){
    				//display win for s
				spots[0][0] = "<span id='loss'>O<span>";
				spots[1][1] = "<span id='loss'>O<span>";
				spots[2][2] = "<span id='loss'>O<span>";
				update();
				cCount++;
				document.getElementById("cCount").innerHTML=cCount;
				document.getElementById("pTurn").innerHTML=computerWin;
				clickable=false;
				won = true;
    			}
    		}
    	}
    	for(var i = 0;i<3;i++){
    		if(spots[i][(2)-i] != "O")
    			break;
    		if(i == 2){
    			//report win for O
			spots[2][0] = "<span id='loss'>O<span>";
			spots[1][1] = "<span id='loss'>O<span>";
			spots[0][2] = "<span id='loss'>O<span>";
			update();
			cCount++;
			document.getElementById("cCount").innerHTML=cCount;
			document.getElementById("pTurn").innerHTML=computerWin;
			clickable=false;
			won = true;
    		}
    	}
		if(moveCount === 9 && won === false){
    		//display draw msg
			tieMsg();
			update();
			tCount++;
			document.getElementById("tCount").innerHTML=tCount;
			document.getElementById("pTurn").innerHTML=tie;	
			clickable=false;
    	}	
}

function update(){
	document.getElementById("topLeft").innerHTML=spots[0][0];
	document.getElementById("topMiddle").innerHTML=spots[0][1];
	document.getElementById("topRight").innerHTML=spots[0][2];
	
	document.getElementById("midLeft").innerHTML=spots[1][0];
	document.getElementById("midMiddle").innerHTML=spots[1][1];
	document.getElementById("midRight").innerHTML=spots[1][2];
	
	document.getElementById("botLeft").innerHTML=spots[2][0];
	document.getElementById("botMiddle").innerHTML=spots[2][1];
	document.getElementById("botRight").innerHTML=spots[2][2];
}
function change()
	{
	if(turn == 1 && clickable===true)
		{
		document.getElementById("pTurn").innerHTML="Player One's <br> Turn";	
		update();
		}
	else if(turn==2 && clickable===true)
		{
		clickable=false;
		document.getElementById("pTurn").innerHTML="Computer's <br> Turn";	
		setTimeout( function() {
 		 // here add the code (or call a function) to be executed after pause
		 clickable=true;
		 if(spots[0][0]=="_")
			{
				topLeft();
			}
		else if(spots[0][1]=="_")
			{
				topMiddle();
			}
		else if(spots[0][2]=="_")
			{
				topRight();
			}
		else if(spots[1][0]=="_")
			{
				midLeft();
			}
		else if(spots[1][1]=="_")
			{
				midMiddle();
			}
		else if(spots[1][2]=="_")
			{
				midRight();
			}
		else if(spots[2][0]=="_")
			{
				botLeft();
			}
		else if(spots[2][1]=="_")
			{
				botMiddle();
			}
		else if(spots[2][2]=="_")
			{
				botRight();
			} 
		else{}
		}, 1000 );
		update();
		}
	}
function topLeft(){
if(clickable===true){
	if(turn==1 && spots[0][0]=="_")
		{
		pWin(0, 0);
		turn=2;
		}
	else if(turn==2 && spots[0][0]=="_")
		{
		cWin(0, 0);
		turn=1;
		}
		change();
		}
	}
function topMiddle(){
if(clickable===true)
	{
	if(turn==1 && spots[0][1]=="_")
		{
		pWin(0, 1);
		turn=2;
		}
	else if(turn==2 && spots[0][1]=="_")
		{
		cWin(0, 1);
		turn=1;
		}
		change();
		}
	}
function topRight(){
	if(clickable===true)
	{
	if(turn==1 && spots[0][2]=="_")
		{
		pWin(0, 2);
		turn=2;
		}
	else if(turn==2 && spots[0][2]=="_")
		{
		cWin(0, 2);
		turn=1;
		}
		change();
	}
	}
	//middle
	function midLeft(){
if(clickable===true)
	{
	if(turn==1 && spots[1][0]=="_")
		{
		pWin(1, 0);
		turn=2;
		}
	else if(turn==2 && spots[1][0]=="_")
		{
		cWin(1, 0);
		turn=1;
		}
		change();
	}
	}
function midMiddle(){
	if(turn==1 && spots[1][1]=="_" && clickable===true)
		{
		pWin(1, 1);
		turn=2;
		}
	else if(turn==2 && spots[1][1]=="_" && clickable===true)
		{
		cWin(1, 1);
		turn=1;
		}
		change();
	}
function midRight(){
	if(turn==1 && spots[1][2]=="_" && clickable===true)
		{
		pWin(1, 2);
		turn=2;
		}
	else if(turn==2 && spots[1][2]=="_" && clickable===true)
		{
		cWin(1, 2);
		turn=1;
		}
		change();
	}
	//bottom
	function botLeft(){
	if(turn==1 && spots[2][0]=="_" && clickable===true)
		{
		pWin(2, 0);
		turn=2;
		}
	else if(turn==2 && spots[2][0]=="_" && clickable===true)
		{
		cWin(2, 0);
		turn=1;
		}
		change();
	}
function botMiddle(){
	if(turn==1 && spots[2][1]=="_" && clickable===true)
		{
		pWin(2, 1);
		turn=2;
		}
	else if(turn==2 && spots[2][1]=="_" && clickable===true)
		{
		cWin(2, 1);
		turn=1;
		}
		change();
	}
function botRight(){
	if(turn==1 && spots[2][2]=="_" && clickable===true)
		{
		pWin(2, 2);
		turn=2;
		}
	else if(turn==2 && spots[2][2]=="_" && clickable===true)
		{
		cWin(2, 2);
		turn=1;
		}
		change();
	}