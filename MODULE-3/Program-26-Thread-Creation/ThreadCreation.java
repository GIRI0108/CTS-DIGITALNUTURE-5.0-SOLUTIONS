class MessageThread extends Thread {
    private String message;

    public MessageThread(String message) {
        this.message = message;
    }

    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println(message + " - " + i);
        }
    }
}

public class ThreadCreation {
    public static void main(String[] args) {
        MessageThread thread1 = new MessageThread("Thread One");
        MessageThread thread2 = new MessageThread("Thread Two");

        thread1.start();
        thread2.start();
    }
}