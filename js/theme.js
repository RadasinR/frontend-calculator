window.onload = () => {
    let theme = localStorage.getItem('theme');
    let slider = document.querySelector("#themes");
    if (theme) {
        setTheme(theme);
        slider.value = theme[theme.length - 1]; /* extract the theme number in theme name (theme1 => 1) */
    } else {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme("theme1")
            slider.value = 1;
        }
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            setTheme("theme2")
            slider.value = 2
        }
    }
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