// Simple Note  version v1.0.0 //

/* bring the data from localstorage */
let listofNotes = [];
if (localStorage.getItem("notes") !== null) {
  JSON.parse(localStorage.getItem("notes")).forEach((ele) => {
    listofNotes.push(ele);
  });
}
/* create old Note  */
listofNotes.forEach((ele) => {
  createNote(ele.title, ele.content, ele.date, ele.id);
});
/* switch display app */
function switchDisplay(addCancel) {
  let writePlace = document.querySelector(".write");
  let notsPlace = document.querySelector(".notes");
  function replace(dis1, dis2) {
    writePlace.style.display = dis1;
    notsPlace.style.display = dis2;
  }
  addCancel ? replace("block", "none") : replace("none", "block");
}
/* create Note card */
function createNote(title, content, date, id) {
  let notes = document.querySelector(".notes .container");
  /* creation */
  let note = document.createElement("div");
  note.setAttribute("class", "note");
  note.setAttribute("data-id", id);
  let h2 = document.createElement("h2");
  h2.textContent = title;
  let p = document.createElement("p");
  p.textContent = content;
  let span = document.createElement("span");
  span.textContent = date;
  /* appanding */
  note.appendChild(h2);
  note.appendChild(p);
  note.appendChild(span);
  notes.appendChild(note);
}
/* events click add note */
let addBtn = document.querySelector(".header .nav ul li:first-child");
addBtn.addEventListener("click", function () {
  switchDisplay(true);
  this.style.display = "none";
});

/* events click cancel & save */
let allBtn = document.querySelectorAll(".barbtn button");
allBtn.forEach((ele) => {
  ele.addEventListener("click", function () {
    switchDisplay(false);
    addBtn.style.display = "block";
  });
});
/* save data in localstorage */
function saveinlocal(id, title, content, date) {
  let note = {
    id: id,
    title: title,
    content: content,
    date: date,
  };
  listofNotes.push(note);
  localStorage.setItem("notes", JSON.stringify(listofNotes));
  return note;
}
/* custome random function */
function cRandome(endNumber) {
  let exist;
  do {
    exist = false;
    var randomId = Math.random() * (endNumber + 1);
    listofNotes.forEach((ele) => {
      if (ele.id == randomId) {
        exist = true;
      }
    });
  } while (exist);
  return randomId;
}
/* on click (save) */
let onsave = document.querySelector(".barbtn button:first-child");
let allinput = document.querySelectorAll(".input");
onsave.addEventListener("click", function () {
  let save = saveinlocal(
    cRandome(10000000),
    allinput[0].value,
    allinput[1].value,
    Date().slice(0, 15)
  );
  createNote(save.title, save.content, save.date, save.id);
  allinput.forEach((ele) => {
    ele.value = "";
  });
});
/* bring element with id */
function returnele(id) {
  let element;
  listofNotes.forEach((ele) => {
    if (ele.id == id) {
      element = ele;
    }
  });
  return element;
}

/* modify the note */
let allNotes = document.querySelectorAll(".notes .note");
allNotes.forEach((ele) => {
  ele.addEventListener("click", function () {
    let eleData = returnele(ele.getAttribute("data-id"));
    switchDisplay(true);
    allinput[0].value = eleData.title;
    allinput[1].value = eleData.content;
  });
  onsave.addEventListener("click", function () {
    listofNotes[listofNotes.indexOf(eleData)].title = allinput[0].value;
    listofNotes[listofNotes.indexOf(eleData)].content = allinput[1].value;
  });
});
