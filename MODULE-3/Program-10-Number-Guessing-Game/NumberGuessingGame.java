import java.util.Random;
import java.util.Scanner;

public class NumberGuessingGame {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Random random = new Random();

        int randomNumber = random.nextInt(100) + 1;
        int guess = 0;

        System.out.println("Guess the number between 1 and 100.");

        while (guess != randomNumber) {
            System.out.print("Enter your guess: ");
            guess = scanner.nextInt();

            if (guess > randomNumber) {
                System.out.println("Too high. Try again.");
            } else if (guess < randomNumber) {
                System.out.println("Too low. Try again.");
            } else {
                System.out.println("Correct! You guessed the number.");
            }
        }

        scanner.close();
    }
}