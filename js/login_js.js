

    function validarUsuario() {
                // Datos de acceso predefinidos
                const usuarioCorrecto = "Admin";
                const contraseniaCorrecta = "1234";

                // Obtener valores ingresados
                const usuarioIngresado = document.getElementById('txtUsuario').value;
                const contraseniaIngresada = document.getElementById('txtContrasenia').value;

                // Validar credenciales
                if (usuarioIngresado === usuarioCorrecto && contraseniaIngresada === contraseniaCorrecta) {
                    
                    // Redirigir a una nueva página (por ejemplo, dashboard.html)
                    window.location.href = "principal.html";
                } else {
                    alert("Usuario o Password incorrectos");
                }
            }

//Tarea
//Traer formulario para capturar los datos de una linea,
//alimentos
