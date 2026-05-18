const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Logo en Base64 para evitar enlaces rotos
const LOGO_BASE64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABY7eeBAAAASFBMVEUAAAD///8OnMEAnMAAnf8Anf4Anf0AnP8Anf8Anf4Anf8Anf8Anf8Anf8Anv8Anf8Anf8Anf8Anv8Anf8Anv8Anf8Anf8Anf/7yG0WAAAAFnRSTlMA9g72DRb29vYWFvYWFhYW9vb2FhYWFhH3738AAAGpSURBVFjD7ZfZkoMgEEXb0BAsatT//7VpUAnSgG0m86SreS88CgciwS7L/id8tEw8U7Z+b10p368739q27z/HwE7UvXNtzD6r2X7P70ePId/bC6R7jB3w/H4Y8WW87Xp9gUwnXz3Yg79v98N8Z6+XN6R7M9+R/g6ZAn83H+b70vF9Y9G67X3vFpA/6+P7A7A/zPf1h+B7Hn4A0wNoGv4O03Uu6XofwHRbCHmD+T/InL3tXN0h8Z/08G7wK/6T6X/6L/ivX/Ffvw6H4L8eP2f3+G7wfY9D8Pf6Ew6Hw+FwOBwO99C4MbyTid279uC8C2N+F6yI5N0P68G4O7Euxv8mVsX+zZg7scgC+E203G9ihpL30EshTiyE/Cai96XkPRRi8pXEXBPy6X0l6wH4SszfF0ImIeaf9w6ZixmBf4M5u9Nf6Yv9GZitGZ9/gxlpX+x7MGMz7v4OplK+2PdgnAWDfwvGWTB07jVDP+96ZpB6ZpB6ZtDT09PT09PT09PT09PT08vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL+/8ZfwD8yBv1RstbYwAAAABJRU5ErkJggg==";

