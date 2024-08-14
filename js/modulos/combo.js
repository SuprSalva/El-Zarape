let combos = [
    {
        id: 1,
        nombre: "Combo Mexicano",
        descripcion: "Incluye Tacos, Refresco y Postre.",
        alimentos: ["Tacos"],
        bebidas: ["Refresco"],
        otros: ["Postre"],
        precio: 50.00
    },
    {
        id: 2,
        nombre: "Combo Vegetariano",
        descripcion: "Incluye Ensalada Mediterranea, Agua de Jamaica y Fruta.",
        alimentos: ["Ensalada Mediterranea"],
        bebidas: ["Agua de Jamaica"],
        otros: ["Fruta"],
        precio: 80.00
    },
    {
        id: 3,
        nombre: "Combo Americano",
        descripcion: "Incluye Hamburguesa, Papas Fritas y Refresco.",
        alimentos: ["Hamburguesa"],
        bebidas: ["Refresco"],
        otros: ["Papas Fritas"],
        precio: 70.00
    },
    {
        id: 4,
        nombre: "Combo Italiano",
        descripcion: "Incluye Pizza, Ensalada Cesar y Vino Tinto.",
        alimentos: ["Pizza"],
        bebidas: ["Vino Tinto"],
        otros: ["Ensalada Cesar"],
        precio: 120.00
    },
    {
        id: 5,
        nombre: "Combo Asiatico",
        descripcion: "Incluye Sushi, Sopa Miso y Te Verde.",
        alimentos: ["Sushi"],
        bebidas: ["Te Verde"],
        otros: ["Sopa Miso"],
        precio: 90.00
    }
];


// Inicializa el módulo de combos
export function inicializarModulo() {
    setDetalleComboVisible(false);
    llenarTablaCombos();
}

export function guardar() {
    let posTemp = -1;

    let combo = {};

    combo.id = 0;
    combo.nombre = document.getElementById("txtNombreCombo").value;
    combo.descripcion = document.getElementById("txtDescripcionCombo").value;
    combo.precio = parseFloat(document.getElementById("txtPrecioCombo").value);
    combo.alimentos = document.getElementById("txtAlimentoCombo").value.split(','); // Separa por comas
    combo.bebidas = document.getElementById("txtBebidaCombo").value.split(',');
    combo.otros = document.getElementById("txtOtroProductoCombo").value.split(',');

    posTemp = buscarPosicionComboPorID(parseInt(document.getElementById("txtIdCombo").value));
    if (posTemp >= 0) {
        combo.id = parseInt(document.getElementById("txtIdCombo").value);
        combos[posTemp] = combo;
    } else {
        combo.id = generarIDCombo();
        combos.push(combo);
        document.getElementById("txtIdCombo").value = combo.id;
    }

    llenarTablaCombos();

    Swal.fire('Movimiento realizado.', 'Datos del combo guardados.', 'success');
}

// Eliminar combo
export function eliminar() {
    let idCombo = parseInt(document.getElementById("txtIdCombo").value);

    if (isNaN(idCombo) || idCombo <= 0) {
        Swal.fire('Error', 'ID inválido.', 'error');
        return;
    }

    let pos = buscarPosicionComboPorID(idCombo);

    if (pos >= 0) {
        combos.splice(pos, 1);
        llenarTablaCombos();
        limpiar();
        Swal.fire('Eliminado', 'El combo ha sido eliminado.', 'success');
    } else {
        Swal.fire('Error', 'No se encontró el combo.', 'error');
    }
}

// Limpiar formulario de combo
export function limpiar() {
    document.getElementById("txtIdCombo").value = '';
    document.getElementById("txtNombreCombo").value = '';
    document.getElementById("txtDescripcionCombo").value = '';
    document.getElementById("txtPrecioCombo").value = '';
    document.getElementById("txtAlimentoCombo").value = '';
    document.getElementById("txtBebidaCombo").value = '';
    document.getElementById("txtOtroProductoCombo").value = '';
}

// Mostrar detalle del combo
export function mostrarDetalleCombo(idCombo) {
    let combo = null;
    let pos = buscarPosicionComboPorID(idCombo);

    if (pos < 0) {
        Swal.fire('', 'Combo no encontrado.', 'warning');
        return;
    }

    limpiar();
    combo = combos[pos];
    document.getElementById("txtIdCombo").value = combo.id;
    document.getElementById("txtNombreCombo").value = combo.nombre;
    document.getElementById("txtDescripcionCombo").value = combo.descripcion;
    document.getElementById("txtPrecioCombo").value = combo.precio;
    document.getElementById("txtAlimentoCombo").value = combo.alimentos.join(', ');
    document.getElementById("txtBebidaCombo").value = combo.bebidas.join(', ');
    document.getElementById("txtOtroProductoCombo").value = combo.otros.join(', ');
    setDetalleComboVisible(true);
}

// Mostrar formulario nuevo para combo
export function mostrarFormularioNuevo() {
    limpiar();
    setDetalleComboVisible(true);
}

// Llenar tabla de combos
function llenarTablaCombos() {
    let contenido = '';

    for (let i = 0; i < combos.length; i++) {
        contenido += '<tr>' +
            '<td>' + combos[i].nombre + '</td>' +
            '<td class="text-end">' + combos[i].precio.toFixed(2) + '</td>' +
            '<td>' + combos[i].descripcion + '</td>' +
            '<td>' + combos[i].alimentos.join(', ') + '</td>' +
            '<td>' + combos[i].bebidas.join(', ') + '</td>' +
            '<td>' + combos[i].otros.join(', ') + '</td>' +
            '<td><a href="#" class="text-info" onclick="cm.mostrarDetalleCombo(' + combos[i].id + ');"><i class="fas fa-eye"></i></a></td>' +
            '</tr>';
    }

    document.getElementById("tbodyCombos").innerHTML = contenido;
}

// Buscar posición del combo por ID
function buscarPosicionComboPorID(idCombo) {
    for (let i = 0; i < combos.length; i++) {
        if (combos[i].id === idCombo)
            return i;
    }

    return -1;
}

// Mostrar/ocultar detalle de combo
export function setDetalleComboVisible(valor) {
    if (valor) {
        document.getElementById('divCatalogoCombos').style.display = 'none';
        document.getElementById('divDetalleCombo').style.display = '';
    } else {
        document.getElementById('divDetalleCombo').style.display = 'none';
        document.getElementById('divCatalogoCombos').style.display = '';
    }
}

// Generar ID para combo
function generarIDCombo() {
    let ultimoID = 0;

    if (combos.length > 0) {
        ultimoID = combos[0].id;
        for (let i = 0; i < combos.length; i++) {
            if (combos[i].id > ultimoID)
                ultimoID = combos[i].id;
        }
    }
    ultimoID++;
    return ultimoID;
}