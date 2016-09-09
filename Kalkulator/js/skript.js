function c(val)
	{
		document.getElementById("d").value=val;
	}
	function v(val)
	{
		document.getElementById("d").value+=val;
		
	}
	function e() 
	{ 
		try 
		{ 
		  c(eval(document.getElementById("d").value)) 
		} 
		catch(e) 
		{
		  c('Error') 
		} 
	}
function kvadrat()
	{
	var prom = document.getElementById("d").value;
	rez = prom*prom;
	document.getElementById("d").value=rez;
	}

function kub()
	{
	var prom = document.getElementById("d").value;
	rez = prom*prom*prom;
	document.getElementById("d").value=rez;
	}
function koren()
    {
	var prom = document.getElementById("d").value;
	rez = Math.sqrt(prom);
	document.getElementById("d").value=rez;
	}