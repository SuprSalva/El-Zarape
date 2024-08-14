/* global sucursal, Swal */

// Definir funciones en el contexto global
window.mostrarDetalleSucursal = mostrarDetalleSucursal;
window.mostrarFormularioNuevo = mostrarFormularioNuevo;
window.setDetalleSucursalVisible = setDetalleSucursalVisible;

let horarios = [
    { id: 1, horario: "Lunes a Viernes 9 a.m - 10 p.m" },
    { id: 2, horario: "Lunes a Viernes 11 a.m. - 9 p.m." },
    { id: 3, horario: "Lunes a Viernes 10 a.m. - 8 p.m." },
    { id: 4, horario: "Lunes a Viernes 2 p.m. - 11 p.m." },
    { id: 5, horario: "Lunes a Viernes 8 a.m. - 10 p.m." }
];

let sucursales = [
    {
        id: 1,
        sucursal: {
            id: 1,
            nombre: "Sucursal 1",
            descripcion: "Primera Sucursal en abrir",
            foto: "",
            direccion: "Blvd Lopez mateos #304",
            latitud: "24,98",
            longitud: "76,60",
            horario: {
                id: 1,
                horario: "Lunes a Viernes 9 a.m - 10 p.m"
            }
        }
    },
    {
        id: 2,
        sucursal: {
            id: 2,
            nombre: "Sucursal 2",
            descripcion: "Segunda sucursal en abrir",
            foto: "",
            direccion: "Blvd Mariano Escobedo #1122",
            latitud: "99,18",
            longitud: "66,10",
            horario: {
                id: 2,
                horario: "Lunes a Viernes 11 a.m. - 9 p.m."
            }
        }
    },
    {
        id: 3,
        sucursal: {
            id: 3,
            nombre: "Sucursal 3",
            descripcion: "Tercera sucursal en abrir",
            foto: "",
            direccion: "Blvd Hilario Medina #1502",
            latitud: "22,28",
            longitud: "12,57",
            horario: {
                id: 3,
                horario: "Lunes a Viernes 10 a.m. - 8 p.m."
            }
        }
    },
    {
        id: 4,
        sucursal: {
            id: 4,
            nombre: "Sucursal 4",
            descripcion: "Cuarta Sucursal en abrir",
            foto: "",
            direccion: "Av. Cerro Gordo #2001",
            latitud: "21.152",
            longitud: "-101.654",
            horario: {
                id: 4,
                horario: "Lunes a Viernes 2 p.m. - 11 p.m."
            }
        }
    },
    {
        id: 5,
        sucursal: {
            id: 5,
            nombre: "Sucursal 5",
            descripcion: "Quinta sucursal en abrir",
            foto: "",
            direccion: "Av. Paseo de los Insurgentes #3500",
            latitud: "21.143",
            longitud: "-101.652",
            horario: {
                id: 5,
                horario: "Lunes a Viernes 8 a.m. - 10 p.m."
            }
        }
    }
];



export function inicializarModulo() {
    setDetalleSucursalVisible(false);
    llenarComboBoxHorarios();
    llenarTabla();
}
export function guardar() {
    let posTemp = -1;

    // Crear el objeto sucursal:
    let nuevaSucursal = {
        id: 0,
        nombre: document.getElementById("txtSucursal").value.trim(),
        descripcion: document.getElementById("txtDescripcionSucursal").value.trim(),
        direccion: document.getElementById("txtDireccionSucursal").value.trim(),
        latitud: document.getElementById("txtGPSLatitud").value.trim(),
        longitud: document.getElementById("txtGPSLongitud").value.trim(),
        horario: buscarHorarioPorID(parseInt(document.getElementById("cmbHorario").value))
    };

    // Buscar la posición de la sucursal para ver si ya existe:
    posTemp = buscarPosicionSucursalPorID(parseInt(document.getElementById("txtId").value));

    if (posTemp >= 0) {
        // Si la sucursal ya existe, actualizamos:
        nuevaSucursal.id = parseInt(document.getElementById("txtId").value);
        sucursales[posTemp].sucursal = nuevaSucursal;
    } else {
        // Si no existe, asignamos un nuevo ID y la añadimos:
        nuevaSucursal.id = generarIDSucursal();
        sucursales.push({ id: nuevaSucursal.id, sucursal: nuevaSucursal });
        document.getElementById("txtId").value = nuevaSucursal.id;
    }

    Swal.fire('Movimiento realizado.', 'Datos de sucursal guardados.', 'success');
    llenarTabla();
}

