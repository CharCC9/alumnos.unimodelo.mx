const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ==========================================
// VISTA: LOGIN (TEMPLATING)
// ==========================================
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
                <div class="logo-container"><img src="https://alumnos.unimodelo.mx/images/logo.png" alt="Logo Universidad Modelo" onerror="this.src='https://placehold.co/110x110?text=Modelo'"></div>
                <div class="system-title">SERVICIOS</div>
                <div class="system-subtitle">ESCOLARES</div>
                
                ${showAlert ? '<div class="error-text">Escuela Modelo: Usuario y/o contraseña inválidos</div>' : ''}

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

// ==========================================
// VISTA: PORTAL PRINCIPAL DE ALUMNOS
// ==========================================
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
                .mainPaddingSidebar { padding-left: 240px; transition: padding 0.25s ease; }
                .mainPaddingLeft { padding-left: 0px; transition: padding 0.25s ease; }
                
                #left-sidebar-nav { position: fixed; width: 240px; left: 0; top: 64px; height: calc(100vh - 64px); background: #fff; z-index: 999; box-shadow: 1px 0 5px rgba(0,0,0,0.1); transition: transform 0.25s ease; overflow-y: auto; }
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
                
                #breadcrumb-container { font-size: 15px; color: #666; margin-bottom: 10px; display: flex; align-items: center; text-transform: uppercase; font-weight: 500; }
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
            </style>
        </head>
        <body>

            <header id="header" class="page-topbar">
                <div class="navbar-fixed">
                    <nav class="navbar-color">
                        <div class="nav-wrapper">
                            <div class="nav-brand-area">
                                <a href="javascript:void(0)" onclick="toggleSidebar()" style="color:white; display: flex; align-items: center;" class="waves-effect waves-light">
                                    <i class="material-icons" style="font-size:28px;">menu</i>
                                </a>
                                <img src="https://alumnos.unimodelo.mx/images/logo-escudo.png" alt="Escudo Universidad Modelo" onerror="this.src='https://placehold.co/44x44?text=UM'">
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
                $(document).ready(function(){
                    $('.dropdown-trigger').dropdown({
                        constrainWidth: false,
                        coverTrigger: false
                    });
                    $('.collapsible').collapsible();
                    showSection('libreta_de_pago');
                });

                function toggleSidebar() {
                    let side = $('#left-sidebar-nav');
                    let main = $('#main');
                    if(side.hasClass('side-nav-hidden')) {
                        side.removeClass('side-nav-hidden');
                        main.addClass('mainPaddingSidebar').removeClass('mainPaddingLeft');
                    } else {
                        side.addClass('side-nav-hidden');
                        main.removeClass('mainPaddingSidebar').addClass('mainPaddingLeft');
                    }
                }

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
                                '<div class="dt-info">Mostrando 0 a 0 de 0 registros</div>' +
                                '<ul class="dt-pagination">' +
                                    '<li class="disabled-page"><a>Anterior</a></li>' +
                                    '<li class="disabled-page"><a>Siguiente</a></li>' +
                                roomPages(1,1, true) +
                            '</div>';
                    }
                    
                    let startEntry = showPageTwo ? 11 : 1;
                    let endEntry = showPageTwo ? totalEntries : 10;
                    if (totalEntries <= 10) { endEntry = totalEntries; }

                    let prevClass = showPageTwo ? "" : "disabled-page";
                    let nextClass = showPageTwo ? "disabled-page" : "";
                    let p1Class = showPageTwo ? "" : "active-page";
                    let p2Class = showPageTwo ? "active-page" : "";
                    
                    let paginationList = '';
                    if (totalEntries > 10) {
                        paginationList = '<li class="' + prevClass + '"><a onclick="changeColegiaturasPage(1)">Anterior</a></li>' +
                                         '<li class="' + p1Class + '"><a onclick="changeColegiaturasPage(1)">1</a></li>' +
                                         '<li class="' + p2Class + '"><a onclick="changeColegiaturasPage(2)">2</a></li>' +
                                         '<li class="' + nextClass + '"><a onclick="changeColegiaturasPage(2)">Siguiente</a></li>';
                    } else {
                        paginationList = '<li class="disabled-page"><a>Anterior</a></li><li class="active-page"><a>1</a></li><li class="disabled-page"><a>Siguiente</a></li>';
                    }

                    return searchBoxesHtml + 
                        '<div class="dt-footer-container">' +
                            '<div class="dt-info">Mostrando ' + startEntry + ' a ' + endEntry + ' de ' + totalEntries + ' registros</div>' +
                            '<ul class="dt-pagination">' + paginationList + '</ul>' +
                        '</div>';
                }

                function roomPages(a,b,c){}

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
                            '<h5 style="font-weight: 400; color: #222; text-transform: uppercase;">Estado de Cuenta Financiero</h5>' +
                            '<table class="simulated-table">' +
                                '<thead>' +
                                    '<tr>' +
                                        '<th style="width: 40%;">CONCEPTO</th>' +
                                        '<th style="width: 15%;">MES</th>' +
                                        '<th style="width: 25%;">FOLIO DE PAGO RECIENTE</th>' +
                                        '<th style="width: 20%;">¿TIENE RECARGO?</th>' +
                                    '</tr>' +
                                '</thead>' +
                                '<tbody>' + tbodyHtml + '</tbody>' +
                            '</table>' + footerHtml;
                            
                        container.html(baseHtml);
                        container.css('opacity', '1');
                    }, 200);
                }

                function showSection(sectionName) {
                    $('.custom-menu-li').removeClass('active-item');
                    $('.collapsible-body li').removeClass('active-subitem');
                    
                    let breadcrumb = 'Inicio';
                    let cardHtml = '';
                    
                    if (sectionName === 'libreta_de_pago') {
                        $('#menu-libreta_de_pago').addClass('active-item');
                        breadcrumb = 'Inicio  <i class="material-icons">keyboard_arrow_right</i>  Libreta de pago';
                        cardHtml = \`
                            <div class="libreta-container">
                                <span class="libreta-blue-text">SANTIAGO DE JESUS ARCOS GUZMAN</span><br>
                                <span class="libreta-blue-text">Matrícula:</span> 22091054      <span class="libreta-blue-text">Plan:</span> ING. EN TECNOLOGIAS DE LA INFORMACION Y COMUNICACION (R-2021)<br>
                                <span class="libreta-blue-text">Ubicación:</span> Mérida      <span class="libreta-blue-text">Grado:</span> 08      <span class="libreta-blue-text">Grupo:</span> A
                                <hr class="libreta-divider">
                                <div class="libreta-subtitle-large">Opciones de Pago Disponibles</div>
                                <div class="libreta-title-ins">INSTRUCCIONES DE PAGO BANCOMER:</div>
                                <div class="libreta-indented-block">
                                    Para realizar sus depósitos en ventanilla de <span style="font-weight:bold;">BBVA Bancomer</span> o por transferencia electrónica (Banca en Línea) use los siguientes datos:<br>
                                    <div class="libreta-bank-header">PAGO EN VENTANILLA (BBVA BANCOMER):</div>
                                    • Convenio CIE: <span style="font-weight:bold; color:#0020c2;">1145152</span><br>
                                    • Referencia: <span style="font-weight:bold; color:#0020c2;">220910540825091</span><br>
                                    <div class="libreta-bank-header">PAGO POR TRANSFERENCIA (CLAVE INTERBANCARIA BBVA):</div>
                                    • CLAVE Interbancaria: <span style="font-weight:bold; color:#0020c2;">012914001145152597</span><br>
                                    • Concepto/Referencia: <span style="font-weight:bold; color:#0020c2;">220910540825091</span>
                                </div>
                                <div class="libreta-title-ins">INSTRUCCIONES DE PAGO HSBC:</div>
                                <div class="libreta-indented-block">
                                    <div class="libreta-bank-header-hsbc">PAGO EN VENTANILLA O BANCA EN LÍNEA (HSBC):</div>
                                    • Clave de Servicio Rap: <span style="font-weight:bold; color:#990000;">4122</span><br>
                                    • Referencia RAP: <span style="font-weight:bold; color:#990000;">220910540825091</span>
                                </div>
                                <div class="libreta-red-note">NOTA: CUALQUIER PAGO EFECTUADO TARDA DE 24 A 48 HORAS HÁBILES EN VERSE REFLEJADO EN EL SISTEMA ESCOLAR.</div>
                                <div class="libreta-action-btn">Imprimir Ficha PDF</div>
                            </div>
                        \`;
                    } 
                    else if (sectionName === 'colegiaturas') {
                        $('#menu-colegiaturas').addClass('active-item');
                        breadcrumb = 'Inicio  <i class="material-icons">keyboard_arrow_right</i>  Colegiaturas / Inscr.';
                        $('#dynamicRenderCard').html('');
                        changeColegiaturasPage(1);
                        $('#breadcrumb-container').html(breadcrumb);
                        return;
                    }
                    else if (sectionName === 'horario') {
                        $('#menu-horario').addClass('active-item');
                        breadcrumb = 'Inicio  <i class="material-icons">keyboard_arrow_right</i>  Horario';
                        cardHtml = \`
                            <h5 style="font-weight: 400; color: #222; text-transform: uppercase;">Horario de Clases Semestral</h5>
                            <table class="simulated-table">
                                <thead>
                                    <tr>
                                        <th style="width: 25%;" class="dt-sort-icon">ASIGNATURA</th>
                                        <th style="width: 12.5%;" class="dt-sort-icon">LUNES</th>
                                        <th style="width: 12.5%;" class="dt-sort-icon">MARTES</th>
                                        <th style="width: 12.5%;" class="dt-sort-icon">MIÉRCOLES</th>
                                        <th style="width: 12.5%;" class="dt-sort-icon">JUEVES</th>
                                        <th style="width: 12.5%;" class="dt-sort-icon">VIERNES</th>
                                        <th style="width: 12.5%;" class="dt-sort-icon">SÁBADO</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>Desarrollo de Aplicaciones Web</td><td>07:00-09:00</td><td>-</td><td>07:00-09:00</td><td>-</td><td>07:00-09:00</td><td>-</td></tr>
                                    <tr><td>Gestión de Bases de Datos NoSQL</td><td>-</td><td>09:00-11:00</td><td>-</td><td>09:00-11:00</td><td>-</td><td>-</td></tr>
                                    <tr><td>Seguridad Informática Avanzada</td><td>11:00-13:00</td><td>-</td><td>11:00-13:00</td><td>-</td><td>-</td><td>-</td></tr>
                                </tbody>
                            </table>
                            \${footerHorarios}
                        \`;
                    }
                    else if (sectionName === 'asignaturas') {
                        $('#menu-asignaturas').addClass('active-item');
                        breadcrumb = 'Inicio  <i class="material-icons">keyboard_arrow_right</i>  Asignaturas';
                        cardHtml = \`
                            <h5 style="font-weight: 400; color: #222; text-transform: uppercase;">Asignaturas Inscritas</h5>
                            <table class="simulated-table">
                                <thead>
                                    <tr>
                                        <th style="width: 50%;" class="dt-sort-icon-active">CLAVE / NOMBRE ASIGNATURA</th>
                                        <th style="width: 50%;" class="dt-sort-icon">PROFESOR TITULAR</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>TI410 - Desarrollo de Aplicaciones Web</td><td>Ing. Carlos Mendoza Novelo</td></tr>
                                    <tr><td>TI411 - Gestión de Bases de Datos NoSQL</td><td>M.C. Laura Elena Pool</td></tr>
                                    <tr><td>TI412 - Seguridad Informática Avanzada</td><td>Dr. Jorge Alberto Ramirez</td></tr>
                                </tbody>
                            </table>
                            \${footerAsignaturas}
                        \`;
                    }
                    else if (sectionName === 'calificaciones') {
                        $('#menu-calificaciones').addClass('active-item');
                        breadcrumb = 'Inicio  <i class="material-icons">keyboard_arrow_right</i>  Calificaciones';
                        cardHtml = \`
                            <h5 style="font-weight: 400; color: #222; text-transform: uppercase;">Calificaciones Parciales</h5>
                            <table class="simulated-table">
                                <thead>
                                    <tr>
                                        <th style="width: 25%;">ASIGNATURA</th>
                                        <th style="width: 15%;">PARCIAL 1</th>
                                        <th style="width: 15%;">PARCIAL 2</th>
                                        <th style="width: 15%;">PARCIAL 3</th>
                                        <th style="width: 15%;">PROMEDIO</th>
                                        <th style="width: 15%;">FALTAS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>Desarrollo de Aplicaciones Web</td><td>90</td><td>85</td><td>95</td><td>90.0</td><td>2</td></tr>
                                    <tr><td>Gestión de Bases de Datos NoSQL</td><td>80</td><td>88</td><td>85</td><td>84.3</td><td>0</td></tr>
                                    <tr><td>Seguridad Informática Avanzada</td><td>100</td><td>95</td><td>90</td><td>95.0</td><td>1</td></tr>
                                </tbody>
                            </table>
                            \${footerCalificaciones}
                        \`;
                    }
                    else if (sectionName === 'ordinarios') {
                        $('#menu-ordinarios').addClass('active-item');
                        breadcrumb = 'Inicio  <i class="material-icons">keyboard_arrow_right</i>  Ordinarios';
                        cardHtml = \`
                            <h5 style="font-weight: 400; color: #222; text-transform: uppercase;">Exámenes Ordinarios</h5>
                            <table class="simulated-table">
                                <thead>
                                    <tr>
                                        <th style="width: 40%;">ASIGNATURA</th>
                                        <th style="width: 20%;">FECHA EXAMEN</th>
                                        <th style="width: 20%;">CALIFICACIÓN</th>
                                        <th style="width: 20%;">ESTADO</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>Desarrollo de Aplicaciones Web</td><td>15/Junio/2026</td><td>90</td><td>APROBADO</td></tr>
                                    <tr><td>Gestión de Bases de Datos NoSQL</td><td>17/Junio/2026</td><td>84</td><td>APROBADO</td></tr>
                                    <tr><td>Seguridad Informática Avanzada</td><td>19/Junio/2026</td><td>95</td><td>APROBADO</td></tr>
                                </tbody>
                            </table>
                            \${generateExternalDataTablesFooter([40, 20, 20, 20], 3)}
                        \`;
                    }
                    else if (sectionName === 'adeudadas') {
                        $('#menu-adeudadas').addClass('active-item');
                        breadcrumb = 'Inicio  <i class="material-icons">keyboard_arrow_right</i>  Asig. Adeudadas';
                        cardHtml = \`
                            <h5 style="font-weight: 400; color: #222; text-transform: uppercase;">Asignaturas Adeudadas / Arrastres</h5>
                            <table class="simulated-table">
                                <thead>
                                    <tr>
                                        <th style="width: 50%;">ASIGNATURA</th>
                                        <th style="width: 25%;">SEMESTRE ORIGEN</th>
                                        <th style="width: 25%;">ESTADO CURSAMIENTO</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="no-records-row"><td colspan="3">Ningún dato disponible en esta tabla</td></tr>
                                </tbody>
                            </table>
                            \${footerAdeudadas}
                        \`;
                    }
                    else if (sectionName === 'constancias') {
                        $('#menu-constancias').addClass('active-item');
                        breadcrumb = 'Inicio  <i class="material-icons">keyboard_arrow_right</i>  Constancias';
                        cardHtml = \`
                            <h5 style="font-weight: 400; color: #222; text-transform: uppercase;">Solicitud de Constancias de Estudio</h5>
                            <table class="simulated-table">
                                <thead>
                                    <tr>
                                        <th style="width: 35%;">TIPO DE CONSTANCIA</th>
                                        <th style="width: 25%;">FECHA SOLICITUD</th>
                                        <th style="width: 20%;">COSTO</th>
                                        <th style="width: 20%;">ESTATUS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="no-records-row"><td colspan="4">Ningún dato disponible en esta tabla</td></tr>
                                </tbody>
                            </table>
                            \${footerConstancias}
                        \`;
                    }
                    else if (sectionName === 'micuenta') {
                        $('#menu-micuenta').addClass('active-item');
                        breadcrumb = 'Inicio  <i class="material-icons">keyboard_arrow_right</i>  Mi Cuenta';
                        cardHtml = \`
                            <div class="mc-header-container">
                                <h4 class="mc-title">Cambiar Contraseña de Acceso</h4>
                            </div>
                            <div class="mc-banner-blue">
                                Por motivos de seguridad institucional, su contraseña debe contener números y letras, y un mínimo de 6 caracteres.
                            </div>
                            <form action="/change-password" method="POST">
                                <div class="row mc-form-row">
                                    <div class="col s12 m6 mc-input-field">
                                        <label for="current_password">Contraseña Anterior</label>
                                        <input id="current_password" name="current_password" type="password" required>
                                    </div>
                                </div>
                                <div class="row mc-form-row">
                                    <div class="col s12 m6 mc-input-field">
                                        <label for="new_password">Nueva Contraseña</label>
                                        <input id="new_password" name="new_password" type="password" required>
                                    </div>
                                </div>
                                <div class="row mc-form-row">
                                    <div class="col s12 m6 mc-input-field">
                                        <label for="confirm_password">Confirmar Nueva Contraseña</label>
                                        <input id="confirm_password" name="confirm_password" type="password" required>
                                    </div>
                                </div>
                                <div class="mc-checkbox-container">
                                    <label class="mc-checkbox-label">
                                        <input type="checkbox" required>
                                        <span>Cerrar sesión en todos los demás dispositivos activos</span>
                                    </label>
                                </div>
                                <button type="submit" class="mc-btn-save">
                                    <i class="material-icons">save</i> Guardar Nueva Contraseña
                                </button>
                            </form>
                        \`;
                    }
                    else if (sectionName === 'documentos') {
                        $('#menu-documentos').addClass('active-item');
                        breadcrumb = 'Inicio  <i class="material-icons">keyboard_arrow_right</i>  Documentos';
                        cardHtml = \`
                            <div class="mc-header-container">
                                <h4 class="mc-title">Carga Electrónica de Documentos Oficiales</h4>
                            </div>
                            <div class="doc-main-container">
                                <div class="doc-left-panel">
                                    <div class="doc-banner-blue"></div>
                                    <div style="font-size:15px; color:#444; margin-bottom:10px; font-weight:bold;">Seleccione el tipo de archivo digital a subir:</div>
                                    <button class="doc-select-btn">Seleccionar Archivo (PDF / JPG)</button>
                                    <div class="doc-line-divider"></div>
                                    <button class="doc-btn-submit-disabled">
                                        <i class="material-icons">cloud_upload</i> Subir Documento a Servicios Escolares
                                    </button>
                                </div>
                                <div class="doc-right-notes-card">
                                    <h5 class="doc-notes-title">Notas de Importancia</h5>
                                    <ul class="doc-notes-list">
                                        <li>Los documentos deben ser perfectamente legibles, escaneados directamente del original (no copias).</li>
                                        <li>El formato aceptado es exclusivamente PDF o imágenes JPG con un tamaño máximo de 4MB por archivo.</li>
                                        <li>Cualquier alteración detectada causará la cancelación inmediata del trámite escolar en curso.</li>
                                    </ul>
                                </div>
                            </div>
                        \`;
                    }
                    else {
                        // Placeholders genéricos para secciones adicionales
                        breadcrumb = 'Inicio  <i class="material-icons">keyboard_arrow_right</i>  ' + sectionName;
                        cardHtml = '<h5>Sección en mantenimiento</h5><p>La sección ' + sectionName + ' estará disponible próximamente.</p>';
                    }
                    
                    $('#breadcrumb-container').html(breadcrumb);
                    $('#dynamicRenderCard').html(cardHtml);
                    
                    // Actualizar el botón selector de arriba con el nombre correcto
                    let labelMap = {
                        'libreta_de_pago': 'Libreta de pago',
                        'colegiaturas': 'Colegiaturas / Inscr.',
                        'horario': 'Horario',
                        'asignaturas': 'Asignaturas',
                        'calificaciones': 'Calificaciones'
                    };
                    if(labelMap[sectionName]) {
                        $('#label-select-actual').html(labelMap[sectionName] + ' <i class="material-icons">arrow_drop_down</i>');
                    }
                }
            </script>
        </body>
        </html>
    `;
}

// ==========================================
// CONTROLADORES Y ENRUTAMIENTO HTTP
// ==========================================

// Ruta raíz: Carga el login directamente
app.get('/', (req, res) => {
    res.send(getLoginTemplate(false));
});

// Procesamiento del Login tradicional
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Validación simulada de credenciales escolares
    if (username === '22091054' && password === '123456') {
        res.send(getPortalTemplate());
    } else {
        res.send(getLoginTemplate(true));
    }
});

// Ruta de actualización de credenciales del alumno
app.post('/change-password', (req, res) => {
    // Redirige directamente de vuelta simulando éxito institucional
    res.send(getPortalTemplate());
});

// Inicio de la escucha en puerto de red
app.listen(PORT, () => {
    console.log(`Servidor activo corriendo en: http://localhost:${PORT}`);
});
