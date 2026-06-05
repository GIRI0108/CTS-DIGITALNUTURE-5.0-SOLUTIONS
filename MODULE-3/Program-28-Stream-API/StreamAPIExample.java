import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class StreamAPIExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(12, 7, 18, 5, 20, 33, 42, 9, 60);

        System.out.println("Original Number List:");
        System.out.println(numbers);

        System.out.println();
        System.out.println("Filtering even numbers using Stream API...");

        List<Integer> evenNumbers = numbers.stream()
                .filter(number -> {
                    System.out.println("Checking number: " + number);
                    return number % 2 == 0;
                })
                .collect(Collectors.toList());

        System.out.println();
        System.out.println("Even Numbers Collected from Stream:");
        System.out.println(evenNumbers);
    }
}