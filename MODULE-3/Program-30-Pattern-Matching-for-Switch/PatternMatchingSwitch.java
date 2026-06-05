import java.util.Scanner;

public class PatternMatchingSwitch {

    public static void checkObjectType(Object value) {
        String result = switch (value) {
            case Integer number -> "Integer value received: " + number;
            case String text -> "String value received: " + text;
            case Double decimal -> "Double value received: " + decimal;
            case Boolean status -> "Boolean value received: " + status;
            case Character letter -> "Character value received: " + letter;
            case null -> "Null value received";
            default -> "Other type received: " + value;
        };

        System.out.println(result);
    }

    public static void displaySupportedTypes() {
        System.out.println("Supported Object Data Types:");
        System.out.println("1. Integer  - Example: 100");
        System.out.println("2. Double   - Example: 45.75");
        System.out.println("3. Boolean  - Example: true or false");
        System.out.println("4. Character - Example: A");
        System.out.println("5. String   - Example: Hello Java");
        System.out.println("6. Null     - Example: null");
        System.out.println();
    }

    public static Object convertInputToObject(String input) {
        if (input.equalsIgnoreCase("null")) {
            return null;
        }

        if (input.equalsIgnoreCase("true") || input.equalsIgnoreCase("false")) {
            return Boolean.parseBoolean(input);
        }

        try {
            return Integer.parseInt(input);
        } catch (NumberFormatException e) {
        }

        try {
            return Double.parseDouble(input);
        } catch (NumberFormatException e) {
        }

        if (input.length() == 1) {
            return input.charAt(0);
        }

        return input;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        displaySupportedTypes();

        System.out.print("Enter any value from the above types: ");
        String userInput = scanner.nextLine();

        Object value = convertInputToObject(userInput);

        System.out.println();
        System.out.println("Detected Result:");
        checkObjectType(value);

        scanner.close();
    }
}