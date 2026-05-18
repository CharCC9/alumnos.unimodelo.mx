const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Procesar el inicio de sesión y renderizar el portal completo con Navbar y Sidenav
app.post('/login', (req, res) => {
    const { username } = req.body;
    console.log(`Usuario autenticado con éxito - ID: ${username}`);
    
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
                    font-family: 'Segoe UI', sans-serif;
                    margin: 0;
                }
                
                /* Pantalla de transición / carga */
                #loadingView {
                    position: fixed;
                    top: 0; left: 0; width: 100%; height: 100%;
                    background-color: #ffffff;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                }
                #loadingView p {
                    color: #1a365d;
                    font-size: 16px;
                    margin-top: 20px;
                    font-weight: 500;
                    letter-spacing: 0.5px;
                }

                /* Contenedor del panel principal */
                #portalView {
                    display: none;
                    padding-left: 300px; /* Alineación con el Sidenav fijo */
                    padding-top: 20px;
                }
                
                /* Barra de navegación superior fija estilo institucional */
                .navbar-color {
                    background-color: #0d2c54 !important; /* Azul oscuro Unimodelo */
                }
                .nav-wrapper {
                    padding: 0 20px;
                }
                .header-search-wrapper {
                    display: inline-block;
                    width: 60%;
                    margin-left: 20px;
                }
                /* Ajuste para el selector nativo dentro del navbar */
                #menu-navegacion {
                    background-color: rgba(255, 255, 255, 0.9);
                    border: none;
                    border-radius: 4px;
                    height: 34px;
                    color: #333;
                    display: inline-block;
                }

                /* Menú lateral fijo de Materialize */
                .side-nav.fixed {
                    width: 300px;
                    background-color: #ffffff;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    position: fixed;
                    height: calc(100vh - 64px);
                    top: 64px; left: 0;
                    overflow-y: auto;
                    z-index: 996;
                }
                .side-nav li a {
                    color: #444444;
                    font-size: 13px;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    padding: 0 24px;
                    height: 48px;
                    line-height: 48px;
                    text-decoration: none;
                }
                .side-nav li a:hover {
                    background-color: #f5f5f5;
                }
                .side-nav li a i.material-icons {
                    margin-right: 16px;
                    color: #757575;
                }
                
                /* Contenido Principal */
                .main-content {
                    padding: 20px;
                }
                .welcome-card {
                    background: white;
                    padding: 24px;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
                }
                .welcome-card h4 {
                    margin: 0 0 10px 0;
                    color: #1a365d;
                    font-size: 24px;
                }

                /* Ajustes adaptables para pantallas medianas o pequeñas */
                @media only screen and (max-width : 992px) {
                    #portalView { padding-left: 0; }
                    .side-nav.fixed { top: 56px; height: calc(100vh - 56px); }
                }
            </style>
        </head>
        <body>

            <div id="loadingView">
                <div class="preloader-wrapper big active">
                    <div class="spinner-layer spinner-blue-only">
                        <div class="circle-clipper left"><div class="circle"></div></div>
                        <div class="gap-patch"><div class="circle"></div></div>
                        <div class="circle-clipper right"><div class="circle"></div></div>
                    </div>
                </div>
                <p>Cargando servicios escolares de la cuenta...</p>
            </div>

            <div id="portalView">
                
                <div class="navbar-fixed" bis_skin_checked="1">
                    <nav class="navbar-color darken-4">
                        <div class="nav-wrapper" bis_skin_checked="1">
                            
                            <a href="javascript:void(0);" style="color:white; float:left;" class="sidenav-trigger-show" bis_skin_checked="1">
                                <i class="material-icons waves-effect waves-light" style="font-size:40px; margin: -4px 0 0 20px; position: fixed;">menu</i>
                            </a>
                            
                            <div class="header-search-wrapper hide-on-med-and-down sideNav-lock" bis_skin_checked="1">
                                <select id="menu-navegacion" class="browser-default validate" required="" name="menu-navegacion" style="width: 30%; position: relative!important; margin-top: 15px;">
                                    <option value="https://alumnos.unimodelo.mx/libreta_de_pago" selected="">Libreta de pago</option>
                                    <option value="https://alumnos.unimodelo.mx/logout">Salir</option>
                                </select>
                                <span style="font-size: 25px; position: relative; top: 5px; text-align:center; left: 3em; color: white;">Universidad Modelo</span>
                            </div>
                            
                            <ul class="right hide-on-med-and-down">
                                <li>SANTIAGO DE JESUS ARCOS GUZMAN</li>
                                <li>
                                    <a href="javascript:void(0);" class="dropdown-trigger" data-target="profile-dropdown" bis_skin_checked="1">
                                        <i class="material-icons">more_vert</i>
                                    </a>
                                    <ul id="profile-dropdown" class="dropdown-content">                   
                                        <li>
                                            <a href="https://alumnos.unimodelo.mx/micuenta" class="grey-text text-darken-1" bis_skin_checked="1">
                                                <i class="material-icons">account_box</i>Mi cuenta
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://alumnos.unimodelo.mx/logout" class="grey-text text-darken-1" bis_skin_checked="1">
                                                <i class="material-icons">keyboard_tab</i>Salir
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            
                        </div>
                    </nav>
                </div>

                <ul id="slide-out" class="side-nav fixed leftside-navigation sidenav ps-container ps-active-y" style="transform: translateX(0%);">
                    <li class="no-padding">
                        <ul class="collapsible" data-collapsible="accordion">
                            <li class="bold">
                                <a href="https://alumnos.unimodelo.mx/libreta_de_pago">
                                    <i class="material-icons">keyboard_arrow_right</i>
                                    <span>LIBRETA DE PAGO</span>
                                </a>
                            </li>
                            <li class="bold">
                                <a href="https://alumnos.unimodelo.mx/alumno_pagos/15246740">
                                    <i class="material-icons">keyboard_arrow_right</i>
                                    <span>COLEGIATURAS / INSCR.</span>
                                </a>
                            </li>
                            <li class="bold">
                                <a href="https://alumnos.unimodelo.mx/horario">
                                    <i class="material-icons">keyboard_arrow_right</i>
                                    <span>HORARIO</span>
                                </a>
                            </li>
                            <li class="bold">
                                <a href="https://alumnos.unimodelo.mx/asignaturas">
                                    <i class="material-icons">keyboard_arrow_right</i>
                                    <span>ASIGNATURAS</span>
                                </a>
                            </li>
                            <li class="bold">
                                <a href="https://alumnos.unimodelo.mx/calificaciones">
                                    <i class="material-icons">keyboard_arrow_right</i>
                                    <span>CALIFICACIONES</span>
                                </a>
                            </li>
                            <li class="bold">
                                <a href="https://alumnos.unimodelo.mx/ordinarios">
                                    <i class="material-icons">keyboard_arrow_right</i>
                                    <span>
