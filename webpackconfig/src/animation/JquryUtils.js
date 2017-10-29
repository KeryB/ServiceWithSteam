export function selector() {
    let value;
    $('.drop-menu').click(function () {
        $(this).attr('tabindex', 1).focus();
        $(this).toggleClass('active');
        $(this).find('.dropeddown').slideToggle(300);
    });

    $('.drop-menu').focusout(function () {
        $(this).removeClass('active');
        $(this).find('.dropeddown').slideUp(300);
    });
    $('.drop-menu .dropeddown li').click(function () {
        $(this).parents('.drop-menu').find('span').text($(this).text());
        $(this).parents('.drop-menu').find('input').attr('value', $(this).attr('id'));
    });

    $('.dropeddown li').click(function () {
        var input = '<strong>' + $(this).parents('.drop-menu').find('input').val() + '</strong>',
            msg = '<span class="msg">Hidden input value is ';
        value = $(this).parents('.drop-menu').find('input').val();
        $('.msg').html(msg + input + '</span>');
        return value;
    });
}