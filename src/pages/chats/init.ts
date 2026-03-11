import {Search} from "../../blocks/search/search";

export function initChatsPage() {
    const chatsPage = document.querySelector('.chats') as HTMLElement | null

    if (!chatsPage) {
        return
    }

    const searchRoot = document.querySelector('[data-search="chats"]') as HTMLElement;

    if (!searchRoot) return;

    new Search({
        root: searchRoot,
        onSearch: (value) => {
            console.log(value);
        }
    });
}