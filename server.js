const express = require('express');
const app = express();
const path = require('path');

// Configuración del puerto para Railway o entorno local
const PORT = process.env.PORT || 3000;

// Permite leer los datos que se envían desde el formulario HTML
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir de forma pública los archivos de la carpeta "public" (HTML, CSS, imágenes)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para procesar el inicio de sesión (Backend simulado)
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Aquí puedes ver los datos en la consola de tu servidor (simulación)
    console.log(`Intento de login - Usuario: ${username}, Contraseña: ${password}`);
    
    // Respuesta simple de éxito para la demostración escolar
    res.send(`
        <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
            <h2 style="color: #2b6cb0;">¡Inicio de sesión recibido con éxito!</h2>
            <p>Usuario ingresado: <strong>${username}</strong></p>
            <p>Este es un entorno de pruebas académico corriendo en Railway.</p>
            <a href="/">Volver al inicio</a>
        </div>
    `);
});

// Arrancar el servidor
app.listen(PORT, () => {
    console.log(`Servidor activo en el puerto ${PORT}`);
});