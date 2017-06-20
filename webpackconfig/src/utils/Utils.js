import Modal from '../pages/forms/Modal';
import {OverlayTrigger, Tooltip} from "react-bootstrap";

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

export function callConfirm(header, text, callback) {

    console.log(Modal.MODAL_CONFIRM_SHOW_EVENT);
    $(document).trigger(Modal.MODAL_CONFIRM_SHOW_EVENT, {
        header,
        text,
        callback
    });
}

export function toBase64(filesSelected,callback) {

    if (filesSelected.length > 0) {
        const fileToLoad = filesSelected[0];
        const fileReader = new FileReader();

        fileReader.onload = function(fileLoadedEvent) {
            const srcData = fileLoadedEvent.target.result; // <--- data: base64

            const newImage = document.createElement('img');
            newImage.src = srcData;
            callback(fileReader);
        };
        fileReader.readAsDataURL(fileToLoad);
    }
}
export function BBASe(file, callback){
    const coolFile = {};
    const fileToLoad = file[0];
    console.log(fileToLoad);
    const reader = new FileReader();
    function readerOnload(e){
        const base64 = btoa(e.target.result);
        coolFile.base64 = base64;
        callback(reader)
    }

    reader.onload = readerOnload;
    reader.readAsBinaryString(fileToLoad);

}
