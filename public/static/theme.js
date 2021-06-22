const theme = localStorage.getItem('theme') || 'dark';
const docHtml = document.documentElement.dataset;
console.log(theme);
docHtml.theme = theme;
