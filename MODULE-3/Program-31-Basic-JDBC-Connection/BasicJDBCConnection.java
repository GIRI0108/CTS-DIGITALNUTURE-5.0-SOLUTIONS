import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class BasicJDBCConnection {
    public static void main(String[] args) {
        String url = "jdbc:sqlite:students.db";

        try {
            Class.forName("org.sqlite.JDBC");

            Connection connection = DriverManager.getConnection(url);
            System.out.println("Database connected successfully.");

            Statement statement = connection.createStatement();

            statement.executeUpdate("CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY, name TEXT, course TEXT)");

            statement.executeUpdate("INSERT INTO students VALUES (1, 'Arun', 'Java')");
            statement.executeUpdate("INSERT INTO students VALUES (2, 'Bala', 'Python')");
            statement.executeUpdate("INSERT INTO students VALUES (3, 'Kiran', 'Web Development')");

            ResultSet resultSet = statement.executeQuery("SELECT * FROM students");

            System.out.println("\nStudent Records:");

            while (resultSet.next()) {
                System.out.println("ID: " + resultSet.getInt("id"));
                System.out.println("Name: " + resultSet.getString("name"));
                System.out.println("Course: " + resultSet.getString("course"));
                System.out.println("-------------------");
            }

            resultSet.close();
            statement.close();
            connection.close();
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}