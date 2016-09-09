var nizSlika = [
	{
		naziv : "slika1a",
		putanja : "slike/1.jpg"
	},
	{
		naziv : "slika2a",
		putanja : "slike/2.jpg"
	},
	{
		naziv : "slika3a",
		putanja : "slike/3.jpg"
	},
	{
		naziv : "slika4a",
		putanja : "slike/4.jpg"
	},
	{
		naziv : "slika5a",
		putanja : "slike/5.jpg"
	},
	{
		naziv : "slika6a",
		putanja : "slike/6.jpg"
	},                          
	{                           
		naziv : "slika7a",      
		putanja : "slike/7.jpg"
	},                          
	{                           
		naziv : "slika8a",      
		putanja : "slike/8.jpg"
	},
	{
		naziv : "slika1b",
		putanja : "slike/1.jpg"
	},
	{
		naziv : "slika2b",
		putanja : "slike/2.jpg"
	},
	{
		naziv : "slika3b",
		putanja : "slike/3.jpg"
	},
	{
		naziv : "slika4b",
		putanja : "slike/4.jpg"
	},
	{
		naziv : "slika5b",
		putanja : "slike/5.jpg"
	},
	{
		naziv : "slika6b",
		putanja : "slike/6.jpg"
	},                          
	{                           
		naziv : "slika7b",      
		putanja : "slike/7.jpg"
	},                          
	{                           
		naziv : "slika8b",      
		putanja : "slike/8.jpg"
	}
],
	progressBar = document.getElementById("progressBar"),
	progressBarInterval= 0,
	konacanRezultat = 0,
	progress = 1,
	brojac = 0,
	postoUradjeno = 1,
	procenatProgressBara = 36 / 100 //36 je max poena
	kliknuto = 1,
	uzetaSlika1 = new Object(),
	uzetaSlika2 = new Object(),
	pogodjeno = 0,
	tezina = "lako",
	trajanjeIgre = 40,
	prikazTrajanjeIgrice = document.getElementById("tranjeIgrice"),
	tikTok = 0,
	pocetakIgrice = true,
	tmptimeout1 = "",
	tmptimeout2 = "",
	nizSlikaEfektiPrikaz = [],
	nizSlikaEfektiNePogodjeno = [];

function Resetuj(){
	konacanRezultat = 0;
	progress = 1;
	brojac = 0;
	postoUradjeno = 1;
	procenatProgressBara = 36 / 100 ;
	kliknuto = 1;
	uzetaSlika1 = new Object();
	uzetaSlika2 = new Object();
	pogodjeno = 0;
	tezina = "lako";
	trajanjeIgre = 40;
	prikazTrajanjeIgrice = document.getElementById("tranjeIgrice");
	tikTok = 0;
	pocetakIgrice = true;
	tmptimeout1 = "";
	tmptimeout2 = "";
	nizSlikaEfektiPrikaz = [];
	nizSlikaEfektiNePogodjeno = [];
	var scoreInfo = document.getElementById("scoreInfo");
	while(scoreInfo.firstChild){
		scoreInfo.removeChild(scoreInfo.firstChild);
	}
}

function PromeniTezinuIgrice(){
	if(!pocetakIgrice){
		clearInterval(tikTok);
		Resetuj();
		trajanjeIgre = document.getElementById("ddlTezinaIgrice")
		.options[document.getElementById("ddlTezinaIgrice").selectedIndex].value;
		prikazTrajanjeIgrice.innerText = trajanjeIgre;
		PrikaziSlike();
	}
	else{
		trajanjeIgre = document.getElementById("ddlTezinaIgrice")
		.options[document.getElementById("ddlTezinaIgrice").selectedIndex].value;
		tezina = document.getElementById("ddlTezinaIgrice")
		.options[document.getElementById("ddlTezinaIgrice").selectedIndex].text;
		prikazTrajanjeIgrice.innerText = trajanjeIgre;
	}
}

