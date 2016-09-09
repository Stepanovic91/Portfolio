function Tweetuj(){
	var tweet = document.getElementById("tweetInput").value.trim(),
	pozicija= 0,
	prethodnaPozicija=0,
	zaIspis="",
	slika = "<img src='slike/twitterLogo.jpg' height='' width='' class='slikaZaTweet'/>",
	odseceno = tweet,
	duzinaPocetnogTweeta = tweet.length,
	duzina = tweet.length,
	tag = SledeciTag(odseceno),
	pozicijaTaga = tag === "@"? odseceno.indexOf("@") :odseceno.indexOf("#");
	if(0 === duzina){
		return;
	}
	/*ako nije unesen nijedan tag ili hashtag onda samo upisi text*/
	if(-1 === pozicijaTaga){
		zaIspis = PretvoriUSpace(tweet);
	}
	else{
		while(true){
			//doslo je do kraja unetog texta
			if (pozicija === duzinaPocetnogTweeta-1){
				zaIspis += odseceno.charAt(pozicija);
				break;
			}
			else if (pozicija > duzinaPocetnogTweeta - 1){
				break;
			}

			tag = SledeciTag(odseceno);
			if(tag !==" "){
				pozicijaTaga = odseceno.indexOf(tag);
				var doSlike = "",
				zaIspitivanje = "";

				var proveriSeparator = false;
				if(pozicijaTaga+1 <= duzina-1)
				{
					proveriSeparator = true;
				}
				zaIspitivanje = odseceno.charAt(pozicijaTaga+1);
				doSlike = odseceno.slice(0,pozicijaTaga);
				if(proveriSeparator && (zaIspitivanje === " " || zaIspitivanje === "\n"))
				{
					doSlike = PretvoriUSpace(doSlike);
					if(tag === "@"){
						zaIspis += doSlike +odseceno.charAt(pozicijaTaga)
						+odseceno.charAt(pozicijaTaga + 1);
					}
					else{
						zaIspis += doSlike +"<a href='https://twitter.com/?hashtag="
						+odseceno.charAt(pozicijaTaga)+"' id = 'hashtag' class='tagLink'>"
						+odseceno.charAt(pozicijaTaga)+"</a>"+odseceno.charAt(pozicijaTaga+ 1);
					}
					pozicija = prethodnaPozicija+ pozicijaTaga + 1;
					prethodnaPozicija = pozicija;
				}
				else 
				{
					var posleTaga = odseceno.substr(pozicijaTaga + 1),
					doovde = nadjiSpace(posleTaga);
					textTaga ="";

					if(-1 === doovde)
					{
						doovde = duzina-1;
					}
					textTaga = posleTaga.substring(0,doovde);
					doSlike =PretvoriUSpace(doSlike);
					
					if(tag === "@"){
						zaIspis += doSlike + "<a href='https://twitter.com/?tag="+textTaga+
						"' id = 'tag' class='tagLink'>"+slika+textTaga+"</a>";
					}
					else{
						zaIspis += doSlike + "<a href='https://twitter.com/?hashtag="+textTaga
						+"' class='tagLink'>"+"#"+textTaga+"</a>";
					}
					pozicija  = prethodnaPozicija + pozicijaTaga + 1 + doovde; 
					//pozicijaTaga+1 je znak nakon taga
					prethodnaPozicija = pozicija;
				}
			
				odseceno = tweet.substr(pozicija);
				duzina = odseceno.length;
			}
			else //tag === " "
			{
				zaIspis += PretvoriUSpace(odseceno.substr(0));
				pozicija = duzinaPocetnogTweeta-1;
			}
		}
	}
	zaIspis = "<div class='tweet'>"+zaIspis+"</div>";
	document.getElementById("ispis").innerHTML += zaIspis;
}
function nadjiSpace(text){
	var space =  text.search(" "),
		noviRed = text.search("\n"),		
		rezultat = space + noviRed;
	
	if(rezultat === -2){
		return -1;
	}
	else{
		if(space === -1){
			return noviRed;
		}
		else if(noviRed === -1)
		{
			return space;
		}
		else{
			return space < noviRed ? space : noviRed; 
		}
	}
}
function PretvoriUSpace(text){
	var niz = text.split(''),
	duzina = niz.length,
	zaIspis = "";
	for(var i=0;i<duzina;i++){
		if(niz[i] === " "){
			niz[i] = "&nbsp;";
		}
		if(niz[i] === "\n"){
			niz[i] = "<br/>";
		}
	}
	return niz.join('');
}
function SledeciTag(text){
	tag = text.indexOf("@");
	hashtag = text.indexOf("#");

	if(tag === hashtag){//oba su -1
		return " ";
	}
	else{
		if(-1 === hashtag)
		{
			return "@";
		}
		else if(-1 === tag)
		{
			return "#";
		}
		else
		{
			return tag < hashtag ? "@":"#";
		}
	}
}