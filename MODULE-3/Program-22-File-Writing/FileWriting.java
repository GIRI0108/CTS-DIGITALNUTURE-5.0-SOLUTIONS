import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

public class FileWriting {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        try {
            System.out.print("Enter text to write into file: ");
            String text = scanner.nextLine();

            FileWriter writer = new FileWriter("output.txt", true);
            writer.write(text + System.lineSeparator());
            writer.close();

            System.out.println("Data has been added to output.txt successfully.");
        } catch (IOException e) {
            System.out.println("An error occurred while writing to the file.");
        }

        scanner.close();
    }
}