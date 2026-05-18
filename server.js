const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir archivos estáticos (como el archivo logo.png si está guardado de manera local)
app.use(express.static(path.join(__dirname, 'public')));

// 1. RUTA DEL LOGIN (Muestra únicamente el formulario centrado)
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
                    max-width: 420px;
                    border-radius: 4px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    text-align: center;
                }
                .logo-container img {
                    width: 130px;
                    height: auto;
                    margin-bottom: 10px;
                }
                .system-title {
                    font-size: 24px;
                    color: #555;
                    font-weight: 300;
                    letter-spacing: 1px;
                    margin-bottom: 2px;
                }
                .system-subtitle {
                    font-size: 22px;
                    color: #555;
                    font-weight: 300;
                    letter-spacing: 1px;
                    margin-bottom: 30px;
                }
                .input-field {
                    margin-bottom: 25px;
                    position: relative;
                }
                .input-field i {
                    position: absolute;
                    left: 0;
                    top: 10px;
                    color: #222;
                    font-size: 24px;
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
                    border-radius: 4px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }
                .forgot-password {
                    display: block;
                    margin-top: 20px;
                    color: #007bc4;
                    text-decoration: none;
                    font-size: 14px;
                }
            </style>
        </head>
        <body>

            <div class="login-card">
                <div class="logo-container">
                    <img src="/logo.png" alt="Logo">
                </div>
                <div class="system-title">SERVICIOS</div>
                <div class="system-subtitle">ESCOLARES</div>

                <form action="/portal" method="POST">
                    <div class="input-field">
                        <i class="material-icons">person_outline</i>
                        <input id="username" name="username" type="text" required>
                        <label for="username" style="left: 40px;">Usuario</label>
                    </div>
                    
                    <div class="input-field">
                        <i class="material-icons">lock_outline</i>
                        <input id="password" name="password" type="password" required>
                        <label for="password" style="left: 40px;">Contraseña</label>
                    </div>

                    <button type="submit" class="btn btn-custom waves-effect waves-light">Entrar</button>
                    <a href="#" class="btn btn-custom waves-effect waves-light">Servicio Social</a>
                    <a href="#" class="btn btn-custom waves-effect waves-light">Nuevo Ingreso</a>
                    
                    <a href="#" class="forgot-password">Olve mi contraseña</a>
                </form>
            </div>

            <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
        </body>
        </html>
    `);
});

// 2. RUTA DEL PORTAL INTERNO (Réplica exacta de barras y menús)
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
                    font-family: 'Segoe UI', Roboto, sans-serif;
                    margin: 0;
                }
                
                /* Barra Superior Azul Oficial */
                .navbar-fixed {
                    height: 64px;
                    z-index: 997;
                }
                .navbar-color {
                    background-color: #0d2c54 !important; /* Azul Marino Unimodelo */
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }
                .nav-wrapper {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 20px;
                }
                .brand-section {
                    display: flex;
                    align-items: center;
                }
                .brand-title {
                    font-size: 22px;
                    color: white;
                    margin-left: 55px;
                    font-weight: 400;
                }
                .select-wrapper-custom {
                    margin-left: 20px;
                    width: 180px;
                }
                #menu-navegacion {
                    background-color: rgba(255, 255, 255, 0.9);
                    border: none;
                    border-radius: 2px;
                    height: 30px;
                    color: #333;
                    font-size: 13px;
                    display: inline-block;
                }
                .user-info-top {
                    color: white;
                    font-size: 13px;
                    font-weight: 400;
                    display: flex;
                    align-items: center;
                }

                /* Menú Lateral Izquierdo Refinado */
                .side-nav-container {
                    width: 300px;
                    background-color: #ffffff;
                    box-shadow: 2px 0 5px rgba(0,0,0,0.05);
                    position: fixed;
                    height: calc(100vh - 64px);
                    top: 64px; left: 0;
                    overflow-y: auto;
                    z-index: 996;
                }
                .side-nav-container ul {
                    margin: 0;
                    padding: 0;
                    list-style: none;
                }
                .side-nav-container li {
                    border-bottom: 1px solid #f0f0f0;
                }
                .side-nav-container li a {
                    color: #333333;
                    font-size: 13px;
                    font-weight: 400;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 24px;
                    height: 52px;
                    line-height: 52px;
                    text-decoration: none;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .side-nav-container li a:hover {
                    background-color: #f7f9fa;
                }
                .link-content {
                    display: flex;
                    align-items: center;
                }
                .side-nav-container li a i.main-icon {
                    margin-right: 16px;
                    color: #757575;
                    font-size: 20px;
                }
                .side-nav-container li a i.arrow-icon {
                    color: #9e9e9e;
                    font-size: 18px;
                }

                /* Submenú desplegable Extraordinarios */
                .collapsible-header-custom {
                    cursor: pointer;
                }
                .collapsible-body-custom {
                    display: none;
                    background-color: #fafafa;
                    padding-left: 20px;
                }

                /* Área de Trabajo Derecha con fondo texturizado */
                .main-content-area {
                    margin-left: 300px;
                    padding: 30px;
                    min-height: calc(100vh - 64px);
                    background: #e9ecef url('https://www.transparenttextures.com/patterns/cream-paper.png');
                    box-sizing: border-box;
                }
                .content-card {
                    background: white;
                    padding: 35px;
                    border-radius: 4px;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                    min-height: 400px;
                }
                .content-card h4 {
                    margin: 0 0 20px 0;
                    color: #0d2c54;
                    font-size: 24px;
                    font-weight: bold;
                    border-bottom: 2px solid #0d2c54;
                    padding-bottom: 10px;
                }

                /* Tablas de Datos simuladas */
                .simulated-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                .simulated-table th, .simulated-table td {
                    border: 1px solid #e0e0e0;
                    padding: 12px 15px;
                    text-align: left;
                    font-size: 14px;
                }
                .simulated-table th {
                    background-color: #f8f9fa;
                    color: #0d2c54;
                    font-weight: 600;
                }

                @media only screen and (max-width : 992px) {
                    .side-nav-container { display: none; }
                    .main-content-area { margin-left: 0; }
                }
            </style>
        </head>
        <body>

            <div class="navbar-fixed">
                <nav class="navbar-color">
                    <div class="nav-wrapper">
                        <div class="brand-section">
                            <a href="javascript:void(0);" style="color:white; position: absolute; left: 20px; top: 4px;">
                                <i class="material-icons" style="font-size:32px;">menu</i>
                            </a>
                            <div class="select-wrapper-custom">
                                <select id="menu-navegacion" class="browser-default">
                                    <option value="libreta_de_pago" selected>Libreta de pago</option>
                                    <option value="logout">Salir</option>
                                </select>
                            </div>
                            <span class="brand-title">Universidad Modelo</span>
                        </div>
                        
                        <div class="user-info-top">
                            <span>SANTIAGO DE JESUS ARCOS GUZMAN</span>
                            <a href="javascript:void(0);" class="dropdown-trigger" data-target="profile-dropdown" style="color: white; margin-left: 10px;">
                                <i class="material-icons">more_vert</i>
                            </a>
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
                    <li>
                        <a onclick="showSection('libreta_de_pago')">
                            <span class="link-content">LIBRETA DE PAGO</span>
                            <i class="material-icons arrow-icon">keyboard_arrow_right</i>
                        </a>
                    </li>
                    <li>
                        <a onclick="showSection('colegiaturas')">
                            <span class="link-content">COLEGIATURAS / INSCR.</span>
                            <i class="material-icons arrow-icon">keyboard_arrow_right</i>
                        </a>
                    </li>
                    <li>
                        <a onclick="showSection('horario')">
                            <span class="link-content">HORARIO</span>
                            <i class="material-icons arrow-icon">keyboard_arrow_right</i>
                        </a>
                    </li>
                    <li>
                        <a onclick="showSection('asignaturas')">
                            <span class="link-content">ASIGNATURAS</span>
                            <i class="material-icons arrow-icon">keyboard_arrow_right</i>
                        </a>
                    </li>
                    <li>
                        <a onclick="showSection('calificaciones')">
                            <span class="link-content">CALIFICACIONES</span>
                            <i class="material-icons arrow-icon">keyboard_arrow_right</i>
                        </a>
                    </li>
                    <li>
                        <a onclick="showSection('ordinarios')">
                            <span class="link-content">ORDINARIOS</span>
                            <i class="material-icons arrow-icon">keyboard_arrow_right</i>
                        </a>
                    </li>
                    <li>
                        <a onclick="showSection('adeudadas')">
                            <span class="link-content">ASIG.ADEUDADAS</span>
                            <i class="material-icons arrow-icon">keyboard_arrow_right</i>
                        </a>
                    </li>
                    <li>
                        <a onclick="showSection('constancias')">
                            <span class="link-content">CONSTANCIAS</span>
                            <i class="material-icons arrow-icon">keyboard_arrow_right</i>
                        </a>
                    </li>
                    
                    <li>
                        <a class="collapsible-header-custom" onclick="toggleExtraordinarios()">
                            <span class="link-content" style="display:flex; align-items:center;">
                                <i class="material-icons main-icon" style="margin-right:8px;">dashboard</i>EXTRAORDINARIOS
                            </span>
                            <i class="material-icons arrow-icon" id="arrow-toggle">keyboard_arrow_right</i>
                        </a>
                        <div class="collapsible-body-custom" id="extra-menu">
                            <ul>
                                <li><a onclick="showSection('extraordinarios_inscritos')">Exámenes Inscritos</a></li>
                                <li><a onclick="showSection('extraordinarios_calif')">Calificaciones</a></li>
                            </ul>
                        </div>
                    </li>

                    <li>
                        <a onclick="showSection('formularios')">
                            <span class="link-content">FORMULARIOS</span>
                            <i class="material-icons arrow-icon">keyboard_arrow_right</i>
                        </a>
                    </li>
                    <li>
                        <a onclick="showSection('biblioteca')">
                            <span class="link-content">BIBLIOTECA</span>
                            <i class="material-icons arrow-icon">keyboard_arrow_right</i>
                        </a>
                    </li>
                    <li>
                        <a onclick="showSection('micuenta')">
                            <span class="link-content">MI CUENTA</span>
                            <i class="material-icons arrow-icon">keyboard_arrow_right</i>
                        </a>
                    </li>
                    <li>
                        <a onclick="showSection('documentos')">
                            <span class="link-content">DOCUMENTOS</span>
                            <i class="material-icons arrow-icon">keyboard_arrow_right</i>
                        </a>
                    </li>
                    <li>
                        <a onclick="showSection('eduvida')">
                            <span class="link-content">EDUCACIÓN PARA LA VIDA</span>
                            <i class="material-icons arrow-icon">keyboard_arrow_right</i>
                        </a>
                    </li>
                    <li>
                        <a href="/">
                            <span class="link-content">SALIR</span>
                            <i class="material-icons arrow-icon">keyboard_arrow_right</i>
                        </a>
                    </li>
                </ul>
            </div>
            
            <div class="main-content-area">
                <div id="dynamicContentCard" class="content-card">
                    </div>
            </div>

            <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
            <script>
                // Base de datos local para renderizar de inmediato cada módulo
                const sectionsData = {
                    libreta_de_pago: {
                        title: "Libreta de Pago",
                        html: "<p>No hay estados de cuenta pendientes de liquidación en el sistema de tesorería.</p><table class='simulated-table'><tr><th>Concepto</th><th>Fecha de Vencimiento</th><th>Monto</th><th>Estatus</th></tr><tr><td>Colegiatura del Mes</td><td>10/05/2026</td><td>$4,200.00</td><td><span class='green-text'><b>PAGADO</b></span></td></tr></table>"
                    },
                    colegiaturas: {
                        title: "Colegiaturas e Inscripciones",
                        html: "<p>Desglose de aranceles académicos correspondientes al Ciclo Escolar vigente:</p><table class='simulated-table'><tr><th>Folio Digital</th><th>Periodo</th><th>Concepto Base</th><th>Monto Liquidado</th></tr><tr><td>MOD-78452</td><td>2026-A</td><td>Reinscripción Semestral</td><td>$5,100.00</td></tr></table>"
                    },
                    horario: {
                        title: "Horario de Clases",
                        html: "<p>Distribución de asignaturas asignadas en el aula presencial:</p><table class='simulated-table'><tr><th>Hora</th><th>Lunes</th><th>Martes</th><th>Miércoles</th><th>Jueves</th><th>Viernes</th></tr><tr><td>07:00 - 09:00</td><td>Programación Web</td><td>Base de Datos</td><td>Programación Web</td><td>Base de Datos</td><td>Taller de Integración</td></tr></table>"
                    },
                    asignaturas: {
                        title: "Asignaturas Inscritas",
                        html: "<p>Carga académica regular cargada en sistema:</p><ul><li>• Laboratorio de Programación Web</li><li>• Ingeniería de Software II</li><li>• Arquitectura de Sistemas Distribuidos</li><li>• Redes Avanzadas de Computadoras</li></ul>"
                    },
                    calificaciones: {
                        title: "Consulta de Calificaciones",
                        html: "<table class='simulated-table'><tr><th>Unidad de Aprendizaje</th><th>Parcial 1</th><th>Parcial 2</th><th>Promedio General</th></tr><tr><td>Programación Web</td><td>9.5</td><td>9.0</td><td><b>9.5</b></td></tr><tr><td>Ingeniería de Software II</td><td>8.8</td><td>8.5</td><td><b>8.7</b></td></tr></table>"
                    },
                    ordinarios: { title: "Exámenes Ordinarios", html: "<p class='grey-text'><i>La publicación del rol oficial de evaluaciones finales ordinarias está pendiente por servicios escolares.</i></p>" },
                    adeudadas: { title: "Asignaturas Adeudadas", html: "<p class='green-text'><b>Estatus Regular:</b> No se registran asignaturas pendientes de acreditación.</p>" },
                    constancias: { title: "Trámite de Constancias", html: "<p>Emisión de solicitudes académicas:</p><button class='btn blue darken-3' style='text-transform:none;'>Generar Constancia de Estudios con Código QR</button>" },
                    extraordinarios_inscritos: { title: "Exámenes Extraordinarios Inscritos", html: "<p>No cuenta con solicitudes de exámenes extraordinarios programadas.</p>" },
                    extraordinarios_calif: { title: "Calificaciones de Extraordinarios", html: "<p>Historial limpio. Sin actas de regularización registradas.</p>" },
                    formularios: { title: "Formularios y Encuestas", html: "<p>Encuestas obligatorias vigentes:</p><button class='btn green font-weight-bold'>Aplicar Evaluación de Calidad Docente</button>" },
                    biblioteca: { title: "Biblioteca Virtual", html: "<p>Credencial digital validada para la consulta en bases de datos indexadas y repositorios de libros electrónicos.</p>" },
                    micuenta: { title: "Mi Cuenta de Alumno", html: "<p style='line-height:2;'><b>Nombre del Alumno:</b> SANTIAGO DE JESUS ARCOS GUZMAN<br><b>Matrícula Institucional:</b> 15246740<br><b>Programa Educativo:</b> Ingeniería en Sistemas Computacionales<br><b>Estatus Escolar:</b> Inscrito Regular</p>" },
                    documentos: { title: "Documentos Digitales", html: "<p>Expediente de ingreso (Certificado de Bachillerato, Acta de Nacimiento y CURP) validado correctamente.</p>" },
                    eduvida: { title: "Educación para la Vida", html: "<p>Talleres de formación humana, deportes y actividades culturales complementarias registradas.</p>" }
                };

                // Función que refresca el cuadro de contenido sin alterar las barras de diseño
                function showSection(sectionKey) {
                    const data = sectionsData[sectionKey];
                    if (data) {
                        document.getElementById('dynamicContentCard').innerHTML = '<h4>' + data.title + '</h4>' + data.html;
                        // Sincronizar el dropdown selector superior
                        if(sectionKey === 'libreta_de_pago') {
                            $('#menu-navegacion').val('libreta_de_pago');
                        }
                    }
                }

                // Controlar el despliegue del submenú de Extraordinarios
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
                    // Inicializar menú de perfil superior derecho
                    $('.dropdown-trigger').dropdown({ constrainWidth: false, alignment: 'right' });
                    
                    // Evento selector superior
                    $('#menu-navegacion').on('change', function() {
                        if($(this).val() === 'logout') window.location.href = '/';
                        else showSection($(this).val());
                    });
                    
                    // Mostrar sección por defecto al entrar
                    showSection('libreta_de_pago');
                });
            </script>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Servidor activo en el puerto ${PORT}`);
});
