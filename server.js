const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

// Habilitar la lectura de datos de formularios (POST)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir archivos estáticos (imágenes, fondos) desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Función auxiliar para renderizar la vista de Login (con o sin error)
function getLoginTemplate(errorMessage = "") {
    let errorHtml = "";
    if (errorMessage) {
        // Estilo adaptado para mostrar la alerta en rojo estructurada de la institución
        errorHtml = `<div style="color: #d32f2f; font-weight: 500; margin-bottom: 25px; font-size: 15px; text-align: center;">${errorMessage}</div>`;
    }

    return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Servicios Escolares - Universidad Modelo</title>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
            <style>
                body {
                    background: #e9ecef url('https://www.transparenttextures.com/patterns/cream-paper.png');
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    font-family: 'Segoe UI', sans-serif;
                }
                .login-card {
                    background: white;
                    padding: 40px 30px;
                    width: 100%;
                    max-width: 420px;
                    border-radius: 4px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    text-align: center;
                }
                .logo-container img {
                    width: 130px;
                    height: auto;
                    margin-bottom: 10px;
                }
                .system-title {
                    font-size: 24px;
                    color: #555;
                    font-weight: 300;
                    letter-spacing: 1px;
                    margin-bottom: 2px;
                }
                .system-subtitle {
                    font-size: 22px;
                    color: #555;
                    font-weight: 300;
                    letter-spacing: 1px;
                    margin-bottom: 30px;
                }
                .input-field {
                    margin-bottom: 25px;
                    position: relative;
                }
                .input-field i {
                    position: absolute;
                    left: 0;
                    top: 10px;
                    color: #111111;
                    font-size: 26px;
                }
                .input-field input {
                    padding-left: 40px !important;
                    box-sizing: border-box;
                }
                .btn-custom {
                    width: 100%;
                    background-color: #007bc4 !important;
                    margin-bottom: 15px;
                    text-transform: uppercase;
                    font-weight: 500;
                    height: 45px;
                    line-height: 45px;
                    border-radius: 4px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }
                .forgot-password {
                    display: block;
                    margin-top: 20px;
                    color: #007bc4;
                    text-decoration: none;
                    font-size: 14px;
                }
            </style>
        </head>
        <body>

            <div class="login-card">
                <div class="logo-container">
                    <img src="/logo.png" alt="Logo">
                </div>
                <div class="system-title">SERVICIOS</div>
                <div class="system-subtitle">ESCOLARES</div>

                ${errorHtml}

                <form action="/login" method="POST">
                    <div class="input-field">
                        <i class="material-icons">person</i>
                        <input id="username" name="username" type="text" required>
                        <label for="username" style="left: 40px;">Usuario</label>
                    </div>
                    
                    <div class="input-field">
                        <i class="material-icons">lock</i>
                        <input id="password" name="password" type="password" required>
                        <label for="password" style="left: 40px;">Contraseña</label>
                    </div>

                    <button type="submit" class="btn btn-custom waves-effect waves-light">Entrar</button>
                    <a href="#" class="btn btn-custom waves-effect waves-light">Servicio Social</a>
                    <a href="#" class="btn btn-custom waves-effect waves-light">Nuevo Ingreso</a>
                    
                    <a href="#" class="forgot-password">Olvidé mi contraseña</a>
                </form>
            </div>

            <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
        </body>
        </html>
    `;
}

// 1. RUTA DE INICIO (Muestra el login limpio por defecto)
app.get('/', (req, res) => {
    res.send(getLoginTemplate());
});

// 2. RUTA POST /LOGIN: Maneja la validación de credenciales solicitada
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Validación estricta: Usuario "15246740" y Contraseña "ARCOS"
    if (username === "15246740" && password === "ARCOS") {
        // Si es correcto, da acceso al Panel del Alumno
        res.send(`
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Portal de Alumnos - Universidad Modelo</title>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
                <style>
                    body {
                        background-color: #f4f6f9;
                        font-family: 'Segoe UI', Roboto, sans-serif;
                        margin: 0;
                    }
                    
                    /* Barra Superior Oficial */
                    .navbar-fixed {
                        height: 64px;
                        z-index: 997;
                    }
                    .navbar-color {
                        background-color: #0d2c54 !important;
                    }
                    .nav-wrapper {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 0 20px;
                    }
                    .brand-section {
                        display: flex;
                        align-items: center;
                    }
                    .logo-menu-top {
                        height: 40px;
                        width: auto;
                        margin-left: 15px;
                    }
                    .brand-title {
                        font-size: 20px;
                        color: white;
                        margin-left: 15px;
                        font-weight: 400;
                    }
                    .select-wrapper-custom {
                        margin-left: 10px;
                        width: 180px;
                    }
                    #menu-navegacion {
                        background-color: rgba(255, 255, 255, 0.9);
                        border: none;
                        border-radius: 2px;
                        height: 30px;
                        color: #333;
                        font-size: 13px;
                        display: inline-block;
                    }
                    .user-info-top {
                        color: white;
                        font-size: 13px;
                        font-weight: 400;
                        display: flex;
                        align-items: center;
                    }

                    /* Menú Lateral con diseño de flechas finas */
                    .side-nav-container {
                        width: 300px;
                        background-color: #ffffff;
                        box-shadow: 2px 0 5px rgba(0,0,0,0.05);
                        position: fixed;
                        height: calc(100vh - 64px);
                        top: 64px; left: 0;
                        overflow-y: auto;
                        z-index: 996;
                    }
                    .side-nav-container ul {
                        margin: 0;
                        padding: 0;
                        list-style: none;
                    }
                    .side-nav-container li {
                        border-bottom: 1px solid #f2f2f2;
                    }
                    .side-nav-container li a {
                        color: #222222;
                        font-size: 14px;
                        font-weight: 400;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 0 24px;
                        height: 54px;
                        line-height: 54px;
                        text-decoration: none;
                        cursor: pointer;
                    }
                    .side-nav-container li a:hover {
                        background-color: #f7f9fa;
                    }
                    .arrow-icon {
                        color: #9e9e9e;
                        font-size: 18px;
                    }

                    /* Submenú Extraordinarios */
                    .collapsible-body-custom {
                        display: none;
                        background-color: #fafafa;
                    }
                    .collapsible-body-custom li a {
                        padding-left: 50px;
                        height: 45px;
                        line-height: 45px;
                    }

                    /* Área de contenidos derecha con fondo texturizado */
                    .main-content-area {
                        margin-left: 300px;
                        padding: 30px;
                        min-height: calc(100vh - 64px);
                        background: #e9ecef url('https://www.transparenttextures.com/patterns/cream-paper.png');
                        box-sizing: border-box;
                    }
                    .content-card {
                        background: white;
                        padding: 35px;
                        border-radius: 4px;
                        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                        min-height: 450px;
                    }
                    .content-card h4 {
                        margin: 0 0 20px 0;
                        color: #0d2c54;
                        font-size: 24px;
                        font-weight: bold;
                        border-bottom: 2px solid #0d2c54;
                        padding-bottom: 10px;
                    }

                    .simulated-table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 20px;
                    }
                    .simulated-table th, .simulated-table td {
                        border: 1px solid #e0e0e0;
                        padding: 12px;
                        font-size: 14px;
                    }
                    .simulated-table th {
                        background-color: #f8f9fa;
                        color: #0d2c54;
                    }

                    @media only screen and (max-width : 992px) {
                        .side-nav-container { display: none; }
                        .main-content-area { margin-left: 0; }
                    }
                </style>
            </head>
            <body>

                <div class="navbar-fixed">
                    <nav class="navbar-color">
                        <div class="nav-wrapper">
                            <div class="brand-section">
                                <a href="javascript:void(0);" style="color:white; display: flex; align-items: center;">
                                    <i class="material-icons" style="font-size:30px;">menu</i>
                                </a>
                                <img src="/logo.png" alt="Escudo" class="logo-menu-top">
                                <div class="select-wrapper-custom">
                                    <select id="menu-navegacion" class="browser-default">
                                        <option value="libreta_de_pago" selected>Libreta de pago</option>
                                        <option value="logout">Salir</option>
                                    </select>
                                </div>
                                <span class="brand-title">Universidad Modelo</span>
                            </div>
                            
                            <div class="user-info-top">
                                <span>SANTIAGO DE JESUS ARCOS GUZMAN</span>
                                <a href="javascript:void(0);" class="dropdown-trigger" data-target="profile-dropdown" style="color: white; margin-left: 10px;">
                                    <i class="material-icons">more_vert</i>
                                </a>
                                <ul id="profile-dropdown" class="dropdown-content">                   
                                    <li>
