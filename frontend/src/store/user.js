import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
    const user = ref(JSON.parse(localStorage.getItem("user")));

    function setUser(_user) {
        user.value = _user;
        localStorage.setItem("user", JSON.stringify(_user));
    }
    
    function removeUser() {
        user.value = "";
        localStorage.removeItem("user");
    }

    return { user, setUser, removeUser };
});