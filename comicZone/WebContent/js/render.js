
function renderMenu(){
	$("#menuItems").append(
			$("<li>").attr("class","genreTab").append(
					$("<a>").attr("href","#").append(
							$("<span>").text("Generos"))));
	
	$("#menuItems").append(
			$("<li>").append(
					$("<a>").attr("href","#").append(
							$("<span>").text("Ediciones"))));
	
	$("#menuItems").append(
			$("<li>").append(
					$("<a>").attr("href","#").append(
							$("<span>").text("Noticias"))));
	
	$("#menuItems").append(
			$("<li>").attr("class","characterTab").append(
					$("<a>").attr("href","#").append(
							$("<span>").text("Personajes"))));
	
	$("#menuItems").append(
			$("<li>").attr("class","profile").append(
					$("<a>").attr("href","#").append(
							$("<span>").text("Perfil"))));
	
	
	$("body").on("click", ".profile", function(){
		clear();
		$("#profileInfo").css("display", "block");
		webSocket.send(JSON.stringify({
			method: "getPersonalInfo",
			user: userName,
			pass: pass
		}));
	});
	
	$("body").on("click",".genreTab", function(){
		clear();
		webSocket.send(JSON.stringify({
				method: "getComicByGenre",
				user: userName,
				pass: pass
			}));
	});
	
	$("body").on("click", ".characterTab", function(){
		clear();
		$("#searchCharacter").css("display", "block");
	});
	
	$("#searchCharBtn").on("click", function(){
		webSocket.send(JSON.stringify({
			method: "getCharacters",
			name: $("#characterName").val(),
			alterEgo: $("#characterAlterEgo").val(),
			genre: $("#characterGenre").val(),
			creator: $("#characterCreator").val()
		}));
	});
	

}

function renderSiteMap(){
	clear();
	$("#siteMap").css("display", "block");
	$("#itemsMap").empty();
	
	var item, itemName,
		items = $("#menuItems").children("li");
	
	$("#menuItems li").each(function(){
		$(this);
		$("#itemsMap").append($("<p>").attr("class",$(this).attr("class")+" link")
				.text($(this).children("a").text()));
	});
	
}

function renderProfile(data){
	$("#puser").val(data.userName);
	$("#puserName").val(data.name);
	$("#puserAddress").val(data.address);
	$("#puserTel").val(data.Tel);
	$("#puserCreditCard").val(data.creditCard);
}

function renderGenreSection(data){
	$("#genreSection").css("display","inline");
	$("#genreSection").empty();
	var element, elementHtml, comicHtml;
	
	for (var key in data){
		element = data[key];
		elementHtml = $("#"+element.genre);
		if(elementHtml.length){
			
			elementHtml.append($("<div>").attr({
				id:element.name.replace(/ /g,''),
				class: "comicDiv"
			}));
			
			comicHtml = $("#"+element.name.replace(/ /g,''));
			comicHtml.append($("<img>").attr("src",element.urlImage));
			comicHtml.append($("<p>").text("Nombre: "+element.name));
			comicHtml.append($("<p>").text("Fecha: "+element.date));
			comicHtml.append($("<p>").text("Editorial: "+element.creator));
			comicHtml.append($("<p>").text("Ranking: "+element.stars));
		}else{
			$("#genreSection").append($("<div>").attr({
				id: element.genre}).append($("<p>").attr({
					class: "genreTitle",
					align: "center"}).text(element.genre)));
			
			elementHtml = $("#"+element.genre);
			
			elementHtml.append($("<div>").attr({
				id:element.name.replace(/ /g,''),
				class: "comicDiv"
			}));
			
			comicHtml = $("#"+element.name.replace(/ /g,''));
			comicHtml.append($("<img>").attr("src",element.urlImage));
			comicHtml.append($("<p>").text("Nombre: "+element.name));
			comicHtml.append($("<p>").text("Fecha: "+element.date));
			comicHtml.append($("<p>").text("Editorial: "+element.creator));
			comicHtml.append($("<p>").text("Ranking: "+element.stars));
		}
		
	}
}

function renderCharactersSection(data){
	$("#resultCharacters").empty();
	
	var element, characterHtml;
		container = $("#resultCharacters");
	
	for(var key in data){
		element = data[key];
		container.append($("<div>").attr({
			id: element.nameCharacter.replace(/ /g,''),
			class: "characterDiv"
		}));
		
		characterHtml = $("#"+element.nameCharacter.replace(/ /g,''));
		characterHtml.append($("<img>").attr("src",element.urlImage));
		characterHtml.append($("<p>").text("Nombre: "+element.nameCharacter));
		characterHtml.append($("<p>").text("Alter Ego: "+element.alterEgo));
		characterHtml.append($("<p>").text("Caracteristicas: "+element.featuresDescription));
		characterHtml.append($("<p>").text("Creador: "+element.creator));
	}
}

function clear(){
	$("#genreSection").css("display","none");
	$("#profileInfo").css("display", "none");
	$("#searchCharacter").css("display", "none");
	$("#siteMap").css("display", "none");
}

