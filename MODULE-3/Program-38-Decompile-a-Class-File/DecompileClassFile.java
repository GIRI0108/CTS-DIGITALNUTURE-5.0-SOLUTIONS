public class DecompileClassFile {

    private String studentName;
    private int marks;

    public DecompileClassFile(String studentName, int marks) {
        this.studentName = studentName;
        this.marks = marks;
    }

    public void displayStudentDetails() {
        System.out.println("Student Name: " + studentName);
        System.out.println("Marks: " + marks);
    }

    public String checkResult() {
        if (marks >= 50) {
            return "Pass";
        } else {
            return "Fail";
        }
    }

    public static void main(String[] args) {
        DecompileClassFile student = new DecompileClassFile("Giri", 85);

        student.displayStudentDetails();

        String result = student.checkResult();

        System.out.println("Result: " + result);
        System.out.println();
        System.out.println("Now compile this program and decompile the .class file using JD-GUI or CFR.");
    }
}