let sidebarHeight = document.querySelector('#sidebar').style.height;
let mainHeight = document.querySelector('#main').style.height;

if (sidebarHeight > mainHeight) {
    document.querySelector('#main').style.height = sidebarHeight;
} else {
    document.querySelector('#sidebar').style.height = mainHeight;
}