const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

// Configuración de middlewares esenciales
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Logotipo Oficial de la Universidad Modelo en Base64
const LOGO_BASE64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABY7eeBAAAASFBMVEUAAAD///8OnMEAnMAAnf8Anf4Anf0AnP8Anf8Anf4Anf8Anf8Anf8Anf8Anv8Anf8Anf8Anf8Anv8Anf8Anv8Anf8Anf8Anf/7yG0WAAAAFnRSTlMA9g72DRb29vYWFvYWFhYW9vb2FhYWFhH3738AAAGpSURBVFjD7ZfZkoMgEEXb0BAsatT//7VpUAnSgG0m86SreS88CgciwS7L/id8tEw8U7Z+b10p368739q27z/HwE7UvXNtzD6r2X7P70ePId/bC6R7jB3w/H4Y8uW87Xp9gUwnXz3Yg79v98N8Z6+XN6R7M9+R/g6ZAn83H+b70vF9Y9G67X3vFpA/6+P7A7A/zPf1h+B7Hn4A0wNoGv4O03Uu6XofwHRbCHmD+T/InL3tXN0h8Z/08G7wK/6T6X/6L/ivX/Ffvw6H4L8eP2f3+G7wfY9D8Pf6Ew6Hw+FwOBwO99C4MbyTid279uC8C2N+F6yI5N0P68G4O7Euxv8mVsX+zZg7scgC+E203G9ihpL30EshTiyE/Cai96XkPRRi8pXEXBPy6X0l6wH4SszfF0ImIeaf9w6ZixmBf4M5u9Nf6Yv9GZitGZ9/gxlpX+x7MGMz7v4OplK+2PdgnAWDfwvGWTB07jVDP+96ZpB6ZpB6ZtDT09PT09PT09PT09PT08vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL+/8ZfwD8yBv1RstbYwAAAABJRU5ErkJggg==";

