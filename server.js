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

// Procesar el inicio de sesión, cargar datos y mostrar el panel de alumno real
app.post('/login', (req, res) => {
    const { username } = req.body;
    console.log(`Usuario autenticado con éxito - ID: ${username}`);
    
    // Enviamos la interfaz del portal con el menú que proveíste
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
                /* Contenedor de carga en pantalla completa */
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
                    padding-left: 310px; /* Espacio para el menú lateral fijo */
                }
                @media only screen and (max-width : 992px) {
                    #portalView { padding-left: 0; }
                }
                /* Estilos personalizados para clonar el menú institucional */
                .side-nav.fixed {
                    width: 300px;
                    background-color: #ffffff;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    position: fixed;
                    height: 100vh;
                    top: 0; left: 0;
                    overflow-y: auto;
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
                    transition: background-color 0.2s;
                }
                .side-nav li a:hover {
                    background-color: #f5f5f5;
                }
                .side-nav li a i.material-icons {
                    margin-right: 16px;
                    color: #757575;
                }
                .collapsible-body {
                    background-color: #fafafa;
                }
                .collapsible-body li a {
                    padding-left: 54px;
                }
                .main-content {
                    padding: 30px;
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
                                    <span>ORDINARIOS</span>
                                </a>
                            </li>
                            
                            <li class="bold">
                                <a href="https://alumnos.unimodelo.mx/adeudadas">
                                    <i class="material-icons">keyboard_arrow_right</i>
                                    <span>ASIG.ADEUDADAS</span>
                                </a>
                            </li>
                            
                            <li class="bold">
                                <a href="https://alumnos.unimodelo.mx/constancias">
                                    <i class="material-icons">keyboard_arrow_right</i>
                                    <span>CONSTANCIAS</span>
                                </a>
                            </li>
                            
                            <li class="bold">
                                <a class="collapsible-header waves-effect waves-cyan">
                                    <i class="material-icons">dashboard</i>
                                    <span class="nav-text">EXTRAORDINARIOS</span>
                                </a>
                                <div class="collapsible-body">
                                    <ul>
                                        <li>
                                            <a href="https://alumnos.unimodelo.mx/extraordinarios">
                                                <i class="material-icons">keyboard_arrow_right</i>
                                                <span>Exámenes Inscritos</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://alumnos.unimodelo.mx/calificaciones_extraordinarios">
                                                <i class="material-icons">keyboard_arrow_right</i>
                                                <span>Calificaciones</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            
                            <li class="bold">
                                <a href="https://alumnos.unimodelo.mx/tutorias_encuestas/encuestas_disponibles/15246740/278528">
                                    <i class="material-icons">keyboard_arrow_right</i>
                                    <span>FORMULARIOS</span>
                                </a>
                            </li>
                            
                            <li class="bold">
                                <a href="https://alumnos.unimodelo.mx/biblioteca">
                                    <i class="material-icons">keyboard_arrow_right</i>
                                    <span>BIBLIOTECA</span>
                                </a>
                            </li>
                            
                            <li class="bold">
                                <a href="https://alumnos.unimodelo.mx/micuenta">
                                    <i class="material-icons">keyboard_arrow_right</i>
                                    <span>MI CUENTA</span>
                                </a>
                            </li>
                            
                            <li class="bold">
                                <a href="https://alumnos.unimodelo.mx/documentos2">
                                    <i class="material-icons">keyboard_arrow_right</i>
                                    <span>DOCUMENTOS</span>
                                </a>
                            </li>
                            
                            <li class="bold">
                                <a href="https://alumnos.unimodelo.mx/eduvida">
                                    <i class="material-icons">keyboard_arrow_right</i>
                                    <span>EDUCACIÓN PARA LA VIDA</span>
                                </a>
                            </li>
                            
                            <li class="bold">
                                <a href="https://alumnos.unimodelo.mx/logout">
                                    <i class="material-icons">keyboard_arrow_right</i>
                                    <span>SALIR</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
                
                <div class="main-content">
                    <div class="welcome-card">
                        <h4>Bienvenido al Sistema</h4>
                        <p>Has iniciado sesión correctamente en el portal institucional. Selecciona una opción del menú de la izquierda para comenzar.</p>
                    </div>
                </div>

            </div>

            <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
            <script>
                $(document).ready(function(){
                    // Inicializar el acordeón desplegable del menú
                    $('.collapsible').collapsible();
                    
                    // Simular la carga por 2.5 segundos y revelar la interfaz real
                    setTimeout(() => {
                        document.getElementById('loadingView').style.display = 'none';
                        document.getElementById('portalView').style.display = 'block';
                    }, 2500);
                });
            </script>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Servidor activo en el puerto ${PORT}`);
});