function GameOver(){
	var divZaPrikaz = document.getElementById("memorijaOmot");

	while(divZaPrikaz.firstChild){
		divZaPrikaz.removeChild(divZaPrikaz.firstChild);
	}
	var imgGameOver = document.createElement("IMG");
	imgGameOver.src = "slike/gameOver.jpg";
	imgGameOver.className += "gameOverSlika";
	divZaPrikaz.appendChild(imgGameOver);
}

function GameOverKlik(){
	return;
}

function PrikaziSlike(){
	var divZaPrikaz = document.getElementById("memorijaOmot"),
		duzina = nizSlika.length;

	while(divZaPrikaz.firstChild){
		divZaPrikaz.removeChild(divZaPrikaz.firstChild);
	}

	RandomNiz(nizSlika);

	for(var i=0;i<duzina;i++){
		var slika = document.createElement("IMG");
		slika.className += "slikeMemorija";
		slika.src = "slike/slikaSkriveno.jpg";
		slika.id = nizSlika[i].naziv;
		slika.alt = nizSlika[i].naziv;
		slika.addEventListener("click", Memorija);
		divZaPrikaz.appendChild(slika);
	}
}

function FinalCountdown(){
	prikazTrajanjeIgrice.innerText = trajanjeIgre--;
	if(-1===trajanjeIgre){
		clearInterval(tikTok);
		Score();
		return;
	}
}

function Score(){
	GameOver();
	if(0 !== pogodjeno){
		if("lako" === tezina){
			if(trajanjeIgre > 10 && trajanjeIgre <=20){
			/*ako je pogodjeno sve pre isteka vremena
			dobija 10 poena bonusa i plus brojsekundi koliko je ostalo do kraja*/
				konacanRezultat = pogodjeno + trajanjeIgre;
			}
			else if((trajanjeIgre >=20 && trajanjeIgre <= 30) || trajanjeIgre > 30){
				/*ako je pogodjeno sve pre nego sto je proslo 10 ili 20 sekundi 
				i dalje dobija max bonus od 20 sekundi
				*/
				konacanRezultat = pogodjeno + 20;
			}
			else{
				//ako je preostali broj sekundi ispod 10 ne dobija se bonus
				konacanRezultat = pogodjeno;
			}
		} else if("srednje" === tezina){
			if(trajanjeIgre > 0 && trajanjeIgre <=10){
				/*ako je pogodjeno sve pre isteka vremena
				dobija 10 poena bonusa i plus brojsekundi koliko je ostalo do kraja*/
				konacanRezultat = pogodjeno + 10 + trajanjeIgre;
			}
			else if(trajanjeIgre <= 20 || trajanjeIgre > 20){
				/*ako je pogodjeno sve pre nego sto je proslo 10 ili 20 sekundi
				i dalje dobija max bonus od 20 sekundi
				*/
				konacanRezultat = pogodjeno + 20;
			}
			else{
				//ako je isteklo vreme a uradio je sve dobija 10 poena bonusa
				konacanRezultat = pogodjeno + 10;
			}
		}
		else if("teško" === tezina){//ako igra nivo teško uvek dobija max bonus
			konacanRezultat = (pogodjeno + 20);
		}

		postoUradjeno = parseInt(konacanRezultat / procenatProgressBara);
		progressBar.style.width  = "0%";
		//pocetakIgrice = true;
		progressBarInterval = setInterval(function(){ ProgressBar() }, 25);
	}

	var h4 = document.createElement("h4");
	var ukupno = 0 === pogodjeno ? 0 : postoUradjeno;
	h4.appendChild(document.createTextNode("vaš rezultat je: "+ ukupno + "%"));
	var scoreInfo = document.getElementById("scoreInfo");
	while(scoreInfo.firstChild){
		scoreInfo.removeChild(scoreInfo.firstChild);
	}
	scoreInfo.appendChild(h4);
}

