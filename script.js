const addbtn = document.getElementById("addbtn")

function updateNote(){
    // const textAreaData=document.getElementsByTagName("textarea");
    const textAreaData=document.querySelectorAll("textarea");
    const notes=[]; 
    textAreaData.forEach((note)=>{
        if (note.value != "") {
            notes.push(note.value);
        }
    })
    localStorage.setItem('notes',JSON.stringify(notes));
}

function addNewNote(text="") /*otherwise undefined textarea */ {
    
    const notesContainer = document.getElementById("notesContainer");
    let note = document.createElement("div");
    note.classList.add("notes","shadow-lg");
    let HTMLdata = `
    <div class="heading">
    <button class="material-icons edit transition" id="edit" title="Edit">done</button>
    <button class="material-icons delete transition" id="delete" title="Delete">delete</button>
  </div>
  <div class="noteText overflow-y-auto ${text ? "" : "hide"}"></div>
  <textarea class="p-2 resize-none ${text ? "hide" : ""}" id="text" cols="30" rows="5" placeholder="Type your note..."></textarea>
  `
    note.innerHTML = HTMLdata;
    //!document refers to HTML, there editbtn is comment out
    //?For some reason, byID is showing null error, use querySelector
    try {
        var editBtn = note.querySelector(".edit");
        var deleteBtn = note.querySelector(".delete");
        var noteText = note.querySelector(".noteText");
        var textarea = note.querySelector("#text");
    }
    catch (error) {
        console.log(error)
    }

    //putting the value coming from local storage
    textarea.value = text;
    noteText.innerHTML = text;

    //delete a note
    deleteBtn.addEventListener('click',()=>{
        note.classList.add("animate-ping","opacity-30");
        setTimeout(()=>{
            note.remove();
            updateNote();
        },200)
    })

    //edit a note
    editBtn.addEventListener('click', () => {
        textarea.classList.toggle('hide');
        noteText.classList.toggle('hide');
        if (textarea.classList.contains('hide')) {
            editBtn.innerText = "edit_note";
        }
        else {
            editBtn.innerText = "done";
        }
        updateNote();
    });
    //change the textarea content
    textarea.addEventListener('change', (event) => {
        const value = event.target.value;
        noteText.innerHTML = value;
        updateNote();
    })



    notesContainer.appendChild(note);
}

//getting data from local storage
const notes = JSON.parse(localStorage.getItem('notes'));
if (notes) {
    notes.forEach(note => {
        addNewNote(note);
    });
}
addbtn.addEventListener("click", ()=>addNewNote()); //!simple addNewNote call wont work here, you have to pass empty parameter using arrow function, normal function wont work para empty para aswell