export function render(content:string) {
    const app = document.querySelector('#app')

    if (!app) {
        throw new Error('id app не найден')
    }

    app.innerHTML = content
}