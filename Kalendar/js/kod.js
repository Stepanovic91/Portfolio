	var danas = new Date();
	var datum = new Date(danas.getFullYear(),danas.getMonth(),1);
	var datumPrikaz = document.getElementById("datumPrikaz");
	var kalendar = document.getElementById("kalendar");
	var daniUnedelji = ["ponedeljak",
				"utorak",
				"sreda",
				"četvrtak",
				"petak",
				"subota",
				"nedelja"];
	var year = datum.getFullYear();
	var meseci=[{brojDana:31,mesec:"Januar"},
			{brojDana:(parseFloat(year % 4) === 0 && parseFloat(year % 100) !== 0
			|| parseFloat(year % 400) === 0)? 29 : 28,mesec:"Februar"},
			{brojDana:31,mesec:"Mart"},
			{brojDana:30,mesec:"April"},
			{brojDana:31,mesec:"Maj"},
			{brojDana:30,mesec:"Jun"},
			{brojDana:31,mesec:"Jul"},
			{brojDana:31,mesec:"Avgust"},
			{brojDana:30,mesec:"Septembar"},
			{brojDana:31,mesec:"Oktobar"},
			{brojDana:30,mesec:"Novembar"},
			{brojDana:31,mesec:"Decembar"}];
	var satDiv = document.getElementById("sat");
	var interval = setInterval(function(){ Sat() }, 1000);
	function Sat() {
	danas = new Date();
	var p = document.createElement("P");
	while (satDiv.firstChild) {
		satDiv.removeChild(satDiv.firstChild);
	}
	satDiv.appendChild(p.appendChild(document.createTextNode(FormatPrikazaVremena(danas))));
	}

	function Kalendar(mesec){
	mesec = parseInt(mesec);
	datum = new Date(datum.getFullYear(),datum.getMonth()+mesec,1);
	var tmpDatum = new Date(datum),
		tabela = document.createElement("TABLE"),
		tr = document.createElement("TR"),
		trHead = document.createElement("TR"),
		brojac=0,
		pocetakKalendara = true,
		stariDatumDo=1,
		h4 = document.createElement("H4");

	while (kalendar.firstChild) {
		kalendar.removeChild(kalendar.firstChild);
	}
	while (datumPrikaz.firstChild) {
		datumPrikaz.removeChild(datumPrikaz.firstChild);
	}

	for(var i = 0;6 >= i;i++){
		var th = document.createElement("TH"),
			text = document.createTextNode(daniUnedelji[i]);
		th.appendChild(text);
		tr.appendChild(th);
	}

	tabela.appendChild(tr);

	for(var stariDatumDo=1;stariDatumDo<7;stariDatumDo++){
		if(stariDatumDo === datum.getDay()){
			break;
		}
	}

	year = datum.getFullYear();
	meseci[1].brojDana=(parseFloat(year % 4) === 0 && parseFloat(year % 100) !== 0 
	|| parseFloat(year % 400) === 0)? 29 : 28;

	brojac =  meseci[datum.getMonth()].brojDana === 28 && stariDatumDo === 1? 1 : 0;
	while(5 > brojac){
		tr = document.createElement("TR");
		for(var i = 1;i <=7;i++){
			if((i === stariDatumDo || i === datum.getDay()+7) && pocetakKalendara){
				pocetakKalendara = false;
				var td = document.createElement("TD"),
					text = document.createTextNode(datum.getDate());
				if(danasnjiDatum()){
					td.classList.add("trenutniDatum");
				}
				td.appendChild(text);
				tr.appendChild(td);
				datum.setDate(datum.getDate()+1);

				if(6 <= i && 30 < meseci[datum.getMonth()].brojDana){
					brojac--;
				}
			}
			else if(!pocetakKalendara){
				pocetakKalendara = false;
				var td = document.createElement("TD"),
					text = document.createTextNode(datum.getDate());
				if(danasnjiDatum()){
					td.classList.add("trenutniDatum");
				}
				else if(datum.getMonth()!==tmpDatum.getMonth())
				{
					td.classList.add("datumIzDrugogMeseca");
				}
				td.appendChild(text);
				tr.appendChild(td);
				datum.setDate(datum.getDate()+1);
			}
			else{
				var td = document.createElement("TD"),
					datumUnazad = new Date(datum);
				datumUnazad.setDate(datum.getDate()-(stariDatumDo-i));
				var a = datumUnazad.getDate(),
					text = document.createTextNode(a);
				td.classList.add("datumIzDrugogMeseca");
				td.appendChild(text);
				tr.appendChild(td);
			}
		}
		tabela.appendChild(tr);
		brojac++;
	}
	datum = tmpDatum;
	kalendar.appendChild(tabela);
	h4.appendChild(document.createTextNode(meseci[datum.getMonth()].mesec+", "+datum.getFullYear()));
	datumPrikaz.appendChild(h4);
}

function danasnjiDatum(){
	return (danas.getDate() === datum.getDate())?
				(danas.getMonth() === datum.getMonth()?
						(danas.getFullYear()===datum.getFullYear()? 
						true:
						false)
					:false) :
				false;
}

function FormatPrikazaVremena(vreme){
	var format = document.getElementById("FormatVremena").options[document.getElementById("FormatVremena").selectedIndex].value,
		formatPrikaz = "";

	switch(format){
		case "format6":
		formatPrikaz = vreme.getHours()+"-"+vreme.getMinutes()+"-" + vreme.getSeconds() + " " +daniUnedelji[vreme.getDay()===0?6:vreme.getDay()-1] + ", "  + (vreme.getMonth()+1) + "/" + vreme.getDate()+"/" + vreme.getFullYear();
		break;
		case "format5":
		formatPrikaz = vreme.getHours()+"-"+vreme.getMinutes()+"-" + vreme.getSeconds() + " " +daniUnedelji[vreme.getDay()===0?6:vreme.getDay()-1] + ", " + vreme.getDate()+"/" + (vreme.getMonth()+1) + "/" + vreme.getFullYear();
		break;
		case "format4":
		formatPrikaz = vreme.getHours()+"-"+vreme.getMinutes()+"-" + vreme.getSeconds() + " " +daniUnedelji[vreme.getDay()===0?6:vreme.getDay()-1] + ", " + vreme.getDate()+"/" + meseci[vreme.getMonth()].mesec + "/" + vreme.getFullYear().toString().substr(2,2);
		break;
		case "format3":
		formatPrikaz = vreme.getHours()+"-"+vreme.getMinutes()+"-" + vreme.getSeconds() + " " +daniUnedelji[vreme.getDay()===0?6:vreme.getDay()-1] + ", " + vreme.getDate()+"/" + meseci[vreme.getMonth()].mesec + "/" + vreme.getFullYear();
		break;
		case "format2":
		formatPrikaz = vreme.getHours()+":"+vreme.getMinutes()+":" + vreme.getSeconds() + " " +daniUnedelji[vreme.getDay()===0?6:vreme.getDay()-1] + ", " + vreme.getDate()+"." + meseci[vreme.getMonth()].mesec + "." + vreme.getFullYear().toString().substr(2,2);
		break;
		case "format1":
		default:
		formatPrikaz = vreme.getHours()+":"+vreme.getMinutes()+":" + vreme.getSeconds() + " " +daniUnedelji[vreme.getDay()===0?6:vreme.getDay()-1] + ", " + vreme.getDate()+"." + meseci[vreme.getMonth()].mesec + "." + vreme.getFullYear();
		break;
	}
	return formatPrikaz;
}