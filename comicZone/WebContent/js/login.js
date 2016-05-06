$(document).ready(function(){
	$("#loginBtn").on("click", function(){
		$("#loginPopup").css("display","block");
		connect();
	});
	
	$("#closeLogin").on("click", function(){
		$("#loginPopup").css("display","none");
	});
	
	$("#checkLogin").on("click", function(){
		userName = $("#userName").val();
		pass = $("#pass").val()
		sendLogin(userName, pass);
	});
	
	$("#siteMapLink").on("click", function(){
		renderSiteMap();
	});
});

function sendLogin(userName, pass){
	webSocket.send(JSON.stringify({
		method: "login",
		user: userName,
		pass: pass
	}));
}

function login(isValid){
	if(isValid === true){
		$("#loginPopup").css("display","none");
		$("#loginBtn").text("Log out");
		renderMenu();
	}
	else if(isValid === false){
		$(".errorLogin").css("display","block");
	}
}