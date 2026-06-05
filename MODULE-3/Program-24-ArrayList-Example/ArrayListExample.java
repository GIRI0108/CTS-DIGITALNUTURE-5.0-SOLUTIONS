import java.util.ArrayList;
import java.util.Scanner;

public class ArrayListExample {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        ArrayList<String> studentNames = new ArrayList<>();

        System.out.print("Enter number of students: ");
        int count = scanner.nextInt();
        scanner.nextLine();

        for (int i = 0; i < count; i++) {
            System.out.print("Enter student name " + (i + 1) + ": ");
            String name = scanner.nextLine();
            studentNames.add(name);
        }

        System.out.println("Student Names:");

        for (String name : studentNames) {
            System.out.println(name);
        }

        scanner.close();
    }
}