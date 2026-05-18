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
                
                #left-sidebar-nav { position: fixed; width: 240px; left: 0; top: 64px; height: calc(100vh - 64px); background: #fff; z-index: 999; box-shadow: 1px 0 5px rgba(0,0,0,0.1); overflow-y: auto; }
                
                header nav { background-color: #025fa4 !important; height: 64px; box-shadow: 0 2px 5px rgba(0,0,0,0.2); }
                .nav-wrapper { display: flex; align-items: center; justify-content: space-between; padding: 0 20px; height: 64px; }
                
                .brand-logo-center { position: absolute; left: 50%; transform: translateX(-50%); font-size: 24px; font-weight: 400; color: white; white-space: nowrap; }

                .custom-select-container { width: 220px; height: 34px; background: white; border-radius: 2px; position: relative; cursor: pointer; display: flex; align-items: center; padding: 0 10px; border: 1px solid #ccc; box-sizing: border-box; }
                .custom-select-container span { color: #333; font-size: 14px; flex-grow: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                .custom-select-container i { color: #777; }
                
                #dropdown-left-nav { width: 220px !important; background-color: white; }
                #dropdown-left-nav li a { color: #333 !important; font-size: 14px; padding: 12px 16px; }

                .user-info-right { display: flex; align-items: center; color: white; }
                .user-name-text { font-size: 14px; margin-right: 15px; font-weight: 400; text-transform: uppercase; }
                .more-btn-trigger { cursor: pointer; color: white; display: flex; align-items: center; }
                #profile-dropdown { background-color: white; }
                #profile-dropdown li a { color: #333 !important; font-size: 14px; }

                .section-action-btn { background-color: #007bc4; color: white; border: none; border-radius: 4px; height: 40px; line-height: 40px; padding: 0 20px; font-size: 13px; font-weight: 500; text-transform: uppercase; display: inline-block; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.15); margin-bottom: 20px; }
                .section-line-divider { border: none; border-bottom: 1px solid #e0e0e0; margin-bottom: 20px; width: 100%; }

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
                
                .no-records-row { text-align: center !important; color: #666; background-color: #fbfbfb !important; font-style: italic; }

                .dt-sort-icon::after { content: " ⇅"; font-size: 11px; color: #bbb; position: absolute; right: 8px; top: 12px; }
                .dt-sort-icon-active::after { content: " ▲"; font-size: 10px; color: #0d47a1; position: absolute; right: 8px; top: 12px; }

                .dt-search-footer-container { display: flex; width: 100%; background: transparent; padding-top: 8px; box-sizing: border-box; }
                .dt-search-col-box { padding-right: 0px; box-sizing: border-box; display: inline-block; }
                .dt-search-input { width: 96% !important; height: 28px !important; margin: 0 auto !important; padding: 0 4px !important; font-size: 13px !important; border: none !important; border-bottom: 1px solid #ccc !important; box-sizing: border-box !important; background: transparent !important; display: block; }
                .dt-search-input::placeholder { color: #bbb; font-weight: 400; }
                .dt-search-input:focus { border-bottom: 1px solid #025fa4 !important; box-shadow: none !important; outline: none; }
                
                .dt-footer-container { display: flex; justify-content: space-between; align-items: center; margin-top: 25px; font-size: 13px; color: #333; }
                .dt-info { font-size: 13.5px; color: #333; }
                .dt-pagination { display: flex; align-items: center; list-style: none; margin: 0; padding: 0; }
                .dt-pagination li { margin: 0 2px; }
                .dt-pagination li a { display: block; padding: 6px 12px; color: #333; text-decoration: none; font-size: 13px; border-radius: 2px; cursor: pointer; }
                .dt-pagination li.active-page a { background-color: #e0e0e0; font-weight: bold; border: 1px solid #ccc; box-shadow: inset 0 1px 3px rgba(0,0,0,0.1); }
                .dt-pagination li.disabled-page a { color: #bbb; cursor: default; }
                
                .custom-menu-li a { color: #444 !important; display: flex !important; align-items: center; padding: 14px 20px; cursor: pointer; font-size: 13px; font-weight: 500; text-transform: uppercase; position: relative; }
                .custom-menu-li a:hover { background-color: #f0f0f0; }
                .custom-menu-li a i { margin-right: 15px; color: #777; font-size: 18px; }
                .custom-menu-li.active-item { background-color: #e0e0e0; border-left: 4px solid #025fa4; }
                .custom-menu-li.active-item a { color: #025fa4 !important; font-weight: bold; }
                .custom-menu-li.active-item a i { color: #025fa4; }

                /* Estilos Mi Cuenta */
                .mc-header-container { margin-bottom: 20px; }
                .mc-title { font-size: 22px; color: #333; font-weight: 400; text-transform: uppercase; margin: 0; }
                .mc-banner-blue { background-color: #025fa4; color: white; padding: 10px 15px; font-size: 14px; font-weight: 500; text-transform: uppercase; margin-bottom: 30px; border-radius: 2px; }
                .mc-form-row { margin-bottom: 25px; }
                .mc-input-field label { display: block; font-size: 13.5px; color: #9e9e9e; margin-bottom: 5px; }
                .mc-input-field input { width: 100%; height: 36px; border: none; border-bottom: 1px solid #ccc; font-size: 14px; box-sizing: border-box; background: transparent; }
                .mc-checkbox-container { margin-top: 15px; margin-bottom: 30px; }
                .mc-checkbox-label { display: flex; align-items: center; cursor: pointer; font-size: 14px; color: #666; }
                .mc-checkbox-label input { margin-right: 10px; width: 16px; height: 16px; accent-color: #025fa4; }
                
                /* Botón Genérico */
                .generic-blue-btn { background-color: #007bc4; color: white; border: none; border-radius: 3px; height: 38px; padding: 0 20px; font-size: 13.5px; text-transform: uppercase; display: inline-flex; align-items: center; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.15); font-weight: 400; gap: 8px; }

                /* Estilos de la sección Documentos */
                .doc-main-container { display: flex; justify-content: space-between; align-items: flex-start; margin-top: 20px; font-family: 'Segoe UI', Arial, sans-serif; gap: 40px; }
                .doc-left-panel { flex: 1; max-width: 550px; }
                .doc-banner-blue { background-color: #025fa4; height: 42px; width: 100%; margin-bottom: 25px; border-radius: 2px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
                .doc-select-btn { background-color: #007bc4; color: white; border: none; border-radius: 4px; height: 40px; line-height: 40px; padding: 0 20px; font-size: 13px; font-weight: 500; text-transform: uppercase; display: inline-block; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.15); margin-bottom: 20px; }
                .doc-line-divider { border: none; border-bottom: 1px solid #e0e0e0; margin-bottom: 20px; width: 100%; }
                .doc-btn-submit-disabled { background-color: #e0e0e0; color: #a6a6a6; border: none; border-radius: 4px; height: 36px; line-height: 36px; padding: 0 18px; font-size: 13px; font-weight: 500; text-transform: uppercase; display: inline-flex; align-items: center; cursor: not-allowed; }
                .doc-btn-submit-disabled i { font-size: 18px; margin-right: 8px; color: #a6a6a6; }
                .doc-right-notes-card { width: 320px; background-color: #e8f4fd; border-radius: 4px; padding: 25px 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
                .doc-notes-title { font-size: 20px; color: #333; font-weight: 300; margin: 0 0 15px 0; }
                .doc-notes-list { margin: 0; padding-left: 20px; list-style-type: disc; }
                .doc-notes-list li { font-size: 13.5px; color: #444; margin-bottom: 12px; line-height: 1.5; font-weight: 400; }
                
                #dynamicRenderCard { transition: opacity 0.2s ease-in-out; }
            </style>
        </head>
        <body>

            <header>
                <nav>
                    <div class="nav-wrapper">
                        <div class="dropdown-trigger custom-select-container" data-target="dropdown-left-nav">
                            <span id="label-select-actual">Calificaciones</span>
                            <i class="material-icons">arrow_drop_down</i>
                        </div>
                        <ul id="dropdown-left-nav" class="dropdown-content">
                            <li><a onclick="showSection('libreta_de_pago')">Libreta de pago</a></li>
                            <li><a onclick="showSection('colegiaturas')">Colegiaturas / Inscr.</a></li>
                            <li><a onclick="showSection('horario')">Horario</a></li>
                            <li><a onclick="showSection('asignaturas')">Asignaturas</a></li>
                            <li><a onclick="showSection('calificaciones')">Calificaciones</a></li>
                            <li><a onclick="showSection('ordinarios')">Ordinarios</a></li>
                            <li><a onclick="showSection('adeudadas')">Asig. Adeudadas</a></li>
                            <li><a onclick="showSection('constancias')">Constancias</a></li>
                            <li><a onclick="showSection('documentos')">Documentos</a></li>
                            <li><a onclick="showSection('eduvida')">Educación para la Vida</a></li>
                        </ul>

                        <div class="brand-logo-center">Universidad Modelo</div>

                        <div class="user-info-right">
                            <span class="user-name-text">SANTIAGO DE JESUS ARCOS GUZMAN</span>
                            <i class="material-icons more-btn-trigger dropdown-trigger" data-target="profile-dropdown">more_vert</i>
                        </div>
                        <ul id="profile-dropdown" class="dropdown-content">                    
                            <li><a onclick="showSection('micuenta')"><i class="material-icons" style="color: #555;">person</i> Mi cuenta</a></li>
                            <li class="divider"></li>
                            <li><a href="/"><i class="material-icons" style="color: #555;">arrow_forward</i> Salir</a></li>
                        </ul>
                    </div>
                </nav>
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
                            <li class="custom-menu-li" id="menu-micuenta"><a onclick="showSection('micuenta')" class="waves-effect"><i class="material-icons">keyboard_arrow_right</i>MI CUENTA</a></li>
                            <li class="custom-menu-li" id="menu-documentos"><a onclick="showSection('documentos')" class="waves-effect"><i class="material-icons">keyboard_arrow_right</i>DOCUMENTOS</a></li>
                            <li class="custom-menu-li" id="menu-eduvida"><a onclick="showSection('eduvida')" class="waves-effect"><i class="material-icons">keyboard_arrow_right</i>EDUVIDA</a></li>
                        </ul>
                    </aside>

                    <section id="content" style="padding: 20px;">
                        <div class="container" style="width: 100%; max-width: 1200px;">
                            <div id="breadcrumb-container" style="font-size: 14px; color: #666; margin-bottom: 10px;"></div>
                            <div id="dynamicRenderCard" style="background: white; padding: 30px; border-radius: 4px; box-shadow: 0 1px 4px rgba(0,0,0,0.1); min-height: 450px;"></div>
                        </div>
                    </section>
                </div>
            </div>

            <script type="text/javascript" src="https://alumnos.unimodelo.mx/js/jquery-3.2.1.min.js"></script>
            <script type="text/javascript" src="https://alumnos.unimodelo.mx/js/materialize.min.js"></script>
            
            <script>
                function generateExternalDataTablesFooter(columnWidthsArray, totalEntries, showPageTwo = false, isZeroEntries = false, searchFieldsCount = null, currentPage = 1, totalPages = 2) {
                    let searchBoxesHtml = '<div class="dt-search-footer-container">';
                    let limit = searchFieldsCount !== null ? searchFieldsCount : columnWidthsArray.length;
                    
                    for (let i = 0; i < columnWidthsArray.length; i++) {
                        if (i < limit) {
                            searchBoxesHtml += '<div class="dt-search-col-box" style="width: ' + columnWidthsArray[i] + '%;">' +
                                                    '<input type="text" class="dt-search-input" placeholder="Buscar">' +
                                               '</div>';
                        } else {
                            searchBoxesHtml += '<div class="dt-search-col-box" style="width: ' + columnWidthsArray[i] + '%; background: transparent;"></div>';
                        }
                    }
                    searchBoxesHtml += '</div>';
                    
                    if (isZeroEntries) {
                        return searchBoxesHtml + 
                            '<div class="dt-footer-container">' +
                                '<div class="dt-info">Mostrando 0 a 0 de 0 registros</div>' +
                                '<ul class="dt-pagination">' +
                                    '<li class="disabled-page"><a>Anterior</a></li>' +
                                    '<li class="disabled-page"><a>Siguiente</a></li>' +
                                '</ul>' +
                            '</div>';
                    }
                    
                    let startEntry = showPageTwo ? 16 : 1;
                    let endEntry = showPageTwo ? totalEntries : 15;
                    if (totalEntries <= 15) { endEntry = totalEntries; }

                    let prevClass = showPageTwo ? "" : "disabled-page";
                    let nextClass = showPageTwo ? "disabled-page" : "";
                    let p1Class = showPageTwo ? "" : "active-page";
                    let p2Class = showPageTwo ? "active-page" : "";
                    
                    let paginationItemsHtml = '';
                    if (totalPages === 1) {
                        paginationItemsHtml = '<li class="disabled-page"><a>Anterior</a></li><li class="active-page"><a>1</a></li><li class="disabled-page"><a>Siguiente</a></li>';
                    } else {
                        paginationItemsHtml = 
                            '<li class="' + prevClass + '"><a onclick="changeColegiaturasPage(1)">Anterior</a></li>' +
                            '<li class="' + p1Class + '"><a onclick="changeColegiaturasPage(1)">1</a></li>' +
                            '<li class="' + p2Class + '"><a onclick="changeColegiaturasPage(2)">2</a></li>' +
                            '<li class="' + nextClass + '"><a onclick="changeColegiaturasPage(2)">Siguiente</a></li>';
                    }

                    return searchBoxesHtml + 
                        '<div class="dt-footer-container">' +
                            '<div class="dt-info">Página ' + currentPage + ' de ' + totalPages + '</div>' +
                            '<ul class="dt-pagination">' + paginationItemsHtml + '</ul>' +
                        '</div>';
                }

                const footerHorarios = generateExternalDataTablesFooter([25, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5], 3, false, false, null, 1, 1);
                const footerAsignaturas = generateExternalDataTablesFooter([50, 50], 3, false, false, null, 1, 1);
                const footerCalificaciones = generateExternalDataTablesFooter([25, 15, 15, 15, 15, 15], 3, false, false, null, 1, 1);
                const footerAdeudadas = generateExternalDataTablesFooter([30, 50, 20], 3, false, false, null, 1, 1);

                function changeColegiaturasPage(pageNumber) {
                    const container = $('#dynamicRenderCard');
                    container.css('opacity', '0.4');
                    
                    setTimeout(function() {
                        let tbodyHtml = "";
                        let footerHtml = "";
                        
                        if (pageNumber === 1) {
                            tbodyHtml = 
                                '<tr><td>Colegiatura Mayo/2026</td><td>09</td><td>2509</td><td>NO</td></tr>' +
                                '<tr><td>Colegiatura Abril/2026</td><td>08</td><td>2508</td><td>NO</td></tr>' +
                                '<tr><td>Colegiatura Marzo/2026</td><td>07</td><td>2507</td><td>NO</td></tr>' +
                                '<tr><td>Colegiatura Febrero/2026</td><td>06</td><td>2506</td><td>NO</td></tr>' +
                                '<tr><td>Inscripción Semestral / Enero 2026</td><td>00</td><td>2500</td><td>NO</td></tr>' +
                                '<tr><td>Colegiatura Octubre/2025</td><td>02</td><td></td><td>NO</td></tr>' +
                                '<tr><td>Colegiatura Septiembre/2025</td><td>01</td><td>2501</td><td>NO</td></tr>' +
                                '<tr><td>Inscripción Anual o Semestral / Agosto 2025</td><td>99</td><td>2599</td><td>NO</td></tr>' +
                                '<tr><td>Colegiatura Junio/2025</td><td>10</td><td>2410</td><td>NO</td></tr>' +
                                '<tr><td>Colegiatura Mayo/2025</td><td>09</td><td>2409</td><td>NO</td></tr>' +
                                '<tr><td>Colegiatura Abril/2025</td><td>08</td><td>2408</td><td>NO</td></tr>' +
                                '<tr><td>Colegiatura Marzo/2025</td><td>07</td><td>2407</td><td>NO</td></tr>' +
                                '<tr><td>Colegiatura Febrero/2025</td><td>06</td><td>2406</td><td>NO</td></tr>' +
                                '<tr><td>Inscripción Semestral / Enero 2025</td><td>00</td><td>2400</td><td>NO</td></tr>' +
                                '<tr><td>Colegiatura Enero/2025</td><td>05</td><td>2405</td><td>NO</td></tr>';
                            footerHtml = generateExternalDataTablesFooter([40, 15, 25, 20], 20, false, false, null, 1, 2);
                        } else {
                            tbodyHtml = 
                                '<tr><td>Colegiatura Diciembre/2024</td><td>04</td><td>2404</td><td>NO</td></tr>' +
                                '<tr><td>Colegiatura Noviembre/2024</td><td>03</td><td>2403</td><td>NO</td></tr>' +
                                '<tr><td>Colegiatura Octubre/2024</td><td>02</td><td>2402</td><td>NO</td></tr>' +
                                '<tr><td>Colegiatura Septiembre/2024</td><td>01</td><td>2401</td><td>NO</td></tr>' +
                                '<tr><td>Inscripción Anual o Semestral/ Agosto 2024</td><td>99</td><td>2499</td><td>NO</td></tr>';
                            footerHtml = generateExternalDataTablesFooter([40, 15, 25, 20], 20, true, false, null, 2, 2);
                        }
                        
                        let baseHtml = 
                              '<h5 style="font-weight: 400; color: #222;">PAGOS DEL ALUMNO</h5>' +
                              '<p style="margin: 5px 0;"><b>Clave:</b> 15246740</p>' +
                              '<p style="margin: 5px 0 20px 0;"><b>Nombre:</b> SANTIAGO DE JESUS ARCOS GUZMAN</p>' +
                              '<table class="simulated-table">' +
                              '<colgroup><col style="width:40%"><col style="width:15%"><col style="width:25%"><col style="width:20%"></colgroup>' +
                              '<thead><tr><th class="dt-sort-icon-active">Descripción</th><th class="dt-sort-icon">Concepto</th><th class="dt-sort-icon">Referencia</th><th class="dt-sort-icon">Adeudo vigente</th></tr></thead>' +
                              '<tbody>' + tbodyHtml + '</tbody></table>' + footerHtml;
                              
                        document.getElementById('dynamicRenderCard').innerHTML = baseHtml;
                        container.css('opacity', '1');
                    }, 60);
                }

                function togglePasswordVisibility() {
                    const cb = document.getElementById('mc_show_pass');
                    const t1 = document.getElementById('mc_curr_pass');
                    const t2 = document.getElementById('mc_new_pass');
                    const t3 = document.getElementById('mc_conf_pass');
                    const type = cb.checked ? 'text' : 'password';
                    if(t1) t1.type = type;
                    if(t2) t2.type = type;
                    if(t3) t3.type = type;
                }

                const sectionsData = {
                    libreta_de_pago: {
                        label: 'Libreta de pago',
                        breadcrumb: 'Inicio > Libreta de pago',
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
                        breadcrumb: 'Inicio > Pagos del Alumno',
                        html: 'TRIGGER_PAGE_1'
                    },
                    horario: {
                        label: 'Horario',
                        breadcrumb: 'Inicio > Horarios del alumno',
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
                        breadcrumb: 'Inicio > Asignaturas',
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
                        breadcrumb: 'Inicio > Calificaciones',
                        html: '<h5 style="font-weight: 400; color: #222; text-transform: uppercase;">Calificaciones del Alumno</h5>' +
                              '<p style="margin: 5px 0;"><b>Clave:</b> 15246740</p>' +
                              '<p style="margin: 5px 0 20px 0;"><b>Nombre:</b> SANTIAGO DE JESUS ARCOS GUZMAN</p>' +
                              '<table class="simulated-table">' +
                              '<colgroup><col style="width:25%"><col style="width:15%"><col style="width:15%"><col style="width:15%"><col style="width:15%"><col style="width:15%"></colgroup>' +
                              '<thead><tr><th class="dt-sort-icon-active">Materia</th><th class="dt-sort-icon">Parcial 1</th><th class="dt-sort-icon">Parcial 2</th><th class="dt-sort-icon">Promedio</th><th class="dt-sort-icon">Ordinario</th><th class="dt-sort-icon">Calif. Final</th></tr></thead>' +
                              '<tbody>' +
                              '<tr><td>ALGORITMOS</td><td>0</td><td>8</td><td>4</td><td></td><td></td></tr>' +
                              '<tr><td>CALCULO DIFERENCIAL</td><td>0</td><td>8</td><td>4</td><td></td><td></td></tr>' +
                              '<tr><td>FISICA APLICADA</td><td>10</td><td>7</td><td>8.5</td><td></td><td></td></tr>' +
                              '</tbody></table>' + footerCalificaciones
                    },
                    ordinarios: { 
                        label:'Ordinarios', 
                        breadcrumb: 'Inicio > Ordinarios', 
                        html: '<h5 style="font-weight: 400; color: #222; text-transform: uppercase;">Exámenes Ordinarios</h5>' +
                              '<p style="margin: 5px 0;"><b>Clave:</b> 15246740</p>' +
                              '<p style="margin: 5px 0 20px 0;"><b>Nombre:</b> SANTIAGO DE JESUS ARCOS GUZMAN</p>' +
                              '<table class="simulated-table">' +
                              '<thead><tr><th class="dt-sort-icon-active">Materia</th><th class="dt-sort-icon">Fecha</th><th class="dt-sort-icon">Hora</th><th class="dt-sort-icon">Maestro</th><th class="dt-sort-icon">Apellido paterno</th><th class="dt-sort-icon">Apellido materno</th></tr></thead>' +
                              '<tbody>' +
                              '<tr><td>ALGORITMOS</td><td>05-06-2026</td><td>11:00:00</td><td>EDSON GEOVANNY</td><td>ESTRADA</td><td>LOPEZ</td></tr>' +
                              '<tr><td>CALCULO DIFERENCIAL</td><td>10-06-2026</td><td>11:00:00</td><td>AYLIN</td><td>GARCIA</td><td>REYES</td></tr>' +
                              '<tr><td>FISICA APLICADA</td><td>03-06-2026</td><td>09:00:00</td><td>ALBERTO GABRIEL</td><td>VEGA</td><td>POOT</td></tr>' +
                              '</tbody></table>' + generateExternalDataTablesFooter([20, 15, 15, 20, 15, 15], 3, false, false, null, 1, 1)
                    },
                    adeudadas: { 
                        label: 'Asig. Adeudadas', 
                        breadcrumb: 'Inicio > Asignaturas Adeudadas del Alumno', 
                        html: '<h5 style="font-weight: 400; color: #222; text-transform: uppercase; margin-bottom: 10px;">ASIGNATURAS ADEUDADAS DEL ALUMNO</h5>' +
                              '<p style="margin: 5px 0;"><b>Clave:</b> 15246740</p>' +
                              '<p style="margin: 5px 0;"><b>Nombre:</b> SANTIAGO DE JESUS ARCOS GUZMAN</p>' +
                              '<p style="margin: 5px 0 20px 0;"><b>NOTA:</b> Las materias marcadas en <span style="color:red; font-weight:bold;">rojo</span> son urgentes por aprobar. Comunícate a la brevedad con la coordinación de tu carrera.</p>' +
                              '<table class="simulated-table">' +
                              '<colgroup><col style="width:30%"><col style="width:50%"><col style="width:20%"></colgroup>' +
                              '<thead><tr><th class="dt-sort-icon-active">Clave</th><th class="dt-sort-icon">Asignatura</th><th class="dt-sort-icon">Semestre</th></tr></thead>' +
                              '<tbody>' +
                              '<tr><td>99221</td><td>CALCULO DIFERENCIAL</td><td>2</td></tr>' +
                              '<tr><td>99231</td><td>ALGORITMOS</td><td>2</td></tr>' +
                              '<tr><td>99251</td><td>FISICA APLICADA</td><td>2</td></tr>' +
                              '</tbody></table>' + footerAdeudadas 
                    },
                    constancias: { 
                        label: 'Constancias', 
                        breadcrumb: 'Inicio > Constancias', 
                        html: '<div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 40px; font-family: \'Segoe UI\', sans-serif;">' +
                              '    <div style="flex: 1; max-width: 320px;">' +
                              '        <h5 style="font-size: 22px; font-weight: 300; color: #333; margin-top: 0; margin-bottom: 20px;">CONSTANCIAS</h5>' +
                              '        <label style="font-size: 12px; color: #9e9e9e;">Constancia *</label>' +
                              '        <select class="browser-default" style="width: 100%; height: 36px; border: none; border-bottom: 1px solid #ccc; background: transparent; font-size: 14px; margin-bottom: 30px;">' +
                              '            <option>Buena conducta</option>' +
                              '        </select>' +
                              '        <button type="button" class="generic-blue-btn"><i class="material-icons" style="font-size:18px;">picture_as_pdf</i> Solicitar</button>' +
                              '    </div>' +
                              '    <div style="flex: 2; background: white; padding: 10px 20px;">' +
                              '        <h4 style="text-align: center; font-size: 32px; font-weight: 300; margin: 0 0 20px 0; letter-spacing: 1px;">AVISO</h4>' +
                              '        <p style="font-size: 14px; line-height: 1.6; color: #333; margin-bottom: 15px;">A partir del 1 de septiembre 2023, Las constancias tendrán un costo de: $ 50.00 (cincuenta pesos 00/100, m.n.), después de hacer la solicitud en el portal deberán de acudir a efectuar el pago a la Dirección de Control Escolar (Secretaría Administrativa) y pasar por ella en 24 horas posterior al pago.</p>' +
                              '        <p style="font-size: 14px; line-height: 1.6; color: #333; margin-bottom: 15px;">En el caso de que la constancia que requiere no se encuentre en las opciones o tiene alguna duda, mandar un correo especificando el requerimiento a: <b>constancias@modelo.edu.mx</b></p>' +
                              '        <p style="font-size: 14px; line-height: 1.6; color: #333; margin-bottom: 15px;">Si deseas solicitar constancias del siguiente período escolar (becas e inscripción) es necesario haber pagado la inscripción de dicho período.</p>' +
                              '        <p style="font-size: 14px; line-height: 1.6; color: #333; margin-bottom: 25px;">Para el caso de no poder pasar a recibir personalmente su constancia, lo podrá hacer a través de cualquier persona, mediante carta poder, en la que consten ambas firmas, incluyendo copias fotostáticas de sus identificaciones (INE, licencia de conducir o pasaporte).</p>' +
                              '        <p style="font-size: 14px; line-height: 1.4; color: #333; margin: 0;">Dirección de Control Escolar</p>' +
                              '        <p style="font-size: 14px; line-height: 1.4; color: #333; margin: 0;">Tel.: 9999301900 ext. 1130-1134</p>' +
                              '    </div>' +
                              '</div>'
                    },
                    micuenta: { 
                        label: 'Mi Cuenta', 
                        breadcrumb: 'Inicio > Mi Cuenta', 
                        html: '<div class="mc-header-container">' +
                              '    <h5 class="mc-title">USUARIO SANTIAGO DE JESUS ARCOS GUZMAN</h5>' +
                              '</div>' +
                              '<div class="mc-banner-blue">Cambiar Contraseña</div>' +
                              '<form style="max-width: 450px;">' +
                              '    <div class="mc-form-row">' +
                              '        <div class="mc-input-field">' +
                              '            <label for="mc_curr_pass">Contraseña Actual</label>' +
                              '            <input id="mc_curr_pass" type="password">' +
                              '        </div>' +
                              '    </div>' +
                              '    <div class="mc-form-row">' +
                              '        <div class="mc-input-field">' +
                              '            <label for="mc_new_pass">Nueva Contraseña</label>' +
                              '            <input id="mc_new_pass" type="password">' +
                              '        </div>' +
                              '    </div>' +
                              '    <div class="mc-form-row">' +
                              '        <div class="mc-input-field">' +
                              '            <label for="mc_conf_pass">Confirmar nueva Contraseña</label>' +
                              '            <input id="mc_conf_pass" type="password">' +
                              '        </div>' +
                              '    </div>' +
                              '    <div class="mc-checkbox-container">' +
                              '        <label class="mc-checkbox-label">' +
                              '            <input type="checkbox" id="mc_show_pass" onclick="togglePasswordVisibility()">' +
                              '            <span>Mostrar contraseña</span>' +
                              '        </label>' +
                              '    </div>' +
                              '    <button type="button" class="generic-blue-btn">' +
                              '        <i class="material-icons" style="font-size:18px;">save</i> Guardar' +
                              '    </button>' +
                              '</form>'
                    },
                    documentos: { 
                        label: 'Documentos', 
                        breadcrumb: 'Inicio > Documentos', 
                        html: '<h5 style="font-size: 24px; font-weight: 300; margin: 0 0 10px 0; color: #111;">Documentos</h5>' +
                              '<div class="doc-main-container">' +
                              '    <div class="doc-left-panel">' +
                              '        <div class="doc-banner-blue"></div>' +
                              '        <button type="button" class="doc-select-btn waves-effect waves-light">Certificado de Bachillerato</button>' +
                              '        <div class="doc-line-divider"></div>' +
                              '        <button type="button" class="doc-btn-submit-disabled">' +
                              '            <i class="material-icons">save</i> Subir' +
                              '        </button>' +
                              '    </div>' +
                              '    <div class="doc-right-notes-card">' +
                              '        <h6 class="doc-notes-title">Notas importantes</h6>' +
                              '        <ul class="doc-notes-list">' +
                              '            <li>Sube un único archivo PDF con los documentos solicitados,</li>' +
                              '            <li>El límite de peso máximo para el archivo son 5mb</li>' +
                              '            <li>Suba el archivo según sea el caso</li>' +
                              '            <li>Todos los documentos serán solicitados en algún momento de manera física en original a través de la Dirección de Control Escolar.</li>' +
                              '        </ul>' +
                              '    </div>' +
                              '</div>'
                    },
                    eduvida: {
                        label: 'Educación para la Vida',
                        breadcrumb: 'Inicio > Eduvida',
                        html: '<h5 style="font-size: 24px; font-weight: 300; margin: 0 0 20px 0; color: #111; text-transform: uppercase;">EDUVIDA</h5>' +
                              '<div style="background: white; border: 1px solid #e0e0e0; border-radius: 4px; padding: 25px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); max-width: 500px;">' +
                              '    <button type="button" class="generic-blue-btn" style="height: 42px; padding: 0 24px;">' +
                              '        <i class="material-icons" style="font-size:20px;">save</i> Entrar al Portal' +
                              '    </button>' +
                              '</div>'
                    }
                };

                function showSection(sectionKey) {
                    const data = sectionsData[sectionKey];
                    if (data) {
                        const card = $('#dynamicRenderCard');
                        card.css('opacity', '0.3');
                        
                        setTimeout(function() {
                            document.getElementById('breadcrumb-container').innerText = data.breadcrumb;
                            
                            if (sectionKey === 'colegiaturas') {
                                changeColegiaturasPage(1);
                            } else {
                                document.getElementById('dynamicRenderCard').innerHTML = data.html;
                            }
                            
                            $('.custom-menu-li').removeClass('active-item');
                            $('#menu-' + sectionKey).addClass('active-item');
                            
                            if (data.label) {
                                document.getElementById('label-select-actual').innerText = data.label;
                            }
                            
                            card.css('opacity', '1');
                        }, 80);
                    }
                }

                $(document).ready(function() {
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
