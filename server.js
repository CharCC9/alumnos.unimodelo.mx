const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

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

function getPortalTemplate() {
    return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>Horarios del alumno | SCEM</title>
            <link media="all" type="text/css" rel="stylesheet" href="https://alumnos.unimodelo.mx/css/material_icons.css">
            <link media="all" type="text/css" rel="stylesheet" href="https://alumnos.unimodelo.mx/css/materialize.css">
            <link media="all" type="text/css" rel="stylesheet" href="https://alumnos.unimodelo.mx/css/style.css">
            <link media="all" type="text/css" rel="stylesheet" href="https://alumnos.unimodelo.mx/css/app.css">
            
            <style>
                .mainPaddingSidebar { padding-left:240px; }
                .mainPaddingLeft { padding-left:0px; }
                @media only screen and (max-width: 700px) {
                    .hide-on-small-only-new, .hide-on-small-and-down { display: none !important; }
                }
                .brand-sidebar center img { background: transparent; padding: 5px; }
                /* Correcciones de layouts internos para vistas dinámicas */
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
                .simulated-table { width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 25px; font-size: 14px; color: #333; }
                .simulated-table th, .simulated-table td { border: 1px solid #cccccc; padding: 10px 12px; text-align: left; }
                .simulated-table th { background-color: #f5f5f5; color: #111111; font-weight: bold; }
                .simulated-table tr:nth-child(even) { background-color: #fafafa; }
            </style>
        </head>
        <body class="loaded">

            <header id="header" class="page-topbar">
                <div class="navbar-fixed">
                    <nav class="navbar-color darken-4">
                        <div class="nav-wrapper">
                            <a href="javascript:void(0);" style="color:white; float:left;" class="sidenav-trigger-show">
                                <i class="material-icons waves-effect waves-light hide-on-small-only-new" style="font-size:40px; margin: -4px 0 0 20px; position: fixed;">menu</i>
                            </a>
                            <div class="header-search-wrapper hide-on-med-and-down sideNav-lock">
                                <select id="menu-navegacion" class="browser-default" style="width: 30%; position: relative!important; margin-top: -30px;">
                                    <option value="libreta_de_pago">Libreta de pago</option>
                                    <option value="colegiaturas">Colegiaturas / Inscr.</option>
                                    <option value="horario" selected>Horario</option>
                                    <option value="asignaturas">Asignaturas</option>
                                    <option value="calificaciones">Calificaciones</option>
                                    <option value="logout">Salir</option>
                                </select>
                                <span style="font-size: 25px; position: relative; top: 5px; text-align:center; left: 3em;">Universidad Modelo</span>
                            </div>
                            <ul class="right hide-on-med-and-down">
                                <li>SANTIAGO DE JESUS ARCOS GUZMAN</li>
                                <li>
                                    <a href="javascript:void(0);" class="waves-effect waves-block waves-light profile-button" data-activates="profile-dropdown">
                                        <i class="material-icons">more_vert</i>
                                    </a>
                                    <ul id="profile-dropdown" class="dropdown-content">                   
                                        <li><a onclick="showSection('micuenta')" class="grey-text text-darken-1"><i class="material-icons">account_box</i>Mi cuenta</a></li>
                                        <li><a href="/" class="grey-text text-darken-1"><i class="material-icons">keyboard_tab</i> Salir</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>

            <div id="main" class="mainPaddingSidebar">
                <div class="wrapper">
                    <aside id="left-sidebar-nav" class="nav-expanded nav-lock nav-collapsible navbar-fixed">
                        <div class="brand-sidebar">
                            <center>
                                <img src="${LOGO_BASE64}" width="25%" height="25%">
                                <a href="javascript:void(0);" style="color:white; float:left;" class="sidenav-trigger-hide hide-on-small-only-new">
                                    <i class="material-icons waves-effect waves-light" style="font-size:40px; margin: 8px 0 0 20px; position: fixed;">menu</i>
                                </a>
                            </center>
                        </div>
                        
                        <ul id="slide-out" class="side-nav fixed leftside-navigation sidenav ps-container ps-active-y" style="transform: translateX(0%);">
                            <li class="no-padding">
                                <ul class="collapsible" data-collapsible="accordion">
                                    <li class="bold"><a onclick="showSection('libreta_de_pago')"><i class="material-icons">keyboard_arrow_right</i><span>LIBRETA DE PAGO</span></a></li>
                                    <li class="bold"><a onclick="showSection('colegiaturas')"><i class="material-icons">keyboard_arrow_right</i><span>COLEGIATURAS / INSCR.</span></a></li>
                                    <li class="bold"><a onclick="showSection('horario')"><i class="material-icons">keyboard_arrow_right</i><span>HORARIO</span></a></li>
                                    <li class="bold"><a onclick="showSection('asignaturas')"><i class="material-icons">keyboard_arrow_right</i><span>ASIGNATURAS</span></a></li>
                                    <li class="bold"><a onclick="showSection('calificaciones')"><i class="material-icons">keyboard_arrow_right</i><span>CALIFICACIONES</span></a></li>
                                    <li class="bold"><a onclick="showSection('ordinarios')"><i class="material-icons">keyboard_arrow_right</i><span>ORDINARIOS</span></a></li>
                                    <li class="bold"><a onclick="showSection('adeudadas')"><i class="material-icons">keyboard_arrow_right</i><span>ASIG.ADEUDADAS</span></a></li>
                                    <li class="bold"><a onclick="showSection('constancias')"><i class="material-icons">keyboard_arrow_right</i><span>CONSTANCIAS</span></a></li>
                                    
                                    <li class="bold">
                                        <a class="collapsible-header waves-effect waves-cyan"><i class="material-icons">dashboard</i><span class="nav-text">EXTRAORDINARIOS</span></a>
                                        <div class="collapsible-body">
                                            <ul>
                                                <li><a onclick="showSection('extraordinarios_inscritos')"><i class="material-icons">keyboard_arrow_right</i><span>Exámenes Inscritos</span></a></li>
                                                <li><a onclick="showSection('extraordinarios_calif')"><i class="material-icons">keyboard_arrow_right</i><span>Calificaciones</span></a></li>
                                            </ul>
                                        </div>
                                    </li>
                                    
                                    <li class="bold"><a onclick="showSection('formularios')"><i class="material-icons">keyboard_arrow_right</i><span>FORMULARIOS</span></a></li>
                                    <li class="bold"><a onclick="showSection('biblioteca')"><i class="material-icons">keyboard_arrow_right</i><span>BIBLIOTECA</span></a></li>
                                    <li class="bold"><a onclick="showSection('micuenta')"><i class="material-icons">keyboard_arrow_right</i><span>MI CUENTA</span></a></li>
                                    <li class="bold"><a onclick="showSection('documentos')"><i class="material-icons">keyboard_arrow_right</i><span>DOCUMENTOS</span></a></li>
                                    <li class="bold"><a onclick="showSection('eduvida')"><i class="material-icons">keyboard_arrow_right</i><span>EDUCACIÓN PARA LA VIDA</span></a></li>
                                    <li class="bold"><a href="/"><i class="material-icons">keyboard_arrow_right</i><span>SALIR</span></a></li>
                                </ul>
                            </li>
                        </ul>
                    </aside>

                    <section id="content">
                        <div class="container">
                            <nav id="nav-breadcrumb">
                                <div class="nav-wrapper">
                                    <div class="col s12" id="breadcrumb-container">
                                        </div>
                                </div>
                            </nav>
                            <div class="container">
                                <div id="dynamicRenderCard" style="background: white; padding: 25px; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); min-height: 400px; margin-top: 20px;">
                                    </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <script type="text/javascript" src="https://alumnos.unimodelo.mx/js/jquery-3.2.1.min.js"></script>
            <script type="text/javascript" src="https://alumnos.unimodelo.mx/js/materialize.min.js"></script>
            
            <script>
                // DATA DE CONTENIDOS INTERNOS EXCLUSIVOS DEL SERVIDOR LOCAL
                const sectionsData = {
                    libreta_de_pago: {
                        breadcrumb: '<a class="breadcrumb">Inicio</a><a class="breadcrumb">Libreta de pago</a>',
                        html: \`
                            <h4 class="header">LIBRETA DE PAGO</h4>
                            <div class="libreta-container">
                                <p style="margin-bottom: 20px;"><b>Estimado(a) alumno(a):</b> Aquí puedes descargar tu libreta de pago acorde a tu plan de pago previamente registrado: <span class="libreta-blue-text">Colegiatura Diez Meses, y la Inscripción de Enero a pagarse el monto total en el mes de Enero.</span></p>
                                <p style="margin-bottom: 20px; font-style: italic;">Cualquier duda ó aclaración, favor de comunicarte a la Coordinación Administrativa de la Universidad Modelo.</p>
                                <hr class="libreta-divider">
                                <div class="libreta-subtitle-large">IMPORTANTE: Favor de descargar la libreta:</div>
                                <div class="libreta-title-ins">INSTRUCCIONES DE PAGO.</div>
                                <div class="libreta-bank-header">BBVA:</div>
                                <div class="libreta-indented-block" style="color: #0020c2;">
                                    <p><b>I. PAGO DIRECTO EN SUCURSAL BANCARIA BBVA:</b> Convenio 1852132</p>
                                    <p><b>II. PAGO EN LÍNEA:</b> CLABE Interbancaria 012914002018521323</p>
                                </div>
                                <div class="libreta-red-note">NOTA: EN CUALQUIER OPERACIÓN DE PAGO DEBERÁ INGRESARSE LOS 26 DIGITOS DE TU REFERENCIA PERSONAL.</div>
                                <div class="libreta-action-btn">Descargar Libreta</div>
                            </div>
                        \`
                    },
                    colegiaturas: {
                        breadcrumb: '<a class="breadcrumb">Inicio</a><a class="breadcrumb">Pagos del Alumno</a>',
                        html: \`
                            <h4 class="header">Pagos del alumno</h4>
                            <p><b>Clave:</b> 15246740</p>
                            <p><b>Nombre:</b> SANTIAGO DE JESUS ARCOS GUZMAN</p>
                            <table class="simulated-table responsive-table">
                                <thead><tr><th>Descripción</th><th>Concepto</th><th>Referencia</th><th>Adeudo vigente</th></tr></thead>
                                <tbody>
                                    <tr><td>Colegiatura Mayo/2026</td><td>092509</td><td></td><td>NO</td></tr>
                                    <tr><td>Colegiatura Abril/2026</td><td>082508</td><td></td><td>NO</td></tr>
                                    <tr><td>Colegiatura Marzo/2026</td><td>072507</td><td></td><td>NO</td></tr>
                                    <tr><td>Colegiatura Febrero/2026</td><td>062506</td><td></td><td>NO</td></tr>
                                    <tr><td>Inscripción Semestral / Enero 2026</td><td>002500</td><td></td><td>NO</td></tr>
                                </tbody>
                            </table>
                        \`
                    },
                    horario: {
                        breadcrumb: '<a class="breadcrumb">Inicio</a><a class="breadcrumb">Horarios del alumno</a>',
                        html: \`
                            <h4 class="header">Horarios del alumno</h4>
                            <p><b>Clave:</b> 15246740</p>
                            <p><b>Nombre:</b> SANTIAGO DE JESUS ARCOS GUZMAN</p>
                            <table class="simulated-table display responsive-table" cellspacing="0" width="100%">
                                <thead>
                                    <tr role="row">
                                        <th>Materia</th><th>Lunes</th><th>Martes</th><th>Miercoles</th><th>Jueves</th><th>Viernes</th><th>Sábado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr role="row" class="odd"><td>ALGORITMOS</td><td></td><td>11-13</td><td></td><td></td><td>9-11</td><td></td></tr>
                                    <tr role="row" class="even"><td>CALCULO DIFERENCIAL</td><td>11-13</td><td></td><td>11-13</td><td></td><td>11-13</td><td></td></tr>
                                    <tr role="row" class="odd"><td>FISICA APLICADA</td><td>9-11</td><td></td><td>9-11</td><td></td><td></td><td></td></tr>
                                </tbody>
                            </table>
                        \`
                    },
                    asignaturas: {
                        breadcrumb: '<a class="breadcrumb">Inicio</a><a class="breadcrumb">Asignaturas</a>',
                        html: \`
                            <h4 class="header">Asignaturas del alumno</h4>
                            <p><b>Clave:</b> 15246740</p>
                            <p><b>Nombre:</b> SANTIAGO DE JESUS ARCOS GUZMAN</p>
                            <table class="simulated-table responsive-table">
                                <thead><tr><th>Materia</th><th>Maestro</th></tr></thead>
                                <tbody>
                                    <tr><td>ALGORITMOS</td><td>EDSON GEOVANNY ESTRADA LOPEZ</td></tr>
                                    <tr><td>CALCULO DIFERENCIAL</td><td>AYLIN GARCIA REYES</td></tr>
                                    <tr><td>FISICA APLICADA</td><td>ALBERTO GABRIEL VEGA POOT</td></tr>
                                </tbody>
                            </table>
                        \`
                    },
                    calificaciones: {
                        breadcrumb: '<a class="breadcrumb">Inicio</a><a class="breadcrumb">Calificaciones</a>',
                        html: \`
                            <h4 class="header">Calificaciones del alumno</h4>
                            <p><b>Clave:</b> 15246740</p>
                            <p><b>Nombre:</b> SANTIAGO DE JESUS ARCOS GUZMAN</p>
                            <table class="simulated-table responsive-table">
                                <thead>
                                    <tr><th>Materia</th><th>Parcial 1</th><th>Parcial 2</th><th>Promedio</th><th>Ordinario</th><th>Calif. Final</th></tr>
                                </thead>
                                <tbody>
                                    <tr><td>ALGORITMOS</td><td></td><td></td><td></td><td></td><td></td></tr>
                                    <tr><td>CALCULO DIFERENCIAL</td><td></td><td></td><td></td><td></td><td></td></tr>
                                    <tr><td>FISICA APLICADA</td><td></td><td></td><td></td><td></td><td></td></tr>
                                </tbody>
                            </table>
                        \`
                    },
                    ordinarios: { breadcrumb: '<a class="breadcrumb">Inicio</a><a>Ordinarios</a>', html: "<h4>Exámenes Ordinarios</h4><p><i>La publicación oficial del rol de exámenes ordinarios está pendiente.</i></p>" },
                    adeudadas: { breadcrumb: '<a class="breadcrumb">Inicio</a><a>Adeudadas</a>', html: "<h4>Asignaturas Adeudadas</h4><p class='green-text'><b>Estatus Regular:</b> No se registran asignaturas reprobadas o adeudadas en este ciclo.</p>" },
                    constancias: { breadcrumb: '<a class="breadcrumb">Inicio</a><a>Constancias</a>', html: "<h4>Trámite de Constancias</h4><button class='btn blue darken-4'>Solicitar Constancia Digital</button>" },
                    extraordinarios_inscritos: { breadcrumb: '<a class="breadcrumb">Inicio</a><a>Extraordinarios</a>', html: "<h4>Exámenes Inscritos</h4><p>No se encontraron solicitudes registradas.</p>" },
                    extraordinarios_calif: { breadcrumb: '<a class="breadcrumb">Inicio</a><a>Calificaciones Extraordinarias</a>', html: "<h4>Calificaciones de Extraordinarios</h4><p>Historial académico limpio.</p>" },
                    formularios: { breadcrumb: '<a class="breadcrumb">Inicio</a><a>Formularios</a>', html: "<h4>Formularios</h4><button class='btn green dark-2'>Evaluación Docente 2026</button>" },
                    biblioteca: { breadcrumb: '<a class="breadcrumb">Inicio</a><a>Biblioteca</a>', html: "<h4>Biblioteca</h4><p>Acceso verificado correctamente al catálogo digital.</p>" },
                    micuenta: { breadcrumb: '<a class="breadcrumb">Inicio</a><a>Mi Cuenta</a>', html: "<h4>Mi Cuenta</h4><p><b>Alumno:</b> SANTIAGO DE JESUS ARCOS GUZMAN<br><b>Matrícula:</b> 15246740<br><b>Carrera:</b> Ingeniería en Sistemas Computacionales</p>" },
                    documentos: { breadcrumb: '<a class="breadcrumb">Inicio</a><a>Documentos</a>', html: "<h4>Documentos</h4><p>Expediente completo y debidamente digitalizado.</p>" },
                    eduvida: { breadcrumb: '<a class="breadcrumb">Inicio</a><a>EduVida</a>', html: "<h4>Educación para la Vida</h4><p>Talleres curriculares vigentes y acreditados.</p>" }
                };

                function showSection(sectionKey) {
                    const data = sectionsData[sectionKey];
                    if (data) {
                        document.getElementById('breadcrumb-container').innerHTML = data.breadcrumb;
                        document.getElementById('dynamicRenderCard').innerHTML = data.html;
                        
                        // Sincronizar el select superior si existe la opción
                        if($('#menu-navegacion option[value="'+sectionKey+'"]').length > 0) {
                            $('#menu-navegacion').val(sectionKey);
                        }
                    }
                }

                // Manejo de barras laterales nativas
                $('.sidenav-trigger-hide').on('click', function(e) {
                    e.preventDefault();
                    $('#left-sidebar-nav').hide('slide');
                    $('#main').removeClass('mainPaddingSidebar').addClass('mainPaddingLeft');
                });
                
                $('.sidenav-trigger-show').on('click', function(e) {
                    e.preventDefault();
                    $('#left-sidebar-nav').show('slide');
                    $('#main').removeClass('mainPaddingLeft').addClass('mainPaddingSidebar');
                });

                $(document).ready(function() {
                    $('.profile-button').dropdown({ constrainWidth: false, alignment: 'right', belowOrigin: true });
                    $('.collapsible').collapsible();
                    
                    $('#menu-navegacion').on('change', function() {
                        if($(this).val() === 'logout') window.location.href = '/';
                        else showSection($(this).val());
                    });

                    // Carga por defecto la pestaña "horario" respetando la estructura original enviada
                    showSection('horario');
                });
            </script>
        </body>
        </html>
    `;
}

// ROUTING PRINCIPAL
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

app.listen(PORT, () => {
    console.log(`Servidor activo corriendo en http://localhost:${PORT}`);
});
