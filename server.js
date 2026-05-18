const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Logo Base64 para evitar dependencias externas
const LOGO_BASE64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABY7eeBAAAASFBMVEUAAAD///8OnMEAnMAAnf8Anf4Anf0AnP8Anf8Anf4Anf8Anf8Anf8Anf8Anv8Anf8Anf8Anf8Anv8Anf8Anv8Anf8Anf8Anf/7yG0WAAAAFnRSTlMA9g72DRb29vYWFvYWFhYW9vb2FhYWFhH3738AAAGpSURBVFjD7ZfZkoMgEEXb0BAsatT//7VpUAnSgG0m86SreS88CgciwS7L/id8tEw8U7Z+b10p368739q27z/HwE7UvXNtzD6r2X7P70ePId/bC6R7jB3w/H4Y8WW87Xp9gUwnXz3Yg79v98N8Z6+XN6R7M9+R/g6ZAn83H+b70vF9Y9G67X3vFpA/6+P7A7A/zPf1h+B7Hn4A0wNoGv4O03Uu6XofwHRbCHmD+T/InL3tXN0h8Z/08G7wK/6T6X/6L/ivX/Ffvw6H4L8eP2f3+G7wfY9D8Pf6Ew6Hw+FwOBwO99C4MbyTid279uC8C2N+F6yI5N0P68G4O7Euxv8mVsX+zZg7scgC+E203G9ihpL30EshTiyE/Cai96XkPRRi8pXEXBPy6X0l6wH4SszfF0ImIeaf9w6ZixmBf4M5u9Nf6Yv9GZitGZ9/gxlpX+x7MGMz7v4OplK+2PdgnAWDfwvGWTB07jVDP+96ZpB6ZpB6ZtDT09PT09PT09PT09PT08vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL+/8ZfwD8yBv1RstbYwAAAABJRU5ErkJggg==";

