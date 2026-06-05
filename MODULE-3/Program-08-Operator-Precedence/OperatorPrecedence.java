public class OperatorPrecedence {
    public static void main(String[] args) {
        int result1 = 10 + 5 * 2;
        int result2 = (10 + 5) * 2;
        int result3 = 100 / 5 + 3 * 4;
        int result4 = 20 - 4 + 6 * 2;

        System.out.println("Result of 10 + 5 * 2 = " + result1);
        System.out.println("Multiplication is done first, then addition.");

        System.out.println("Result of (10 + 5) * 2 = " + result2);
        System.out.println("Parentheses are done first.");

        System.out.println("Result of 100 / 5 + 3 * 4 = " + result3);
        System.out.println("Division and multiplication are done before addition.");

        System.out.println("Result of 20 - 4 + 6 * 2 = " + result4);
        System.out.println("Multiplication is done first, then subtraction and addition.");
    }
}