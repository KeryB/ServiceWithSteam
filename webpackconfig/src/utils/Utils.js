export function setSettings(errorMessage,errorStatus) {
    toastr.options.closeButton = true;
    toastr.options.closeMethod = 'fadeOut';
    toastr.options.closeDuration = 800;
    toastr.options.newestOnTop = false;
    toastr.error(errorMessage + '' + errorStatus,'Ошибка');
}

export function successRegistration(text) {
    toastr.options.closeButton = true;
    toastr.options.closeMethod = 'fadeOut';
    toastr.options.closeDuration = 300;
    toastr.options.newestOnTop = false;
    toastr.success(text);
}
