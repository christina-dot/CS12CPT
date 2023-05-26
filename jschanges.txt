//This code starts a function that takes the value inputed in the "Enter a Task" and defines it as "input"
function addTodo() {
    const input = document.getElementById("todoInput");
    const todoText = input.value.trim();
    // trim takes out any spaces or any uncessary information that isn't directly related ot the item

    // if the item inputed is not equal to an empty string meaning a vlue has been inputted than it will create a list-item out of the inputted value and label it with a class name of "todo-item"
    if (todoText !== "") {
        const todoItem = document.createElement("li");
        todoItem.className = "todo-item";
// This is an span element which sets the inner text to the todoText variable
        const todoTextSpan = document.createElement("span");
        todoTextSpan.className = "todo-text";
        todoTextSpan.innerText = todoText;

// This element creates a button and I have used the unicode to identify the object and when the button is clicked it will show it as completed
        const completeButton = document.createElement("button");
        completeButton.className = "button";
        completeButton.innerText = "\u2714";
        completeButton.addEventListener("click", () => {
            todoTextSpan.classList.toggle("completed");
        });

//This creates a button to delete the todoItem by clicking the unicode for the "X"
        const deleteButton = document.createElement("button");
        deleteButton.className = "button delete";
        deleteButton.innerText = "\u2716";
        deleteButton.addEventListener("click", () => {
            todoList.removeChild(todoItem);
        });

// Create a div for both buttons
        const todoButtons = document.createElement("div");
        todoButtons.appendChild(completeButton);
        todoButtons.appendChild(deleteButton);

// appended into todoItems
        todoItem.appendChild(todoTextSpan);
        todoItem.appendChild(todoButtons);

        const todoList = document.getElementById("todoList");
        todoList.appendChild(todoItem);
        
// Value of the input is set to nothing so the user can type it in again
        input.value = "";
    }
}