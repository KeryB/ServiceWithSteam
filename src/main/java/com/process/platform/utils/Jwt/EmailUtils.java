package com.process.platform.utils.Jwt;

import com.process.platform.entity.user.User;
import com.process.platform.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Component
public class EmailUtils {

    private static final String SUBJECT="Подтверждение регистрации";
    private static final String APPLICATION_URL="http://localhost:8080";

    private final UserService userService;
    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String from;

    @Autowired
    @SuppressWarnings("SpringJavaAutowiringInspection")
    public EmailUtils(UserService userService, JavaMailSender mailSender) {
        this.userService = userService;
        this.mailSender = mailSender;
    }

    public void confirmRegistration(String token, User user) throws MessagingException {
        String recipientAddress = user.getEmail();
        String confirmationUrl = "/registration_confirm?token="+token;

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage,true);
        helper.setFrom(from);
        helper.setSubject(SUBJECT);
        helper.setTo(recipientAddress);
        helper.setText("<html>" +
                "<body>" +
                "<h3>Здравствйте,"+user.getEmail()+"</h3>"+
                "Пожалуйста перейдите по ссылке,чтобы завершить процесс регистрации"+
                "<a href="+APPLICATION_URL+confirmationUrl+">"+APPLICATION_URL+confirmationUrl+"</a>" +
                "</body>" +
                "</html>",true);

        mailSender.send(mimeMessage);
    }
}
