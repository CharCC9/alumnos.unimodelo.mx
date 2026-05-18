const express = require('express');
const path = require('path');
const app = express();

// Configuración para poder leer los datos que vienen de los formularios (POST)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (CSS, Imágenes, JS del cliente)
// Asegúrate de tener una carpeta llamada 'public' con tus estilos si los usas aparte
app.use(express.static(path.join(__dirname, 'public')));

// BASE DE DATOS SIMULADA (Datos de las capturas)
const alumnoSimulado = {
    usuario: "santiago.arcos", // Puedes cambiar este usuario por el que gustes
    contrasena: "modelo2026",   // Puedes cambiar esta contraseña
    nombre: "SANTIAGO DE JESUS ARCOS GUZMAN",
    clave: "15246740",
    materias: [
        { nombre: "ALGORITMOS", lunes: "", martes: "11-13", miercoles: "", jueves: "", viernes: "9-11", sabado: "" },
        { nombre: "CALCULO DIFERENCIAL", lunes: "11-13", martes: "", miercoles: "11-13", jueves: "", viernes: "11-13", sabado: "" },
        { nombre: "FISICA APLICADA", lunes: "9-11", martes: "", miercoles: "9-11", jueves: "", viernes: "", sabado: "" }
    ]
};

// ==========================================
// RUTAS DE LA APLICACIÓN
// ==========================================

// 1. Ruta principal (Muestra el formulario de Login)
app.get('/', (req, res) => {
    // Si usas HTML puro para el login, asegúrate de que el archivo exista en esa ruta
    // De lo contrario, puedes enviar un HTML directamente como respuesta de prueba:
    res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Servicios Escolares - Escuela Modelo</title>
            <style>
                body { font-family: sans-serif; background: #e0e0e0; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
                .login-box { background: white; padding: 40px; border-radius: 4px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); text-align: center; width: 350px; }
                h2 { color: #555; font-weight: 300; margin-bottom: 20px; }
                input { width: 100%; padding: 10px; margin: 10px 0; border: none; border-bottom: 1px solid #ccc; box-sizing: border-box; }
                button { width: 100%; padding: 12px; background: #0079c1; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; margin-top: 15px; }
                button:hover { background: #005a92; }
            </style>
        </head>
        <body>
            <div class="login-box">
                <h2>SERVICIOS ESCOLARES</h2>
                <form action="/login" method="POST">
                    <input type="text" name="usuario" placeholder="Usuario" required>
                    <input type="password" name="contrasena" placeholder="Contraseña" required>
                    <button type="submit">ENTRAR</button>
                </form>
            </div>
        </body>
        </html>
    `);
});

// 2. Ruta POST /login (¡AQUÍ ESTABA EL ERROR DE SINTAXIS ANTES!)
// Esta función procesa los datos cuando el alumno le da al botón "ENTRAR"
app.post('/login', (req, res) => {
    const { usuario, contrasena } = req.body;

    // Validamos si coinciden con nuestro alumno simulado
    if (usuario === alumnoSimulado.usuario && contrasena === alumnoSimulado.contrasena) {
        // Si es correcto, redirigimos a la vista del horario
        return res.redirect('/horario');
    } else {
        // Si falla, enviamos el mensaje de error que aparecía en tu alerta flotante
        return res.send(`
            <script>
                alert("Usuario y/o contraseña inválidos");
                window.location.href = "/";
            </script>
        `);
    }
}); 

// 3. Ruta del Horario (Muestra la tabla con las materias amontonadas que tenías)
app.get('/horario', (req, res) => {
    // Generamos las filas de la tabla dinámicamente usando los datos simulados
    const filasMaterias = alumnoSimulado.materias.map(m => `
        <tr>
            <td style="border: 1px solid #ddd; padding: 12px; text-align: left;">${m.nombre}</td>
            <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">${m.lunes}</td>
            <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">${m.martes}</td>
            <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">${m.miercoles}</td>
            <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">${m.jueves}</td>
            <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">${m.viernes}</td>
            <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">${m.sabado}</td>
        </tr>
    `).join('');

    res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Universidad Modelo - Horarios</title>
            <style>
                body { font-family: sans-serif; margin: 0; background-color: #f4f4f4; }
                .navbar { background: #003366; color: white; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; }
                .container { display: flex; margin-top: 20px; padding: 0 20px; }
                .sidebar { width: 200px; background: white; padding: 20px; border-radius: 4px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); height: fit-content; }
                .sidebar ul { list-style: none; padding: 0; margin: 0; }
                .sidebar li { padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-size: 14px; }
                .main-content { flex: 1; background: white; margin-left: 20px; padding: 30px; border-radius: 4px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
                h3 { margin-top: 0; color: #333; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th { background-color: #f2f2f2; border: 1px solid #ddd; padding: 12px; text-align: center; color: #333; }
            </style>
        </head>
        <body>
            <div class="navbar">
                <div><strong>Universidad Modelo</strong></div>
                <div>${alumnoSimulado.nombre}</div>
            </div>
            <div class="container">
                <div class="sidebar">
                    <ul>
                        <li><b>LIBRETA DE PAGO</b></li>
                        <li><b>HORARIO</b></li>
                        <li>ASIGNATURAS</li>
                        <li>CALIFICACIONES</li>
                        <li>MI CUENTA</li>
                        <li>SALIR</li>
                    </ul>
                </div>
                <div class="main-content">
                    <h3>HORARIOS DEL ALMUNO</h3>
                    <p><strong>Clave:</strong> ${alumnoSimulado.clave}</p>
                    <p><strong>Nombre:</strong> ${alumnoSimulado.nombre}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Materia</th>
                                <th>Lunes</th>
                                <th>Martes</th>
                                <th>Miercoles</th>
                                <th>Jueves</th>
                                <th>Viernes</th>
                                <th>Sábado</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${filasMaterias}
                        </tbody>
                    </table>
                </div>
            </div>
        </body>
        </html>
    `);
});

// ==========================================
// ARRANQUE DEL SERVIDOR (Compatible con Railway)
// ==========================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo perfectamente en el puerto ${PORT}`);
});
