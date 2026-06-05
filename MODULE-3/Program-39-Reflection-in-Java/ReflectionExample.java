import java.lang.reflect.Method;
import java.lang.reflect.Parameter;
import java.util.Scanner;

class StudentService {
    public void printWelcomeMessage() {
        System.out.println( "Welcome to Student Service");
    }

    public void showStudentDetails(String name, int age) {
        System.out.println("Student Name: " + name);
        System.out.println("Student Age: " + age);
    }

    public int calculateTotalMarks(int javaMark, int sqlMark) {
        return javaMark + sqlMark;
    }

    public String checkResult(int totalMarks) {
        if (totalMarks >= 100) {
            return "Pass";
        } else {
            return "Fail";
        }
    }
}

public class ReflectionExample {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        try {
            Class<?> classObject = Class.forName("StudentService");
            Object serviceObject = classObject.getDeclaredConstructor().newInstance();

            System.out.println("Class loaded at runtime: " + classObject.getName());
            System.out.println();

            System.out.println("Available methods in StudentService:");
            System.out.println("-----------------------------------");

            Method[] methods = classObject.getDeclaredMethods();

            for (Method method : methods) {
                System.out.println("Method Name: " + method.getName());
                System.out.println("Return Type: " + method.getReturnType().getSimpleName());

                Parameter[] parameters = method.getParameters();

                if (parameters.length == 0) {
                    System.out.println("Parameters: No parameters");
                } else {
                    System.out.println("Parameters:");
                    for (Parameter parameter : parameters) {
                        System.out.println("- " + parameter.getType().getSimpleName());
                    }
                }

                System.out.println("-----------------------------------");
            }

            System.out.print("Enter student name: ");
            String name = scanner.nextLine();

            System.out.print("Enter student age: ");
            int age = scanner.nextInt();

            System.out.print("Enter Java mark: ");
            int javaMark = scanner.nextInt();

            System.out.print("Enter SQL mark: ");
            int sqlMark = scanner.nextInt();

            System.out.println();
            System.out.println("Calling methods dynamically using Reflection:");
            System.out.println("-----------------------------------");

            Method welcomeMethod = classObject.getDeclaredMethod("printWelcomeMessage");
            welcomeMethod.invoke(serviceObject);

            Method detailsMethod = classObject.getDeclaredMethod("showStudentDetails", String.class, int.class);
            detailsMethod.invoke(serviceObject, name, age);

            Method totalMethod = classObject.getDeclaredMethod("calculateTotalMarks", int.class, int.class);
            Object totalMarks = totalMethod.invoke(serviceObject, javaMark, sqlMark);

            System.out.println("Total Marks: " + totalMarks);

            Method resultMethod = classObject.getDeclaredMethod("checkResult", int.class);
            Object result = resultMethod.invoke(serviceObject, totalMarks);

            System.out.println("Result: " + result);
        } catch (Exception e) {
            System.out.println("Reflection error: " + e.getMessage());
        }

        scanner.close();
    }
}