function getLoginTemplate(showAlert = false) {
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
                .login-card { background: white; padding: 40px 30px; width: 100%; max-width: 420px; border-radius: 4px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center; }
                .logo-container img { width: 110px; height: auto; margin-bottom: 10px; display: inline-block; }
                .system-title { font-size: 24px; color: #555; font-weight: 300; letter-spacing: 1px; margin-bottom: 2px; }
                .system-subtitle { font-size: 22px; color: #555; font-weight: 300; letter-spacing: 1px; margin-bottom: 20px; }
                .input-field { margin-bottom: 25px; position: relative; }
                .input-field i { position: absolute; left: 0; top: 10px; color: #111111; font-size: 26px; }
                .input-field input { padding-left: 40px !important; box-sizing: border-box; }
                .btn-custom { width: 100%; background-color: #007bc4 !important; margin-bottom: 15px; text-transform: uppercase; font-weight: 500; height: 45px; line-height: 45px; border-radius: 4px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); color: white !important;}
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
            <title>Portal de Alumnos | SCEM</title>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
            <link media="all" type="text/css" rel="stylesheet" href="https://alumnos.unimodelo.mx/css/materialize.css">
            <link media="all" type="text/css" rel="stylesheet" href="https://alumnos.unimodelo.mx/css/style.css">
            <link media="all" type="text/css" rel="stylesheet" href="https://alumnos.unimodelo.mx/css/app.css">
            
            <style>
                body { background-color: #f9f9f9; }
                .mainPaddingSidebar { padding-left: 240px; transition: padding 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
                .mainPaddingLeft { padding-left: 0px; transition: padding 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
                
                #left-sidebar-nav { position: fixed; width: 240px; left: 0; top: 64px; height: calc(100vh - 64px); background: #fff; z-index: 999; box-shadow: 1px 0 5px rgba(0,0,0,0.1); transition: transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
                .side-nav-hidden { transform: translateX(-240px); }
                
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
                
                .simulated-table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 14px; color: #333; margin-bottom: 0px !important;}
                .simulated-table th, .simulated-table td { border: 1px solid #cccccc; padding: 10px 12px; text-align: left; }
                .simulated-table th { background-color: #f5f5f5; color: #111111; font-weight: bold; }
                .simulated-table tr:nth-child(even) { background-color: #fafafa; }
                
                /* --- ESTILOS NATIVOS DE DATATABLES REPLICADOS --- */
                .dt-search-row td { padding: 8px 12px !important; background-color: #ffffff; border: 1px solid #cccccc; }
                .dt-search-input { width: 100% !important; height: 26px !important; margin: 0 !important; padding: 0 5px !important; font-size: 13px !important; border: 1px solid #ccc !important; box-sizing: border-box !important; background: #fff !important; font-family: 'Segoe UI', Arial, sans-serif;}
                .dt-search-input::placeholder { color: #bbb; font-weight: 400; }
                .dt-search-input:focus { border-bottom: 1px solid #0d47a1 !important; box-shadow: none !important; }
                
                .dt-footer-container { display: flex; justify-content: space-between; align-items: center; margin-top: 20px; font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; color: #333; }
                .dt-info { font-size: 13.5px; color: #333; }
                .dt-pagination { display: flex; align-items: center; list-style: none; margin: 0; padding: 0; }
                .dt-pagination li { margin: 0 2px; }
                .dt-pagination li a { display: block; padding: 6px 12px; color: #333; text-decoration: none; font-size: 13px; border-radius: 2px; cursor: pointer; }
                .dt-pagination li.active-page a { background-color: #e0e0e0; font-weight: bold; border: 1px solid #ccc; box-shadow: inset 0 1px 3px rgba(0,0,0,0.1); }
                .dt-pagination li.disabled-page a { color: #bbb; cursor: default; }
                /* ----------------------------------------------- */

                header nav { background-color: #0d47a1 !important; height: 64px; }
                
                .custom-menu-li a { color: #444 !important; display: flex !important; align-items: center; padding: 14px 20px; cursor: pointer; font-size: 13px; font-weight: 500; text-transform: uppercase; position: relative; overflow: hidden; }
                .custom-menu-li a:hover { background-color: #f0f0f0; }
                .custom-menu-li a i { margin-right: 15px; color: #777; font-size: 20px; pointer-events: none; }
                .custom-menu-li.active-item { background-color: #e0e0e0; border-left: 4px solid #0d47a1; }
                .custom-menu-li.active-item a { color: #0d47a1 !important; font-weight: bold; }
                .custom-menu-li.active-item a i { color: #0d47a1; }
                
                #breadcrumb-container { font-size: 15px; color: #666; margin-bottom: 10px; display: flex; align-items: center; }
                #breadcrumb-container i { font-size: 16px; margin: 0 8px; color: #999; }
                
                #dynamicRenderCard { transition: opacity 0.2s ease-in-out; }
            </style>
        </head>
        <body>

            <header id="header" class="page-topbar">
                <div class="navbar-fixed">
                    <nav class="navbar-color">
                        <div class="nav-wrapper">
                            <a href="#" style="color:white; float:left; height: 64px; display: flex; align-items: center;" class="sidenav-trigger-toggle waves-effect waves-light">
                                <i class="material-icons" style="font-size:28px; margin-left: 20px;">menu</i>
                            </a>
                            <div style="display: inline-block; margin-left: 20px; padding-top: 12px;">
                                <select id="menu-navegacion" class="browser-default" style="width: 180px; display: inline-block; height: 36px; vertical-align: middle; background: white; border: 1px solid #ccc; border-radius:3px;">
                                    <option value="libreta_de_pago">Libreta de pago</option>
                                    <option value="colegiaturas">Colegiaturas / Inscr.</option>
                                    <option value="horario">Horario</option>
                                    <option value="asignaturas">Asignaturas</option>
                                    <option value="calificaciones" selected>Calificaciones</option>
                                    <option value="logout">Salir</option>
                                </select>
                                <span style="font-size: 22px; color: white; margin-left: 20px; vertical-align: middle; font-weight: 300;">Universidad Modelo</span>
                            </div>
                            <ul class="right hide-on-med-and-down" style="margin-right: 20px;">
                                <li style="color: white; font-size: 14px; display: inline-block; vertical-align: middle; margin-right: 10px;">SANTIAGO DE JESUS ARCOS GUZMAN</li>
                                <li style="display: inline-block; vertical-align: middle;">
                                    <a href="#" class="dropdown-trigger waves-effect waves-light" data-target="profile-dropdown" style="color: white; height: 64px; display: flex; align-items: center;">
                                        <i class="material-icons">more_vert</i>
                                    </a>
                                    <ul id="profile-dropdown" class="dropdown-content">                    
                                        <li><a onclick="showSection('micuenta')"><i class="material-icons">account_box</i>Mi cuenta</a></li>
                                        <li><a href="/"><i class="material-icons">keyboard_tab</i>Salir</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>

            <div id="main" class="mainPaddingSidebar">
                <div class="wrapper">
                    <aside id="left-sidebar-nav">
                        <ul style="margin: 0; padding: 0; list-style: none;">
                            <li class="custom-menu-li" id="menu-libreta_de_pago"><a onclick="showSection('libreta_de_pago')" class="waves-effect"><i class="material-icons">keyboard_arrow_right</i>LIBRETA DE PAGO</a></li>
                            <li class="custom-menu-li" id="menu-colegiaturas"><a onclick="showSection('colegiaturas')" class="waves-effect"><i class="material-icons">keyboard_arrow_right</i>COLEGIATURAS / INSCR.</a></li>
                            <li class="custom-menu-li" id="menu-horario"><a onclick="showSection('horario')" class="waves-effect"><i class="material-icons">keyboard_arrow_right</i>HORARIO</a></li>
                            <li class="custom-menu-li" id="menu-asignaturas"><a onclick="showSection('asignaturas')" class="waves-effect"><i class="material-icons">keyboard_arrow_right</i>ASIGNATURAS</a></li>
                            <li class="custom-menu-li" id="menu-calificaciones"><a onclick="showSection('calificaciones')" class="waves-effect"><i class="material-icons">keyboard_arrow_right</i>CALIFICACIONES</a></li>
                            <li class="custom-menu-li" id="menu-ordinarios"><a onclick="showSection('ordinarios')" class="waves-effect"><i class="material-icons">keyboard_arrow_right</i>ORDINARIOS</a></li>
                            <li class="custom-menu-li" id="menu-adeudadas"><a onclick="showSection('adeudadas')" class="waves-effect"><i class="material-icons">keyboard_arrow_right</i>ASIG.ADEUDADAS</a></li>
                            <li class="custom-menu-li" id="menu-constancias"><a onclick="showSection('constancias')" class="waves-effect"><i class="material-icons">keyboard_arrow_right</i>CONSTANCIAS</a></li>
                            <li class="custom-menu-li" id="menu-formularios"><a onclick="showSection('formularios')" class="waves-effect"><i class="material-icons">keyboard_arrow_right</i>FORMULARIOS</a></li>
                            <li class="custom-menu-li" id="menu-biblioteca"><a onclick="showSection('biblioteca')" class="waves-effect"><i class="material-icons">keyboard_arrow_right</i>BIBLIOTECA</a></li>
                            <li class="custom-menu-li" id="menu-micuenta"><a onclick="showSection('micuenta')" class="waves-effect"><i class="material-icons">keyboard_arrow_right</i>MI CUENTA</a></li>
                            <li class="custom-menu-li" id="menu-documentos"><a onclick="showSection('documentos')" class="waves-effect"><i class="material-icons">keyboard_arrow_right</i>DOCUMENTOS</a></li>
                            <li class="custom-menu-li" id="menu-eduvida"><a onclick="showSection('eduvida')" class="waves-effect"><i class="material-icons">keyboard_arrow_right</i>EDUCACION PARA LA VIDA</a></li>
                            <li class="custom-menu-li"><a href="/" class="waves-effect"><i class="material-icons">keyboard_arrow_right</i>SALIR</a></li>
                        </ul>
                    </aside>

                    <section id="content" style="padding: 20px;">
                        <div class="container" style="width: 100%; max-width: 1200px;">
                            <div id="breadcrumb-container"></div>
                            <div id="dynamicRenderCard" style="background: white; padding: 30px; border-radius: 4px; box-shadow: 0 1px 4px rgba(0,0,0,0.1); min-height: 450px;"></div>
                        </div>
                    </section>
                </div>
            </div>

            <script type="text/javascript" src="https://alumnos.unimodelo.mx/js/jquery-3.2.1.min.js"></script>
            <script type="text/javascript" src="https://alumnos.unimodelo.mx/js/materialize.min.js"></script>
            
            <script>
                // Función global helper para inyectar los inputs Buscar y la paginación de DataTables a cualquier tabla de 3 registros
                function appendDataTablesFooter(columnCount) {
                    let searchCells = '';
                    for (let i = 0; i < columnCount; i++) {
                        searchCells += '<td><input type="text" class="dt-search-input" placeholder="Buscar"></td>';
                    }
                    
                    let searchRow = '<tr class="dt-search-row">' + searchCells + '</tr>';
                    
                    let footerControls = 
                        '<div class="dt-footer-container">' +
                            '<div class="dt-info">Showing 1 to 3 of 3 entries</div>' +
                            '<ul class="dt-pagination">' +
                                '<li class="disabled-page"><a>Previous</a></li>' +
                                '<li class="active-page"><a>1</a></li>' +
                                '<li class="disabled-page"><a>Next</a></li>' +
                            '</ul>' +
                        '</div>';
                        
                    return { searchRow: searchRow, footerControls: footerControls };
                }

                // Generación de plantillas seguras
                const dt3 = appendDataTablesFooter(4);
                const dt7 = appendDataTablesFooter(7);
                const dt2 = appendDataTablesFooter(2);
                const dt6 = appendDataTablesFooter(6);

                const sectionsData = {
                    libreta_de_pago: {
                        breadcrumb: 'Inicio <i class="material-icons">chevron_right</i> Libreta de pago',
                        html: '<h5 style="font-weight: 400; color: #222; margin-bottom: 25px;">LIBRETA DE PAGO</h5>' +
                              '<div class="libreta-container">' +
                              '<p><b>Estimado(a) alumno(a):</b> Aquí puedes descargar tu libreta de pago acorde a tu plan de pago previamente registrado: <span class="libreta-blue-text">Colegiatura Diez Meses, y la Inscripción de Enero a pagarse el monto total en el mes de Enero.</span></p>' +
                              '<p style="font-style: italic; margin-top: 15px;">Cualquier duda ó aclaración, favor de comunicarte a la Coordinación Administrativa de la Universidad Modelo.</p>' +
                              '<p style="font-size: 13.5px; color: #555; margin-top: 10px;">Coordinación administrativa | Tel.: 999 - 9301900 ext. 1151 o al celular 999 135 6225 | Email: coordinacion.administrativa@modelo.edu.mx</p>' +
                              '<hr class="libreta-divider">' +
                              '<div class="libreta-subtitle-large">IMPORTANTE: Favor de descargar la libreta:</div>' +
                              '<div class="libreta-title-ins">INSTRUCCIONES DE PAGO.</div>' +
                              '<div class="libreta-bank-header">BBVA:</div>' +
                              '<div class="libreta-indented-block">' +
                              '<p><b>I. PAGO DIRECTO EN SUCURSAL BANCARIA BBVA:</b></p>' +
                              '<p style="color: #0020c2; font-weight: 500; margin-left: 10px;">1-SI PAGA EN VENTANILLA O CAJERO AUTOMÁTICO DE SUCURSAL BANCARIA BBVA, SELECCIONE PAGO DE SERVICIO CON EL CONVENIO 1852132</p>' +
                              '<p style="margin-top: 10px;"><b>II. PAGO EN LÍNEA (APLICACIÓN Ó PORTAL WEB BANCARIO):</b></p>' +
                              '<p style="color: #0020c2; font-weight: 500; margin-left: 10px;">A) SI PAGA DE BBVA A BBVA (DESDE SU PORTAL BANCARIO BBVA), UTILICE PAGO DE SERVICIO CON EL CONVENIO 1852132</p>' +
                              '<p style="color: #0020c2; font-weight: 500; margin-left: 10px;">B) DESDE OTRO BANCO A BBVA (SPEI), USAR LA CLABE INTERBANCARIA 012914002018521323</p>' +
                              '</div>' +
                              '<div class="libreta-bank-header-hsbc">HSBC</div>' +
                              '<div class="libreta-indented-block" style="color: #990000; font-weight: 500;">' +
                              '<p>I. SI PAGA DE HSBC A HSBC, PAGAR COMO SERVICIO 9022</p>' +
                              '<p>II. DESDE OTRO BANCO A HSBC (SPEI), USAR LA CLABE INTERBANCARIA 021180550300090224</p>' +
                              '</div>' +
                              '<div class="libreta-red-note">NOTA: EN CUALQUIER OPERACIÓN DE PAGO DEBERÁ INGRESARSE LOS 26 DÍGITOS DEL CONCEPTO DE PAGO O REFERENCIA</div>' +
                              '<div class="libreta-action-btn waves-effect waves-light">Libreta de Pago</div>' +
                              '</div>'
                    },
                    colegiaturas: {
                        breadcrumb: 'Inicio <i class="material-icons">chevron_right</i> Pagos del Alumno',
                        html: '<h5 style="font-weight: 400; color: #222;">Pagos del alumno</h5>' +
                              '<p style="margin: 5px 0;"><b>Clave:</b> 15246740</p>' +
                              '<p style="margin: 5px 0 20px 0;"><b>Nombre:</b> SANTIAGO DE JESUS ARCOS GUZMAN</p>' +
                              '<table class="simulated-table">' +
                              '<thead><tr><th>Descripción</th><th>Concepto</th><th>Referencia</th><th>Adeudo vigente</th></tr></thead>' +
                              '<tbody>' +
                              '<tr><td>Colegiatura Mayo/2026</td><td>092509</td><td></td><td>NO</td></tr>' +
                              '<tr><td>Colegiatura Abril/2026</td><td>082508</td><td></td><td>NO</td></tr>' +
                              '<tr><td>Colegiatura Marzo/2026</td><td>072507</td><td></td><td>NO</td></tr>' +
                              '<tr><td>Colegiatura Febrero/2026</td><td>062506</td><td></td><td>NO</td></tr>' +
                              '<tr><td>Inscripción Semestral / Enero 2026</td><td>002500</td><td></td><td>NO</td></tr>' +
                              searchCellsFooter(4, 5) + // Helper dinámico para colegiaturas con paginación real
                              '</tbody></table>' + footerContainerText(5)
                    },
                    horario: {
                        breadcrumb: 'Inicio <i class="material-icons">chevron_right</i> Horarios del alumno',
                        html: '<h5 style="font-weight: 400; color: #222; text-transform: uppercase;">Horarios del Alumno</h5>' +
                              '<p style="margin: 5px 0;"><b>Clave:</b> 15246740</p>' +
                              '<p style="margin: 5px 0 20px 0;"><b>Nombre:</b> SANTIAGO DE JESUS ARCOS GUZMAN</p>' +
                              '<table class="simulated-table">' +
                              '<thead><tr><th>Materia</th><th>Lunes</th><th>Martes</th><th>Miércoles</th><th>Jueves</th><th>Viernes</th><th>Sábado</th></tr></thead>' +
                              '<tbody>' +
                              '<tr><td>ALGORITMOS</td><td></td><td>11-13</td><td></td><td></td><td>9-11</td><td></td></tr>' +
                              '<tr><td>CÁLCULO DIFERENCIAL</td><td>11-13</td><td></td><td>11-13</td><td></td><td>11-13</td><td></td></tr>' +
                              '<tr><td>FÍSICA APLICADA</td><td>9-11</td><td></td><td>9-11</td><td></td><td></td><td></td></tr>' +
                              dt7.searchRow +
                              '</tbody></table>' + dt7.footerControls
                    },
                    asignaturas: {
                        breadcrumb: 'Inicio <i class="material-icons">chevron_right</i> Asignaturas',
                        html: '<h5 style="font-weight: 400; color: #222;">Asignaturas del alumno</h5>' +
                              '<p style="margin: 5px 0;"><b>Clave:</b> 15246740</p>' +
                              '<p style="margin: 5px 0 20px 0;"><b>Nombre:</b> SANTIAGO DE JESUS ARCOS GUZMAN</p>' +
                              '<table class="simulated-table">' +
                              '<thead><tr><th>Materia</th><th>Maestro</th></tr></thead>' +
                              '<tbody>' +
                              '<tr><td>ALGORITMOS</td><td>EDSON GEOVANNY ESTRADA LOPEZ</td></tr>' +
                              '<tr><td>CÁLCULO DIFERENCIAL</td><td>AYLIN GARCIA REYES</td></tr>' +
                              '<tr><td>FÍSICA APLICADA</td><td>ALBERTO GABRIEL VEGA POOT</td></tr>' +
                              dt2.searchRow +
                              '</tbody></table>' + dt2.footerControls
                    },
                    calificaciones: {
                        breadcrumb: 'Inicio <i class="material-icons">chevron_right</i> Calificaciones',
                        html: '<h5 style="font-weight: 400; color: #222;">Calificaciones del alumno</h5>' +
                              '<p style="margin: 5px 0;"><b>Clave:</b> 15246740</p>' +
                              '<p style="margin: 5px 0 20px 0;"><b>Nombre:</b> SANTIAGO DE JESUS ARCOS GUZMAN</p>' +
                              '<table class="simulated-table">' +
                              '<thead><tr><th>Materia</th><th>Parcial 1</th><th>Parcial 2</th><th>Promedio</th><th>Ordinario</th><th>Calif. Final</th></tr></thead>' +
                              '<tbody>' +
                              '<tr><td>ALGORITMOS</td><td>8</td><td>8</td><td>8.0</td><td></td><td></td></tr>' +
                              '<tr><td>CÁLCULO DIFERENCIAL</td><td>8</td><td>8</td><td>8.0</td><td></td><td></td></tr>' +
                              '<tr><td>FÍSICA APLICADA</td><td>8</td><td>7</td><td>7.5</td><td></td><td></td></tr>' +
                              dt6.searchRow +
                              '</tbody></table>' + dt6.footerControls
                    },
                    ordinarios: { breadcrumb: 'Inicio <i class="material-icons">chevron_right</i> Ordinarios', html: "<h5>Exámenes Ordinarios</h5><p><i>La publicación oficial del rol de exámenes ordinarios está pendiente.</i></p>" },
                    adeudadas: { breadcrumb: 'Inicio <i class="material-icons">chevron_right</i> Adeudadas', html: "<h5>Asignaturas Adeudadas</h5><p style='color:green;'><b>Estatus Regular:</b> No se registran asignaturas reprobadas o adeudadas en este ciclo.</p>" },
                    constancias: { breadcrumb: 'Inicio <i class="material-icons">chevron_right</i> Constancias', html: "<h5>Trámite de Constancias</h5><button class='btn blue darken-4 waves-effect waves-light'>Solicitar Constancia Digital</button>" },
                    formularios: { breadcrumb: 'Inicio <i class="material-icons">chevron_right</i> Formularios', html: "<h5>Formularios</h5><button class='btn green darken-2 waves-effect waves-light'>Evaluación Docente 2026</button>" },
                    biblioteca: { breadcrumb: 'Inicio <i class="material-icons">chevron_right</i> Biblioteca', html: "<h5>Biblioteca</h5><p>Acceso verificado correctamente al catálogo digital.</p>" },
                    micuenta: { breadcrumb: 'Inicio <i class="material-icons">chevron_right</i> Mi Cuenta', html: "<h5>Mi Cuenta</h5><p><b>Alumno:</b> SANTIAGO DE JESUS ARCOS GUZMAN<br><b>Matrícula:</b> 15246740<br><b>Carrera:</b> Ingeniería en Sistemas Computacionales</p>" },
                    documentos: { breadcrumb: 'Inicio <i class="material-icons">chevron_right</i> Documentos', html: "<h5>Documentos</h5><p>Expediente completo y debidamente digitalizado.</p>" },
                    eduvida: { breadcrumb: 'Inicio <i class="material-icons">chevron_right</i> EduVida', html: "<h5>Educación para la Vida</h5><p>Talleres curriculares vigentes y acreditados.</p>" }
                };

                // Funciones auxiliares para la vista única de pagos
                function searchCellsFooter(columns, totalEntries) {
                    let cells = '';
                    for(let i=0; i<columns; i++) { cells += '<td><input type="text" class="dt-search-input" placeholder="Buscar"></td>'; }
                    return '<tr class="dt-search-row">' + cells + '</tr>';
                }
                function footerContainerText(totalEntries) {
                    return '<div class="dt-footer-container"><div class="dt-info">Showing 1 to '+totalEntries+' of '+totalEntries+' entries</div><ul class="dt-pagination"><li class="disabled-page"><a>Previous</a></li><li class="active-page"><a>1</a></li><li class="disabled-page"><a>Next</a></li></ul></div>';
                }

                function showSection(sectionKey) {
                    const data = sectionsData[sectionKey];
                    if (data) {
                        const card = $('#dynamicRenderCard');
                        card.css('opacity', '0.3');
                        
                        setTimeout(function() {
                            document.getElementById('breadcrumb-container').innerHTML = data.breadcrumb;
                            document.getElementById('dynamicRenderCard').innerHTML = data.html;
                            
                            $('.custom-menu-li').removeClass('active-item');
                            $('#menu-' + sectionKey).addClass('active-item');
                            
                            if (typeof Waves !== 'undefined') {
                                Waves.displayEffect();
                            }

                            if($('#menu-navegacion option[value="'+sectionKey+'"]').length > 0) {
                                $('#menu-navegacion').val(sectionKey);
                            }
                            card.css('opacity', '1');
                        }, 80);
                    }
                }

                $('.sidenav-trigger-toggle').on('click', function(e) {
                    e.preventDefault();
                    var sidebar = $('#left-sidebar-nav');
                    var main = $('#main');
                    if(sidebar.hasClass('side-nav-hidden')) {
                        sidebar.removeClass('side-nav-hidden');
                        main.removeClass('mainPaddingLeft').addClass('mainPaddingSidebar');
                    } else {
                        sidebar.addClass('side-nav-hidden');
                        main.removeClass('mainPaddingSidebar').addClass('mainPaddingLeft');
                    }
                });

                $(document).ready(function() {
                    $('.dropdown-trigger').dropdown({ 
                        constrainWidth: false, 
                        alignment: 'right', 
                        coverTrigger: false,
                        inDuration: 250,
                        outDuration: 200
                    });
                    
                    $('#menu-navegacion').on('change', function() {
                        if($(this).val() === 'logout') window.location.href = '/';
                        else showSection($(this).val());
                    });

                    // Por defecto te manda a Calificaciones para verificar el cambio de inmediato
                    showSection('calificaciones');
                });
            </script>
        </body>
        </html>
    `;
}

// MANEJO DE RUTAS
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
    console.log(`Servidor activo corriendo en el puerto ${PORT}`);
});
