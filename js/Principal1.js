let cm = null; //current Module
async function cargarModuloAlimentos()
{
    //Definimos la Url donde esta el codigo HTML del Modulo
    let url = 'modulos/alimento.html';
    
    //Hacemos la peticion del documento del modulo
    let resp = await fetch(url);
    
    //convertimos la respuesta del servidor en texto HTML
    let contenido = await resp.text();
    
    //insertamos la respuesta del servidor en texto HTML
    document.getElementById("contenedorPrincipal").innerHTML = contenido;
    
    /*fetch: es una funcion que permite hacer peticiones al servidor para optener 
    documentos tanto del dominio de la aplicacion web como de otros*/
    
    import('./modulos/alimento.js').then(obj => {
        cm = obj;
        obj.inicializarModulo();
    });
}

async function cargarModuloBebidas()
{
    let url = 'modulos/bebida.html';
    let resp = await fetch(url);
    let contenido = await resp.text();
    document.getElementById("contenedorPrincipal").innerHTML = contenido;
     import('./modulos/bebida.js').then(obj => {
        cm = obj;
        obj.inicializarModulo();
    });
}

async function cargarModuloCombos()
{
    let url = 'modulos/Combo.html';
    let resp = await fetch(url);
    let contenido = await resp.text();
    document.getElementById("contenedorPrincipal").innerHTML = contenido;
      import('./modulos/combo.js').then(obj => {
        cm = obj;
        obj.inicializarModulo();
    });
}

async function cargarModuloUsuario()
{
    let url = 'modulos/usuario.html';
    let resp = await fetch(url);
    let contenido = await resp.text();
    document.getElementById("contenedorPrincipal").innerHTML = contenido;
      import('./modulos/usuario.js').then(obj => {
        cm = obj;
        obj.inicializarModulo();
    });
}

async function cargarModuloSucursales()
{
    let url = 'modulos/sucursales.html';
    let resp = await fetch(url);
    let contenido = await resp.text();
    document.getElementById("contenedorPrincipal").innerHTML = contenido;
      import('./modulos/sucursal.js').then(obj => {
        cm = obj;
        obj.inicializarModulo();
    });
       
}