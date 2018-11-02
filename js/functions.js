// Fns.

function r(m) {
	//Generates Rand. 
	// params: m-> maximum value - non-inclusive. 
	return Math.floor(Math.random()*m);
}

function genColor() {
	// Generates random  rgb
	return "rgb("+r(256)+", "+r(256)+", "+r(256)+")"; 
}

function fade(el, b) {
	if(b === true){
		el.classList.add("fadein");
		el.classList.remove("fadeout");
	}else if (b===false) {
		el.classList.remove("fadein");
		el.classList.add("fadeout");
	}
}

function appear(el, b) {
	if(b === true){
		el.style.display = 'block';
		el.style.opacity = '1.0';
		el.classList.remove("fadeout");
	}else if (b===false) {
		el.style.display = 'none';
		el.style.opacity = '0.0';
		el.classList.remove("fadein");
	}
}

function changeColor(c,n) {
	// Changes the color of all squares to "c"
	// params: c-> an rgb to which the color is changed
	for (i=0 ; i < n ; i++) {
		squares[i].style.backgroundColor = c;
		fade(squares[i],true);
	}
}

function freezer(n){
	// freezes the boxes on clicking the right one.
	// params : n-> no. of boxes according to level.
	for (var i=0; i<n; i++){
			squares[i].addEventListener("click",function() {
				return;
			});
		}	
}

//Operation

function levelPage() {	
	N=NaN;
	gameDiv.style.display = 'none';
	levelDiv.style.display = 'block';
	fade(levelDiv, true);
	for (i=0; i<2; i++){
		fade(squares2[i],true);
		squares2[i].addEventListener("click",function(){
			if (this.textContent==="Easy") N=3;
			else if (this.textContent==="Hard") N=6;
			for (var i=0; i<6; i++) appear(squares[i],false);
			game(N);
			levelDiv.style.display = 'none';
		});
	}

}

function game(n) {
	levelDiv.style.display = 'none';
	gameDiv.style.display = 'block';
	fade(gameDiv,true);
	for (i=0; i<n; i++) c[i]=genColor();
	chosen = c[r(n)];
	h1.style.backgroundColor = '#5500cc';
	message.textContent = "";
	document.querySelector("h1 span").textContent = chosen;
	for (var i=0; i<n; i++){
		appear(squares[i],true);
		squares[i].style.backgroundColor = c[i];
		squares[i].addEventListener("click",function(){
			if (this.style.backgroundColor === chosen) {
				message.textContent = "Alright!";
				changeColor(chosen,n);
				h1.style.backgroundColor = chosen;
				freezer(n);
			}else{
				message.textContent = "Try again!";
				fade(this,false);
			}

		});
	}
}