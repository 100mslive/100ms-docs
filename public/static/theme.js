const theme = localStorage.getItem('theme') || 'dark';
const docHtml = document.documentElement.dataset;
docHtml.theme = theme;
