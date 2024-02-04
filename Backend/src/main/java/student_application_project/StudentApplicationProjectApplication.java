package student_application_project;

// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
// import org.springframework.boot.context.event.ApplicationReadyEvent;
// import org.springframework.context.event.EventListener;

@SpringBootApplication
public class StudentApplicationProjectApplication {

	// @Autowired
	// private EmailSenderService senderService;

	public static void main(String[] args) {
		SpringApplication.run(StudentApplicationProjectApplication.class, args);
	}


	// @EventListener(ApplicationReadyEvent.class)
	// public void sendEmail() {
	// 	senderService.sendEmail("202001162@daiict.ac.in", "Spring Boot Email", "This is a test email");
	// }

}
