import {Search} from "../../components/search/search";
import {PostMessage} from "../../components/post-message/post-message";

export function initChatsPage() {
    const chatsPage = document.querySelector('.chats') as HTMLElement | null

    if (!chatsPage) {
        return
    }

    const messageRoot = chatsPage.querySelector('[data-post-message="message"]') as HTMLElement | null;
    const searchRoot = chatsPage.querySelector('[data-search="chats"]') as HTMLElement;

    if (!searchRoot || !messageRoot) return;

    new Search({
        root: searchRoot,
        onSearch: (value) => {
            console.log(value);
        }
    });
    new PostMessage({
        root: messageRoot,
        onSubmit: (value) => {
            console.log(value);
        }
    });
}
