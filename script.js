document.body.innerHTML = `
<div class="slotMachine">
	<div id="infoboard">... SLOT MACHINE ...</div>
	<div id="reels">
		<div id="reel1" class="c7"></div>
		<div id="reel2" class="c7"></div>
		<div id="reel3" class="c7"></div>
	</div>
	<button class="button" id="play" onClick="playSpin()">SPIN</button>
	<div>
		<div class="info" id="balance">50<img id="photo" class="img coin" src="img/casino-chip.png" alt="casino-chips"/></div>
		<div class="info" id="spins">0<img id="photo" class="img" src="img/replay.png" alt="circle arrows"/></div>
		<div class="info" id="wins">0<img id="photo" class="img" src="img/winner.png" alt="win icon"/></div>
	</div>
	<button class="button" onclick="addChips();" id="borrow">GET CHIPS</button>
</div>
`

// - Title animation - //

var title = document.title;
var char = 0;
function writetitle() {
  document.title = title.substring(0, char);
  if(char==title.length) {
    char = 0;
		setTimeout("writetitle();", 3000);
  } else {
    char++;
    setTimeout("writetitle();", 200);
  }
}
writetitle();

// - Title Animation - //

const desires = ['!!! GOOD LUCK !!!', "!!! FORTUNE WITH YOU !!!", "!!! BUENA SUERTE !!!", "!!! BEST OF LUCK !!!"];
var doing = false;
let spinCounter = 0;
let balance = 50;

var btnPlay = document.getElementById('play');
var btnBorrow = document.getElementById("borrow");

// - Fuction Borrow Chips - //

function addChips(){
		if(balance == 0){
		balance = balance + 50;
		document.getElementById('balance').innerHTML = balance + "<img id='photo' class='img coin' src='img/casino-chip.png'>";
		btnPlay.disabled = false;
		btnPlay.style.cursor = "pointer";
		btnBorrow.disabled = true;
		btnBorrow.style.cursor = "not-allowed";
	}
	else{
	 	alert('Error! You can`t borrow chips if your balance is higher than 0.');
	 	btnBorrow.disabled = true;
	 	btnBorrow.style.cursor = "not-allowed";
	}
}

function randVal(min, max){
	return Math.floor((Math.random() * (max-min+1)) + min);
}
// - Game Script - //

function playSpin()
{
	if (doing){return null;}
	doing = true;
	var numChanges = randVal(1, 4) * 7;
	var reelValue1 = numChanges + randVal(1, 7);
	var reelValue2 = numChanges + 3 * 7 + randVal(1, 7);
	var reelValue3 = numChanges + 5 * 7 + randVal(1, 7);

	spinCounter++;
	balance = balance - 10;

	document.getElementById('spins').innerHTML = spinCounter + "<img id='photo' class='img' src='img/replay.png'>";

	var i1 = 0;
	var i2 = 0;
	var i3 = 0;

	let random = Math.floor(Math.random() * desires.length);
	document.getElementById('infoboard').innerHTML = desires[random];

	reel1 = setInterval(spin1, 60);
	reel2 = setInterval(spin2, 60);
	reel3 = setInterval(spin3, 60);

	function spin1(){
		i1++;
		if(i1>=reelValue1){
			clearInterval(reel1);
			return null;
		}
		var slot1 = document.getElementById("reel1");
		if(slot1.className == "c7"){
			slot1.className = "c0";
		}
		slot1.className = "c" + (parseInt(slot1.className.substring(1)) + 1);
	}

	function spin2(){
		i2++;
		if(i2 >= reelValue2){
			clearInterval(reel2);
			return null;
		}
		var slot2 = document.getElementById("reel2");
		if(slot2.className=="c7"){
			slot2.className = "c0";
		}
		slot2.className = "c" + (parseInt(slot2.className.substring(1)) + 1);
	}

	function spin3(){
		i3++;
		if (i3 >= reelValue3){
			clearInterval(reel3);
			result();
			return null;
		}
		var slot3 = document.getElementById("reel3");
		if (slot3.className == "c7"){
			slot3.className = "c0";
		}
		slot3.className = "c" + (parseInt(slot3.className.substring(1)) + 1);
	}
}

let winCounter = 0;

function result(){

	var val1 = document.getElementById("reel1").className;
	var val2 = document.getElementById("reel2").className;
	var val3 = document.getElementById("reel3").className;

	if (((val1 == val2 && val2 == val3) || (val1 == val2 && val3 == "c7") ||
		(val1 == val3 && val2 == "c7") || (val2 == val3 && val1 == "c7") ||
		(val1 == val2 && val1 == "c7") || (val1 == val3 && val1 == "c7") ||
		(val2 == val3 && val2 == "c7") ) && !(val1 == val2 && val2 == val3 && val1=="c7")){
		balance = balance + 100;
		winCounter++;
    document.getElementById('infoboard').innerHTML = "CONGRATS! YOU WIN!";
    document.getElementById('balance').innerHTML = balance + "<img id='photo' class='img coin' src='img/casino-chip.png'>";
		document.getElementById('wins').innerHTML = winCounter + "<img id='photo' class='img' src='img/winner.png'>";
	}
	else{
    document.getElementById('infoboard').innerHTML = "YOU LOSE :(";
    document.getElementById('balance').innerHTML = balance + "<img id='photo' class='img coin' src='img/casino-chip.png'>";
	}
	if (balance == 0)
	{
		alert("You lose!\nYou can borrow 50 chips or leave casino.");
		btnPlay.disabled = true;
		btnPlay.style.cursor = "not-allowed";
		btnBorrow.disabled = false;
		btnBorrow.style.cursor = "pointer";
	}
	doing = false;
}
