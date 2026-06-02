import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Scanner;

public class HTTPClientAPI {
    public static String getValue(String json, String key) {
        String searchKey = "\"" + key + "\":";

        int startIndex = json.indexOf(searchKey);

        if (startIndex == -1) {
            return "Not available";
        }

        startIndex = startIndex + searchKey.length();

        if (json.charAt(startIndex) == '"') {
            startIndex++;

            int endIndex = json.indexOf("\"", startIndex);

            return json.substring(startIndex, endIndex);
        } else {
            int endIndex = json.indexOf(",", startIndex);

            if (endIndex == -1) {
                endIndex = json.indexOf("}", startIndex);
            }

            return json.substring(startIndex, endIndex);
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        try {
            System.out.println("HTTP Client API Example");
            System.out.println("This program fetches user details from GitHub API.");
            System.out.println();

            System.out.print("Enter GitHub username: ");
            String username = scanner.nextLine();

            String apiUrl = "https://api.github.com/users/" + username;

            HttpClient client = HttpClient.newHttpClient();

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(apiUrl))
                    .GET()
                    .build();

            System.out.println();
            System.out.println("Sending GET request to:");
            System.out.println(apiUrl);

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            String responseBody = response.body();

            System.out.println();
            System.out.println("Response Status Code: " + response.statusCode());

            if (response.statusCode() == 200) {
                System.out.println();
                System.out.println("GitHub User Details:");
                System.out.println("----------------------------");
                System.out.println("Username: " + getValue(responseBody, "login"));
                System.out.println("Name: " + getValue(responseBody, "name"));
                System.out.println("Bio: " + getValue(responseBody, "bio"));
                System.out.println("Public Repositories: " + getValue(responseBody, "public_repos"));
                System.out.println("Followers: " + getValue(responseBody, "followers"));
                System.out.println("Following: " + getValue(responseBody, "following"));
                System.out.println("Profile URL: " + getValue(responseBody, "html_url"));
                System.out.println("----------------------------");
            } else {
                System.out.println("User not found or request failed.");
            }

            System.out.println();
            System.out.println("Raw JSON Response:");
            System.out.println(responseBody);

        } catch (Exception e) {
            System.out.println("Error while sending HTTP request: " + e.getMessage());
        }

        scanner.close();
    }
}