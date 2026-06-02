import java.util.Scanner;

public class JavapBytecode {

    public int addNumbers(int number1, int number2) {
        return number1 + number2;
    }

    public int multiplyNumbers(int number1, int number2) {
        return number1 * number2;
    }

    public void displayResult(String operation, int result) {
        System.out.println(operation + " Result: " + result);
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        JavapBytecode object = new JavapBytecode();

        System.out.println("Javap Bytecode Inspection Program");
        System.out.println("This program performs operations using methods.");
        System.out.println("After compiling, use javap -c JavapBytecode to inspect bytecode.");
        System.out.println();

        System.out.print("Enter first number: ");
        int number1 = scanner.nextInt();

        System.out.print("Enter second number: ");
        int number2 = scanner.nextInt();

        System.out.println();
        System.out.println("Choose operation:");
        System.out.println("1. Add");
        System.out.println("2. Multiply");

        System.out.print("Enter your choice: ");
        int choice = scanner.nextInt();

        if (choice == 1) {
            int result = object.addNumbers(number1, number2);
            object.displayResult("Addition", result);
        } else if (choice == 2) {
            int result = object.multiplyNumbers(number1, number2);
            object.displayResult("Multiplication", result);
        } else {
            System.out.println("Invalid choice.");
        }

        scanner.close();
    }
}