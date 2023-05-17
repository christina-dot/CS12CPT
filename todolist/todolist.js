// Grab Elements
let form = document.querySelector(".form");
let lists = document.querySelector(".lists");
let input = document.querySelector(".input");

// Empty Array
let todoArr = [];

// Form Code
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let id = Math.random();
    let todo = new Todo(id, input.value);
    
    if(!todoArr.some(item => item.id === id)){
        todoArr = [...todoArr, todo];
        UI.displayData();
    }
    
    UI.clearInput();
    UI.removeTodo();
});

// Classes & Objects
class Todo {
    constructor(id, todo){
        this.id = id;
        this.todo = todo;
    }
}

class UI {
    static displayData(){
        let displayData = todoArr.map((item) => {
            return `
            <div class="todo">
            <p>${item.todo}</p>
            <span class="remove">❌</span>
            </div>
        `
        });

        lists.innerHTML = (displayData).join(" ");
    }

    static clearInput(){
        input.value = "";
    }

    static removeTodo(){
        lists.addEventListener("click", (e) => {
            if(e.target.classList.contains("remove")){
                e.target.parentElement.remove();
            }
        });
    }
}





