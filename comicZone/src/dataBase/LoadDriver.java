package dataBase;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

public class LoadDriver {
	
	private static Connection conn = null;
	private static Statement stmt = null;
	private static ResultSet rs = null;

	private static void createConn() {
        try {
            Class.forName("com.mysql.jdbc.Driver").newInstance();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        

        try {
            conn =
               DriverManager.getConnection("jdbc:mysql://localhost/comicDB","root","");
        }
        catch (SQLException ex) {
            // handle any errors
            System.out.println("SQLException: " + ex.getMessage());
            System.out.println("SQLState: " + ex.getSQLState());
            System.out.println("VendorError: " + ex.getErrorCode());
        }
    }
	
	public static boolean isValidUser(String userName, String pass){
		boolean exist = false;
		
		if (conn == null){
			createConn();
		}
		
		try{
			stmt = conn.createStatement();
		    rs = stmt.executeQuery("SELECT * FROM user WHERE userName= \"" + userName +
		    		"\" AND pass=\"" + pass +"\"");

		    exist = rs.next();
		}
		catch (SQLException ex){
		   ex.printStackTrace();
		}
		finally{
			endTran();
		}

		return exist;
	}
	
	
	public static JSONObject getPersonalInfo(String userName, String pass){
		
		JSONObject result = new JSONObject();
		if (conn == null){
			createConn();
		}
		
		try{
			stmt = conn.createStatement();
		    stmt.executeQuery("SELECT * FROM user WHERE userName= \"" + userName +
		    		"\" AND pass=\"" + pass +"\"");
		    
		    rs = stmt.getResultSet();
		    
		    if(rs.next()){
		    	result.put("userName", rs.getString("userName"));
		    	result.put("name", rs.getString("name"));
		    	result.put("address", rs.getString("address"));
		    	result.put("creditCard", rs.getString("creditCard"));
		    	result.put("Tel", rs.getString("Tel"));
		    }
		}
		catch (SQLException ex){
			ex.printStackTrace();
		}
		catch(JSONException e){
			e.printStackTrace();
		}
		finally{
			endTran();
		}
		
		return result;
	}
	
	
	public static JSONArray getComicsByGenre(){
		JSONArray result = new JSONArray();
		JSONObject genre;

		
		if (conn == null){
			createConn();
		}
		
		try{
			stmt = conn.createStatement();
		    stmt.executeQuery("SELECT * FROM comicInfo ORDER BY genre");
		    
		    rs = stmt.getResultSet();
		   
		    while(rs.next()){
		    	
		    	genre = new JSONObject();
		    	genre.put("genre", rs.getString("genre"));
	    		genre.put("name", rs.getString("name"));
	    		genre.put("date", rs.getString("date"));
	    		genre.put("creator", rs.getString("creator"));
	    		genre.put("isSpecial", rs.getString("isSpecial"));
	    		genre.put("urlImage", rs.getString("urlImage"));
	    		genre.put("stars", rs.getString("stars"));
	    		genre.put("editionNumber", rs.getString("editionNumber"));
	    		
	    		result.put(genre);
	    	}
		    	
		    	
		}
		catch (SQLException ex){
			ex.printStackTrace();
		}
		catch(JSONException e){
			e.printStackTrace();
		}
		finally{
			endTran();
		}
		
		return result;
	}
	
	public static JSONArray getCharacters(String nameChar, String alterEgo, String genre, String creator){
		
		JSONArray result = new JSONArray();
		JSONObject character;
		
		String qNameChar = nameChar.equals("") ? "''" : " ch.name LIKE '" +nameChar+ "%' ",
				qAlterEgo = alterEgo.equals("") ? "" : " OR ch.alterEgo LIKE '" +alterEgo+ "%' ", 
				qGenre = genre.equals("") ? "" : " OR ci.genre LIKE '" +genre+ "%' ", 
				qCreator = creator.equals("") ? "" : " OR ci.creator LIKE '" +genre+ "%' ",
				qWhere = !(nameChar.equals("") && alterEgo.equals("") && genre.equals("") && creator.equals("")) ? " WHERE ": "";
		if (conn == null){
			createConn();
		}
		
		
		try{
			stmt = conn.createStatement();
			String query = "SELECT ch.name, ch.alterEgo, ch.featuresDescription, ch.urlImage, ci.genre, ci.creator "
		    		+ " FROM comicDB.character ch JOIN comicInfo ci USING (idComic) "+ qWhere + qNameChar
		    		+ qAlterEgo + qGenre + qCreator;
			
		    stmt.executeQuery(query);
		    
		    rs = stmt.getResultSet();
		   
		    while(rs.next()){
		    	
		    	character = new JSONObject();
		    	character.put("nameCharacter", rs.getString("name"));
		    	character.put("alterEgo", rs.getString("alterEgo"));
		    	character.put("featuresDescription", rs.getString("featuresDescription"));
		    	character.put("genre", rs.getString("genre"));
		    	character.put("creator", rs.getString("creator"));
		    	character.put("urlImage", rs.getString("urlImage"));
	    		
	    		result.put(character);
	    	}
		    	
		    	
		}
		catch (SQLException ex){
			ex.printStackTrace();
		}
		catch(JSONException e){
			e.printStackTrace();
		}
		finally{
			endTran();
		}
		
		return result;
	}
	
	
	private static void endTran(){
		if (rs != null) {
	        try {
	            rs.close();
	        } catch (SQLException sqlEx) { } 

	        rs = null;
	    }
		
		if (stmt != null) {
	        try {
	            stmt.close();
	        } catch (SQLException sqlEx) { }

	        stmt = null;
	    }
	}
	
}
