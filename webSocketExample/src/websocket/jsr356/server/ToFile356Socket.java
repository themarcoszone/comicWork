package websocket.jsr356.server;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Scanner;

import javax.websocket.CloseReason;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;


@ServerEndpoint("/jsr356toFile")
public class ToFile356Socket {

	@OnOpen
	public void onOpen(Session session) {
		System.out.println("WebSocket opened: " + session.getId());
	}

	@OnMessage
	public void onMessage(String file, Session session) throws IOException {
		System.out.println("Message received: " + file);
		try {
			String content = new String(Files.readAllBytes(Paths.get(file)));
			session.getBasicRemote().sendText(content);
		}
		catch(IOException e) {
			session.getBasicRemote().sendText(e.getMessage());
		}
	}

	@OnClose
	public void onClose(CloseReason reason, Session session) {
		System.out.println("Closing a WebSocket due to " + reason.getReasonPhrase());

	}
	
}
