import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Scanner;

public class TransactionHandlingJDBC {
    static String url = "jdbc:sqlite:bank.db";

    public static Connection getConnection() throws Exception {
        Class.forName("org.sqlite.JDBC");
        return DriverManager.getConnection(url);
    }

    public static void createTableAndData() {
        try {
            Connection connection = getConnection();
            Statement statement = connection.createStatement();

            statement.executeUpdate("CREATE TABLE IF NOT EXISTS accounts (account_id INTEGER PRIMARY KEY, name TEXT, balance REAL)");

            ResultSet resultSet = statement.executeQuery("SELECT COUNT(*) FROM accounts");
            int count = 0;

            if (resultSet.next()) {
                count = resultSet.getInt(1);
            }

            if (count == 0) {
                statement.executeUpdate("INSERT INTO accounts VALUES (1, 'Arun', 5000)");
                statement.executeUpdate("INSERT INTO accounts VALUES (2, 'Bala', 3000)");
            }

            resultSet.close();
            statement.close();
            connection.close();
        } catch (Exception e) {
            System.out.println("Setup error: " + e.getMessage());
        }
    }

    public static void displayAccounts() {
        try {
            Connection connection = getConnection();
            Statement statement = connection.createStatement();

            ResultSet resultSet = statement.executeQuery("SELECT * FROM accounts");

            System.out.println();
            System.out.println("Account Details:");
            System.out.println("----------------------------");

            while (resultSet.next()) {
                System.out.println("Account ID: " + resultSet.getInt("account_id"));
                System.out.println("Name: " + resultSet.getString("name"));
                System.out.println("Balance: " + resultSet.getDouble("balance"));
                System.out.println("----------------------------");
            }

            resultSet.close();
            statement.close();
            connection.close();
        } catch (Exception e) {
            System.out.println("Display error: " + e.getMessage());
        }
    }

    public static void transferMoney(int fromAccount, int toAccount, double amount) {
        Connection connection = null;

        try {
            connection = getConnection();
            connection.setAutoCommit(false);

            String debitQuery = "UPDATE accounts SET balance = balance - ? WHERE account_id = ? AND balance >= ?";
            PreparedStatement debitStatement = connection.prepareStatement(debitQuery);
            debitStatement.setDouble(1, amount);
            debitStatement.setInt(2, fromAccount);
            debitStatement.setDouble(3, amount);

            int debitRows = debitStatement.executeUpdate();

            String creditQuery = "UPDATE accounts SET balance = balance + ? WHERE account_id = ?";
            PreparedStatement creditStatement = connection.prepareStatement(creditQuery);
            creditStatement.setDouble(1, amount);
            creditStatement.setInt(2, toAccount);

            int creditRows = creditStatement.executeUpdate();

            if (debitRows == 1 && creditRows == 1) {
                connection.commit();
                System.out.println("Transaction successful. Money transferred.");
            } else {
                connection.rollback();
                System.out.println("Transaction failed. Rollback completed.");
            }

            debitStatement.close();
            creditStatement.close();
            connection.close();
        } catch (Exception e) {
            try {
                if (connection != null) {
                    connection.rollback();
                }
            } catch (Exception rollbackError) {
                System.out.println("Rollback error: " + rollbackError.getMessage());
            }

            System.out.println("Transaction error: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        createTableAndData();

        displayAccounts();

        System.out.print("Enter sender account ID: ");
        int fromAccount = scanner.nextInt();

        System.out.print("Enter receiver account ID: ");
        int toAccount = scanner.nextInt();

        System.out.print("Enter amount to transfer: ");
        double amount = scanner.nextDouble();

        transferMoney(fromAccount, toAccount, amount);

        displayAccounts();

        scanner.close();
    }
}