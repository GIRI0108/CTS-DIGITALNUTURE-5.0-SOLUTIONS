public class TypeCastingExample {
    public static void main(String[] args) {
        double doubleValue = 45.78;
        int intValue = (int) doubleValue;

        int number = 25;
        double convertedDouble = (double) number;

        System.out.println("Original double value: " + doubleValue);
        System.out.println("Double converted to int: " + intValue);

        System.out.println("Original int value: " + number);
        System.out.println("Int converted to double: " + convertedDouble);
    }
}