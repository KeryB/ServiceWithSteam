import modalConfirm from '../pages/forms/modal'

export function setSettings(errorMessage, errorStatus) {
    setSettingsOnFlashMessage(true, 'fadeOut', 800, false);
    toastr.error(errorMessage + '' + errorStatus, 'Ошибка');
}

export function successRegistration(text) {
    setSettingsOnFlashMessage(true, 'fadeOut', 300, false);
    toastr.success(text);
}

export function warningFlashMessage(text) {
    setSettingsOnFlashMessage(true, 'fadeOut', 300, false);
    toastr.warning(text)
}

function setSettingsOnFlashMessage(closeButton, closeMethod, newestOnTop, closeDuration) {
    toastr.options.closeButton = closeButton;
    toastr.options.closeMethod = closeMethod;
    toastr.options.closeDuration = newestOnTop;
    toastr.options.newestOnTop = closeDuration;
}

export function callConfirm(header, text, callback) {

    modalConfirm();

    // console.log(Modal.MODAL_CONFIRM_SHOW_EVENT);
    // $(document).trigger(Modal.MODAL_CONFIRM_SHOW_EVENT, {
    //     header,
    //     text,
    //     callback
    // });
}

export function toBase64(filesSelected, callback) {

    if (filesSelected.length > 0) {
        const fileToLoad = filesSelected[0];
        const fileReader = new FileReader();

        fileReader.onload = function (fileLoadedEvent) {
            const srcData = fileLoadedEvent.target.result; // <--- data: base64

            const newImage = document.createElement('img');
            newImage.src = srcData;
            callback(fileReader);
        };
        fileReader.readAsDataURL(fileToLoad);
    }
}
export function BBASe(file, callback) {
    const coolFile = {};
    const fileToLoad = file[0];
    console.log(fileToLoad);
    const reader = new FileReader();

    function readerOnload(e) {
        const base64 = btoa(e.target.result);
        coolFile.base64 = base64;
        callback(reader)
    }

    reader.onload = readerOnload;
    reader.readAsBinaryString(fileToLoad);

}
export function convertId(pathname) {
    return '/profile/' + pathname;
}