function ProgressBar(){
	if(brojac === postoUradjeno){
		clearInterval(progressBar);
		return;
	}

	if(brojac < 20){
		progressBar.style.backgroundColor = "#FF4500";
	}
	else if(brojac <50){
		progressBar.style.backgroundColor = "#FF8C00";
	}
	else if(brojac <70){
		progressBar.style.backgroundColor = "#FFA500";
	}
	else if(brojac <80){
		progressBar.style.backgroundColor = "yellow";
	}
	else if(brojac <100){
		progressBar.style.backgroundColor = "GreenYellow ";
	}

	progressBar.style.width  =  progress++ + '%';
	brojac++;
}

function Memorija(){
	if(pocetakIgrice){
		tikTok = setInterval(function(){FinalCountdown()}, 1000);
		pocetakIgrice = false;
	}

	if(this === uzetaSlika1 || this === uzetaSlika2){
		return;
	}

	this.src = VratiClanNiza(this.id).putanja;
	
	if(3 > kliknuto){
		if(1 === kliknuto){
			uzetaSlika1 = this;
			kliknuto++;
		}
		else if(2 === kliknuto){
			uzetaSlika2 = this;
			proveriSlike(this);
			kliknuto = 1;
			uzetaSlika1 = uzetaSlika2 = new Object();
		}
	}
}

function proveriSlike(trenutnaSlika){
	if( uzetaSlika1.id !== uzetaSlika2.id &&
	parSlika(uzetaSlika1.id,uzetaSlika2.id)){
		uzetaSlika1.removeEventListener("click", Memorija);
		uzetaSlika2.removeEventListener("click", Memorija);
		nizSlikaEfektiPrikaz.push(uzetaSlika1);
		nizSlikaEfektiPrikaz.push(uzetaSlika2);
		tmptimeout1 = setTimeout(function(){
			var duzina = nizSlikaEfektiPrikaz.length;
			for(var i=0;i<duzina;i++){
				prviClanNiza(nizSlikaEfektiPrikaz).src = "slike/pozadina.png";
				IzbaciClanNizaPoRef(nizSlikaEfektiPrikaz,prviClanNiza(nizSlikaEfektiPrikaz));
			}
			clearTimeout(tmptimeout1);
			}, 500);
		pogodjeno += 2;
		if( 16 === pogodjeno){
			alert("pogodili ste sve slike");
			clearInterval(tikTok);
			Score();
		}
	}
	else{
		nizSlikaEfektiNePogodjeno.push(uzetaSlika1);
		nizSlikaEfektiNePogodjeno.push(uzetaSlika2);
		tmptimeout2 = setTimeout(function(){
			var duzina = nizSlikaEfektiNePogodjeno.length;
			for(var i=0;i<duzina;i++){
				prviClanNiza(nizSlikaEfektiNePogodjeno).src = "slike/slikaSkriveno.jpg";
				IzbaciClanNizaPoRef(nizSlikaEfektiNePogodjeno,prviClanNiza(nizSlikaEfektiNePogodjeno));
			}
			clearTimeout(tmptimeout2);
			}, 500);
	}
}

function IzbaciClanNizaPoRef(niz,refNaClan){
	var i = -1,
		duzina = niz.length;
	while(i++ < duzina){
		if(niz[i] === refNaClan){
			niz.splice(i,1);
			break;
		}
	}
}

function prviClanNiza(niz){
	if(niz.length > 0){
		return niz[0];
	}
}

function VratiClanNiza(id){
	var duzina = nizSlika.length;
	for(var i=0;i<duzina;i++){
		if(nizSlika[i].naziv === id){
			return nizSlika[i];
		}
	}
}

function parSlika(a,b){
	var odsecenoA = a.slice(0,a.indexOf(a.length-1));
	var odsecenoB = b.slice(0,b.indexOf(b.length-1));
	if(odsecenoA === odsecenoB){
		return true;
	}
	else {
		return false;
	}
}

function RandomNiz(niz){
	var tekIndex = niz.length, tmpClan, randomIndex;
	while (0 !== tekIndex){
		randomIndex = Math.floor(Math.random() * tekIndex);
		tekIndex--;
		tmpClan = niz[tekIndex];
		niz[tekIndex] = niz[randomIndex];
		niz[randomIndex] = tmpClan;
	}
}