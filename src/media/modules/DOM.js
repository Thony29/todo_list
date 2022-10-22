//Modules
import controller from "../index.js";
import storage from "./storage.js";

//media
import circle from "../../src/media/circle.png";
import star from "../../src/media/star.png";
import edit from "../../src/media/edit.png";
import remove from "../../src/media/remove.png";
import fullstar from "../../src/media/fullstar.png";
import projecticon from "../../src/media/projects.png";
import add from "../../src/media/add.png";
import box from "../../src/media/inbox.png";
import calender from "../../src/media/today.png";
import githublogo from "../../src/media/githublogo.png";
import { container } from "webpack";

const DOM = (() => {
  const renderImages = () => {
    let inbox = document.querySelector("#inbox");
    let today = document.querySelector("#today");
    let creator = document.querySelector(".creator");
    let addProjectForm = document.querySelector("#add-project-form");

    let inboxImg = new Image();
    inboxImg.src = box;
    inbox.append(inboxImg);

    let todayImg = new Image();
    inboxImg.src = calender;
    inbox.prepend(todayImg);

    let creatorImg = new Image();
    creatorImg.src = githublogo;
    creator.prepend(creatorImg);

    let addProjectFormImg = new Image();
    addProjectFormImg.src = add;
    addProjectForm.prepend(addProjectFormImg);
  };
  //delete and creat <main>
  const removePage = () => {
    let body = document.querySelector("body");
    let main = document.querySelector("main");
    body.removeChild(main);
    main = document.createElement("main");
    body.appendChild(main);
  };

  //new page
  const renderPage = (event) => {
    let taskList;
    let main = document.querySelector("main");
    let page = document.createElement("h2");
    if (event === undefined) {
      taskList = [];
      page.textContent = "inbox";
    } else {
      taskList = storage[`${controller.activePage}`];
      if (event.target.nodeName === "p") {
        page.textContent = event.target.nextSibling.textContent;
      } else if (event.target.nodeName === "IMG") {
        page.textContent = event.target.nextSibling.textContent;
      } else {
        page.textContent = event.target.children[1].textContent;
      }
    }
    main.appendChild(page);

    for (let i = 0; i < taskList.length; ++i) {
      addTask();
      editTask(taskList[i]);
    }

    let addTaskForm = document.createElement("div");
    addTaskForm.setAttribute("id", "add-task-form");

    let image1 = new Image();
    image1.src = add;
    addTaskForm.appendChild(image1);

    let title = document.createElement("p");
    title.textContent = "Add Task";
    addTaskForm.appendChild(title);

    addTaskForm.addEventListener("click", renderTaskForm);
    main.appendChild(addTaskForm);
  };
  const renderProjectForm = () => {
    let body = document.querySelector("body");

    let overlay = document.createElement("div");
    overlay.setAttribute("id", "overlay");

    let form = document.createElement("div");
    form.classList.add("project-form");

    let header = document.createElement("div");
    header.classList.add("header");

    let header2 = document.createElement("h2");
    header2.textContent = "Add a Project";
    header.appendChild(header2);

    let image1 = new Image();
    image1.src = remove;
    image1.addEventListener("click", deleteForm);
    header.appendChild(image1);

    form.appendChild(header);
    //////////////////////////////////
    let name = document.createElement("input");
    name.setAttribute("type", "text");
    name.setAttribute("id", "project-name");
    name.setAttribute("placeholder", "Project Name");
    name.setAttribute("name", "projectName");
    name.setAttribute("required", "");
    name.setAttribute("minlength", "1");
    name.setAttribute("maxlength", "14");
    form.appendChild(name);

    let footer = document.createElement("div");
    footer.classList.add("footer");
    footer.classList.add("project-foot");

    let submit = document.createElement("button");
    submit.setAttribute("type", "submit");
    footer.appendChild(submit);

    form.appendChild(footer);

    overlay.appendChild(form);

    body.prepend(overlay);
  };

  const addProject = () => {
    let projects = document.querySelector("#projects");

    let header = document.querySelector("#projects > h2");

    let project = document.createElement("div");
    project.classList.add("project");

    let container = document.createElement("div");
    container.classList.add("container");
    container.addEventListener("click", controller.changePage);

    let image1 = new Image();
    image1.src = projecticon;
    container.appendChild(image1);

    let title = document.createElement("p");
    title.textContent = document.querySelector("form input").value;
    container.appendChild(title);

    project.appendChild(container);

    let trashDiv = document.createElement("div");
    trashDiv.classList.add("trash-cointainer");
    trashDiv.addEventListener("click", controller.removeProject);

    let trash = new Image();
    trash.src = remove;
    trashDiv.appendChild(trash);

    project.appendChild(trashDiv);

    header.parentNode.insertBefore(project, header.nextSibling);
  };

  const removeProject = (container) => {
    container.remove();
  };
  const renderTaskForm = (event) => {
    let isEdit = false;
    breakme: if (event.target.getAttribute("id") === "add-task-form") {
      break breakme;
    } else if (event.target.parentNode.getAttribute("id") === "add-task-form") {
      break breakme;
    } else {
      isEdit = true;
      controller.activeTask = controller.linkTask(event);
    }

    let main = document.querySelector("main");

    let overlay = document.createElement("div");
    overlay.setAttribute("id", "overlay");

    let form = document.createElement("form");

    let header = document.createElement("div");
    header.classList.add("header");

    let header2 = document.createElement("h2");
    isEdit
      ? (header2.textContent = "Edit Task")
      : (header2.textContent = "Create a New Task");
    header.appendChild(header2);

    let image1 = new Image();
    image1.src = remove;
    image1.addEventListener("click", deleteForm);
    header.appendChild(image1);

    form.appendChild(header);
    ///////////////////////////////
    let title = document.createElement("input");
    title.setAttribute("type", "text");
    title.setAttribute("id", "title");
    title.setAttribute("placholder", "title");
    title.setAttribute("name", "title");
    title.setAttribute("required", "");
    title.setAttribute("minlength", "1");
    title.setAttribute("maxlength", "26");
    isEdit ? (title.value = controller.activeTask.title) : (title = title);
    form.appendChild(title);

    let description = document.createElement("textarea");
    description.setAttribute("id", "description");
    description.setAttribute("placeholder", "description");
    description.setAttribute("name", "description");
    description.setAttribute("rows", "10");
    description.setAttribute("cols", "40");
    description.setAttribute("required", "");
    isEdit
      ? (description.value = controller.activeTask.description)
      : (description = description);
    form.appendChild(description);

    let date = document.createElement("input");
    date.setAttribute("type", "date");
    date.setAttribute("id", "date");
    date.setAttribute("name", "date");
    date.setAttribute("required", "");
    date.setAttribute("max", "9999-12-31");
    isEdit ? (date.value = controller.activeTask.date) : (date = date);
    form.appendChild(date);

    let footer = document.createElement("div");
    footer.classList.add(footer);

    let image2 = new Image();
    if (isEdit) {
      controller.activeTask.priorityStatus
        ? (image2.src = fullstar)
        : (image2.src = star);
    } else {
      image2.src = star;
    }
    image2.addEventListener("click", togglePriority);
    footer.appendChild(image2);

    let submit = document.createElement("button");
    submit.setAttribute("type", "submit");
    if (!isEdit) {
      submit.setAttribute("id", "submit");
      submit.textContent = "Add Task";
    } else {
      submit.setAttribute("id", "edit-task");
      submit.textContent = "Edit Task";
    }
    footer.appendChild(submit);

    form.appendChild(footer);

    overlay.appendChild(form);

    main.prepend(overlay);
  };
  ////////////////////////////////
  const deleteForm = () => {
    let overlay = document.querySelector("#overlay");
    overlay.remove();
  };
  const addTask = () => {
    let main = document.querySelector("main");
    let header = document.querySelector("main > h2");
    let page = storage[`${controller.activePage}`];

    let task = document.createElement("div");
    task.setAttribute("id", "task");
    page[page.length - 1].DOMlink = task;

    let left = document.createElement("div");
    left.classList.add("left");

    let image1 = new Image();
    image1.src = circle;
    image1.addEventListener("click", controller.removeTask);
    left.appendChild(image1);

    let title = document.createElement("h3");
    title.textContent = page[page.length - 1].title;
    left.appendChild(title);

    task.appendChild(left);

    let right = document.createElement("div");
    right.classList.add("right");

    let button = document.createElement("button");
    button.setAttribute("id", "info");
    button.textContent = "Info";
    button.addEventListener("click", viewTask);
    right.appendChild(button);

    let image2 = new Image();
    if (page[page.length - 1].priorityStatus === false) {
      image2.src = star;
    } else {
      image2.src = fullstar;
    }
    image2.addEventListener("click", controller.togglePriority);
    right.appendChild(image2);

    let image3 = new Image();
    image3.src = edit;
    image3.addEventListener("click", renderTaskForm);
    right.appendChild(image3);

    let image4 = new Image();
    image4.src = remove;
    image4.addEventListener("click", controller.removeTask);
    right.appendChild(image4);

    task.appendChild(right);

    controller.activeTask = page[page.length - 1];
    //Allow method to be used to renderPage and add tasks

    header.parentNode.insertBefore(task, header.nextSibling);
  };

  const viewTask = (event) => {
    let task = controller.linkTask(event);

    let main = document.querySelector("main");

    let overlay = document.createElement("div");
    viewContainer.setAttribute("id", "view-task");

    let handler = document.createElement("div");
    header.classList.add("header");

    let header2 = document.createElement("h2");
    header2.textContent = `${task.title}`;
    header.appendChild(header2);

    let image1 = new Image();
    image1.src = remove;
    image1.addEventListener("click", deleteForm);
    header.appendChild(image1);

    viewContainer.appendChild(header);

    let details = document.createElement("p");
    details.textContent = `${task.description}`;
    viewContainer.appendChild(details);

    let date = document.createElement("p");
    date.textContent = `${task.date}`;
    viewContainer.appendChild(date);

    let priority = new Image();
    task.priorityStatus ? (priority.src = fullstar) : (priority.src = star);
    viewContainer.appendChild(viewContainer);

    main.prepend(overlay);
  };

  const editTask = (Object) => {
    let header = controller.activeTask.DOMlink.children[0].children[1];

    let parentNode = controller.activeTask.DOMlink.children[1];

    let oldPriority = controller.activeTask.DOMlink.children[1].children[1];

    Object !== undefined
      ? (controller.activeTask = Object)
      : (controller.activeTask = controller.activeTask); // Allows method to be used to renderPage and edit tasks

    header.textContent = controller.activeTask.title;

    let newPriority = new Image();
    controller.activeTask.priorityStatus === true
      ? (newPriority.src = fullstar)
      : (newPriority.src = star);
    newPriority.addEventListener("click", controller.togglePriority);
    parentNode.replaceChild(newPriority, oldPriority);
  };
  const removeTask = (event) => {
    event.target.parentNode.remove();
  };

  const togglePriority = (event) => {
    let oldElement = event.target;
    let newElement = new Image();
    if ((oldElement.src = star)) {
      newElement.src = fullstar;
    } else {
      newElement.src = star;
    }
    newElement.addEventListener("click", controller.togglePriority);
    event.target.parentNode.replaceChild(newElement, oldElement);
  };
  return {
    renderImages,
    removePage,
    renderPage,
    renderProjectForm,
    deleteForm,
    addProject,
    removeProject,
    addTask,
    editTask,
    removeTask,
    togglePriority,
  };
})();

export default DOM;
