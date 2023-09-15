// Referencing https://www.js-craft.io/blog/using-url-createobjecturl-to-create-uploaded-image-previews-in-javascript/

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    addNewRow();
    event.target.reset();
});

function addNewRow() {
    const table = document.querySelector('table');
    const username = document.getElementById('input-username').value;
    const email = document.getElementById('input-email').value;
    const isAdmin = document.getElementById('input-admin').checked;
    const imageInput = document.getElementById('input-image');
    const isImage = imageInput.files && imageInput.files[0];

    const rows = table.querySelectorAll('tr:not(:first-child)');
    let userExists = false;

    rows.forEach(row => {
        if(row.cells[0].textContent === username) {
            userExists = true;
            row.cells[1].textContent = email;
            row.cells[2].textContent = isAdmin ? 'X' : '-';
            if (isImage) {
                addImage(isImage, row.cells[3]);
            }
        }
    });

    if(!userExists) {
        const newRow = document.createElement('tr');

        const usernameData = document.createElement('td');
        usernameData.textContent = username;

        const emailData = document.createElement('td');
        emailData.textContent = email;

        const adminData = document.createElement('td');
        adminData.textContent = isAdmin ? 'X' : '-';

        newRow.appendChild(usernameData);
        newRow.appendChild(emailData);
        newRow.appendChild(adminData);

        if (isImage) {
            const imageData = document.createElement('td');
            addImage(isImage, imageData);
            newRow.appendChild(imageData);
        }

        table.appendChild(newRow);
    }
}

function addImage(file, tdElement) {
    const imgURL = URL.createObjectURL(file);
    const img = document.createElement('img');
    img.src = imgURL;
    img.width = 64;
    img.height = 64;
    tdElement.appendChild(img);
}

function emptyTable() {
    const table = document.querySelector('table');
    const tableRows = table.querySelectorAll('tr:not(:first-child)');
    tableRows.forEach(row => row.remove());
}
