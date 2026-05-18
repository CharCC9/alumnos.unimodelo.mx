const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

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
                <div class="logo-container"><img src="/mi-logotipo.png" alt="Logo Universidad Modelo"></div>
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
                
                #left-sidebar-nav { position: fixed; width: 240px; left: 0; top: 64px; height: calc(100vh - 64px); background: #fff; z-index: 999; box-shadow: 1px 0 5px rgba(0,0,0,0.1); transition: transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94); overflow-y: auto; }
                .side-nav-hidden { transform: translateX(-240px); }
                
                header nav { background-color: #0d47a1 !important; height: 64px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
                .nav-brand-area { width: 240px; height: 64px; background-color: #0a3c8a; float: left; display: flex; align-items: center; padding-left: 15px; box-sizing: border-box; }
                .nav-brand-area img { width: 44px; height: 44px; margin-left: 15px; object-fit: contain; }
                
                .custom-select-trigger { background-color: white !important; color: #333 !important; border: 1px solid #ccc; border-radius: 3px; height: 34px; line-height: 34px; padding: 0 30px 0 10px; text-transform: none; font-size: 14px; font-weight: 400; display: inline-flex; align-items: center; justify-content: space-between; width: 190px; position: relative; box-shadow: none !important; }
                .custom-select-trigger i { position: absolute; right: 5px; color: #666; }
                .dropdown-select-content { width: 190px !important; background-color: white; }
                .dropdown-select-content li a { color: #333 !important; font-size: 14px; padding: 12px 16px; }
                .dropdown-select-content li:hover { background-color: #f1f1f1; }

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
                
                .simulated-table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 14px; color: #333; margin-bottom: 0px !important; table-layout: fixed; }
                .simulated-table th, .simulated-table td { border: 1px solid #cccccc; padding: 10px 12px; text-align: left; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                .simulated-table th { background-color: #f5f5f5; color: #111111; font-weight: bold; position: relative; }
                .simulated-table tr:nth-child(even) { background-color: #fafafa; }
                
                .dt-sort-icon::after { content: " ⇅"; font-size: 11px; color: #bbb; position: absolute; right: 8px; top: 12px; }
                .dt-sort-icon-active::after { content: " ▲"; font-size: 10px; color: #0d47a1; position: absolute; right: 8px; top: 12px; }

                .dt-search-footer-container { display: flex; width: 100%; background: transparent; padding-top: 8px; box-sizing: border-box; }
                .dt-search-col-box { padding-right: 0px; box-sizing: border-box; display: inline-block; }
                .dt-search-input { width: 96% !important; height: 28px !important; margin: 0 auto !important; padding: 0 4px !important; font-size: 13px !important; border: none !important; border-bottom: 1px solid #ccc !important; box-sizing: border-box !important; background: transparent !important; font-family: 'Segoe UI', Arial, sans-serif; display: block; }
                .dt-search-input::placeholder { color: #bbb; font-weight: 400; }
                .dt-search-input:focus { border-bottom: 1px solid #0d47a1 !important; box-shadow: none !important; }
                
                .dt-footer-container { display: flex; justify-content: space-between; align-items: center; margin-top: 25px; font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; color: #333; }
                .dt-info { font-size: 13.5px; color: #333; }
                .dt-pagination { display: flex; align-items: center; list-style: none; margin: 0; padding: 0; }
                .dt-pagination li { margin: 0 2px; }
                .dt-pagination li a { display: block; padding: 6px 12px; color: #333; text-decoration: none; font-size: 13px; border-radius: 2px; cursor: pointer; }
                .dt-pagination li.active-page a { background-color: #e0e0e0; font-weight: bold; border: 1px solid #ccc; box-shadow: inset 0 1px 3px rgba(0,0,0,0.1); }
                .dt-pagination li.disabled-page a { color: #bbb; cursor: default; }
                
                .custom-menu-li a { color: #444 !important; display: flex !important; align-items: center; padding: 14px 20px; cursor: pointer; font-size: 13px; font-weight: 500; text-transform: uppercase; position: relative; overflow: hidden; }
                .custom-menu-li a:hover { background-color: #f0f0f0; }
                .custom-menu-li a i.menu-arrow { margin-right: 15px; color: #777; font-size: 18px; font-weight: bold; }
                .custom-menu-li.active-item { background-color: #e0e0e0; border-left: 4px solid #0d47a1; }
                .custom-menu-li.active-item a { color: #0d47a1 !important; font-weight: bold; }
                .custom-menu-li.active-item a i.menu-arrow { color: #0d47a1; }

                /* Estilos para el menú colapsable (Extraordinarios) */
                .collapsible-header { background-color: transparent !important; border: none !important; padding: 14px 20px !important; font-size: 13px !important; font-weight: 500 !important; color: #444 !important; text-transform: uppercase; display: flex !important; align-items: center; justify-content: space-between; }
                .collapsible-header:hover { background-color: #f0f0f0; }
                .collapsible-header div { display: flex; align-items: center; }
                .collapsible-header i.main-icon { margin-right: 15px; color: #777; font-size: 20px; }
                .collapsible-header i.arrow-indicator { font-size: 18px; color: #777; transition: transform 0.2s; }
                li.active .collapsible-header i.arrow-indicator { transform: rotate(180deg); }
                .collapsible-body { padding: 0 !important; border: none !important; background-color: #fafafa; }
                .collapsible-body li a { padding-left: 54px !important; font-size: 13px !important; text-transform: none !important; font-weight: 400 !important; color: #555 !important; }
                .collapsible-body li.active-subitem a { color: #0d47a1 !important; font-weight: bold !important; background-color: #e0e0e0; }
                
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
                            <div class="nav-brand-area">
                                <a href="#" style="color:white; display: flex; align-items: center;" class="sidenav-trigger-toggle waves-effect waves-light">
                                    <i class="material-icons" style="font-size:28px;">menu</i>
                                </a>
                                <img src="/el-otro-logo.png" alt="Escudo Universidad Modelo">
                            </div>
                            
                            <div style="display: inline-block; margin-left: 20px; padding-top: 14px; vertical-align: top;">
                                <a class="dropdown-trigger btn custom-select-trigger" href="#" data-target="dropdown-menu-nav" id="label-select-actual">
                                    Calificaciones <i class="material-icons">arrow_drop_down</i>
                                </a>
                                <ul id="dropdown-menu-nav" class="dropdown-content dropdown-select-content">
                                    <li><a onclick="showSection('libreta_de_pago')">Libreta de pago</a></li>
                                    <li><a onclick="showSection('colegiaturas')">Colegiaturas / Inscr.</a></li>
                                    <li><a onclick="showSection('horario')">Horario</a></li>
                                    <li><a onclick="showSection('asignaturas')">Asignaturas</a></li>
                                    <li><a onclick="showSection('calificaciones')">Calificaciones</a></li>
                                    <li class="divider"></li>
                                    <li><a href="/">Salir</a></li>
                                </ul>

                                <span style="font-size: 22px; color: white; margin-left: 20px; vertical-align: middle; font-weight: 300; line-height: 34px;">Universidad Modelo 🏆</span>
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
                        <ul class="collapsible collapsible-accordion" style="margin: 0; padding: 0; list-style: none;" data-collapsible="accordion">
                            <li class="custom-menu-li" id="menu-libreta_de_pago"><a onclick="showSection('libreta_de_pago')" class="waves-effect"><i class="material-icons menu-arrow">keyboard_arrow_right</i>LIBRETA DE PAGO</a></li>
                            <li class="custom-menu-li" id="menu-colegiaturas"><a onclick="showSection('colegiaturas')" class="waves-effect"><i class="material-icons menu-arrow">keyboard_arrow_right</i>COLEGIATURAS / INSCR.</a></li>
                            <li class="custom-menu-li" id="menu-horario"><a onclick="showSection('horario')" class="waves-effect"><i class="material-icons menu-arrow">keyboard_arrow_right</i>HORARIO</a></li>
                            <li class="custom-menu-li" id="menu-asignaturas"><a onclick="showSection('asignaturas')" class="waves-effect"><i class="material-icons menu-arrow">keyboard_arrow_right</i>ASIGNATURAS</a></li>
                            <li class="custom-menu-li" id="menu-calificaciones"><a onclick="showSection('calificaciones')" class="waves-effect"><i class="material-icons menu-arrow">keyboard_arrow_right</i>CALIFICACIONES</a></li>
                            <li class="custom-menu-li" id="menu-ordinarios"><a onclick="showSection('ordinarios')" class="waves-effect"><i class="material-icons menu-arrow">keyboard_arrow_right</i>ORDINARIOS</a></li>
                            <li class="custom-menu-li" id="menu-adeudadas"><a onclick="showSection('adeudadas')" class="waves-effect"><i class="material-icons menu-arrow">keyboard_arrow_right</i>ASIG.ADEUDADAS</a></li>
                            <li class="custom-menu-li" id="menu-constancias"><a onclick="showSection('constancias')" class="waves-effect"><i class="material-icons menu-arrow">keyboard_arrow_right</i>CONSTANCIAS</a></li>
                            
                            <li id="menu-extraordinarios-root">
                                <a class="collapsible-header waves-effect">
                                    <div>
                                        <i class="material-icons main-icon">dashboard</i>
                                        <span>EXTRAORDINARIOS</span>
                                    </div>
                                    <i class="material-icons arrow-indicator">keyboard_arrow_down</i>
                                </a>
                                <div class="collapsible-body">
                                    <ul>
                                        <li class="custom-menu-li" id="menu-extra_inscritos"><a onclick="showSection('extra_inscritos')" class="waves-effect"><i class="material-icons menu-arrow">keyboard_arrow_right</i>Exámenes Inscritos</a></li>
                                        <li class="custom-menu-li" id="menu-extra_calificaciones"><a onclick="showSection('extra_calificaciones')" class="waves-effect"><i class="material-icons menu-arrow">keyboard_arrow_right</i>Calificaciones</a></li>
                                    </ul>
                                </div>
                            </li>

                            <li class="custom-menu-li" id="menu-formularios"><a onclick="showSection('formularios')" class="waves-effect"><i class="material-icons menu-arrow">keyboard_arrow_right</i>FORMULARIOS</a></li>
                            <li class="custom-menu-li" id="menu-biblioteca"><a onclick="showSection('biblioteca')" class="waves-effect"><i class="material-icons menu-arrow">keyboard_arrow_right</i>BIBLIOTECA</a></li>
                            <li class="custom-menu-li" id="menu-micuenta"><a onclick="showSection('micuenta')" class="waves-effect"><i class="material-icons menu-arrow">keyboard_arrow_right</i>MI CUENTA</a></li>
                            <li class="custom-menu-li" id="menu-documentos"><a onclick="showSection('documentos')" class="waves-effect"><i class="material-icons menu-arrow">keyboard_arrow_right</i>DOCUMENTOS</a></li>
                            <li class="custom-menu-li" id="menu-eduvida"><a onclick="showSection('eduvida')" class="waves-effect"><i class="material-icons menu-arrow">keyboard_arrow_right</i>EDUCACION PARA LA VIDA</a></li>
                            <li class="custom-menu-li"><a href="/" class="waves-effect"><i class="material-icons menu-arrow">keyboard_arrow_right</i>SALIR</a></li>
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
                function generateExternalDataTablesFooter(columnWidthsArray, totalEntries) {
                    let searchBoxesHtml = '<div class="dt-search-footer-container">';
                    
                    columnWidthsArray.forEach(function(widthPercentage) {
                        searchBoxesHtml += '<div class="dt-search-col-box" style="width: ' + widthPercentage + '%;">' +
                                                '<input type="text" class="dt-search-input" placeholder="Buscar">' +
                                           '</div>';
                    });
                    searchBoxesHtml += '</div>';
                    
                    let paginationHtml = 
                        '<div class="dt-footer-container">' +
                            '<div class="dt-info">Showing 1 to ' + totalEntries + ' of ' + totalEntries + ' entries</div>' +
                            '<ul class="dt-pagination">' +
                                '<li class="disabled-page"><a>Previous</a></li>' +
                                '<li class="active-page"><a>1</a></li>' +
                                '<li class="disabled-page"><a>Next</a></li>' +
                            '</ul>' +
                        '</div>';
                        
                    return searchBoxesHtml + paginationHtml;
                }

                const footerColegiaturas = generateExternalDataTablesFooter([25, 25, 25, 25], 5);
                const footerHorarios = generateExternalDataTablesFooter([25, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5], 3);
                const footerAsignaturas = generateExternalDataTablesFooter([50, 50], 3);
                const footerCalificaciones = generateExternalDataTablesFooter([25, 15, 15, 15, 15, 15], 3);

                const sectionsData = {
                    libreta_de_pago: {
                        label: 'Libreta de pago',
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
                        label: 'Colegiaturas / Inscr.',
                        breadcrumb: 'Inicio <i class="material-icons">chevron_right</i> Pagos del Alumno',
                        html: '<h5 style="font-weight: 400; color: #222;">Pagos del alumno</h5>' +
                              '<p style="margin: 5px 0;"><b>Clave:</b> 15246740</p>' +
                              '<p style="margin: 5px 0 20px 0;"><b>Nombre:</b> SANTIAGO DE JESUS ARCOS GUZMAN</p>' +
                              '<table class="simulated-table">' +
                              '<colgroup><col style="width:25%"><col style="width:25%"><col style="width:25%"><col style="width:25%"></colgroup>' +
                              '<thead><tr><th class="dt-sort-icon">Descripción</th><th class="dt-sort-icon">Concepto</th><th class="dt-sort-icon">Referencia</th><th class="dt-sort-icon">Adeudo vigente</th></tr></thead>' +
                              '<tbody>' +
                              '<tr><td>Colegiatura Mayo/2026</td><td>092509</td><td></td><td>NO</td></tr>' +
                              '<tr><td>Colegiatura Abril/2026</td><td>082508</td><td></td><td>NO</td></tr>' +
                              '<tr><td>Colegiatura Marzo/2026</td><td>072507</td><td></td><td>NO</td></tr>' +
                              '<tr><td>Colegiatura Febrero/2026</td><td>062506</td><td></td><td>NO</td></tr>' +
                              '<tr><td>Inscripción Semestral / Enero 2026</td><td>002500</td><td></td><td>NO</td></tr>' +
                              '</tbody></table>' + footerColegiaturas
                    },
                    horario: {
                        label: 'Horario',
                        breadcrumb: 'Inicio <i class="material-icons">chevron_right</i> Horarios del alumno',
                        html: '<h5 style="font-weight: 400; color: #222; text-transform: uppercase;">Horarios del Alumno</h5>' +
                              '<p style="margin: 5px 0;"><b>Clave:</b> 15246740</p>' +
                              '<p style="margin: 5px 0 20px 0;"><b>Nombre:</b> SANTIAGO DE JESUS ARCOS GUZMAN</p>' +
                              '<table class="simulated-table">' +
                              '<colgroup><col style="width:25%"><col style="width:12.5%"><col style="width:12.5%"><col style="width:12.5%"><col style="width:12.5%"><col style="width:12.5%"><col style="width:12.5%"></colgroup>' +
                              '<thead><tr><th class="dt-sort-icon-active">Materia</th><th class="dt-sort-icon">Lunes</th><th class="dt-sort-icon">Martes</th><th class="dt-sort-icon">Miércoles</th><th class="dt-sort-icon">Jueves</th><th class="dt-sort-icon">Viernes</th><th class="dt-sort-icon">Sábado</th></tr></thead>' +
                              '<tbody>' +
                              '<tr><td>ALGORITMOS</td><td></td><td>11-13</td><td></td><td></td><td>9-11</td><td></td></tr>' +
                              '<tr><td>CALCULO DIFERENCIAL</td><td>11-13</td><td></td><td>11-13</td><td></td><td>11-13</td><td></td></tr>' +
                              '<tr><td>FISICA APLICADA</td><td>9-11</td><td></td><td>9-11</td><td></td><td></td><td></td></tr>' +
                              '</tbody></table>' + footerHorarios
                    },
                    asignaturas: {
                        label: 'Asignaturas',
                        breadcrumb: 'Inicio <i class="material-icons">chevron_right</i> Asignaturas',
                        html: '<h5 style="font-weight: 400; color: #222;">Asignaturas del alumno</h5>' +
                              '<p style="margin: 5px 0;"><b>Clave:</b> 15246740</p>' +
                              '<p style="margin: 5px 0 20px 0;"><b>Nombre:</b> SANTIAGO DE JESUS ARCOS GUZMAN</p>' +
                              '<table class="simulated-table">' +
                              '<colgroup><col style="width:50%"><col style="width:50%"></colgroup>' +
                              '<thead><tr><th class="dt-sort-icon-active">Materia</th><th class="dt-sort-icon">Maestro</th></tr></thead>' +
                              '<tbody>' +
                              '<tr><td>ALGORITMOS</td><td>EDSON GEOVANNY ESTRADA LOPEZ</td></tr>' +
                              '<tr><td>CALCULO DIFERENCIAL</td><td>AYLIN GARCIA REYES</td></tr>' +
                              '<tr><td>FISICA APLICADA</td><td>ALBERTO GABRIEL VEGA POOT</td></tr>' +
                              '</tbody></table>' + footerAsignaturas
                    },
                    calificaciones: {
                        label: 'Calificaciones',
                        breadcrumb: 'Inicio <i class="material-icons">chevron_right</i> Calificaciones',
                        html: '<h5 style="font-weight: 400; color: #222; text-transform: uppercase;">Calificaciones del Alumno</h5>' +
                              '<p style="margin: 5px 0;"><b>Clave:</b> 15246740</p>' +
                              '<p style="margin: 5px 0 20px 0;"><b>Nombre:</b> SANTIAGO DE JESUS ARCOS GUZMAN</p>' +
                              '<table class="simulated-table">' +
                              '<colgroup><col style="width:25%"><col style="width:15%"><col style="width:15%"><col style="width:15%"><col style="width:15%"><col style="width:15%"></colgroup>' +
                              '<thead><tr><th class="dt-sort-icon-active">Materia</th><th class="dt-sort-icon">Parcial 1</th><th class="dt-sort-icon">Parcial 2</th><th class="dt-sort-icon">Promedio</th><th class="dt-sort-icon">Ordinario</th><th class="dt-sort-icon">Calif. Final</th></tr></thead>' +
                              '<tbody>' +
                              '<tr><td>ALGORITMOS</td><td>0</td><td>0</td><td>0</td><td></td><td></td></tr>' +
                              '<tr><td>CALCULO DIFERENCIAL</td><td>0</td><td>38</td><td>19</td><td></td><td></td></tr>' +
                              '<tr><td>FISICA APLICADA</td><td>10</td><td></td><td></td><td></td><td></td></tr>' +
                              '</tbody></table>' + footerCalificaciones
                    },
                    ordinarios: { 
                        label: 'Ordinarios', 
                        breadcrumb: 'Inicio <i class="material-icons">chevron_right</i> Ordinarios', 
                        html: '<h5 style="font-weight: 400; color: #222; text-transform: uppercase;">Exámenes Ordinarios</h5>' +
                              '<p style="margin: 5px 0;"><b>Clave:</b> 15246740</p>' +
                              '<p style="margin: 5px 0 20px 0;"><b>Nombre:</b> SANTIAGO DE JESUS ARCOS GUZMAN</p>' +
                              '<table class="simulated-table">' +
                              '<colgroup><col style="width:30%"><col style="width:20%"><col style="width:15%"><col style="width:35%"></colgroup>' +
                              '<thead><tr><th class="dt-sort-icon-active">Materia</th><th class="dt-sort-icon">Fecha</th><th class="dt-sort-icon">Hora</th><th class="dt-sort-icon">Maestro</th></tr></thead>' +
                              '<tbody>' +
                              '<tr><td>ALGORITMOS</td><td>05-06-2026</td><td>11:00:00</td><td>EDSON GEOVANNY ESTRADA LOPEZ</td></tr>' +
                              '<tr><td>CALCULO DIFERENCIAL</td><td>10-06-2026</td><td>11:00:00</td><td>AYLIN GARCIA REYES</td></tr>' +
                              '<tr><td>FISICA APLICADA</td><td>03-06-2026</td><td>09:00:00</td><td>ALBERTO GABRIEL VEGA POOT</td></tr>' +
                              '</tbody></table>' + generateExternalDataTablesFooter([30, 20, 15, 35], 3)
                    },
                    adeudadas: { label:'Asig. Adeudadas', breadcrumb: 'Inicio <i class="material-icons">chevron_right</i> Adeudadas', html: "<h5>Asignaturas Adeudadas</h5><p style='color:green;'><b>Estatus Regular:</b> No se registran asignaturas reprobadas.</p>" },
                    constancias: { label:'Constancias', breadcrumb: 'Inicio <i class="material-icons">chevron_right</i> Constancias', html: "<h5>Trámite de Constancias</h5><button class='btn blue darken-4'>Solicitar Constancia</button>" },
                    extra_inscritos: { label:'Exámenes Inscritos', breadcrumb: 'Inicio <i class="material-icons">chevron_right</i> Extraordinarios <i class="material-icons">chevron_right</i> Inscritos', html: "<h5>Exámenes Extraordinarios Inscritos</h5><p>No cuentas con exámenes extraordinarios inscritos en este periodo.</p>" },
                    extra_calificaciones: { label:'Calificaciones', breadcrumb: 'Inicio <i class="material-icons">chevron_right</i> Extraordinarios <i class="material-icons">chevron_right</i> Calificaciones', html: "<h5>Calificaciones de Extraordinarios</h5><p>No se registran calificaciones de exámenes extraordinarios históricos.</p>" },
                    formularios: { label:'Formularios', breadcrumb: 'Inicio <i class="material-icons">chevron_right</i> Formularios', html: "<h5>Formularios</h5><button class='btn green darken-2'>Evaluación Docente 2026</button>" },
                    text: { label:'Biblioteca', breadcrumb: 'Inicio <i class="material-icons">chevron_right</i> Biblioteca', html: "<h5>Biblioteca</h5><p>Catálogo digital verificado correctamente.</p>" },
                    biblioteca: { label:'Biblioteca', breadcrumb: 'Inicio <i class="material-icons">chevron_right</i> Biblioteca', html: "<h5>Biblioteca</h5><p>Catálogo digital verificado correctamente.</p>" },
                    micuenta: { label:'Mi Cuenta', breadcrumb: 'Inicio <i class="material-icons">chevron_right</i> Mi Cuenta', html: "<h5>Mi Cuenta</h5><p><b>Carrera:</b> Ingeniería en Sistemas Computacionales</p>" },
                    documentos: { label:'Documentos', breadcrumb: 'Inicio <i class="material-icons">chevron_right</i> Documentos', html: "<h5>Documentos</h5><p>Expediente digital completo.</p>" },
                    eduvida: { label:'EduVida', breadcrumb: 'Inicio <i class="material-icons">chevron_right</i> EduVida', html: "<h5>Educación para la Vida</h5><p>Talleres acreditados.</p>" }
                };

                function showSection(sectionKey) {
                    const data = sectionsData[sectionKey];
                    if (data) {
                        const card = $('#dynamicRenderCard');
                        card.css('opacity', '0.3');
                        
                        setTimeout(function() {
                            document.getElementById('breadcrumb-container').innerHTML = data.breadcrumb;
                            document.getElementById('dynamicRenderCard').innerHTML = data.html;
                            
                            $('.custom-menu-li').removeClass('active-item');
                            
                            if(sectionKey === 'extra_inscritos' || sectionKey === 'extra_calificaciones') {
                                $('#' + menuId).addClass('active-item');
                            } else {
                                $('#menu-' + sectionKey).addClass('active-item');
                            }
                            
                            if (data.label) {
                                document.getElementById('label-select-actual').innerHTML = data.label + ' <i class="material-icons">arrow_drop_down</i>';
                            }
                            
                            if (typeof Waves !== 'undefined') {
                                Waves.displayEffect();
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
                    $('.collapsible').collapsible();
                    
                    $('.dropdown-trigger').dropdown({ 
                        constrainWidth: false, 
                        alignment: 'left', 
                        coverTrigger: false,
                        inDuration: 150,
                        outDuration: 150
                    });

                    showSection('calificaciones');
                });
            </script>
        </body>
        </html>
    `;
}

// ROUTING
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
