import './styles/global.scss';

const app = document.querySelector('#app');

if (!app) {
    throw new Error('app not found');
}

app.innerHTML = '<h1 style="font-size: 48px; color: red;">TEST</h1>';