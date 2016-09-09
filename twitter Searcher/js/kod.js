$(document).ready(function() {
	var pretraga = prompt("pretražite twitter:","batman");
	if(pretraga === null){
		pretraga = "batman";
	}
	$.ajax({
		type: 'GET',
		url: 'https://twitter.com/i/search/typeahead.json?count=10&filters=true&q='+pretraga+'&result_type=topics%2Cusers&src=SEARCH_BOX',
		dataType: 'jsonp',
		jsonpCallback: 'callback',
		success: function(json){
			//users 
			var users = $("#users"),
				duzinaUsers = json.users.length;
			for(var i=0;i<duzinaUsers;i++){
				var div = $("<div>",{
				"class":"user"
				}),
					h3 = $("<h3>"),
					h4 = $("<h4>"),
					p = $("<p>"),
					user = json.users[i];

				h3.html("screen_name: " + user.screen_name);
				h4.html("name: " + user.name);
				p.append("tokens: <br/>");
				for(var j=0;j<user.tokens.length;j++){
					p.append(user.tokens[j].token + ", ");
				}

				div.append(h3);
				div.append(h4);
				div.append(p);
				users.append(div);
			}

			//topics 
			var topics = $("#topics"),
				duzinaTopics = json.topics.length;
			for(var i=0;i<duzinaTopics;i++){
				var div = $("<div>",{
				"class":"topic"
				}),
					h3 = $("<h3>"),
					p = $("<p>"),
					topic = json.topics[i];

				h3.html("topic: " + topic.topic);
				p.append("tokens: <br/>");
				for(var j=0;j<topic.tokens.length;j++){
					p.append(topic.tokens[j].token + ", ");
				}

				div.append(h3);
				div.append(p);
				topics.append(div);
			}
			console.log(json);
		}
	});

//link 
//je
//https://twitter.com/i/search/typeahead.json?count=10&filters=true&q=batman&result_type=topics%2Cusers&src=SEARCH_BOX
/*
$.getJSON('https://twitter.com/search?q=batman&src=typd&lang=en?callback=?', function(result) {
		//alert(result);
		console.log(result);
//		var response = JSON.parse(result);
	//alert(response.users[0].id);
        //alert(result[0]);
    });
	
	*/
});