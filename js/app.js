function taskTwoAndThree() {
    console.log("hello world");
    document.querySelector('h1').textContent = "Moi maailma";
}

function addElementViaButton() {
    const unOrderedList = document.getElementById('my-list');
    const newItem = document.createElement('li');
    newItem.textContent = "Did the task 4!"
    unOrderedList.appendChild(newItem);
}

function addElementViaTextarea() {
    const unOrderedList = document.getElementById('my-list');
    const textValue = document.querySelector('textarea').value;
    const newItem = document.createElement('li');
    newItem.textContent = textValue;
    unOrderedList.appendChild(newItem);
}