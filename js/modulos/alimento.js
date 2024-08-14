// Categorías
let categorias = [
    { id: 1, nombre: "Platillo" },
    { id: 2, nombre: "Torta" },
    { id: 3, nombre: "Ensalada" },
    { id: 4, nombre: "Postre" },
    { id: 5, nombre: "Fruta" }
];

// Alimentos
let alimentos = [
    {
        id: 1,
        producto: {
            id: 1,
            nombre: "Tacos",
            descripcion: "Muy ricos.",
            foto: "",
            precio: 14.99,
            categoria: { id: 1, nombre: "Platillo" }
        }
    },
    {
        id: 2,
        producto: {
            id: 2,
            nombre: "Taparterias",
            descripcion: "Torta grande c",
            foto: "",
            precio: 30.00,
            categoria: { id: 2, nombre: "Torta" }
        }
    },
    {
        id: 3,
        producto: {
            id: 3,
            nombre: "Ensalada Mediterranea",
            descripcion: "Ensalada de alimentos mediterraneos.",
            foto: "",
            precio: 120.00,
            categoria: { id: 3, nombre: "Ensalada" }
        }
    },
    {
        id: 4,
        producto: {
            id: 4,
            nombre: "Dieta Tropical",
            descripcion: "Ensalada de alimentos tropicales.",
            foto: "",
            precio: 110.00,
            categoria: { id: 3, nombre: "Ensalada" }
        }
    },
    {
        id: 5,
        producto: {
            id: 5,
            nombre: "Pasta Cantonesa",
            descripcion: "Pasta tipo oriental con carne y vegetales.",
            foto: "",
            precio: 175.00,
            categoria: { id: 1, nombre: "Platillo" }
        }
    }
];

// Inicializa el módulo
export function inicializarModulo() {
    setDetalleAlimentoVisible(false);
    llenarComboBoxCategorias();
    llenarTabla();
}

// Guardar alimento
export function guardar() {
    let posTemp = -1;
    let catTemp = null;

    let a = {};

    a.id = 0;
    a.producto = {};
    a.producto.id = 0;
    a.producto.nombre = document.getElementById("txtAlimento").value;
    a.producto.descripcion = document.getElementById("txtDescripcionAlimento").value;
    a.producto.precio = parseFloat(document.getElementById("txtPrecioAlimento").value);
    catTemp = buscarCategoriaPorID(parseInt(document.getElementById("cmbCategoria").value));
    a.producto.categoria = catTemp;

    posTemp = buscarPosicionAlimentoPorID(parseInt(document.getElementById("txtId").value));
    if (posTemp >= 0) {
        a.id = parseInt(document.getElementById("txtId").value);
        alimentos[posTemp] = a;
    } else {
        a.id = generarIDAlimento();
        alimentos.push(a);
        document.getElementById("txtId").value = a.id;
    }

    llenarTabla();

    Swal.fire('Movimiento realizado.', 'Datos de producto guardados.', 'success');
}

// Eliminar alimento
export function eliminar() {
    let idAlimento = parseInt(document.getElementById("txtId").value);

    if (isNaN(idAlimento) || idAlimento <= 0) {
        Swal.fire('Error', 'ID inválido.', 'error');
        return;
    }

    let pos = buscarPosicionAlimentoPorID(idAlimento);

    if (pos >= 0) {
        alimentos.splice(pos, 1);
        llenarTabla();
        limpiar();
        Swal.fire('Eliminado', 'El alimento ha sido eliminado.', 'success');
    } else {
        Swal.fire('Error', 'No se encontró el alimento.', 'error');
    }
}

// Limpiar formulario
export function limpiar() {
    document.getElementById("txtId").value = '';
    document.getElementById("txtAlimento").value = '';
    document.getElementById("txtDescripcionAlimento").value = '';
    document.getElementById("txtPrecioAlimento").value = '';
    document.getElementById("cmbCategoria").value = 1;
}

// Mostrar detalle de alimento
export function mostrarDetalleAlimento(idAlimento) {
    let alimento = null;
    let pos = buscarPosicionAlimentoPorID(idAlimento);

    if (pos < 0) {
        Swal.fire('', 'Alimento no encontrado.', 'warning');
        return;
    }

    limpiar();
    alimento = alimentos[pos];
    document.getElementById("txtId").value = alimento.id;
    document.getElementById("txtAlimento").value = alimento.producto.nombre;
    document.getElementById("txtDescripcionAlimento").value = alimento.producto.descripcion;
    document.getElementById("txtPrecioAlimento").value = alimento.producto.precio;
    document.getElementById("cmbCategoria").value = alimento.producto.categoria.id;
    setDetalleAlimentoVisible(true);
}

// Mostrar formulario nuevo
export function mostrarFormularioNuevo() {
    limpiar();
    setDetalleAlimentoVisible(true);
}

// Llenar tabla
function llenarTabla() {
    let contenido = '';

    for (let i = 0; i < alimentos.length; i++) {
        contenido += '<tr>' +
            '<td>' + alimentos[i].producto.nombre + '</td>' +
            '<td>' + alimentos[i].producto.categoria.nombre + '</td>' +
            '<td class="text-end">' + alimentos[i].producto.precio.toFixed(2) + '</td>' +
            '<td><a href="#" class="text-info" onclick="cm.mostrarDetalleAlimento(' + alimentos[i].id + ');"><i class="fas fa-eye"></i></a>'+ '</td>' +
            '</tr>';
    }

    document.getElementById("tbodyAlimentos").innerHTML = contenido;
}

// Llenar combo de categorías
function llenarComboBoxCategorias() {
    let contenido = '';

    for (let i = 0; i < categorias.length; i++) {
        contenido += '<option value="' + categorias[i].id + '">' + categorias[i].nombre + '</option>';
    }

    document.getElementById('cmbCategoria').innerHTML = contenido;
}

// Buscar posición del alimento por ID
function buscarPosicionAlimentoPorID(idAlimento) {
    for (let i = 0; i < alimentos.length; i++) {
        if (alimentos[i].id === idAlimento)
            return i;
    }

    return -1;
}

// Mostrar/ocultar detalle de alimento
export function setDetalleAlimentoVisible(valor) {
    if (valor) {
        document.getElementById('divCatalogoAlimentos').style.display = 'none';
        document.getElementById('divDetalleAlimento').style.display = '';
    } else {
        document.getElementById('divDetalleAlimento').style.display = 'none';
        document.getElementById('divCatalogoAlimentos').style.display = '';
    }
}

// Generar ID para alimento
function generarIDAlimento() {
    let ultimoID = 0;

    if (alimentos.length > 0) {
        ultimoID = alimentos[0].id;
        for (let i = 0; i < alimentos.length; i++) {
            if (alimentos[i].id > ultimoID)
                ultimoID = alimentos[i].id;
        }
    }
    ultimoID++;
    return ultimoID;
}

// Buscar categoría por ID
function buscarCategoriaPorID(idCategoria) {
    for (let i = 0; i < categorias.length; i++) {
        if (categorias[i].id == idCategoria)
            return categorias[i];
    }
    return null;
}

