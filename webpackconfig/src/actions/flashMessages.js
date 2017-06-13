import {ADD_FLASH_MESSAGE , DELETE_FLASH_MESSAGE} from '../const/ActionTypes'

export function addFlashMessage(message) {
    return{
        type: ADD_FLASH_MESSAGE,
        message
    }
}