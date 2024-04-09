'use strict'
// EVENT OF CLICK
const registerButton = document.querySelector('.add');
const closeForm = document.querySelector('.close-form');

const toggleForm = () => {
    form.classList.toggle("hide");
}

registerButton.addEventListener("click", toggleForm);
closeForm.addEventListener("click", toggleForm);
////////////////////////////////////////////////////////////////////////////////////////////

const tableBody = document.querySelector('tbody');





// selecting the data of inputs
const form = document.querySelector('form');
const nome = document.querySelector('#name');
const email = document.querySelector('#email');
const tel = document.querySelector('#tel');
const saveButton = document.querySelector('.send');



// LOCALSTORAGE 
const getLocalStorage = () => JSON.parse(localStorage.getItem('dbClient')) ?? [];
const setLocalStorage = (dbClient) => localStorage.setItem("dbClient", JSON.stringify(dbClient))



const deleteClient = (index) => {
    const dbClient = getLocalStorage();
    dbClient.splice(index, 1);
    setLocalStorage(dbClient);
}

const updateClient = (index, client) => {
    const dbClient = getLocalStorage();
    dbClient[index] = client;
    setLocalStorage(dbClient);
}

const createClient = (client) => {
    const dbClient = getLocalStorage();
    dbClient.push(client)
    setLocalStorage(dbClient);
}

const isvalidFields = () => {
    return form.reportValidity();
}

// interação com o layout

const clearFields = () => {
    const inputs = document.querySelectorAll('input')
    inputs.forEach((input) => {
        input.value = '';
    })
}

const saveClient = () => {
    if (isvalidFields()) {
        const client = {
            nome: nome.value,
            email: email.value,
            tel: tel.value,
        }

        const index = nome.dataset.index;

        if (index == 'new') {
            createClient(client);
            updateTable()
            toggleForm();
        } else {
          updateClient(index , client);
          updateTable();
          toggleForm();
        }

    }
}

const createRow = (client, index) => {
    const row = document.createElement('tr');
    row.classList.add('tbody_row')

    row.innerHTML = `
    <td>${client.nome}</td>
    <td>${client.email}</td>
    <td>${client.tel}</td>
    <td>
        <button type = "button"  class="edit" data-action = "edit-${index}">Edit</button>
        <button type = "button" class="delete" data-action = "delete-${index}">Delete</button>
    </td>
    `
    tableBody.appendChild(row);
}

const clearTable = () => {
    tableBody.innerHTML = '';
}

const updateTable = () => {
    const dbClient = getLocalStorage();
    clearTable();
    dbClient.forEach(createRow)
}



const fillFields = (client) => {
    nome.value = client.nome;
    email.value = client.email;
    tel.value = client.tel;
    nome.dataset.index = client.index;
}

const editClient = (index) => {
    const client = getLocalStorage()[index];
    client.index = index;
    fillFields(client);
    toggleForm();

}

const editDelete = (e) => {
    if (e.target.type == 'button') {
        const [action, index] = e.target.dataset.action.split('-')

        if (action == 'edit') {
            editClient(index);
        } else {
           deleteClient(index);
           updateTable();
        }

    }
}
updateTable();

// Eventos

saveButton.addEventListener("click", (e) => {
    e.preventDefault();
    saveClient();
})

tableBody.addEventListener('click', editDelete);