const openBtn = document.querySelector(`#open-btn`);
const closeBtn = document.querySelector(`#btn-cancel`);
const inputForm = document.querySelector(`#form-popup`);
const books = [];
const tbody = document.querySelector(`tbody`);
const form = document.querySelector(`form`);
let count = 0;
let deleteNode = [];
let statusNode = [];
let st = ``;
//open form
const openForm = () => {
  inputForm.style.display = "flex";
  inputForm.style.flexDirection = "column";
};
//close form
const closeForm = () => {
  inputForm.style.display = "none";
  form.reset();
};
//get input from form and append the form and delete btn,callback the grab btn function
const getBook = (event) => {
  const title = document.querySelector(`#title`).value;
  const author = document.querySelector(`#author`).value;
  const pages = document.querySelector(`#pages`).value;
  const status = document.querySelector(`#status`).checked;

  let bookObj = { title, author, pages, status };
  books.push(bookObj);
  console.log(books);
  let td = document.createElement(`td`);
  let td1 = document.createElement(`td`);
  let td2 = document.createElement(`td`);
  let td3 = document.createElement(`td`);
  let td4 = document.createElement(`td`);
  td4.classList.add(`td_toRow`);
  let deleteBtn = document.createElement(`button`);
  deleteBtn.classList.add(`delete-btn`);
  deleteBtn.classList.add(`data-index-${count}`);
  deleteBtn.innerHTML = `X`;
  let changeStatus = document.createElement(`button`);
  changeStatus.classList.add(`status`);
  changeStatus.classList.add(`data-index-${count}`);
  let tr = document.createElement(`tr`);
  let span = document.createElement(`span`);
  tr.id = `data-index-${count}`;
  td.append(title);
  td1.append(author);
  td2.append(pages);
  td3.append(deleteBtn);
  tr.append(td);
  tr.append(td1);
  tr.append(td2);
  if (status) {
    span.append(`Finished`);
    st = `finished`;
  } else {
    span.append(`Unfinished`);
    st = `unfinished`;
  }
  changeStatus.classList.add(`data-status-${st}`);
  span.classList.add(`data-span-${count}`);
  td4.append(span);
  td4.append(changeStatus);
  tr.append(td4);
  tr.append(td3);
  tbody.append(tr);
  count++;
  event.preventDefault();
  form.reset();
  grabButtons();
  startLocalSave();
};
//grab the delete btn
const grabButtons = () => {
  let dBtns = document.getElementsByClassName("delete-btn");
  let sBtns = document.getElementsByClassName("status");
  deleteNode = dBtns;
  statusNode = sBtns;
};
//Events
form.addEventListener(`submit`, getBook);
openBtn.addEventListener(`click`, openForm);
closeBtn.addEventListener(`click`, closeForm);
document.addEventListener(`click`, (e) => {
  if (e.target.classList[0] == `delete-btn`) {
    let targetClass = e.target.classList[1];
    let deleteIt = document.querySelector(`#${targetClass}`);
    deleteIt.remove();
  }
  // console.log(e);
  if (e.target.classList[0] == `status`) {
    let number = e.target.classList[1];
    number = number.slice(number.length - 1);
    let changeIt = document.querySelector(`.data-span-${number}`);
    if (changeIt.textContent === `Finished`) {
      changeIt.textContent = `Unfinished`;
    } else {
      changeIt.textContent = `Finished`;
    }
  }
});
