function toggleMenu() {
    menu.classList.toggle("active");
}
document.addEventListener("click", (e) => {
    const isClickInsideMenu = menu.contains(e.target);
    const isClickOnMenuButton = document.getElementById("menuButton").contains(e.target);
    
    if (!isClickInsideMenu && !isClickOnMenuButton && menu.classList.contains("active")) {
        menu.classList.remove("active");
    }
});
//Harcama Takip
const menu = document.getElementById("sideMenu");
const expenseList = document.getElementById("expenseList");
const totalExpense = document.getElementById("totalExpense");
const expenseInput = document.getElementById("expenseName");
const amountInput = document.getElementById("expenseAmount");
let expenses = [];


function addExpense() {
    const name = document.getElementById("expenseName").value.trim();
    const amount = parseFloat(document.getElementById("expenseAmount").value.trim());
    
    if (name === "" || isNaN(amount) || amount <= 0) {
            alert("Lütfen geçerli bir harcama adı ve tutar girin!");
            return;
        }
        
        expenses.push({ name, amount });
        updateExpenseList();
        saveExpensesToStorage();
        clearExpenseInput();
        expenseInput.focus();
        
    }
    function deleteExpense(expenseName) {
        const index = expenses.findIndex(expense => expense.name === expenseName);
        
        if (index !== -1) {
            expenses.splice(index, 1);
            updateExpenseList();
            saveExpensesToStorage();
        }
    }
    
    function updateExpenseList() {
        expenseList.innerHTML = "";
        let total = 0;
        
        expenses.forEach((expense) => {
            const li = document.createElement("li");
            
            const span = document.createElement("span");
            span.textContent = `${expense.name} - ${expense.amount.toFixed(2)} TL`;
            
            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';  
            deleteBtn.classList.add("deleteBtn");
            deleteBtn.onclick = () => deleteExpense(expense.name);
            
            
            li.appendChild(span);
            li.appendChild(deleteBtn);
            expenseList.appendChild(li);
            clearExpenseInput();
            
            total += expense.amount;
            
        });
        
        totalExpense.textContent = `Toplam Harcama: ${total.toFixed(2)} TL`;
    }
    function clearExpenseInput(){
        expenseInput.value="";
        amountInput.value="";
    }
    expenseInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addExpense();
    }
    });
    amountInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addExpense();
    }
    });

    function saveExpensesToStorage() {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }
    updateExpenseList();
    function loadExpensesFromStorage() {
        const storedExpenses = localStorage.getItem("expenses");
        if (storedExpenses) {
            expenses.length = 0;  
            expenses.push(...JSON.parse(storedExpenses)); 
            updateExpenseList();
        }
    }
    // Kitaplık
    let library = [];
    const bookTitleInput = document.getElementById("bookTitle");
    const authorNameInput = document.getElementById("bookAuthor");
    const pageCountInput = document.getElementById("pageCount");
    const libraryList = document.getElementById("libraryList");
    const pageCount = document.getElementById("pageCount");
    const bookAuthor = document.getElementById("bookAuthor");
    const bookTitle =document.getElementById("bookTitle");
    
    function addBook(){
        const title = document.getElementById("bookTitle").value.trim();
        const author = document.getElementById("bookAuthor").value.trim();
        const page = parseInt(pageCountInput.value.trim());
        
        if(title === "" || author === "" || isNaN(page) || page <=0) {
            alert("Lütfen geçerli bir kitap adı, yazar adı ve sayfa sayısı girin!");
            return;
        }
        library.push({title, author, page});
        updateLibrary();
        clearInputs();
        bookTitleInput.focus();
        saveLibraryToStorage();
    }
    
    

    function updateLibrary(){
        libraryList.innerHTML ="";
        

        library.forEach((book)=>{
            const li = document.createElement("li");
            const span = document.createElement("span");

            span.textContent =`${book.title} - ${book.author} - (${book.page} Sayfa.)`;

            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';  
            deleteBtn.classList.add("deleteBtn");
            deleteBtn.onclick = () => deleteLibrary(book.title);

            li.appendChild(span);
            li.appendChild(deleteBtn);
            libraryList.appendChild(li);
    
            
        });

    }
    function deleteLibrary(bookTitle){
        const index = library.findIndex(book => book.title === bookTitle);

        if(index !== -1){
            library.splice(index, 1);
            updateLibrary();
            saveLibraryToStorage();
        }
    }
    function clearInputs() {
    bookTitleInput.value="";
    authorNameInput.value="";
    pageCountInput.value="";
    }

    pageCount.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            addBook();
        }
        });
    bookAuthor.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            addBook();
        }
        });
    bookTitle.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                addBook();
            }
        });

        function saveLibraryToStorage() {
            localStorage.setItem("library", JSON.stringify(library));
        }
        
        function loadLibraryFromStorage() {
            const storedLibrary = localStorage.getItem("library");
            if (storedLibrary) {
                library.length = 0;
                library.push(...JSON.parse(storedLibrary));
                updateLibrary();
            }
        }
        

        //Not Defteri

        const notes=[];
        const noteTitle = document.getElementById("noteTitle");
        const noteContent = document.getElementById("noteContent");
        const noteList = document.getElementById("noteList");

        function addNote(){
            const title = document.getElementById("noteTitle").value.trim();
            const content = document.getElementById("noteContent").value.trim();

            if(title ==="" || content==="" ){
                alert("Lütfen başlık ve notunuzu girin!");
                return;
            }
            notes.push({title, content});
            updateNote();
            saveNotesToStorage();
            clearNoteInputs();

        }

        function updateNote(){
            noteList.innerHTML="";


            notes.forEach((note) => {
                const li = document.createElement("li");
        
                const title = document.createElement("h3"); 
                title.textContent = note.title;
        
                const content = document.createElement("p");
                content.textContent = note.content;
        
                const deleteBtn = document.createElement("button");
                deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
                deleteBtn.classList.add("deleteBtn");
                deleteBtn.onclick = () => deleteNote(note.title);
        
                li.appendChild(title);
                li.appendChild(content);
                li.appendChild(deleteBtn);
                noteList.appendChild(li);
                clearNoteInputs();
            });
        }

        function deleteNote(noteTitle){
            const index =notes.findIndex(note=> note.title ===noteTitle );

            if (index !==-1){
                notes.splice(index, 1);
                updateNote();
                saveNotesToStorage();
            }
        }
        function clearNoteInputs(){
            noteContent.value="";
            noteTitle.value = "";
        }

        noteTitle.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                addNote();
            }
            });

            function saveNotesToStorage() {
                localStorage.setItem("notes", JSON.stringify(notes));
            }
            
            function loadNotesFromStorage() {
                const storedNotes = localStorage.getItem("notes");
                if (storedNotes) {
                    notes.length = 0;
                    notes.push(...JSON.parse(storedNotes));
                    updateNote();
                }
            }
            

