	var ime = "";
	var prezime = "";
	var adresa = "";
	var telefon = "";
	var mobilni = "";
	var imenik = new Array();

	imenik = [{
	ime:"Pera", prezime: "Peric", adresa: "Balkanska 4", telefon: "011/3435367",mobilni: "060/1253374"},
	{ime:"Milos", prezime: "Savic", adresa: "Spasovdanska 2", telefon: "011/2345678",mobilni: "060/5567335"},
	{ime:"Stefan", prezime: "Mandic", adresa: "Trgovacka 10", telefon: "011/8765432",mobilni: "060/9223336"},
	{ime:"Milan", prezime: "Vukadinovic", adresa: "Savska 10", telefon: "011/1234564",mobilni: "063/2256338"},
	{ime:"Radivoje", prezime: "Spasic", adresa: "Tosin bunar 50", telefon: "011/9987655",mobilni: "064/3922456"}];

	function Pokupi(){
	var nizGresaka = [],
		regImePrezime = /^[A-Za-z]{1,10}$/,
		regAdresa = /^([A-Za-z]{1,20}[\s]{1})+[\d]{1,}$/,
		regTelefon = /^[+]?((381)|0)[0-9]{2}[/]?[0-9]{6,7}$/,
		regMobilniTelefon = /^[+]?((381)|0)6[0-68-9][/]?[0-9]{6,7}$/,
		ispis="";

	
	ime = document.getElementById("ime");
	if(regImePrezime.test(ime.value.trim())){
		ime.className = "dobarUnos";
	}
	else{
		nizGresaka.push("Ime nije u dobrom formatu");
		ime.className = "losUnos";
	}

	prezime = document.getElementById("prezime");
	if(regImePrezime.test(prezime.value.trim())){
		prezime.className = "dobarUnos";
	}
	else{
		nizGresaka.push("Prezime nije u dobrom formatu");
		prezime.className = "losUnos";
	}

	adresa = document.getElementById("adresa");
	if(regAdresa.test(adresa.value.trim())){
		adresa.className = "dobarUnos";
	}
	else{
		nizGresaka.push("Adresa nije u dobrom formatu");
		adresa.className = "losUnos";
	}

	telefon = document.getElementById("telefon");
	if(regTelefon.test(telefon.value.trim())){
		telefon.className = "dobarUnos";
	}
	else{
		nizGresaka.push("Telefon nije u dobrom formatu");
		telefon.className = "losUnos";
	}

	mobilni = document.getElementById("mobilniTelefon");
	if(regMobilniTelefon.test(mobilni.value.trim())){
		mobilni.className = "dobarUnos";
	}
	else{
		nizGresaka.push("Mobilni telefon nije u dobrom formatu");
		mobilni.className = "losUnos";
	}
	
	var divZaIspis = document.getElementById("poruke");
	while (divZaIspis.firstChild) {
		divZaIspis.removeChild(divZaIspis.firstChild);
	}

	if(0 < nizGresaka.length){
		var duzinaNiza = nizGresaka.length;
		var ul = document.createElement("UL");
		for(var i=0;i < duzinaNiza;i++){
			var li = document.createElement("LI");
			li.appendChild(document.createTextNode(nizGresaka[i]));
			ul.appendChild(li);
		}
		ispis = ul;
		divZaIspis.className = "LosFormaUnos";
	}
	else{
		var noviPodatak = 
		{
			ime : PrvoSlovoVeliko(ime.value.trim()),
			prezime : PrvoSlovoVeliko(prezime.value.trim()),
			adresa : PrvoSlovoVeliko(adresa.value.trim()),
			telefon : telefon.value.trim(),
			mobilni : mobilni.value.trim()
		};
		imenik.push(noviPodatak);
		PrikaziImenik();
		var p = document.createElement("p");
		p.appendChild(document.createTextNode("uspesno ste dodali novi kontakt u imenik"));
		ispis = p;
		divZaIspis.className = "DivIspisDobarUnos";
	}
	divZaIspis.appendChild(ispis);
	return false;
	}
	function PrvoSlovoVeliko(text){
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
	}

	function Imenik(){
	var duzinaNiza = imenik.length,ispisImenik="";
	if(0 < duzinaNiza){
		ispisImenik= "<table class=\"imenikPrikaz\">";
		ispisImenik+="<tr>"+
		"<th><a href=\"#\" onClick=\"Sortiraj(1);\">Ime</a></th>"+
		"<th><a href=\"#\" onClick=\"Sortiraj(2);\">Prezime</a></th>"+
		"<th><a href=\"#\" onClick=\"Sortiraj(3);\">Adresa</a></th>"+
		"<th><a href=\"#\" onClick=\"Sortiraj(4);\">Telefon</a></th>"+
		"<th><a href=\"#\" onClick=\"Sortiraj(5);\">Mobilni Telefon</a></th>"+
		"</tr>";
		for(var i=0;i<duzinaNiza;i++){
			ispisImenik +="<tr>";
			ispisImenik+="<tr><td>"+imenik[i].ime+"</td><td>"+imenik[i].prezime+"</td><td>"+imenik[i].adresa+"</td><td>"+imenik[i].telefon+"</td><td>"+imenik[i].mobilni+"</td></tr>";
			ispisImenik +="</tr>";
		}
		ispisImenik+= "</table>";
		document.getElementById("imenik").innerHTML = ispisImenik;
	}
	}

	var asc = true;
	function Sortiraj(kriterijum){
	switch(kriterijum)
	{
		case 1:
			imenik.sort(function(a, b) {
			var textA = a.ime.toUpperCase();
			var textB = b.ime.toUpperCase();
			return (textA < textB) ?  ( (asc === true)? -1 : 1): 
			((textA > textB) ? 1: 0);
		});
		break;

		case 2:
		imenik.sort(function(a, b) {
			var textA = a.prezime.toUpperCase();
			var textB = b.prezime.toUpperCase();
			return (textA < textB) ?  ( (asc === true)? -1 : 1): 
			((textA > textB) ?1: 0);
		});
		break;

		case 3:
		imenik.sort(function(a, b) {
			var textA = a.adresa.toUpperCase();
			var textB = b.adresa.toUpperCase();
			return (textA < textB) ?  ( (asc === true)? -1 : 1): 
			((textA > textB) ?1: 0);
		});
		break;

		case 4:
		imenik.sort(function(a, b) {
			var textA = a.telefon;
			var textB = b.telefon;
			return (textA < textB) ?  ( (asc === true)? -1 : 1): 
			((textA > textB) ?1: 0);
		});
		break;

		case 5:
		imenik.sort(function(a, b) {
			var textA = a.mobilni;
			var textB = b.mobilni;
			return (textA < textB) ?  ( (asc === true)? -1 : 1): 
			((textA > textB) ?1: 0);
		});
		break;
	}
	asc = asc === true ? false : true;
	Imenik();
	}

	function Pretraga()
	{
	var trazi = document.getElementById("pretraga").value.trim().toUpperCase();/* zanemarice KeySensitive*/
	var	rezulatPretrage = new Array();
	var	duzinaNiza = imenik.length;
	var	ispisImenik ="";

	for(var i =0; i< duzinaNiza;i++){
		if(imenik[i].ime.toUpperCase().indexOf(trazi) !== -1 || imenik[i].prezime.toUpperCase().indexOf(trazi) !== -1 || imenik[i].adresa.toUpperCase().indexOf(trazi) !== -1 || imenik[i].telefon.indexOf(trazi) !== -1 || imenik[i].mobilni.indexOf(trazi) !== -1){
			rezulatPretrage.push(imenik[i]);
		}
	}

	duzinaNiza = rezulatPretrage.length;
	if(0 < duzinaNiza){
		ispisImenik= "<table class=\"imenikPrikaz\">";
		ispisImenik+="<tr>"+
		"<th><a href=\"#\" onClick=\"Sortiraj(1);\">Ime</a></th>"+
		"<th><a href=\"#\" onClick=\"Sortiraj(2);\">Prezime</a></th>"+
		"<th><a href=\"#\" onClick=\"Sortiraj(3);\">Adresa</a></th>"+
		"<th><a href=\"#\" onClick=\"Sortiraj(4);\">Telefon</a></th>"+
		"<th><a href=\"#\" onClick=\"Sortiraj(5);\">Mobilni Telefon</a></th>"+
		"</tr>";
		for(var i=0;i<duzinaNiza;i++){
			ispisImenik +="<tr>";
			ispisImenik+="<tr><td>"+rezulatPretrage[i].ime+"</td><td>"+rezulatPretrage[i].prezime+"</td><td>"+rezulatPretrage[i].adresa+"</td><td>"+rezulatPretrage[i].telefon+"</td><td>"+rezulatPretrage[i].mobilni+"</td></tr>";
			ispisImenik +="</tr>";
		}
		ispisImenik+= "</table>";
	}
		document.getElementById("imenik").innerHTML = ispisImenik;
	}