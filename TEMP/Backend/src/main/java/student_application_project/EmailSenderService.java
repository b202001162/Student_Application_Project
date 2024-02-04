package student_application_project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String toEmail, String Subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("karanhpadhiyar12345@gmail.com");
        message.setTo(toEmail);
        message.setSubject(Subject);
        message.setText(body);

        mailSender.send(message);

        System.out.println("Mail Sent Successfully...");
    }

    public String generateOTP() {
        int randomPin = (int) (Math.random() * 9000) + 1000;
        String otp = String.valueOf(randomPin);
        return otp;
    }


}