//Work Tracker

        const works = [];
const taskNameInput = document.getElementById("taskName");
const taskDayInput = document.getElementById("taskDay");
const taskList = document.getElementById("taskList");

function addTask() {
    const task = taskNameInput.value.trim();
    const days = parseInt(taskDayInput.value.trim());

    if (task === "" || isNaN(days) || days <= 0) {
        alert("Lütfen geçerli bir görev ve süre giriniz!");
        return;
    }

    works.push({ task, days });
    updateTaskList();
    saveTasksToStorage();
    clearTaskInputs();
    taskNameInput.focus();
}

function updateTaskList() {
    taskList.innerHTML = "";

    works.forEach((work) => {
        const li = document.createElement("li");
        const span = document.createElement("span");

        span.textContent = `${work.task} - ${work.days} Gün`;

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.onclick = () => deleteTask(work.task);

        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

function deleteTask(taskName) {
    const index = works.findIndex(work => work.task === taskName);

    if (index !== -1) {
        works.splice(index, 1);
        updateTaskList();
        saveTasksToStorage();
    }
}

function clearTaskInputs() {
    taskNameInput.value = "";
    taskDayInput.value = "";
}


taskNameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});
taskDayInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});
function saveTasksToStorage() {
    localStorage.setItem("works", JSON.stringify(works));
}

function loadTasksFromStorage() {
    const storedWorks = localStorage.getItem("works");
    if (storedWorks) {
        works.length = 0;
        works.push(...JSON.parse(storedWorks));
        updateTaskList();
    }
}
loadExpensesFromStorage();
loadLibraryFromStorage();
loadNotesFromStorage();
loadTasksFromStorage();