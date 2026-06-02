import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.Scanner;

public class ChatClient {
    public static void main(String[] args) {
        try {
            Socket socket = new Socket("localhost", 5000);
            System.out.println("Connected to server successfully.");

            BufferedReader input = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            PrintWriter output = new PrintWriter(socket.getOutputStream(), true);
            Scanner scanner = new Scanner(System.in);

            String clientMessage;
            String serverMessage;

            while (true) {
                System.out.print("Client: ");
                clientMessage = scanner.nextLine();

                output.println(clientMessage);

                if (clientMessage.equalsIgnoreCase("bye")) {
                    System.out.println("Client ended the chat.");
                    break;
                }

                serverMessage = input.readLine();

                if (serverMessage == null) {
                    break;
                }

                System.out.println("Server: " + serverMessage);

                if (serverMessage.equalsIgnoreCase("bye")) {
                    System.out.println("Server ended the chat.");
                    break;
                }
            }

            scanner.close();
            input.close();
            output.close();
            socket.close();

            System.out.println("Client closed.");
        } catch (Exception e) {
            System.out.println("Client error: " + e.getMessage());
        }
    }
}