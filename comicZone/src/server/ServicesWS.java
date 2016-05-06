package server;

import java.io.IOException;

import javax.websocket.CloseReason;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.codehaus.jettison.json.JSONObject;
import org.codehaus.jettison.json.JSONException;

import dataBase.LoadDriver;

@ServerEndpoint(value = "/services")
public class ServicesWS {

	@OnOpen
	public void onOpen(Session session) {
		System.out.println("WebSocket opened: " + session.getId());
	}
	
	@OnMessage
	public void onMessage(String Message, Session session) throws IOException {
		
		String method = "";
		
		try{
			JSONObject jObj = new JSONObject(Message);
			method = jObj.getString("method");
			
			switch(method){
				case "login":
					JSONObject isValid = validateUser(jObj.getString("user"), jObj.getString("pass"));
					session.getBasicRemote().sendText(isValid.toString());
					break;
				case "getPersonalInfo":
					JSONObject personalInfo = getPersonalInfo(jObj.getString("user"), jObj.getString("pass"));
					session.getBasicRemote().sendText(personalInfo.toString());
					break;
				case "getComicByGenre":
					JSONObject comicByGenre = getComicsByGenre();
					session.getBasicRemote().sendText(comicByGenre.toString());
					break;
				case "getCharacters":
					JSONObject characters = getCharacters(jObj.getString("name"), jObj.getString("alterEgo"),
							jObj.getString("genre"), jObj.getString("creator"));
					session.getBasicRemote().sendText(characters.toString());
					break;
			}
			
			
		} catch(JSONException e){
			e.printStackTrace();
		}
		
		
	}
	
	private JSONObject validateUser(String userName, String pass){
		JSONObject result = new JSONObject();
		try{
			result.put("method", "login");
			result.put("isValid", LoadDriver.isValidUser(userName, pass));
		} catch(JSONException e){
			e.printStackTrace();
		}
		
		return result;
	}
	
	private JSONObject getPersonalInfo(String userName, String pass){
		
		JSONObject result = new JSONObject();
		try{
			result.put("method", "getPersonalInfo");
			result.put("personalInfo", LoadDriver.getPersonalInfo(userName, pass));
		} catch(JSONException e){
			e.printStackTrace();
		}
		
		
		return result;
	}
	
	private JSONObject getComicsByGenre(){
		JSONObject result = new JSONObject();
		try{
			result.put("method", "getComicByGenre");
			result.put("comicsByGenre", LoadDriver.getComicsByGenre());
		} catch(JSONException e){
			e.printStackTrace();
		}
		
		return result;
	}
	
	private JSONObject getCharacters(String name, String alterEgo, String genre, String creator){
		JSONObject result = new JSONObject();
		try{
			result.put("method", "getCharacters");
			result.put("characters", LoadDriver.getCharacters(name,alterEgo, genre, creator));
		} catch(JSONException e){
			e.printStackTrace();
		}
		
		return result;
	}
	
	@OnClose
	public void onClose(CloseReason reason, Session session) {
		System.out.println("Closing a WebSocket due to " + reason.getReasonPhrase());

	}
}
