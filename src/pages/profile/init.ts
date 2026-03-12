import {navigate} from "../../services/router/router";

export function initProfilePage():void {
    const profilePage = document.querySelector('.profile') as HTMLElement | null;

    if (!profilePage) {
        return;
    }

    const logout = profilePage.querySelector('.profile__logout')

    if (!logout) {
        return;
    }

    logout.addEventListener('click', () => {
        navigate('/')
    })

}