public class VirtualThreadsExample {
    public static void main(String[] args) throws InterruptedException {
        int virtualThreadCount = 100000;
        int traditionalThreadCount = 1000;

        System.out.println("Virtual Threads Demo");
        System.out.println("--------------------");
        System.out.println("Launching " + virtualThreadCount + " virtual threads.");
        System.out.println("Each virtual thread prints one message.");
        System.out.println();

        long virtualStartTime = System.currentTimeMillis();

        Thread[] virtualThreads = new Thread[virtualThreadCount];

        for (int i = 0; i < virtualThreadCount; i++) {
            int threadNumber = i + 1;

            virtualThreads[i] = Thread.startVirtualThread(() -> {
                System.out.println("Virtual thread message from task number: " + threadNumber);
            });
        }

        for (int i = 0; i < virtualThreadCount; i++) {
            virtualThreads[i].join();
        }

        long virtualEndTime = System.currentTimeMillis();

        System.out.println();
        System.out.println("All " + virtualThreadCount + " virtual threads completed.");
        System.out.println("Time taken by virtual threads: " + (virtualEndTime - virtualStartTime) + " ms");

        System.out.println();
        System.out.println("Traditional Thread Comparison");
        System.out.println("-----------------------------");
        System.out.println("Launching " + traditionalThreadCount + " traditional threads for comparison.");

        long traditionalStartTime = System.currentTimeMillis();

        Thread[] traditionalThreads = new Thread[traditionalThreadCount];

        for (int i = 0; i < traditionalThreadCount; i++) {
            int threadNumber = i + 1;

            traditionalThreads[i] = new Thread(() -> {
                System.out.println("Traditional thread message from task number: " + threadNumber);
            });

            traditionalThreads[i].start();
        }

        for (int i = 0; i < traditionalThreadCount; i++) {
            traditionalThreads[i].join();
        }

        long traditionalEndTime = System.currentTimeMillis();

        System.out.println();
        System.out.println("All " + traditionalThreadCount + " traditional threads completed.");
        System.out.println("Time taken by traditional threads: " + (traditionalEndTime - traditionalStartTime) + " ms");

        System.out.println();
        System.out.println("Virtual threads are lightweight and useful for running many concurrent tasks.");
    }
}