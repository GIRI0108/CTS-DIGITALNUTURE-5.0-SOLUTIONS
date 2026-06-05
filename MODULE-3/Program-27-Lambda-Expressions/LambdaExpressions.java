import java.util.ArrayList;
import java.util.List;

public class LambdaExpressions {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>();

        names.add("Ravi");
        names.add("Arun");
        names.add("Kiran");
        names.add("Bala");

        System.out.println("Original Names:");
        for (String name : names) {
            System.out.println(name);
        }

        names.sort((name1, name2) -> {
            return name1.compareTo(name2);
        });

        System.out.println();
        System.out.println("Names after sorting using Lambda Expression:");
        for (String name : names) {
            System.out.println(name);
        }
    }
}