export function eliminar() {
    let idSucursal = parseInt(document.getElementById("txtId").value.trim());

    if (isNaN(idSucursal) || idSucursal <= 0) {
        Swal.fire('', 'ID de sucursal no válido.', 'warning');
        return;
    }

    let pos = buscarPosicionSucursalPorID(idSucursal);

    if (pos < 0) {
        Swal.fire('', 'Sucursal no encontrada.', 'warning');
        return;
    }

    sucursales.splice(pos, 1);

    limpiar();
    llenarTabla();

    Swal.fire('Movimiento realizado.', 'Sucursal eliminada.', 'success');
}

export function limpiar() {
    document.getElementById("txtId").value = '';
    document.getElementById("txtSucursal").value = '';
    document.getElementById("txtDescripcionSucursal").value = '';
    document.getElementById("txtDireccionSucursal").value = '';
    document.getElementById("txtGPSLatitud").value = '';
    document.getElementById("txtGPSLongitud").value = '';
    document.getElementById("cmbHorario").value = '';
}



export function consultar() {
    let nombreSucursal = document.getElementById("txtBuscarSucursal").value.toLowerCase().trim();
    let sucursalEncontrada = null;

    for (let i = 0; i < sucursales.length; i++) {
        if (sucursales[i].sucursal.nombre.toLowerCase() === nombreSucursal) {
            sucursalEncontrada = sucursales[i];
            break;
        }
    }

    if (sucursalEncontrada) {
        mostrarDetalleSucursal(sucursalEncontrada.id);
    } else {
        Swal.fire('', 'Sucursal no encontrada.', 'warning');
    }
}

export function mostrarDetalleSucursal(idSucursal) {
    let pos = buscarPosicionSucursalPorID(idSucursal);
    if (pos < 0) {
        Swal.fire('', 'Sucursal no encontrada.', 'warning');
        return;
    }
    limpiar();
    let sucursal = sucursales[pos].sucursal;
    document.getElementById("txtId").value = sucursal.id;
    document.getElementById("txtSucursal").value = sucursal.nombre;
    document.getElementById("txtDescripcionSucursal").value = sucursal.descripcion;
    document.getElementById("txtDireccionSucursal").value = sucursal.direccion;
    document.getElementById("txtGPSLatitud").value = sucursal.latitud;
    document.getElementById("txtGPSLongitud").value = sucursal.longitud;
    document.getElementById("cmbHorario").value = sucursal.horario.id;
    setDetalleSucursalVisible(true);
}

export function mostrarFormularioNuevo() {
    limpiar();
    setDetalleSucursalVisible(true);
}

function llenarTabla() {
    let contenido = '';
    for (let i = 0; i < sucursales.length; i++) {
        contenido += '<tr>' +
            '<td>' + sucursales[i].sucursal.nombre + '</td>' +
            '<td>' + sucursales[i].sucursal.horario.horario + '</td>' +
            '<td>' + sucursales[i].sucursal.direccion + '</td>' +
            '<td>' + sucursales[i].sucursal.longitud + '</td>' +
            '<td>' + sucursales[i].sucursal.latitud + '</td>' +
            '<td><a href="#" class="text-danger" onclick="mostrarDetalleSucursal(' + sucursales[i].id + ');">\n\
             <i class="fas fa-eye"></i></a></td>' + '</td>' + '</tr>';
    }
    document.getElementById("tbodySucursales").innerHTML = contenido;
}

function llenarComboBoxHorarios() {
    let contenido = '';
    for (let i = 0; i < horarios.length; i++) {
        contenido += '<option value="' + horarios[i].id + '">' + horarios[i].horario + '</option>';
    }
    document.getElementById('cmbHorario').innerHTML = contenido;
}

function buscarPosicionSucursalPorID(idSucursal) {
    for (let i = 0; i < sucursales.length; i++) {
        if (sucursales[i].id === idSucursal)
            return i;
    }
    return -1;
}

export function setDetalleSucursalVisible(valor) {
    if (valor) {
        document.getElementById('divCatalogoSucursales').style.display = 'none';
        document.getElementById('divDetalleSucursal').style.display = 'block';
    } else {
        document.getElementById('divDetalleSucursal').style.display = 'none';
        document.getElementById('divCatalogoSucursales').style.display = 'block';
    }
}

function generarIDSucursal() {
    let ultimoID = 0;

    if (sucursales.length > 0) {
        ultimoID = sucursales[0].id;
        for (let i = 0; i < sucursales.length; i++) {
            if (sucursales[i].id > ultimoID)
                ultimoID = sucursales[i].id;
        }
    }
    ultimoID++;
    return ultimoID;
}

function buscarHorarioPorID(idHorario) {
    for (let i = 0; i < horarios.length; i++) {
        if (horarios[i].id === idHorario) {
            return horarios[i];
        }
    }
    return null;
}