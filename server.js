const sectionsData = {
    inicio: `
        <div class="card-panel">
            <h5 class="blue-text text-darken-4">¡Bienvenido al SCEM!</h5>
            <p>Selecciona una opción del menú lateral para consultar tu información académica y financiera.</p>
            <div class="divider" style="margin: 15px 0;"></div>
            <p><b>Alumno:</b> SANTIAGO DE JESUS ARCOS GUZMAN</p>
            <p><b>Clave:</b> 15246740</p>
        </div>
    `,
    libreta_pago: `
        <div class="card-panel">
            <h5 class="blue-text text-darken-4">Libreta de Pago</h5>
            <p>Cargando información de pagos y estados de cuenta...</p>
        </div>
    `,
    colegiaturas: `
        <div class="card-panel">
            <h5 class="blue-text text-darken-4">Colegiaturas / Inscripciones</h5>
            <p>Consulta tus estados de cuenta, fechas de vencimiento y montos de colegiaturas.</p>
        </div>
    `,
    horario: `
        <div class="card-panel">
            <h5 class="blue-text text-darken-4">Horario de Clases</h5>
            <p>Cargando la distribución horaria de tus asignaturas...</p>
        </div>
    `,
    asignaturas: `
        <div id="table-datatables">
            <h4 class="header blue-text text-darken-4" style="font-size: 1.8rem; font-weight: 400;">Asignaturas del alumno</h4>
            <p><b>Clave:</b> 15246740</p>
            <p><b>Nombre:</b> SANTIAGO DE JESUS ARCOS GUZMAN</p>
            <br>
            <table id="tbl-pagos" class="responsive-table display dataTable striped bordered" cellspacing="0" width="100%">
                <thead>
                    <tr class="blue darken-4" style="color: white;">
                        <th style="padding: 10px 15px;">Materia</th>
                        <th style="padding: 10px 15px;">Maestro</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>ALGORITMOS</td>
                        <td>EDSON GEOVANNY ESTRADA LOPEZ</td>
                    </tr>
                    <tr>
                        <td>CALCULO DIFERENCIAL</td>
                        <td>AYLIN GARCIA REYES</td>
                    </tr>
                    <tr>
                        <td>FISICA APLICADA</td>
                        <td>ALBERTO GABRIEL VEGA POOT</td>
                    </tr>
                </tbody>
            </table>
            <div class="dataTables_info" style="margin-top: 15px; font-weight: 500;">Página 1 de 1 (3 registros en total)</div>
        </div>
    `,
    calificaciones: `
        <div class="card-panel">
            <h5 class="blue-text text-darken-4">Calificaciones Parciales</h5>
            <p>Aquí se mostrarán tus calificaciones del período en curso una vez procesadas las imágenes.</p>
        </div>
    `,
    ordinarios: `
        <div class="card-panel">
            <h5 class="blue-text text-darken-4">Exámenes Ordinarios</h5>
            <p>Consulta las fechas, horarios y salones asignados para tus exámenes ordinarios.</p>
        </div>
    `,
    adeudadas: `
        <div class="card-panel">
            <h5 class="blue-text text-darken-4">Asignaturas Adeudadas</h5>
            <p>No presentas asignaturas adeudadas pendientes de acreditación.</p>
        </div>
    `,
    constancias: `
        <div class="card-panel">
            <h5 class="blue-text text-darken-4">Constancias</h5>
            <p>Módulo para la solicitud y descarga de constancias de estudio oficiales.</p>
        </div>
    `,
    formularios: `
        <div class="card-panel">
            <h5 class="blue-text text-darken-4">Formularios / Encuestas</h5>
            <p>Evaluación docente y encuestas de seguimiento disponibles.</p>
        </div>
    `,
    biblioteca: `
        <div class="card-panel">
            <h5 class="blue-text text-darken-4">Biblioteca</h5>
            <p>Consulta tus préstamos vigentes, historial y catálogo en línea.</p>
        </div>
    `,
    micuenta: `
        <div class="card-panel">
            <h5 class="blue-text text-darken-4">Mi Cuenta</h5>
            <p><b>Nombre:</b> SANTIAGO DE JESUS ARCOS GUZMAN</p>
            <p><b>Matrícula:</b> 15246740</p>
            <p><b>Institución:</b> Universidad Modelo</p>
        </div>
    `,
    documentos: `
        <div class="card-panel">
            <h5 class="blue-text text-darken-4">Documentos Digitales</h5>
            <p>Consulta el estado de la entrega de tus documentos de inscripción.</p>
        </div>
    `,
    eduvida: `
        <div class="card-panel">
            <h5 class="blue-text text-darken-4">Educación para la Vida</h5>
            <p>Actividades complementarias, talleres y créditos de formación integral.</p>
        </div>
    `
};
