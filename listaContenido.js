const titleEl = document.querySelector('#title');
const descriptionEl = document.querySelector('#description');
const typeEl = document.querySelector('#tipoContent');
const form = document.querySelector('#addContentForm');
const contentList = document.getElementById("contentList");

const isRequired = value => value !== '';
const isBetween = (length, min, max) => length >= min && length <= max;

form.addEventListener('submit', function (e) {
    e.preventDefault();

    let title = titleEl.value;
    let description = descriptionEl.value;
    let type = typeEl.value;

    let isTitleValid = checkInput(titleEl, 3, 30, 'El título es requerido y debe tener entre 3 y 30 caracteres.');
    let isDescriptionValid = checkInput(descriptionEl, 5, 100, 'La descripción es requerida y debe tener entre 5 y 100 caracteres.');

    let isFormValid = isTitleValid && isDescriptionValid;

    if (isFormValid) {
        addContentToList({title, description, type});
        form.reset();
    }
});

function checkInput(el, min, max, errorMessage) {
    let valid = false;
    const value = el.value.trim();
    if (!isRequired(value)) {
        showError(el, 'Este campo no puede estar vacío.');
    } else if (!isBetween(value.length, min, max)) {
        showError(el, errorMessage);
    } else {
        showSuccess(el);
        valid = true;
    }
    return valid;
}

function addContentToList(content) {
    let li = document.createElement("li");

    let buttonEdit = document.createElement("button");
    buttonEdit.textContent = "Editar";
    buttonEdit.classList.add("edit");
    buttonEdit.setAttribute("data-id", content.title);

    let buttonDel = document.createElement("button");
    buttonDel.textContent = "Borrar";
    buttonDel.classList.add("delete");
    buttonDel.setAttribute("data-id", content.title);

    li.textContent = `${content.title} : ${content.description} : ${content.type} : `;
    li.appendChild(buttonEdit);
    li.appendChild(buttonDel);
    contentList.appendChild(li);
}

function showError(el, message) {
    const small = el.nextElementSibling;
    small.textContent = message;
    small.style.color = 'red';
}

function showSuccess(el) {
    const small = el.nextElementSibling;
    small.textContent = '';
}
