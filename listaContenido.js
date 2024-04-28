const url = "http://localhost:3000/content";

// funcion para mostrar la lista
async function getContenido() {
    const respuesta = await fetch(url);
    if (!respuesta.ok) {
        console.error('Error al obtener los elementos');
        return;
    }
    //convierte la respuesta a json , que se espera un array de elementos
    const contenidos = await respuesta.json();
    // rescato la lista de mi html
    const ul = document.querySelector('#contentList');
    //limpia el contenido actual
    ul.innerHTML = '';
    // recorro cada elemento
    contenidos.forEach(elemento => {
        const li = document.createElement('li');
        const edit = document.createElement('button');
        const remove = document.createElement('button');

        edit.innerText = 'Edit';
        remove.innerText = 'Delete';

        edit.className = 'btn btn-warning edit';
        remove.className = 'btn btn-danger remove';

        li.innerText = `ID: ${elemento.id}, Titulo: ${elemento.title}, Descripcion: ${elemento.description}, Tipo: ${elemento.tipoContent} `;
        li.append(edit, remove);
        ul.append(li);

        edit.addEventListener('click', () => loadElemento(elemento));
        remove.addEventListener('click', () => deleteElemento(elemento.id));
    });
}

//cargar los datos del elemento en el formulario para la edicion
async function loadElemento(elemento) {
    document.getElementById('contentId').value = elemento.id;
    document.getElementById('title').value = elemento.title;
    document.getElementById('description').value = elemento.description;
    document.getElementById('tipoContent').value = elemento.tipoContent;
    document.getElementById('submitBtn').textContent = 'Editar Contenido';
}
// funcion para borrar elemento
async function deleteElemento(id) {
    const urlID = `${url}/${id}`;

    const respuesta = await fetch(urlID, {
        method: 'DELETE',
    });

    if (!respuesta.ok) {
        console.error('Error al eliminar un elemento');
    } else {
        getContenido(); // Recargar la lista después de eliminar
    }
}

//manejo de añadir o editar un contenido
document.getElementById('addContentForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const id = document.getElementById('contentId').value;
    const titulo = document.getElementById('title').value;
    const descripcion = document.getElementById('description').value;
    const tipo_contenido = document.getElementById('tipoContent').value;
    const method = id ? 'PUT' : 'POST';
    const urlID = id ? `${url}/${id}` : url;

    const respuesta = await fetch(urlID, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: titulo,
            description: descripcion,
            tipoContent: tipo_contenido
        })
    });

    if (!respuesta.ok) {
        console.error('Error al añadir/editar un elemento');
    } else {
        document.getElementById('submitBtn').textContent = 'Agregar Contenido';
        document.getElementById('addContentForm').reset();
        document.getElementById('contentId').value = '';
        getContenido(); // Recargar la lista
    }
});

getContenido();
