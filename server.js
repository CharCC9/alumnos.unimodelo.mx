const express = require('express');
const app = express();
const path = require('path');

// Configuración del puerto para Railway o entorno local
const PORT = process.env.PORT || 3000;

// Permite leer los datos que se envían desde el formulario HTML
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir de forma pública los archivos de la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Ruta explícita para la raíz (/) que asegura la carga del archivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para procesar el inicio de sesión con simulación de error de seguridad
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Registro interno en la consola del servidor para fines de depuración académica
    console.log(`Intento de acceso - ID: ${username}`);
    
    // Envío del mensaje de error solicitado con un diseño de advertencia institucional
    res.send(`
        <div style="font-family: 'Segoe UI', sans-serif; text-align: center; margin-top: 80px; padding: 20px;">
            <div style="max-width: 500px; margin: 0 auto; background-color: #fff5f5; border: 1px solid #fed7d7; padding: 30px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <div style="color: #e53e3e; font-size: 48px; margin-bottom: 15px;">⚠️</div>
                <h2 style="color: #c53030; margin-bottom: 12px; font-size: 20px;">Acceso Restringido</h2>
                <p style="color: #4a5568; font-size: 15px; line-height: 1.6; margin-bottom: 20px;">
                    <strong>Bloqueado por motivos de seguridad:</strong> Usted está iniciando sesión desde otra ubicación.
                </p>
                <div style="border-top: 1px solid #edf2f7; padding-top: 15px;">
                    <a href="/" style="color: #3182ce; text-decoration: none; font-size: 14px; font-weight: bold;">Volver al inicio</a>
                </div>
            </div>
        </div>
    `);
});

// Arrancar el servidor
app.listen(PORT, () => {
    console.log(`Servidor activo en el puerto ${PORT}`);
});
