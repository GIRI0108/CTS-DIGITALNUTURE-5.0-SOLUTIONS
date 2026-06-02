import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Scanner;

public class StudentDAO {
    static String url = "jdbc:sqlite:students.db";

    public static Connection getConnection() throws Exception {
        Class.forName("org.sqlite.JDBC");
        return DriverManager.getConnection(url);
    }

    public static void createTable() {
        try {
            Connection connection = getConnection();
            Statement statement = connection.createStatement();

            String query = "CREATE TABLE IF NOT EXISTS students ("
                    + "id INTEGER PRIMARY KEY, "
                    + "name TEXT, "
                    + "age INTEGER, "
                    + "course TEXT"
                    + ")";

            statement.executeUpdate(query);

            statement.close();
            connection.close();
        } catch (Exception e) {
            System.out.println("Table creation error: " + e.getMessage());
        }
    }

    public static void insertStudent(int id, String name, int age, String course) {
        try {
            Connection connection = getConnection();

            String query = "INSERT INTO students (id, name, age, course) VALUES (?, ?, ?, ?)";
            PreparedStatement preparedStatement = connection.prepareStatement(query);

            preparedStatement.setInt(1, id);
            preparedStatement.setString(2, name);
            preparedStatement.setInt(3, age);
            preparedStatement.setString(4, course);

            int rows = preparedStatement.executeUpdate();

            if (rows > 0) {
                System.out.println("Student inserted successfully.");
            }

            preparedStatement.close();
            connection.close();
        } catch (Exception e) {
            System.out.println("Insert error: " + e.getMessage());
        }
    }

    public static void updateStudent(int id, String name, int age, String course) {
        try {
            Connection connection = getConnection();

            String query = "UPDATE students SET name = ?, age = ?, course = ? WHERE id = ?";
            PreparedStatement preparedStatement = connection.prepareStatement(query);

            preparedStatement.setString(1, name);
            preparedStatement.setInt(2, age);
            preparedStatement.setString(3, course);
            preparedStatement.setInt(4, id);

            int rows = preparedStatement.executeUpdate();

            if (rows > 0) {
                System.out.println("Student updated successfully.");
            } else {
                System.out.println("Student ID not found.");
            }

            preparedStatement.close();
            connection.close();
        } catch (Exception e) {
            System.out.println("Update error: " + e.getMessage());
        }
    }

    public static void displayStudents() {
        try {
            Connection connection = getConnection();
            Statement statement = connection.createStatement();

            ResultSet resultSet = statement.executeQuery("SELECT * FROM students");

            System.out.println();
            System.out.println("Student Records:");
            System.out.println("----------------------------");

            while (resultSet.next()) {
                System.out.println("ID: " + resultSet.getInt("id"));
                System.out.println("Name: " + resultSet.getString("name"));
                System.out.println("Age: " + resultSet.getInt("age"));
                System.out.println("Course: " + resultSet.getString("course"));
                System.out.println("----------------------------");
            }

            resultSet.close();
            statement.close();
            connection.close();
        } catch (Exception e) {
            System.out.println("Display error: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        createTable();

        int choice;

        do {
            System.out.println();
            System.out.println("Student DAO Menu");
            System.out.println("1. Insert Student");
            System.out.println("2. Update Student");
            System.out.println("3. Display Students");
            System.out.println("4. Exit");

            System.out.print("Enter your choice: ");
            choice = scanner.nextInt();
            scanner.nextLine();

            if (choice == 1) {
                System.out.print("Enter ID: ");
                int id = scanner.nextInt();
                scanner.nextLine();

                System.out.print("Enter Name: ");
                String name = scanner.nextLine();

                System.out.print("Enter Age: ");
                int age = scanner.nextInt();
                scanner.nextLine();

                System.out.print("Enter Course: ");
                String course = scanner.nextLine();

                insertStudent(id, name, age, course);
            } else if (choice == 2) {
                System.out.print("Enter ID to update: ");
                int id = scanner.nextInt();
                scanner.nextLine();

                System.out.print("Enter New Name: ");
                String name = scanner.nextLine();

                System.out.print("Enter New Age: ");
                int age = scanner.nextInt();
                scanner.nextLine();

                System.out.print("Enter New Course: ");
                String course = scanner.nextLine();

                updateStudent(id, name, age, course);
            } else if (choice == 3) {
                displayStudents();
            } else if (choice == 4) {
                System.out.println("Program ended.");
            } else {
                System.out.println("Invalid choice.");
            }
        } while (choice != 4);

        scanner.close();
    }
}