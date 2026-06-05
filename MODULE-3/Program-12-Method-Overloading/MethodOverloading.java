public class MethodOverloading {
    public static int add(int number1, int number2) {
        return number1 + number2;
    }

    public static double add(double number1, double number2) {
        return number1 + number2;
    }

    public static int add(int number1, int number2, int number3) {
        return number1 + number2 + number3;
    }

    public static void main(String[] args) {
        int intSum = add(10, 20);
        double doubleSum = add(10.5, 20.5);
        int threeNumberSum = add(10, 20, 30);

        System.out.println("Sum of two integers: " + intSum);
        System.out.println("Sum of two doubles: " + doubleSum);
        System.out.println("Sum of three integers: " + threeNumberSum);
    }
}