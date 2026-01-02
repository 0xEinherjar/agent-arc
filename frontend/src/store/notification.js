import { defineStore } from "pinia";
import { ref } from "vue";

export const useNotificationStore = defineStore("notification", () => {
    const notification = ref({
        text: "",
        isError: false
    });

    function setNotification(_notification) {
        notification.value.text = _notification.text;
        notification.value.isError = _notification.isError;
        setTimeout(() => {
            notification.value.text = "";
        }, 8000);
    }
    
    function removeNotification() {
        notification.value.text = "";
    }

    return { notification, setNotification, removeNotification };
});