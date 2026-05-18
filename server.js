const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 1. RUTA DEL LOGIN (Pantalla limpia al principio)
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Servicios Escolares - Universidad Modelo</title>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
            <style>
                body {
                    background: #e9ecef url('https://www.transparenttextures.com/patterns/cream-paper.png');
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    font-family: 'Segoe UI', sans-serif;
                }
                .login-card {
                    background: white;
                    padding: 40px 30px;
                    width: 100%;
                    max-width: 450px;
                    border-radius: 4px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                    text-align: center;
                }
                .logo-container img {
                    width: 120px;
                    height: auto;
                    margin-bottom: 10px;
                }
                .system-title {
                    font-size: 22px;
                    color: #444;
                    margin-bottom: 5px;
                    letter-spacing: 1px;
                }
                .system-subtitle {
                    font-size: 20px;
                    color: #555;
                    margin-bottom: 30px;
                    letter-spacing: 1px;
                }
                .input-field {
                    margin-bottom: 25px;
                    position: relative;
                }
                .input-field i {
                    position: absolute;
                    left: 0;
                    top: 12px;
                    color: #111;
                    font-size: 26px;
                }
                .input-field input {
                    padding-left: 40px !important;
                    box-sizing: border-box;
                }
                .btn-custom {
                    width: 100%;
                    background-color: #007bc4 !important;
                    margin-bottom: 15px;
                    text-transform: uppercase;
                    font-weight: 500;
                    height: 45px;
                    line-height: 45px;
                }
                .forgot-password {
                    display: block;
                    margin-top: 15px;
                    color: #007bc4;
                    text-decoration: none;
                    font-size: 14px;
                }
            </style>
        </head>
        <body>

            <div class="login-card">
                <div class="logo-container">
                    <img src="https://i.ibb.co/L8b6g6r/Escuela-Modelo-Logo.png" alt="Logo Universidad Modelo">
                </div>
                <div class="system-title">SERVICIOS</div>
                <div class="system-subtitle">ESCOLARES</div>

                <form action="/portal" method="POST">
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
                    
                    <a href="#" class="forgot-password">Olvide mi contraseña</a>
                </form>
            </div>

            <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
        </body>
        </html>
    `);
});

// 2. RUTA DEL PORTAL INTERNO (Se accede tras presionar "Entrar")
app.post('/portal', (req, res) => {
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
                    color: #0d2c54;
                    font-size: 16px;
                    margin-top: 20px;
                    font-weight: 500;
                }

                #portalView {
                    display: none;
                }
                
                .navbar-fixed {
                    z-index: 997;
                }
                .navbar-color {
                    background-color: #0d2c54 !important;
                }
                .nav-wrapper {
                    padding: 0 20px;
                }
                .header-search-wrapper {
                    display: inline-block;
                    width: 30%;
                    margin-left: 20px;
                }
                #menu-navegacion {
                    background-color: rgba(255, 255, 255, 0.9);
                    border: none;
                    border-radius: 4px;
                    height: 34px;
                    color: #333;
                    display: inline-block;
                    margin-top: 15px;
                }

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
                    cursor: pointer;
                }
                .side-nav li a:hover {
                    background-color: #e3f2fd;
                    color: #0d2c54;
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

                .main-content-area {
                    margin-left: 300px;
                    padding: 40px 30px;
                    min-height: calc(100vh - 64px);
                }
                .content-card {
                    background: white;
                    padding: 30px;
                    border-radius: 8px;
                    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
                }
                .content-card h4 {
                    margin: 0 0 15px 0;
                    color: #0d2c54;
                    font-size: 26px;
                    font-weight: bold;
                }

                .simulated-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                .simulated-table th, .simulated-table td {
                    border: 1px solid #e0e0e0;
                    padding: 12px;
                }
                .simulated-table th {
                    background-color: #f5f5f5;
                    color: #0d2c54;
                }

                @media only screen and (max-width : 992px) {
                    .side-nav.fixed { top: 56px; height: calc(100vh - 56px); }
                    .main-content-area { margin-left: 0; }
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
                <p>Ingresando de forma segura al panel de servicios...</p>
            </div>

            <div id="portalView">
                
                <div class="navbar-fixed">
                    <nav class="navbar-color darken-4">
                        <div class="nav-wrapper">
                            <a href="javascript:void(0);" style="color:white; float:left;" class="sidenav-trigger-show">
                                <i class="material-icons waves-effect waves-light" style="font-size:40px; margin: -4px 0 0 20px; position: fixed;">menu</i>
                            </a>
                            <div class="header-search-wrapper hide-on-med-and-down sideNav-lock">
                                <select id="menu-navegacion" class="browser-default validate" required="" name="menu-navegacion">
                                    <option value="libreta_de_pago" selected="">Libreta de pago</option>
                                    <option value="logout">Salir</option>
                                </select>
                                <span style="font-size: 25px; position: relative; top: 5px; text-align:center; left: 3em; color: white;">Universidad Modelo</span>
                            </div>
                            <ul class="right hide-on-med-and-down">
                                <li>SANTIAGO DE JESUS ARCOS GUZMAN</li>
                                <li>
                                    <a href="javascript:void(0);" class="dropdown-trigger" data-target="profile-dropdown">
                                        <i class="material-icons">more_vert</i>
                                    </a>
                                    <ul id="profile-dropdown" class="dropdown-content">                   
                                        <li><a onclick="showSection('micuenta')" class="grey-text text-darken-1"><i class="material-icons">account_box</i>Mi cuenta</a></li>
                                        <li><a href="/" class="grey-text text-darken-1"><i class="material-icons">keyboard_tab</i>Salir</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>

                <ul id="slide-out" class="side-nav fixed leftside-navigation sidenav" style="transform: translateX(0%);">
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
                
                <div class="main-content-area">
                    <div id="dynamicContentCard" class="content-card"></div>
                </div>

            </div>

            <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
            <script>
                const sectionsData = {
                    libreta_de_pago: {
                        title: "Libreta de Pago",
                        html: "<p>No hay estados de cuenta pendientes de emisión.</p><table class='simulated-table'><tr><th>Concepto</th><th>Fecha Límite</th><th>Monto</th><th>Estatus</th></tr><tr><td>Colegiatura Mayo</td><td>10/05/2026</td><td>$4,200.00</td><td><span class='green-text'><b>PAGADO</b></span></td></tr></table>"
                    },
                    colegiaturas: {
                        title: "Colegiaturas e Inscripciones",
                        html: "<p>Historial de transacciones:</p><table class='simulated-table'><tr><th>Folio</th><th>Periodo</th><th>Tipo</th><th>Monto Pagado</th></tr><tr><td>MOD-78452</td><td>2026-A</td><td>Reinscripción Semestral</td><td>$5,100.00</td></tr></table>"
                    },
                    horario: {
                        title: "Horario de Clases",
                        html: "<p>Carga asignada:</p><table class='simulated-table'><tr><th>Hora</th><th>Lunes</th><th>Martes</th><th>Miércoles</th><th>Jueves</th><th>Viernes</th></tr><tr><td>07:00 - 09:00</td><td>Programación Web</td><td>Base de Datos</td><td>Programación Web</td><td>Base de Datos</td><td>Taller</td></tr></table>"
                    },
                    asignaturas: {
                        title: "Asignaturas Inscritas",
                        html: "<ul><li>• Laboratorio de Programación Web</li><li>• Ingeniería de Software II</li><li>• Arquitectura de Sistemas</li><li>• Redes Avanzadas</li></ul>"
                    },
                    calificaciones: {
                        title: "Consulta de Calificaciones",
                        html: "<table class='simulated-table'><tr><th>Materia</th><th>Parcial 1</th><th>Parcial 2</th><th>Promedio</th></tr><tr><td>Programación Web</td><td>9.5</td><td>9.0</td><td><b>9.5</b></td></tr></table>"
                    },
                    ordinarios: { title: "Exámenes Ordinarios", html: "<p class='grey-text'><i>No hay roles de exámenes programados todavía.</i></p>" },
                    adeudadas: { title: "Asignaturas Adeudadas", html: "<p class='green-text'><b>Felicidades:</b> No registra materias adeudadas.</p>" },
                    constancias: { title: "Trámite de Constancias", html: "<p>Solicitudes disponibles:</p><button class='btn blue darken-3'>Constancia de Estudios</button>" },
                    extraordinarios_inscritos: { title: "Exámenes Extraordinarios Inscritos", html: "<p>Sin registros.</p>" },
                    extraordinarios_calif: { title: "Calificaciones de Extraordinarios", html: "<p>Sin registros.</p>" },
                    formularios: { title: "Formularios y Encuestas", html: "<button class='btn green'>Responder Encuesta Docente</button>" },
                    biblioteca: { title: "Biblioteca Virtual", html: "<p>Acceso al catálogo digital autorizado para alumnos.</p>" },
                    micuenta: { title: "Mi Cuenta de Alumno", html: "<p><b>Nombre:</b> SANTIAGO DE JESUS ARCOS GUZMAN<br><b>Matrícula:</b> 15246740<br><b>Carrera:</b> Ingeniería en Sistemas Computacionales</p>" },
                    documentos: { title: "Documentos Digitales", html: "<p>Expediente completo y validado en control escolar.</p>" },
                    eduvida: { title: "Educación para la Vida", html: "<p>Talleres culturales y deportivos del semestre.</p>" }
                };

                function showSection(sectionKey) {
                    const data = sectionsData[sectionKey];
                    if (data) {
                        document.getElementById('dynamicContentCard').innerHTML = '<h4>' + data.title + '</h4>' + data.html;
                        if(sectionKey === 'libreta_de_pago') $('#menu-navegacion').val('libreta_de_pago');
                    }
                }

                $(document).ready(function(){
                    $('.collapsible').collapsible();
                    $('.dropdown-trigger').dropdown({ constrainWidth: false, alignment: 'right' });
                    
                    $('#menu-navegacion').on('change', function() {
                        if($(this).val() === 'logout') window.location.href = '/';
                        else showSection($(this).val());
                    });
                    
                    showSection('libreta_de_pago');
                    
                    setTimeout(() => {
                        document.getElementById('loadingView').style.display = 'none';
                        document.getElementById('portalView').style.display = 'block';
                    }, 2000);
                });
            </script>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Servidor activo en el puerto ${PORT}`);
});
