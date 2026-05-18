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
                
                .no-records-row { text-align: center !important; color: #666; background-color: #fbfbfb !important; font-style: italic; }

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

                .mc-header-container { border-bottom: none; margin-bottom: 20px; }
                .mc-title { font-size: 22px; color: #333; font-weight: 400; text-transform: uppercase; margin: 0; font-family: 'Segoe UI', Arial, sans-serif; }
                .mc-banner-blue { background-color: #025fa4; color: white; padding: 10px 15px; font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 30px; border-radius: 2px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
                .mc-form-row { margin-bottom: 25px; }
                .mc-input-field input[type=password], .mc-input-field input[type=text] { width: 100%; height: 36px; border: none; border-bottom: 1px solid #ccc; font-size: 14px; margin-bottom: 0; box-sizing: border-box; background: transparent; transition: border-bottom 0.2s; }
                .mc-input-field input[type=password]:focus, .mc-input-field input[type=text]:focus { border-bottom: 1px solid #025fa4; box-shadow: none; outline: none; }
                .mc-input-field label { display: block; font-size: 13.5px; color: #9e9e9e; margin-bottom: 5px; font-weight: 400; }
                .mc-checkbox-container { margin-top: 15px; margin-bottom: 30px; }
                .mc-checkbox-label { display: flex; align-items: center; cursor: pointer; user-select: none; font-size: 14px; color: #666; }
                .mc-checkbox-label input[type=checkbox] { margin-right: 10px; width: 16px; height: 16px; accent-color: #025fa4; cursor: pointer; }
                .mc-btn-save { background-color: #007bc4; color: white; border: none; border-radius: 3px; height: 38px; line-height: 38px; padding: 0 20px; font-size: 13.5px; font-weight: 500; text-transform: uppercase; display: inline-flex; align-items: center; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.15); transition: background-color 0.2s; }
                .mc-btn-save:hover { background-color: #006aa9; }
                .mc-btn-save i { font-size: 18px; margin-right: 8px; }

                .doc-main-container { display: flex; justify-content: space-between; align-items: flex-start; margin-top: 20px; font-family: 'Segoe UI', Arial, sans-serif; gap: 40px; }
                .doc-left-panel { flex: 1; max-width: 550px; }
                .doc-banner-blue { background-color: #025fa4; height: 42px; width: 100%; margin-bottom: 25px; border-radius: 2px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
                .doc-select-btn { background-color: #007bc4; color: white; border: none; border-radius: 4px; height: 40px; line-height: 40px; padding: 0 20px; font-size: 13px; font-weight: 500; text-transform: uppercase; display: inline-block; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.15); margin-bottom: 20px; }
                .doc-line-divider { border: none; border-bottom: 1px solid #e0e0e0; margin-bottom: 20px; width: 100%; }
                .doc-btn-submit-disabled { background-color: #e0e0e0; color: #a6a6a6; border: none; border-radius: 4px; height: 36px; line-height: 36px; padding: 0 18px; font-size: 13px; font-weight: 500; text-transform: uppercase; display: inline-flex; align-items: center; cursor: not-allowed; box-shadow: none; pointer-events: none; }
                .doc-btn-submit-disabled i { font-size: 18px; margin-right: 8px; color: #a6a6a6; }
                .doc-right-notes-card { width: 320px; background-color: #e8f4fd; border-radius: 4px; padding: 25px 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
                .doc-notes-title { font-size: 20px; color: #333; font-weight: 300; margin: 0 0 15px 0; }
                .doc-notes-list { margin: 0; padding-left: 20px; list-style-type: disc; }
                .doc-notes-list li { font-size: 13.5px; color: #444; margin-bottom: 12px; line-height: 1.5; font-weight: 400; }
                
                /* Forzar viñetas correctas de la lista interna del formulario */
                .formulario-content-list { list-style-type: disc !important; padding-left: 20px !important; margin: 15px 0 !important; }
                .formulario-content-list li { list-style-type: disc !important; display: list-item !important; color: #666; margin-bottom: 6px; font-size: 14px; }
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

                                <span style="font-size: 22px; color: white; margin-left: 20px; vertical-align: middle; font-weight: 300; line-height: 34px;">Universidad Modelo </span>
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
                function generateExternalDataTablesFooter(columnWidthsArray, totalEntries, showPageTwo = false, isZeroEntries = false, searchFieldsCount = null) {
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
                                '<div class="dt-info">Showing 0 to 0 of 0 entries</div>' +
                                '<ul class="dt-pagination">' +
                                    '<li class="disabled-page"><a>Previous</a></li>' +
                                    '<li class="disabled-page"><a>Next</a></li>' +
                                '</ul>' +
                            '</div>';
                    }
                    
                    let startEntry = showPageTwo ? 11 : 1;
                    let endEntry = showPageTwo ? totalEntries : 10;
                    if (totalEntries <= 10) { endEntry = totalEntries; }

                    let prevClass = showPageTwo ? "" : "disabled-page";
                    let nextClass = showPageTwo ? "disabled-page" : "";
                    let p1Class = showPageTwo ? "" : "active-page";
                    let p2Class = showPageTwo ? "active-page" : "";
                    
                    return searchBoxesHtml + 
                        '<div class="dt-footer-container">' +
                            '<div class="dt-info">Showing ' + startEntry + ' to ' + endEntry + ' of ' + totalEntries + ' entries</div>' +
                            '<ul class="dt-pagination">' +
                                '<li class="' + prevClass + '"><a onclick="changeColegiaturasPage(1)">Previous</a></li>' +
                                '<li class="' + p1Class + '"><a onclick="changeColegiaturasPage(1)">1</a></li>' +
                                '<li class="' + p2Class + '"><a onclick="changeColegiaturasPage(2)">2</a></li>' +
                                '<li class="' + nextClass + '"><a onclick="changeColegiaturasPage(2)">Next</a></li>' +
                            '</ul>' +
                        '</div>';
                }

                const footerHorarios = generateExternalDataTablesFooter([25, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5], 3);
                const footerAsignaturas = generateExternalDataTablesFooter([50, 50], 3);
                const footerCalificaciones = generateExternalDataTablesFooter([25, 15, 15, 15, 15, 15], 3);
                const footerAdeudadas = generateExternalDataTablesFooter([50, 25, 25], 0, false, true);
                const footerConstancias = generateExternalDataTablesFooter([35, 25, 20, 20], 0, false, true, 3);

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
                                '<tr><td>Colegiatura Mayo/2025</td><td>09</td><td>2409</td><td>NO</td></tr>';
                            footerHtml = generateExternalDataTablesFooter([40, 15, 25, 20], 14, false);
                        } else {
                            tbodyHtml = 
                                '<tr><td>Colegiatura Abril/2025</td><td>08</td><td>2408</td><td>NO</td></tr>' +
                                '<tr><td>Colegiatura Marzo/2025</td><td>07</td><td>2407</td><td>NO</td></tr>' +
                                '<tr><td>Colegiatura Febrero/2025</td><td>06</td><td>2406</td><td>NO</td></tr>' +
                                '<tr><td>Inscripción Semestral / Enero 2025</td><td>00</td><td>2400</td><td>NO</td></tr>';
                            footerHtml = generateExternalDataTablesFooter([40, 15, 25, 20], 14, true);
                        }
                        
                        let baseHtml = 
                            '<h5 style="font-family: \'Segoe UI\', Arial, sans-serif; font-size: 22px; color: #333; font-weight: 400; margin: 0 0 20px 0;">HISTORIAL DE COLEGIATURAS</h5>' +
                            '<table class="simulated-table">' +
                                '<thead>' +
                                    '<tr>' +
                                        '<th style="width: 40%;">Concepto <span class="dt-sort-icon-active"></span></th>' +
                                        '<th style="width: 15%;">Mes <span class="dt-sort-icon"></span></th>' +
                                        '<th style="width: 25%;">Folio <span class="dt-sort-icon"></span></th>' +
                                        '<th style="width: 20%;">Pagado <span class="dt-sort-icon"></span></th>' +
                                    '</tr>' +
                                '</thead>' +
                                '<tbody>' + tbodyHtml + '</tbody>' +
                            '</table>' + footerHtml;
                            
                        container.html(baseHtml);
                        container.css('opacity', '1');
                    }, 300);
                }

                function showSection(section) {
                    $('.custom-menu-li').removeClass('active-item');
                    $('#menu-' + section).addClass('active-item');
                    
                    // Actualizar el título de la barra superior según la sección
                    let friendlyName = section.replace('_', ' ');
                    friendlyName = friendlyName.charAt(0).toUpperCase() + friendlyName.slice(1);
                    $('#label-select-actual').html(friendlyName + ' <i class="material-icons">arrow_drop_down</i>');

                    if(section === 'colegiaturas') {
                        changeColegiaturasPage(1);
                    } else if(section === 'formularios') {
                        // NUEVA INYECCIÓN DE LA TARJETA SOLICITADA
                        let formulariosHtml = \`
                            <div style="font-family: 'Segoe UI', sans-serif; text-align: left;">
                                <h5 style="color: #333; font-weight: 400; display: flex; align-items: center; margin-bottom: 25px; font-size: 22px;">
                                    <i class="material-icons" style="margin-right: 10px; color: #555; font-size: 26px;">assignment</i> Encuestas disponibles
                                </h5>
                                
                                <div class="card horizontal" style="box-shadow: 0 2px 8px rgba(0,0,0,0.1); border-radius: 4px; border: 1px solid #e0e0e0; min-height: 200px; background-color: #ffffff; display: flex; margin: 0;">
                                    <div class="card-image valign-wrapper" style="background-color: #fcfcfc; width: 120px; display: flex; justify-content: center; align-items: center; border-right: 1px solid #eee; flex-shrink: 0;">
                                        <div style="background-color: #007bc4; width: 50px; height: 50px; border-radius: 8px; display: flex; justify-content: center; align-items: center; box-shadow: 0 2px 5px rgba(0,123,196,0.3);">
                                            <i class="material-icons" style="color: white; font-size: 28px;">assignment</i>
                                        </div>
                                    </div>
                                    
                                    <div class="card-stacked" style="flex-grow: 1;">
                                        <div class="card-content" style="padding: 25px 30px; color: #444; line-height: 1.6;">
                                            <span class="card-title" style="font-size: 18px; font-weight: bold; color: #111; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px;">
                                                ACTIVIDAD FÍSICA, COMPORTAMIENTO Y BIENESTAR
                                            </span>
                                            <p style="font-size: 15px; font-weight: bold; color: #333; margin-bottom: 15px;">
                                                Del 11/May/2026 al 18/May/2026
                                            </p>
                                            
                                            <p style="font-size: 14.5px; margin-bottom: 10px; color: #555;">
                                                El presente instrumento tiene como objetivo conocer el nivel de actividad física, el índice de bienestar y las etapas de cambio hacia la actividad física de la comunidad modelista. Tu participación al responder este instrumento es muy valiosa, sus beneficios y ventajas son los siguientes:
                                            </p>
                                            
                                            <ul class="formulario-content-list">
                                                <li>Fomentar una mayor actividad física entre la comunidad modelista.</li>
                                                <li>Desarrollar hábitos saludables a largo plazo.</li>
                                                <li>Aumentar el bienestar emocional y académico.</li>
                                                <li>Contribuir al conocimiento científico sobre el nivel de actividad física, bienestar y etapas de cambio de la comunidad modelista.</li>
                                            </ul>
                                            
                                            <span style="font-size: 14px; font-weight: bold; color: #222; display: block; margin-top: 15px; margin-bottom: 5px; text-transform: uppercase;">
                                                ACEPTACIÓN DEL CONSENTIMIENTO INFORMADO
                                            </span>
                                            <p style="font-size: 14px; color: #666; text-align: justify; margin-bottom: 5px;">
                                                Solicitamos tu consentimiento para recuperar ciertos datos en este instrumento, garantizándote que aun cuando se te solicite tu nombre para fines del estudio, toda información que nos proporciones será tratada con estricta confidencialidad para el logro del objetivo indicado, sin poner en riesgo tu integridad personal ni profesional.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        \`;
                        $('#dynamicRenderCard').html(formulariosHtml);
                    } else {
                        $('#dynamicRenderCard').html('<h5>' + friendlyName.toUpperCase() + '</h5><p>Sección en desarrollo.</p>');
                    }
                }

                // Cargar por defecto la primera sección al entrar
                $(document).ready(function() {
                    var elems = document.querySelectorAll('.dropdown-trigger');
                    M.Dropdown.init(elems, { coverTrigger: false });
                    showSection('colegiaturas');
                });
            </script>
        </body>
        </html>
    `;
}

// Rutas Express
app.get('/', (req, res) => {
    res.send(getLoginTemplate());
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin') {
        res.redirect('/portal');
    } else {
        res.send(getLoginTemplate(true));
    }
});

app.get('/portal', (req, res) => {
    res.send(getPortalTemplate());
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
