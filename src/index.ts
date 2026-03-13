import "./styles/global.scss";

const app = document.querySelector("#app");

if (!app) {
    throw new Error('id app не найден');
}

app.innerHTML = "<h1>APP WORKS</h1>";