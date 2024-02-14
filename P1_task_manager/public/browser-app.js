const subBtn = document.querySelector(".submit-btn");
const taskcontainer = document.querySelector(".tasks");
const forms = document.querySelector("form");
let btns;
console.log(subBtn, taskcontainer, forms);

const task = (data) => {
  const { message: name, marked: completed, _id: taskID } = data;
  const content = `<div class="single-task ${completed && "task-completed"}">
  <h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
  <div class="task-links">

<!-- edit link -->
<a href="task.html?id=${taskID}"  class="edit-link">
<i class="fas fa-edit"></i>
</a>
<!-- delete btn -->
<button type="button" class="delete-btn" id="${taskID}">
<i class="fas fa-trash"></i>
</button>
</div>
</div>`;
  const article = document.createElement("article");
  article.setAttribute("id", taskID);
  article.innerHTML = content;
  taskcontainer.appendChild(article);
};

const deletetask = async (id) => {
  // console.log(e);?
  try {
    const response = await fetch(`http://localhost:3200/api/v1/users/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    // console.log(document.querySelector(`#${id}`))
    document.getElementById(id).remove();
  } catch (error) {
    console.log(error);
  }
};

// const display = () => {};

window.addEventListener("load", async () => {
  try {
    const response = await fetch("http://localhost:3200/api/v1/users");
    const data = await response.json();
    data.forEach((item) => {
      task(item);
    });
    btns = document.querySelectorAll(".delete-btn");
    btns.forEach((button) => {
      button.onclick = (e) => {
        deletetask(button.id);
      };
    });
  } catch (error) {
    console.log(error);
  }
});

forms.addEventListener("submit", async (e) => {
  e.preventDefault();
  const value = document.querySelector("input").value;
  console.log(value);
  try {
    const response = await fetch("http://localhost:3200/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: value, marked: false }),
    });
    const data = await response.json();
    console.log(data);
    task(data);
  } catch (err) {
    console.log(err);
  }
});