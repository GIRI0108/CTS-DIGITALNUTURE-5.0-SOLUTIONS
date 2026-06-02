import java.util.Scanner;

public class SimpleCalculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter first number: ");
        double number1 = scanner.nextDouble();

        System.out.print("Enter second number: ");
        double number2 = scanner.nextDouble();

        System.out.println("Choose an operation:");
        System.out.println("1. Addition");
        System.out.println("2. Subtraction");
        System.out.println("3. Multiplication");
        System.out.println("4. Division");

        System.out.print("Enter your choice: ");
        int choice = scanner.nextInt();

        double result;

        if (choice == 1) {
            result = number1 + number2;
            System.out.println("Result: " + result);
        } else if (choice == 2) {
            result = number1 - number2;
            System.out.println("Result: " + result);
        } else if (choice == 3) {
            result = number1 * number2;
            System.out.println("Result: " + result);
        } else if (choice == 4) {
            if (number2 != 0) {
                result = number1 / number2;
                System.out.println("Result: " + result);
            } else {
                System.out.println("Division by zero is not allowed.");
            }
        } else {
            System.out.println("Invalid choice.");
        }

        scanner.close();
    }
}