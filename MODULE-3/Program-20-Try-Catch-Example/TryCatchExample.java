import java.util.Scanner;

public class TryCatchExample {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        try {
            System.out.print("Enter first integer: ");
            int number1 = scanner.nextInt();

            System.out.print("Enter second integer: ");
            int number2 = scanner.nextInt();

            int result = number1 / number2;

            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero.");
        }

        scanner.close();
    }
}