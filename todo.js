(function () {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    const todocontainer = document.getElementById("todo");
    const todoinput = document.createElement("input");
    todoinput.type = "text";
    todoinput.placeholder = "Enter task...";

    const addbtn = document.createElement("button");
    addbtn.textContent = "ADD";

    const todolist = document.createElement("div");
    // todolist.style.border = "2px solid black";

    todocontainer.append(todoinput, addbtn, todolist);

    // Save todos to localStorage
    function saveTodos() {
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    function rendertask(task) {
        const todoitem = document.createElement("div");
        // todoitem.style.border = "2px solid red";
        // todoitem.style.margin = "10px";

        const p = document.createElement("p");
        p.textContent = task;

        const deletebtn = document.createElement("button");
        deletebtn.textContent = "Delete";

        const editbtn = document.createElement("button");
        editbtn.textContent = "Edit";

        editbtn.addEventListener("click", function () {
            const editinput = document.createElement("input");
            editinput.value = p.textContent;

            const savebtn = document.createElement("button");
            savebtn.textContent = "Save";

            todoitem.prepend(editinput, savebtn);
            editinput.focus();

            savebtn.addEventListener("click", function () {
                const updatedtask = editinput.value.trim();

                if (!updatedtask) return;

                const index = todos.indexOf(p.textContent);

                if (index !== -1) {
                    todos[index] = updatedtask;
                    saveTodos();
                }

                p.textContent = updatedtask;

                editinput.remove();
                savebtn.remove();

                todoitem.style.border = "4px solid green";
                todoitem.style.backgroundColor = "red";
            });
        });

        deletebtn.addEventListener("click", function () {
            const index = todos.indexOf(p.textContent);

            if (index !== -1) {
                todos.splice(index, 1);
                saveTodos();
            }

            todoitem.remove();
        });

        todoitem.append(p, deletebtn, editbtn);
        todolist.prepend(todoitem);
    }

    function addtodo() {
        const task = todoinput.value.trim();

        if (!task) return;

        todos.unshift(task);
        saveTodos();

        rendertask(task);

        todoinput.value = "";
        todoinput.focus();
    }

    // Render saved tasks on page load
    todos.forEach(task => rendertask(task));

    addbtn.addEventListener("click", addtodo);

    todoinput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            addtodo();
        }
    });

})();