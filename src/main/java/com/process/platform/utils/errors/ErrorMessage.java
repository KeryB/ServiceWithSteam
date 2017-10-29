package com.process.platform.utils.errors;


public class ErrorMessage {

    public static final String EMPTY_FIELD="Поле должно быть заполнено";
    public static final String EMAIL_NOT_UNIQUE="Пользователь с таким E-mail уже зарегистрирован.";
    public static final String TOKEN_CANNOT_BE_REFRESHED_NOW="Токен не может быть сейчас обновлен";
    public static final String INVALID_TOKEN_HEADER = "Неправильный заголовок с токеном";
    public static final String TOKEN_EXPIRED = "Время токена вышло";
    public static final String BAD_REQUEST = "Bad Request";
    public static final String EMAIL_OR_PASSWORD_NOT_CORRECT = "Е-mail или пароль указаны неверно";
    public static final String NO_PRIVILEGES = "У вас нет привелегий, чтобы сделать это";
}
