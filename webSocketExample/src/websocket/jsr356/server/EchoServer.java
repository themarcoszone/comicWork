package websocket.jsr356.server;

import java.io.IOException;

import javax.websocket.CloseReason;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;


@ServerEndpoint("/echoServer")
public class EchoServer {

	@OnOpen
	public void onOpen(Session session) {
		System.out.println("WebSocket opened: " + session.getId());
	}

	@OnMessage
	public void onMessage(String txt, Session session) throws IOException {
		System.out.println("Message received: " + txt);
		session.getBasicRemote().sendText("Message: "+txt.toUpperCase());
		
	}

	@OnClose
	public void onClose(CloseReason reason, Session session) {
		System.out.println("Closing a WebSocket due to " + reason.getReasonPhrase());

	}
	
}