function getLoginTemplate(showAlert = false) {
    let alertScript = "";
    if (showAlert) {
        alertScript = `
            <script>
                document.addEventListener('DOMContentLoaded', function() {
                    var alertBox = document.createElement('div');
                    alertBox.innerHTML = \`
                        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.4); display: flex; justify-content: center; align-items: center; z-index: 10000;">
                            <div style="background: #ffffff; padding: 30px 40px; border-radius: 8px; max-width: 440px; width: 85%; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.15); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                                <h4 style="margin: 0 0 12px 0; color: #4a4a4a; font-weight: bold; font-size: 32px; letter-spacing: -0.5px;">Escuela Modelo</h4>
                                <p style="color: #7a7a7a; font-size: 17px; margin: 0 0 25px 0; font-weight: 300;">Usuario y/o contraseña inválidos</p>
                                <button onclick="this.parentElement.parentElement.remove()" style="background: #2979ff; color: white; border: none; padding: 10px 32px; border-radius: 6px; font-weight: 500; cursor: pointer; font-size: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: background 0.2s;">Ok</button>
                            </div>
                        </div>
                    \`;
                    document.body.appendChild(alertBox);
                });
            </script>
        `;
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
                body { background: #e9ecef url('https://www.transparenttextures.com/patterns/cream-paper.png'); display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Segoe UI', sans-serif; }
                .login-card { background: white; padding: 40px 30px; width: 100%; max-width: 420px; border-radius: 4px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center; z-index: 10; }
                .logo-container img { width: 110px; height: auto; margin-bottom: 10px; display: inline-block; }
                .system-title { font-size: 24px; color: #555; font-weight: 300; letter-spacing: 1px; margin-bottom: 2px; }
                .system-subtitle { font-size: 22px; color: #555; font-weight: 300; letter-spacing: 1px; margin-bottom: 20px; }
                .input-field { margin-bottom: 25px; position: relative; }
                .input-field i { position: absolute; left: 0; top: 10px; color: #111111; font-size: 26px; }
                .input-field input { padding-left: 40px !important; box-sizing: border-box; }
                .btn-custom { width: 100%; background-color: #007bc4 !important; margin-bottom: 15px; text-transform: uppercase; font-weight: 500; height: 45px; line-height: 45px; border-radius: 4px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
                .forgot-password { display: block; margin-top: 20px; color: #007bc4; text-decoration: none; font-size: 14px; }
                .error-text { color: #cc0000; font-weight: 500; margin-bottom: 20px; font-size: 15px; }
            </style>
        </head>
        <body>
            <div class="login-card">
                <div class="logo-container"><img src="${LOGO_BASE64}" alt="Logo"></div>
                <div class="system-title">SERVICIOS</div>
                <div class="system-subtitle">ESCOLARES</div>
                
                ${showAlert ? '<div class="error-text">Escuela Modelo Usuario y/o contraseña inválidos</div>' : ''}

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
            ${alertScript}
        </body>
        </html>
    `;
}

function getPortalTemplate() {
    return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>Horarios del alumno | SCEM</title>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
            <link media="all" type="text/css" rel="stylesheet" href="https://alumnos.unimodelo.mx/css/materialize.css">
            <link media="all" type="text/css" rel="stylesheet" href="https://alumnos.unimodelo.mx/css/style.css">
            <link media="all" type="text/css" rel="stylesheet" href="https://alumnos.unimodelo.mx/css/app.css">
            
            <style>
                .mainPaddingSidebar { padding-left:240px; }
                .mainPaddingLeft { padding-left:0px; }
                @media only screen and (max-width: 992px) {
                    .mainPaddingSidebar { padding-left: 0px !important; }
                }
                .brand-sidebar center img { background: transparent; padding: 5px; margin-top: 10px; }
                .libreta-container { font-family: 'Segoe UI', Arial, sans-serif; color: #333333; font-size: 14.5px; line-height: 1.6; }
                .libreta-blue-text { color: #0033cc; font-weight: bold; }
                .libreta-divider { border: 0; border-top: 1px solid #cccccc; margin: 20px 0; }
                .libreta-subtitle-large { font-size: 21px; color: #333333; font-weight: 300; margin-bottom: 15px; }
                .libreta-title-ins { font-weight: bold; text-decoration: underline; font-size: 15px; margin-bottom: 5px; }
                .libreta-bank-header { font-weight: bold; color: #0020c2; font-size: 15px; margin-top: 15px; text-transform: uppercase; }
                .libreta-bank-header-hsbc { font-weight: bold; color: #990000; font-size: 15px; margin-top: 20px; text-transform: uppercase; }
                .libreta-indented-block { margin-left: 15px; margin-bottom: 15px; }
                .libreta-red-note { color: #a30000; font-weight: bold; margin: 25px 0; font-size: 14.5px; text-transform: uppercase; }
                .libreta-action-btn { background-color: #007bc4 !important; color: white !important; font-weight: 400; text-transform: uppercase; padding: 0 25px; height: 46px; line-height: 46px; border-radius: 4px; display: inline-block; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.15); font-size: 14.5px; margin-top: 10px; }
                .simulated-table { width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 25px; font-size: 14px; color: #333; }
                .simulated-table th, .simulated-table td { border: 1px solid #cccccc; padding: 10px 12px; text-align: left; }
                .simulated-table th { background-color: #f5f5f5; color: #111111; font-weight: bold; }
                .simulated-table tr:nth-child(even) { background-color: #fafafa; }
                header nav { background-color: #0d47a1 !important; }
                .side-nav li a i.material-icons { margin: 0 16px 0 0; }
            </style>
        </head>
        <body>

            <header id="header" class="page-topbar">
                <div class="navbar-fixed">
                    <nav class="navbar-color">
                        <div class="nav-wrapper">
                            <a href="#" style="color:white; float:left;" class="sidenav-trigger-show">
                                <i class="material-icons" style="font-size:30px; margin-left: 20px; line-height: 64px;">menu</i>
                            </a>
                            <div class="header-search-wrapper sideNav-lock" style="display: inline-block; width: 60%; margin-left: 20px;">
                                <select id="menu-navegacion" class="browser-