// 1. PLANTILLA DE LOGIN
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
                .system-subtitle { font-size: 22px; color: #555; font-weight: 300; letter-spacing: 1px; margin-bottom: 30px; }
                .input-field { margin-bottom: 25px; position: relative; }
                .input-field i { position: absolute; left: 0; top: 10px; color: #111111; font-size: 26px; }
                .input-field input { padding-left: 40px !important; box-sizing: border-box; }
                .btn-custom { width: 100%; background-color: #007bc4 !important; margin-bottom: 15px; text-transform: uppercase; font-weight: 500; height: 45px; line-height: 45px; border-radius: 4px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
                .forgot-password { display: block; margin-top: 20px; color: #007bc4; text-decoration: none; font-size: 14px; }
            </style>
        </head>
        <body>
            <div class="login-card">
                <div class="logo-container"><img src="${LOGO_BASE64}" alt="Logo"></div>
                <div class="system-title">SERVICIOS</div>
                <div class="system-subtitle">ESCOLARES</div>
                
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

// 2. PLANTILLA DEL PORTAL DEL ALUMNO
function getPortalTemplate() {
    return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Portal de Alumnos - Universidad Modelo</title>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
            <style>
                body { background-color: #f4f6f9; font-family: 'Segoe UI', Roboto, sans-serif; margin: 0; }
                .navbar-fixed { height: 64px; z-index: 997; }
                .navbar-color { background-color: #0d2c54 !important; }
                .nav-wrapper { display: flex; align-items: center; justify-content: space-between; padding: 0 20px; }
                .brand-section { display: flex; align-items: center; }
                .logo-menu-top { height: 42px; width: auto; margin-left: 15px; background: white; border-radius: 50%; padding: 2px; }
                .brand-title { font-size: 20px; color: white; margin-left: 15px; font-weight: 400; }
                .select-wrapper-custom { margin-left: 10px; width: 180px; }
                #menu-navegacion { background-color: rgba(255, 255, 255, 0.9); border: none; border-radius: 2px; height: 30px; color: #333; font-size: 13px; display: inline-block; }
                .user-info-top { color: white; font-size: 13px; font-weight: 400; display: flex; align-items: center; }
                .side-nav-container { width: 300px; background-color: #ffffff; box-shadow: 2px 0 5px rgba(0,0,0,0.05); position: fixed; height: calc(100vh - 64px); top: 64px; left: 0; overflow-y: auto; z-index: 996; }
                .side-nav-container ul { margin: 0; padding: 0; list-style: none; }
                .side-nav-container li { border-bottom: 1px solid #f2f2f2; }
                .side-nav-container li a { color: #222222; font-size: 14px; font-weight: 400; display: flex; align-items: center; justify-content: space-between; padding: 0 24px; height: 54px; line-height: 54px; text-decoration: none; cursor: pointer; }
                .side-nav-container li a:hover { background-color: #f7f9fa; }
                .arrow-icon { color: #9e9e9e; font-size: 18px; }
                .collapsible-body-custom { display: none; background-color: #fafafa; }
                .collapsible-body-custom li a { padding-left: 50px; height: 45px; line-height: 45px; }
                .main-content-area { margin-left: 300px; padding: 30px; min-height: calc(100vh - 64px); background: #e9ecef url('https://www.transparenttextures.com/patterns/cream-paper.png'); box-sizing: border-box; }
                .content-card { background: white; padding: 35px; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); min-height: 450px; }
                .content-card h4 { margin: 0 0 20px 0; color: #333333; font-size: 24px; font-weight: 300; padding-bottom: 10px; }
                
                /* Estilos Generales de Contenido */
                .libreta-container { font-family: 'Segoe UI', Arial, sans-serif; color: #333333; font-size: 14.5px; line-height: 1.5; }
                .libreta-blue-text { color: #0033cc; font-weight: bold; }
                .libreta-divider { border: 0; border-top: 1px solid #cccccc; margin: 20px 0; }
                .libreta-subtitle-large { font-size: 21px; color: #333333; font-weight: 300; margin-bottom: 15px; }
                .libreta-title-ins { font-weight: bold; text-decoration: underline; font-size: 15px; margin-bottom: 5px; }
                .libreta-bank-header { font-weight: bold; color: #0020c2; font-size: 15px; margin-top: 15px; }
                .libreta-bank-header-hsbc { font-weight: bold; color: #990000; font-size: 15px; margin-top: 20px; }
                .libreta-indented-block { margin-left: 5px; margin-bottom: 15px; }
                .libreta-red-note { color: #990000; font-weight: bold; margin: 25px 0; font-size: 15px; }
                .libreta-action-btn { background-color: #007bc4 !important; color: white !important; font-weight: 400; text-transform: uppercase; padding: 0 25px; height: 46px; line-height: 46px; border-radius: 4px; display: inline-block; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.15); font-size: 14.5px; }

                /* Tablas e información del Alumno */
                .simulated-table { width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 25px; font-size: 14px; color: #333; }
                .simulated-table th, .simulated-table td { border: 1px solid #cccccc; padding: 10px 12px; text-align: left; }
                .simulated-table th { background-color: #f5f5f5; color: #111111; font-weight: bold; }
                .simulated-table tr:nth-child(even) { background-color: #fafafa; }
                .student-info-box { font-size: 15px; line-height: 1.6; margin-bottom: 20px; color: #222; }

                @media only screen and (max-width : 992px) { .side-nav-container { display: none; } .main-content-area { margin-left: 0; } }
            </style>
        </head>
        <body>
            <div class="navbar-fixed">
                <nav class="navbar-color">
                    <div class="nav-wrapper">
                        <div class="brand-section">
                            <a href="javascript:void(0);" style="color:white; display: flex; align-items: center;"><i class="material-icons" style="font-size:30px;">menu</i></a>
                            <img src="${LOGO_BASE64}" alt="Escudo" class="logo-menu-top">
                            <div class="select-wrapper-custom">
                                <select id="menu-navegacion" class="browser-default">
                                    <option value="horario" selected>Horario</option>
                                    <option value="logout">Salir</option>
                                </select>
                            </div>
                            <span class="brand-title">Universidad Modelo</span>
                        </div>
                        <div class="user-info-top">
                            <span>SANTIAGO DE JESUS ARCOS GUZMAN</span>
                            <a href="javascript:void(0);" class="dropdown-trigger" data-target="profile-dropdown" style="color: white; margin-left: 10px;"><i class="material-icons">more_vert</i></a>
                            <ul id="profile-dropdown" class="dropdown-content">                   
                                <li><a onclick="showSection('micuenta')" class="grey-text text-darken-1"><i class="material-icons">account_box</i>Mi cuenta</a></li>
                                <li><a href="/" class="grey-text text-darken-1"><i class="material-icons">keyboard_tab</i>Salir</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

            <div class="side-nav-container">
                <ul>
                    <li><a onclick="showSection('libreta_de_pago')"><span>LIBRETA DE PAGO</span><i class="material-icons arrow-icon">keyboard_arrow_right</i></a></li>
                    <li><a onclick="showSection('colegiaturas')"><span>COLEGIATURAS / INSCR.</span><i class="material-icons arrow-icon">keyboard_arrow_right</i></a></li>
                    <li><a onclick="showSection('horario')"><span>HORARIO</span><i class="material-icons arrow-icon">keyboard_arrow_right</i></a></li>
                    <li><a onclick="showSection('asignaturas')"><span>ASIGNATURAS</span><i class="material-icons arrow-icon">keyboard_arrow_right</i></a></li>
                    <li><a onclick="showSection('calificaciones')"><span>CALIFICACIONES</span><i class="material-icons arrow-icon">keyboard_arrow_right</i></a></li>
                    <li><a onclick="showSection('ordinarios')"><span>ORDINARIOS</span><i class="material-icons arrow-icon">keyboard_arrow_right</i></a></li>
                    <li><a onclick="showSection('adeudadas')"><span>ASIG.ADEUDADAS</span><i class="material-icons arrow-icon">keyboard_arrow_right</i></a></li>
                    <li><a onclick="showSection('constancias')"><span>CONSTANCIAS</span><i class="material-icons arrow-icon">keyboard_arrow_right</i></a></li>
                    <li>
                        <a onclick="toggleExtraordinarios()">
                            <span style="display:flex; align-items:center;"><i class="material-icons" style="margin-right:10px; color:#555;">dashboard</i>EXTRAORDINARIOS</span>
                            <i class="material-icons arrow-icon" id="arrow-toggle">keyboard_arrow_right</i>
                        </a>
                        <div class="collapsible-body-custom" id="extra-menu">
                            <ul>
                                <li><a onclick="showSection('extraordinarios_inscritos')">Exámenes Inscritos</a></li>
                                <li><a onclick="showSection('extraordinarios_calif')">Calificaciones</a></li>
                            </ul>
                        </div>
                    </li>
                    <li><a onclick="showSection('formularios')"><span>FORMULARIOS</span><i class="material-icons arrow-icon">keyboard_arrow_right</i></a></li>
                    <li><a onclick="showSection('biblioteca')"><span>BIBLIOTECA</span><i class="material-icons arrow-icon">keyboard_arrow_right</i></a></li>
                    <li><a onclick="showSection('micuenta')"><span>MI CUENTA</span><i class="material-icons arrow-icon">keyboard_arrow_right</i></a></li>
                    <li><a onclick="showSection('documentos')"><span>DOCUMENTOS</span><i class="material-icons arrow-icon">keyboard_arrow_right</i></a></li>
                    <li><a onclick="showSection('eduvida')"><span>EDUCACIÓN PARA LA VIDA</span><i class="material-icons arrow-icon">keyboard_arrow_right</i></a></li>
                    <li><a href="/"><span>SALIR</span><i class="material-icons arrow-icon">keyboard_arrow_right</i></a></li>
                </ul>
            </div>
            
            <div class="main-content-area">
                <div id="dynamicContentCard" class="content-card"></div>
            </div>

            <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
            <script>
                const sectionsData = {
                    libreta_de_pago: { 
                        title: "LIBRETA DE PAGO", 
                        html: \`
                            <div class="libreta-container">
                                <p style="margin-bottom: 20px;"><b>Estimado(a) alumno(a):</b> Aquí puedes descargar tu libreta de pago acorde a tu plan de pago previamente registrado: <span class="libreta-blue-text">Colegiatura Diez Meses, y la Inscripción de Enero a pagarse el monto total en el mes de Enero.</span></p>
                                <p style="margin-bottom: 20px; font-style: italic;">Cualquier duda ó aclaración, favor de comunicarte a la Coordinación Administrativa de la Universidad Modelo.</p>
                                <p style="margin-bottom: 5px; font-style: italic; color: #333333;">Coordinación administrativa | Tel.: 999 - 9301900 ext. 1151 o al celular 999 135 6225 | Email: coordinacion.administrativa@modelo.edu.mx</p>
                                
                                <hr class="libreta-divider">
                                
                                <div class="libreta-subtitle-large">IMPORTANTE: Favor de descargar la libreta:</div>
                                <div class="libreta-title-ins">INSTRUCCIONES DE PAGO.</div>
                                
                                <div class="libreta-bank-header">BBVA:</div>
                                <div class="libreta-indented-block" style="color: #0020c2;">
                                    <p style="margin: 4px 0;"><b>I. PAGO DIRECTO EN SUCURSAL BANCARIA BBVA:</b></p>
                                    <p style="margin: 4px 0 15px 0;"><b>1-SI PAGA EN VENTANILLA O CAJERO AUTOMÁTICO DE SUCURSAL BANCARIA BBVA, SELECCIONE PAGO DE SERVICIO CON EL CONVENIO 1852132</b></p>
                                    
                                    <p style="margin: 4px 0;"><b>II. PAGO EN LÍNEA (APLICACIÓN Ó PORTAL WEB BANCARIO):</b></p>
                                    <p style="margin: 4px 0;"><b>A) SI PAGA DE BBVA A BBVA (DESDE SU PORTAL BANCARIO BBVA), UTILICE PAGO DE SERVICIO CON EL CONVENIO 1852132</b></p>
                                    <p style="margin: 4px 0;"><b>B) DESDE OTRO BANCO A BBVA (SPEI), USAR LA CLABE INTERBANCARIA 012914002018521323</b></p>
                                </div>
                                
                                <div class="libreta-bank-header-hsbc">HSBC</div>
                                <div class="libreta-indented-block" style="color: #990000;">
                                    <p style="margin: 4px 0;"><b>I. SI PAGA DE HSBC A HSBC, PAGAR COMO SERVICIO 9022</b></p>
                                    <p style="margin: 4px 0;"><b>II. DESDE OTRO BANCO A HSBC (SPEI), USAR LA CLABE INTERBANCARIA 021180550300090224</b></p>
                                </div>
                                
                                <div class="libreta-red-note">
                                    NOTA: EN CUALQUIER OPERACIÓN DE PAGO DEBERÁ INGRESARSE LOS 26 DIGITOS DEL CONCEPTO DE PAGO O REFERENCIA
                                </div>
                                
                                <div style="margin-top: 30px;">
                                    <div class="libreta-action-btn">Libreta de pago</div>
                                </div>
                            </div>
                        \` 
                    },
                    colegiaturas: { 
                        title: "Pagos del alumno", 
                        html: \`
                            <div class="student-info-box">
                                <div><b>Clave:</b> 15246740</div>
                                <div><b>Nombre:</b> SANTIAGO DE JESUS ARCOS GUZMAN</div>
                            </div>
                            <table class="simulated-table">
                                <thead>
                                    <tr>
                                        <th>Descripción</th>
                                        <th>Concepto</th>
                                        <th>Referencia</th>
                                        <th>Adeudo vigente</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>Colegiatura Mayo/2026</td><td>092509</td><td></td><td>NO</td></tr>
                                    <tr><td>Colegiatura Abril/2026</td><td>082508</td><td></td><td>NO</td></tr>
                                    <tr><td>Colegiatura Marzo/2026</td><td>072507</td><td></td><td>NO</td></tr>
                                    <tr><td>Colegiatura Febrero/2026</td><td>062506</td><td></td><td>NO</td></tr>
                                    <tr><td>Inscripción Semestral / Enero 2026</td><td>002500</td><td></td><td>NO</td></tr>
                                    <tr><td>Colegiatura Octubre/2025</td><td>02</td><td></td><td>NO</td></tr>
                                    <tr><td>Colegiatura Septiembre/2025</td><td>012501</td><td></td><td>NO</td></tr>
                                    <tr><td>Inscripción Anual o Semestral/ Agosto 2025</td><td>992599</td><td></td><td>NO</td></tr>
                                    <tr><td>Colegiatura Junio/2025</td><td>102410</td><td></td><td>NO</td></tr>
                                    <tr><td>Colegiatura Mayo/2025</td><td>092409</td><td></td><td>NO</td></tr>
                                    <tr><td>Colegiatura Abril/2025</td><td>082408</td><td></td><td>NO</td></tr>
                                    <tr><td>Colegiatura Marzo/2025</td><td>072407</td><td></td><td>NO</td></tr>
                                    <tr><td>Colegiatura Febrero/2025</td><td>062406</td><td></td><td>NO</td></tr>
                                    <tr><td>Inscripción Semestral / Enero 2025</td><td>002400</td><td></td><td>NO</td></tr>
                                    <tr><td>Colegiatura Enero/2025</td><td>052405</td><td></td><td>NO</td></tr>
                                </tbody>
                            </table>
                        \`
                    },
                    horario: { 
                        title: "Horarios del alumno", 
                        html: \`
                            <div class="student-info-box">
                                <div><b>Clave:</b> 15246740</div>
                                <div><b>Nombre:</b> SANTIAGO DE JESUS ARCOS GUZMAN</div>
                            </div>
                            <table class="simulated-table">
                                <thead>
                                    <tr>
                                        <th>Materia</th>
                                        <th>Lunes</th>
                                        <th>Martes</th>
                                        <th>Miercoles</th>
                                        <th>Jueves</th>
                                        <th>Viernes</th>
                                        <th>Sábado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><i>Sin materias asignadas en este periodo</i></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        \`
                    },
                    asignaturas: { title: "Asignaturas Inscritas", html: "<ul><li>• Laboratorio de Programación Web</li><li>• Ingeniería de Software II</li><li>• Arquitectura de Sistemas Distribuidos</li><li>• Redes Avanzadas de Computadoras</li></ul>" },
                    calificaciones: { title: "Consulta de Calificaciones", html: "<table class='simulated-table'><tr><th>Materia</th><th>Parcial 1</th><th>Parcial 2</th><th>Promedio General</th></tr><tr><td>Programación Web</td><td>9.5</td><td>9.0</td><td><b>9.5</b></td></tr></table>" },
                    ordinarios: { title: "Exámenes Ordinarios", html: "<p class='grey-text'><i>La publicación del rol oficial está pendiente por servicios escolares.</i></p>" },
                    adeudadas: { title: "Asignaturas Adeudadas", html: "<p class='green-text'><b>Estatus Regular:</b> No se registran asignaturas reprobadas.</p>" },
                    constancias: { title: "Trámite de Constancias", html: "<button class='btn blue darken-3'>Generar Constancia de Estudios</button>" },
                    extraordinarios_inscritos: { title: "Exámenes Extraordinarios Inscritos", html: "<p>No cuenta con solicitudes registradas.</p>" },
                    extraordinarios_calif: { title: "Calificaciones de Extraordinarios", html: "<p>Historial limpio. Sin actas registradas.</p>" },
                    formularios: { title: "Formularios y Encuestas", html: "<button class='btn green'>Aplicar Evaluación de Calidad Docente</button>" },
                    biblioteca: { title: "Biblioteca Virtual", html: "<p>Acceso autorizado al catálogo y repositorios digitales.</p>" },
                    micuenta: { title: "Mi Cuenta de Alumno", html: "<p><b>Nombre del Alumno:</b> SANTIAGO DE JESUS ARCOS GUZMAN<br><b>Matrícula:</b> 15246740<br><b>Programa Educativo:</b> Ingeniería en Sistemas Computacionales</p>" },
                    documentos: { title: "Documentos Digitales", html: "<p>Expediente de ingreso validado correctamente.</p>" },
                    eduvida: { title: "Educación para la Vida", html: "<p>Talleres complementarios registrados.</p>" }
                };

                function showSection(sectionKey) {
                    const data = sectionsData[sectionKey];
                    if (data) {
                        document.getElementById('dynamicContentCard').innerHTML = '<h4>' + data.title + '</h4>' + data.html;
                        if(sectionKey === 'horario') $('#menu-navegacion').val('horario');
                    }
                }

                function toggleExtraordinarios() {
                    const menu = document.getElementById('extra-menu');
                    const arrow = document.getElementById('arrow-toggle');
                    if (menu.style.display === 'block') {
                        menu.style.display = 'none';
                        arrow.innerText = 'keyboard_arrow_right';
                    } else {
                        menu.style.display = 'block';
                        arrow.innerText = 'keyboard_arrow_down';
                    }
                }

                $(document).ready(function(){
                    $('.dropdown-trigger').dropdown({ constrainWidth: false, alignment: 'right' });
                    $('#menu-navegacion').on('change', function() {
                        if($(this).val() === 'logout') window.location.href = '/';
                        else showSection($(this).val());
                    });
                    // Iniciamos directo en Horario por defecto para probar los cambios
                    showSection('horario');
                });
            </script>
        </body>
        </html>
    `;
}

// 3. ENRUTAMIENTO EXPRESS
app.get('/', (req, res) => {
    res.send(getLoginTemplate(false));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === "15246740" && password === "ARCOS") {
        res.send(getPortalTemplate());
    } else {
        res.send(getLoginTemplate(true));
    }
});

// Lanzamiento
app.listen(PORT, () => {
    console.log(`Servidor activo en el puerto ${PORT}`);
});
