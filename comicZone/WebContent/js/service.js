var webSocket, userName, pass;



function connect(user, pass){
	if (webSocket !== undefined
			&& webSocket.readyState !== WebSocket.CLOSED) {
		return;
	}
	
	webSocket = new WebSocket("ws://localhost:8080/comicZone/services");
	
	webSocket.onopen = function(event) {
		console.log("connected");
	};
	
	webSocket.onmessage = function(event) {
		
		var response = JSON.parse(event.data);
		
		switch(response.method){
			case "login":
				login(response.isValid);
				break;
			case "getPersonalInfo":
				renderProfile(response.personalInfo);
				break;
			case "getComicByGenre":
				renderGenreSection(response.comicsByGenre);
				break;
			case "getCharacters":
				renderCharactersSection(response.characters);
				break;
		}
		
		
	};

	webSocket.onclose = function(event) {
		console.log("close");
	};
}



