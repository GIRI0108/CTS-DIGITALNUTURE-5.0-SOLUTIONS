import java.util.Scanner;

public class PalindromeChecker {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter a string: ");
        String text = scanner.nextLine();

        String cleanText = text.replaceAll("[^A-Za-z0-9]", "").toLowerCase();

        String reversed = "";

        for (int i = cleanText.length() - 1; i >= 0; i--) {
            reversed = reversed + cleanText.charAt(i);
        }

        if (cleanText.equals(reversed)) {
            System.out.println("The given string is a palindrome.");
        } else {
            System.out.println("The given string is not a palindrome.");
        }

        scanner.close();
    }
}