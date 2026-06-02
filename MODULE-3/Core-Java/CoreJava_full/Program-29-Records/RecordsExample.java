import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class RecordsExample {

    record Person(String name, int age) {
    }

    public static void main(String[] args) {
        List<Person> people = new ArrayList<>();

        people.add(new Person("Arun", 22));
        people.add(new Person("Bala", 17));
        people.add(new Person("Kiran", 25));
        people.add(new Person("Divya", 16));
        people.add(new Person("Meena", 20));

        System.out.println("All Person Records:");
        for (Person person : people) {
            System.out.println(person);
        }

        System.out.println();
        System.out.println("Filtering persons whose age is 18 or above using Stream API...");

        List<Person> adults = people.stream()
                .filter(person -> person.age() >= 18)
                .collect(Collectors.toList());

        System.out.println();
        System.out.println("Adult Persons:");
        for (Person person : adults) {
            System.out.println("Name: " + person.name() + ", Age: " + person.age());
        }
    }
}