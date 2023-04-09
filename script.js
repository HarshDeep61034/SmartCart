import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-a2ccd-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDb = ref(database, "shoppingList")

const addEl = document.getElementById('add');
const itemEl = document.getElementById('item');
const listEl = document.getElementById('list');


addEl.addEventListener('click', ()=>{
    let itemValue = itemEl.value;
    if(itemValue !== ""){
    push(shoppingListInDb, itemValue);
    }
    else{
        alert("Can't be Empty!!")
    }
    clearInput();
})


onValue(shoppingListInDb, function(snapshot){
    listClear();
    const items = Object.entries(snapshot.val());
    for(let i in items){
        let currentItem = items[i];
        let currentItemId = currentItem[0];
        let currentItemValue = currentItem[1];
        listAppender(currentItem);
    }
})

function listClear(){
    listEl.innerHTML = "";
}

function listAppender(input){
    let newEl = document.createElement('li');
    let inputId = input[0];
    let inputValue = input[1];
    newEl.textContent = inputValue;
    listEl.append(newEl);
}

function clearInput() {
    itemEl.value = "";
}

