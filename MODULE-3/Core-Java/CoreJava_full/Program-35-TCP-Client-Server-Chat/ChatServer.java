import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Scanner;

public class ChatServer {
    public static void main(String[] args) {
        try {
            ServerSocket serverSocket = new ServerSocket(5000);
            System.out.println("Server started...");
            System.out.println("Waiting for client connection...");

            Socket socket = serverSocket.accept();
            System.out.println("Client connected successfully.");

            BufferedReader input = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            PrintWriter output = new PrintWriter(socket.getOutputStream(), true);
            Scanner scanner = new Scanner(System.in);

            String clientMessage;
            String serverMessage;

            while (true) {
                clientMessage = input.readLine();

                if (clientMessage == null) {
                    break;
                }

                System.out.println("Client: " + clientMessage);

                if (clientMessage.equalsIgnoreCase("bye")) {
                    System.out.println("Client ended the chat.");
                    break;
                }

                System.out.print("Server: ");
                serverMessage = scanner.nextLine();

                output.println(serverMessage);

                if (serverMessage.equalsIgnoreCase("bye")) {
                    System.out.println("Server ended the chat.");
                    break;
                }
            }

            scanner.close();
            input.close();
            output.close();
            socket.close();
            serverSocket.close();

            System.out.println("Server closed.");
        } catch (Exception e) {
            System.out.println("Server error: " + e.getMessage());
        }
    }
}