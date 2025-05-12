let currentEditEducationId = null; // Track the ID of the education entry being edited
let currentEditCertificationId = null; // Track the ID of the certification entry being edited

document.getElementById('education-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const institution = event.target[0].value;
    const degree = event.target[1].value;
    const year = event.target[2].value;

    if (currentEditEducationId) {
        // Update existing education entry
        const listItem = document.getElementById(currentEditEducationId);
        listItem.innerHTML = `${institution}, ${degree}, ${year} 
            <button onclick="editEducation('${currentEditEducationId}')">Edit</button> 
            <button onclick="deleteEducation('${currentEditEducationId}')">Delete</button>`;

        currentEditEducationId = null; // Reset after editing
        event.target.querySelector('button[type="submit"]').textContent = 'Add Education'; // Reset button text
    } else {
        // Create a unique ID for each entry
        const id = `edu-${Date.now()}`;

        // Create list item with edit and delete buttons
        const listItem = document.createElement('li');
        listItem.id = id;
        listItem.innerHTML = `${institution}, ${degree}, ${year} 
            <button onclick="editEducation('${id}')">Edit</button> 
            <button onclick="deleteEducation('${id}')">Delete</button>`;

        document.getElementById('education-list').appendChild(listItem);
    }

    event.target.reset();
});

document.getElementById('certification-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = event.target[0].value;
    const organization = event.target[1].value;
    const date = event.target[2].value;

    if (currentEditCertificationId) {
        // Update existing certification entry
        const listItem = document.getElementById(currentEditCertificationId);
        listItem.innerHTML = `${name}, ${organization}, ${date} 
            <button onclick="editCertification('${currentEditCertificationId}')">Edit</button> 
            <button onclick="deleteCertification('${currentEditCertificationId}')">Delete</button>`;

        currentEditCertificationId = null; // Reset after editing
        event.target.querySelector('button[type="submit"]').textContent = 'Add Certification'; // Reset button text
    } else {
        // Create a unique ID for each entry
        const id = `cert-${Date.now()}`;

        // Create list item with edit and delete buttons
        const listItem = document.createElement('li');
        listItem.id = id;
        listItem.innerHTML = `${name}, ${organization}, ${date} 
            <button onclick="editCertification('${id}')">Edit</button> 
            <button onclick="deleteCertification('${id}')">Delete</button>`;

        document.getElementById('certification-list').appendChild(listItem);
    }

    event.target.reset();
});

function deleteEducation(id) {
    const entry = document.getElementById(id);
    if (entry) {
        entry.remove();
    }
}

function editEducation(id) {
    const entry = document.getElementById(id);
    if (entry) {
        // Extract current values
        const textContent = entry.textContent.split('Edit')[0].trim();
        const [institution, degree, year] = textContent.split(',').map(item => item.trim());

        document.querySelector('#education-form input[name="institution"]').value = institution;
        document.querySelector('#education-form input[name="degree"]').value = degree;
        document.querySelector('#education-form input[name="year"]').value = year;

        currentEditEducationId = id;
        document.querySelector('#education-form button[type="submit"]').textContent = 'Save Changes';
    }
}

function deleteCertification(id) {
    const entry = document.getElementById(id);
    if (entry) {
        entry.remove();
    }
}

function editCertification(id) {
    const entry = document.getElementById(id);
    if (entry) {
        // Extract current values
        const textContent = entry.textContent.split('Edit')[0].trim();
        const [name, organization, date] = textContent.split(',').map(item => item.trim());

        document.querySelector('#certification-form input[name="name"]').value = name;
        document.querySelector('#certification-form input[name="organization"]').value = organization;
        document.querySelector('#certification-form input[name="date"]').value = date;

        currentEditCertificationId = id;
        document.querySelector('#certification-form button[type="submit"]').textContent = 'Save Changes';
    }
}