package com.process.platform.utils.errors;

/**
 * Created by Кирилл on 01.04.2017.
 */
public class ErrorMessage {

    public static final String EMPTY_FIELD="Поле должно быть заполнено";
    public static final String EMAIL_NOT_UNIQUE="Такой пользователь уже есть";
    public static final String TOKEN_CANNOT_BE_REFRESHED_NOW="Токен не может быть сейчас обновлен";
    public static final String INVALID_TOKEN_HEADER = "Неправильный заголовок с токеном";
    public static final String TOKEN_EXPIRED = "Время токена вышло";
}
