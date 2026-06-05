import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

class Student {
    String name;
    int age;
    int javaScore;
    int sqlScore;

    public Student(String name, int age, int javaScore, int sqlScore) {
        this.name = name;
        this.age = age;
        this.javaScore = javaScore;
        this.sqlScore = sqlScore;
    }
}

class StudentResultTask implements Callable<String> {
    private Student student;

    public StudentResultTask(Student student) {
        this.student = student;
    }

    @Override
    public String call() {
        int total = student.javaScore + student.sqlScore;
        double average = total / 2.0;

        String result;

        if (student.javaScore >= 35 && student.sqlScore >= 35) {
            result = "Pass";
        } else {
            result = "Fail";
        }

        return "Name: " + student.name
                + "\nAge: " + student.age
                + "\nJava Score: " + student.javaScore
                + "\nSQL Score: " + student.sqlScore
                + "\nTotal Marks: " + total
                + "\nAverage: " + average
                + "\nResult: " + result
                + "\n----------------------------";
    }
}

public class ExecutorServiceCallable {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Student> students = new ArrayList<>();

        int choice;

        do {
            System.out.println();
            System.out.println("Student Result Processing System");
            System.out.println("--------------------------------");
            System.out.println("1. Insert Student Data");
            System.out.println("2. Display Results ");
            System.out.println("3. Exit");
            System.out.print("Enter your choice: ");

            choice = scanner.nextInt();
            scanner.nextLine();

            if (choice == 1) {
                System.out.println();
                System.out.println("Insert Student Data");
                System.out.println("-------------------");

                System.out.print("Enter student name: ");
                String name = scanner.nextLine();

                System.out.print("Enter student age: ");
                int age = scanner.nextInt();

                System.out.print("Enter Java score: ");
                int javaScore = scanner.nextInt();

                System.out.print("Enter SQL score: ");
                int sqlScore = scanner.nextInt();
                scanner.nextLine();

                Student student = new Student(name, age, javaScore, sqlScore);
                students.add(student);

                System.out.println("Student data inserted successfully.");
            } else if (choice == 2) {
                System.out.println();
                System.out.println("Display Student Results");
                System.out.println("-----------------------");

                if (students.isEmpty()) {
                    System.out.println("No student data found. Please insert student data first.");
                } else {
                    try {
                        ExecutorService executorService = Executors.newFixedThreadPool(3);

                        List<Future<String>> futureResults = new ArrayList<>();

                        for (Student student : students) {
                            StudentResultTask task = new StudentResultTask(student);

                            Future<String> future = executorService.submit(task);

                            futureResults.add(future);
                        }

                        System.out.println("Results processed using multiple Callable tasks");
                        System.out.println("Fixed Thread Pool Size: 3");
                        System.out.println("================================================");

                        for (Future<String> future : futureResults) {
                            String result = future.get();
                            System.out.println(result);
                        }

                        executorService.shutdown();

                        System.out.println("All Callable tasks completed successfully.");
                    } catch (Exception e) {
                        System.out.println("Error while processing results: " + e.getMessage());
                    }
                }
            } else if (choice == 3) {
                System.out.println("Program ended.");
            } else {
                System.out.println("Invalid choice. Please enter 1, 2, or 3.");
            }

        } while (choice != 3);

        scanner.close();
    }
}