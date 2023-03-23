window.onload = () => {
    let theme = localStorage.getItem('theme');
    if (theme) {
        setTheme(theme);
    }
    let slider = document.querySelector("#themes");
    slider.value = theme[theme.length - 1];
}


function setTheme(themeName) {
    localStorage.setItem("theme", themeName);
    document.documentElement.className = themeName;
}

function toggleTheme() {
    setTheme(localStorage.getItem('theme'));
}

 function changeTheme(slider) {
    let id = slider.value;
    let theme = 'theme' + id;
    setTheme(theme);
 }