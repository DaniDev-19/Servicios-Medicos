import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import cintillo from '../images/cintillo.png';



export function generateReposoPDF(reposo) {
    const doc = new jsPDF({ format: 'letter', unit: 'mm' });

    // --- Configuración ---
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    let y = margin;

    // --- Borde de Página ---
    doc.setDrawColor(44, 62, 80);
    doc.setLineWidth(0.1);
    doc.rect(5, 5, pageWidth - 10, pageHeight - 10);

    // --- Header (Cintillo) ---
    try {
        const imgWidth = contentWidth;
        const imgHeight = 25;
        doc.addImage(cintillo, 'PNG', margin, y, imgWidth, imgHeight);
        y += imgHeight + 12;
    } catch (e) {
        y += 30;
    }

    // --- Título ---
    doc.setFont('times', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(20, 40, 80);
    doc.text('CONSTANCIA DE REPOSO MÉDICO', pageWidth / 2, y, { align: 'center' });
    y += 8;

    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`CÓDIGO DE CONTROL: ${reposo.codigo || 'S/N'}`, pageWidth / 2, y, { align: 'center' });
    y += 12;

    // --- Línea separadora ---
    doc.setDrawColor(20, 40, 80);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    // --- Cuerpo del Documento ---
    doc.setFont('times', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(0);

    const fechaEmision = new Date().toLocaleDateString('es-VE', { day: 'numeric', month: 'long', year: 'numeric' });
    const fInicio = new Date(reposo.fecha_inicio).toLocaleDateString('es-VE');
    const fFin = new Date(reposo.fecha_fin).toLocaleDateString('es-VE');

    const lineHeight = 7;

    // Párrafo 1: Introducción
    const introText = `Quien suscribe, Dr(a). ${reposo.nombre_doctor} ${reposo.apellido_doctor}, en su carácter de Médico adscrito al Servicio de Salud y Seguridad Laboral, por medio de la presente HACE CONSTAR que ha practicado la debida evaluación médica al ciudadano(a):`;
    const splitIntro = doc.splitTextToSize(introText, contentWidth);
    doc.text(splitIntro, margin, y);
    y += (splitIntro.length * lineHeight) + 5;

    // Datos del Paciente
    doc.setFont('times', 'bold');
    doc.setFontSize(14);
    doc.text(`${reposo.nombre_paciente} ${reposo.apellido_paciente}`.toUpperCase(), pageWidth / 2, y, { align: 'center' });
    y += 8;
    doc.setFontSize(12);
    doc.text(`C.I: ${reposo.cedula_paciente}`, pageWidth / 2, y, { align: 'center' });
    y += 15;

    // Diagnóstico
    doc.setFont('times', 'normal');
    const diagIntro = `Quien acude a consulta presentando sintomatología clínica compatible con el siguiente diagnóstico:`;
    doc.text(diagIntro, margin, y);
    y += 10;

    doc.setFont('times', 'bold');
    const splitDiag = doc.splitTextToSize((reposo.diagnostico || 'No especificado').toUpperCase(), contentWidth - 20);
    doc.text(splitDiag, margin + 10, y);
    y += (splitDiag.length * lineHeight) + 5;

    // Observaciones
    if (reposo.observacion) {
        doc.setFont('times', 'normal');
        doc.text('Observaciones Clínicas:', margin, y);
        y += 7;
        doc.setFont('times', 'italic');
        const splitObs = doc.splitTextToSize(reposo.observacion, contentWidth - 10);
        doc.text(splitObs, margin + 5, y);
        y += (splitObs.length * lineHeight) + 5;
    }

    // Indicación del Reposo
    doc.setFont('times', 'normal');
    const reposoText = `En virtud de lo anterior, y para garantizar el restablecimiento de su salud, se indica cumplir REPOSO MÉDICO por un lapso de ${reposo.dias_reposo} días continuos, los cuales deberán ser cumplidos desde el ${fInicio} hasta el ${fFin} (ambas fechas inclusive).`;
    const splitReposo = doc.splitTextToSize(reposoText, contentWidth);
    doc.text(splitReposo, margin, y);
    y += (splitReposo.length * lineHeight) + 15;

    // Cierre Legal
    const cierreText = `Constancia que se expide a solicitud de la parte interesada para los fines legales y administrativos a que haya lugar, en la ciudad de San Felipe, a los ${fechaEmision}.`;
    const splitCierre = doc.splitTextToSize(cierreText, contentWidth);
    doc.text(splitCierre, margin, y);

    // --- Firmas ---
    y = pageHeight - 35;

    doc.setDrawColor(0);
    doc.line(pageWidth / 2 - 40, y, pageWidth / 2 + 40, y);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(`Dr(a). ${reposo.nombre_doctor} ${reposo.apellido_doctor}`, pageWidth / 2, y + 5, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('Servicio Médico', pageWidth / 2, y + 10, { align: 'center' });

    // --- Footer ---
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text('Generado por Sistema Integral de Servicios Médicos Yutong - Version 1.0.0', margin, pageHeight - 10);
    doc.text(`Página 1 de 1`, pageWidth - margin, pageHeight - 10, { align: 'right' });

    return doc.output('blob');
}


export function generateHistoriaClinicaPDF(historia) {
    const doc = new jsPDF({ format: 'letter', unit: 'mm' });

    // --- Configuración ---
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - (margin * 2);
    let y = margin;

    // --- Borde de Página ---
    doc.setDrawColor(44, 62, 80);
    doc.setLineWidth(0.1);
    doc.rect(5, 5, pageWidth - 10, pageHeight - 10);

    // --- Header (Cintillo) ---
    try {
        const imgWidth = contentWidth;
        const imgHeight = 22;
        doc.addImage(cintillo, 'PNG', margin, y, imgWidth, imgHeight);
        y += imgHeight + 10;
    } catch (e) {
        y += 25;
    }

    // --- Título Principal ---
    doc.setFont('times', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(20, 40, 80);
    doc.text('HISTORIA CLÍNICA DIGITAL', pageWidth / 2, y, { align: 'center' });
    y += 8;

    // Código de Historia
    doc.setFontSize(11);
    doc.setTextColor(100);
    const codigoHistoria = historia.codigo || 'S/N';
    doc.text(`N° DE EXPEDIENTE: ${codigoHistoria}`, pageWidth / 2, y, { align: 'center' });
    y += 10;

    // Línea decorativa
    doc.setDrawColor(20, 40, 80);
    doc.setLineWidth(0.8);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    // Helper para dibujar secciones
    const drawSectionHeader = (title) => {
        doc.setFillColor(20, 40, 80);
        doc.rect(margin, y, contentWidth, 7, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(255);
        doc.text(title, margin + 3, y + 5);
        y += 12;
        doc.setTextColor(0);
    };

    // Helper para dibujar filas de datos
    const drawDataRow = (label, value, x = margin + 2, labelW = 40) => {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.text(label, x, y);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text(String(value || 'N/A'), x + labelW, y);
    };

    // === SECCIÓN I: DATOS DEL PACIENTE ===
    drawSectionHeader('I. INFORMACIÓN DE IDENTIFICACIÓN DEL PACIENTE');

    drawDataRow('Nombre Completo:', `${historia.nombre_paciente || ''} ${historia.apellido_paciente || ''}`.toUpperCase());
    drawDataRow('Cédula:', historia.cedula_paciente, margin + 110, 15);
    y += 7;

    drawDataRow('Edad:', `${historia.edad_paciente || 'N/A'} años`);
    drawDataRow('Sexo:', historia.sexo_paciente, margin + 60, 12);

    if (historia.fecha) {
        let fNac = 'N/A';
        try {
            const match = historia.fecha.toString().trim().match(/^(\d{2})\/(\d{2})\/(\d{2})/);
            if (match) {
                let anio = parseInt(match[3]) >= 50 ? `19${match[3]}` : `20${match[3]}`;
                fNac = `${match[1]}/${match[2]}/${anio}`;
            }
        } catch (e) { }
        drawDataRow('F. Nacimiento:', fNac, margin + 110, 25);
    }
    y += 7;

    drawDataRow('Teléfono:', historia.contacto_paciente);
    drawDataRow('Correo:', historia.correo_paciente, margin + 110, 15);
    y += 7;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('Dirección:', margin + 2, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const direccion = `${historia.estado_nombre_paciente || ''}, ${historia.municipio_nombre_paciente || ''}, ${historia.parroquia_nombre_paciente || ''}, ${historia.sector_nombre_paciente || ''}`.replace(/^,\s*|,\s*$/g, '');
    const splitDir = doc.splitTextToSize(direccion || 'No especificada', contentWidth - 25);
    doc.text(splitDir, margin + 25, y);
    y += (splitDir.length * 4) + 6;

    if (historia.departamento_nombre_paciente) {
        drawDataRow('Departamento:', historia.departamento_nombre_paciente);
        y += 7;
    }

    if (historia.profesion_nombre_paciente || historia.cargo_nombre_paciente) {
        drawDataRow('Profesión:', historia.profesion_nombre_paciente);
        drawDataRow('Cargo:', historia.cargo_nombre_paciente, margin + 110, 15);
        y += 10;
    }

    // === SECCIÓN II: DATOS DE LA CONSULTA ===
    if (y > pageHeight - 60) { doc.addPage(); y = margin + 10; doc.rect(5, 5, pageWidth - 10, pageHeight - 10); }
    drawSectionHeader('II. REGISTRO DE ATENCIÓN MÉDICA');

    const fConsulta = historia.fecha_consulta ? new Date(historia.fecha_consulta).toLocaleDateString('es-VE') : 'N/A';
    drawDataRow('Fecha Consulta:', fConsulta);

    if (historia.fecha_alta) {
        const fAlta = new Date(historia.fecha_alta).toLocaleDateString('es-VE');
        drawDataRow('Fecha Alta:', fAlta, margin + 110, 25);
    }
    y += 7;

    drawDataRow('Médico Tratante:', `Dr(a). ${historia.nombre_doctor || ''} ${historia.apellido_doctor || ''}`);
    y += 10;

    // === SECCIÓN III: ANAMNESIS Y EVALUACIÓN ===
    if (y > pageHeight - 80) { doc.addPage(); y = margin + 10; doc.rect(5, 5, pageWidth - 10, pageHeight - 10); }
    drawSectionHeader('III. ANAMNESIS Y EXAMEN FÍSICO');

    doc.setFont('helvetica', 'bold');
    doc.text('Motivo de Consulta:', margin + 2, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    const splitMotivo = doc.splitTextToSize(historia.motivo_consulta || 'No especificado', contentWidth - 4);
    doc.text(splitMotivo, margin + 4, y);
    y += (splitMotivo.length * 5) + 6;

    doc.setFont('helvetica', 'bold');
    doc.text('Enfermedad Actual / Historia:', margin + 2, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    const splitHistoria = doc.splitTextToSize(historia.historia || 'No especificado', contentWidth - 4);
    doc.text(splitHistoria, margin + 4, y);
    y += (splitHistoria.length * 5) + 6;

    doc.setFont('helvetica', 'bold');
    doc.text('Examen Físico:', margin + 2, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    const splitExamen = doc.splitTextToSize(historia.examen_fisico || 'Sin hallazgos registrados', contentWidth - 4);
    doc.text(splitExamen, margin + 4, y);
    y += (splitExamen.length * 5) + 10;

    // === SECCIÓN V: JUICIO CLÍNICO Y DIAGNÓSTICO ===
    if (y > pageHeight - 60) { doc.addPage(); y = margin + 10; doc.rect(5, 5, pageWidth - 10, pageHeight - 10); }
    drawSectionHeader('IV. DIAGNÓSTICO Y PATOLOGÍASASOCIADAS');

    doc.setFont('times', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(150, 0, 0); // Rojo formal para diagnóstico
    const splitDiag = doc.splitTextToSize((historia.diagnostico || 'No especificado').toUpperCase(), contentWidth - 4);
    doc.text(splitDiag, margin + 2, y);
    y += (splitDiag.length * 6) + 6;
    doc.setTextColor(0);

    if (historia.detalle && historia.detalle.length > 0) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.text('Patologías Relacionadas (CIE-10):', margin + 2, y);
        y += 5;
        doc.setFont('helvetica', 'normal');
        historia.detalle.forEach(d => {
            if (y > pageHeight - 30) { doc.addPage(); y = margin + 10; doc.rect(5, 5, pageWidth - 10, pageHeight - 10); }
            doc.text(`• ${d.enfermedad_nombre} (${d.categoria_nombre || 'General'})`, margin + 6, y);
            y += 5;
        });
        y += 5;
    }

    // === SECCIÓN VI: PLAN DE TRATAMIENTO ===
    if (historia.observacion) {
        if (y > pageHeight - 50) { doc.addPage(); y = margin + 10; doc.rect(5, 5, pageWidth - 10, pageHeight - 10); }
        drawSectionHeader('V. OBSERVACIONES Y PLAN DE TRATAMIENTO');
        const splitObs = doc.splitTextToSize(historia.observacion, contentWidth - 4);
        doc.text(splitObs, margin + 4, y);
        y += (splitObs.length * 5) + 15;
    }

    // === Firmas ===
    y = pageHeight - 45;
    doc.setDrawColor(44, 62, 80);
    doc.setLineWidth(0.5);
    doc.line(pageWidth / 2 - 40, y, pageWidth / 2 + 40, y);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(`Dr(a). ${historia.nombre_doctor || ''} ${historia.apellido_doctor || ''}`, pageWidth / 2, y + 5, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('Firma y Sello del Médico Tratante', pageWidth / 2, y + 9, { align: 'center' });

    // === Footer ===
    const totalPages = doc.internal.getNumberOfPages();
    const fGen = new Date().toLocaleString('es-VE');
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(7);
        doc.setTextColor(120);
        doc.text(`Expediente Médico - Yutong Venezuela • Generado: ${fGen}`, margin, pageHeight - 8);
        doc.text(`Página ${i} de ${totalPages}`, pageWidth - margin, pageHeight - 8, { align: 'right' });
    }

    return doc.output('blob');
}

// ==================== FICHA COMPLETA DEL PACIENTE ====================
export function generateFichaPacientePDF(data) {
    const { paciente, historia, signos, reposos } = data;
    const doc = new jsPDF({ format: 'letter', unit: 'mm' });

    // --- Configuración ---
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - (margin * 2);
    let y = margin;

    // --- Header (Cintillo) ---
    try {
        const imgWidth = contentWidth;
        const imgHeight = 20;
        doc.addImage(cintillo, 'PNG', margin, y, imgWidth, imgHeight);
        y += imgHeight + 15;
    } catch (e) {
        y += 25;
    }

    // --- Título ---
    doc.setFont('times', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(20, 40, 80);
    doc.text('FICHA INTEGRAL DEL PACIENTE', pageWidth / 2, y, { align: 'center' });
    y += 15;

    // --- Borde de Página ---
    doc.setDrawColor(44, 62, 80);
    doc.setLineWidth(0.1);
    doc.rect(5, 5, pageWidth - 10, pageHeight - 10);

    // --- SECCIÓN I: DATOS PERSONALES ---
    doc.setFillColor(20, 40, 80);
    doc.rect(margin, y, contentWidth, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.text('I. INFORMACIÓN PERSONAL', margin + 3, y + 5.5);
    y += 15;

    doc.setTextColor(0);
    // Fila 1
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Nombre Completo:', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`${paciente.nombre || ''} ${paciente.apellido || ''}`.toUpperCase(), margin + 35, y);

    doc.setFont('helvetica', 'bold');
    doc.text('Cédula:', margin + 110, y);
    doc.setFont('helvetica', 'normal');
    doc.text(paciente.cedula || 'N/A', margin + 125, y);
    y += 8;

    // Fila 2
    doc.setFont('helvetica', 'bold');
    doc.text('Fecha Nacimiento:', margin, y);
    doc.setFont('helvetica', 'normal');
    const fechaNac = paciente.fecha_nacimiento ? new Date(paciente.fecha_nacimiento).toLocaleDateString('es-VE') : 'N/A';
    doc.text(fechaNac, margin + 35, y);

    doc.setFont('helvetica', 'bold');
    doc.text('Edad:', margin + 70, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`${paciente.edad || 'N/A'} años`, margin + 82, y);

    doc.setFont('helvetica', 'bold');
    doc.text('Sexo:', margin + 110, y);
    doc.setFont('helvetica', 'normal');
    doc.text(paciente.sexo || 'N/A', margin + 125, y);
    y += 8;

    // Fila 3
    doc.setFont('helvetica', 'bold');
    doc.text('Teléfono:', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.text(paciente.contacto || 'N/A', margin + 35, y);

    doc.setFont('helvetica', 'bold');
    doc.text('Correo:', margin + 110, y);
    doc.setFont('helvetica', 'normal');
    doc.text(paciente.correo || 'N/A', margin + 125, y);
    y += 8;

    // Fila 4: Código Territorial y Ubicación (Inicio)
    doc.setFont('helvetica', 'bold');
    doc.text('Cód. Territorial:', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.text(paciente.codigo_territorial || 'N/A', margin + 35, y);
    y += 8;

    // Fila 5: Ubicación
    doc.setFont('helvetica', 'bold');
    doc.text('Ubicación:', margin, y);
    doc.setFont('helvetica', 'normal');
    const ubicacion = paciente.ubicacion || 'No registrada';
    const splitUbicacion = doc.splitTextToSize(ubicacion, contentWidth - 35);
    doc.text(splitUbicacion, margin + 35, y);
    y += (splitUbicacion.length * 6) + 10;

    // --- SECCIÓN II: INFORMACIÓN CLÍNICA BÁSICA ---
    doc.setFillColor(20, 40, 80);
    doc.rect(margin, y, contentWidth, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.text('II. RESUMEN CLÍNICO', margin + 3, y + 5.5);
    y += 15;

    doc.setTextColor(0);

    // Signos Vitales Recientes
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Últimos Signos Vitales Registrados:', margin, y);
    y += 6;

    if (signos && signos.length > 0) {
        const ultimos = signos[0];
        const fechaSignos = new Date(ultimos.fecha_registro).toLocaleDateString('es-VE');

        // Tabla simple de signos
        const startX = margin + 5;
        const boxWidth = (contentWidth - 10) / 3;
        const boxHeight = 12;

        // Fila 1 de cajas
        doc.rect(startX, y, boxWidth, boxHeight);
        doc.setFontSize(8); doc.setTextColor(100);
        doc.text('Presión Arterial', startX + 2, y + 4);
        doc.setFontSize(11); doc.setTextColor(0); doc.setFont('helvetica', 'bold');
        doc.text(ultimos.presion_arterial || '--', startX + 2, y + 9);

        doc.rect(startX + boxWidth, y, boxWidth, boxHeight);
        doc.setFontSize(8); doc.setTextColor(100); doc.setFont('helvetica', 'bold');
        doc.text('Frecuencia Cardíaca', startX + boxWidth + 2, y + 4);
        doc.setFontSize(11); doc.setTextColor(0);
        doc.text(`${ultimos.frecuencia_cardiaca || '--'} bpm`, startX + boxWidth + 2, y + 9);

        doc.rect(startX + (boxWidth * 2), y, boxWidth, boxHeight);
        doc.setFontSize(8); doc.setTextColor(100); doc.setFont('helvetica', 'bold');
        doc.text('Temperatura', startX + (boxWidth * 2) + 2, y + 4);
        doc.setFontSize(11); doc.setTextColor(0);
        doc.text(`${ultimos.temperatura || '--'} °C`, startX + (boxWidth * 2) + 2, y + 9);

        y += boxHeight;
        // Fila 2 de cajas
        doc.rect(startX, y, boxWidth, boxHeight);
        doc.setFontSize(8); doc.setTextColor(100); doc.setFont('helvetica', 'bold');
        doc.text('Peso', startX + 2, y + 4);
        doc.setFontSize(11); doc.setTextColor(0);
        doc.text(`${ultimos.peso || '--'} kg`, startX + 2, y + 9);

        doc.rect(startX + boxWidth, y, boxWidth, boxHeight);
        doc.setFontSize(8); doc.setTextColor(100); doc.setFont('helvetica', 'bold');
        doc.text('Saturación O2', startX + boxWidth + 2, y + 4);
        doc.setFontSize(11); doc.setTextColor(0);
        doc.text(`${ultimos.saturacion_oxigeno || '--'} %`, startX + boxWidth + 2, y + 9);

        doc.rect(startX + (boxWidth * 2), y, boxWidth, boxHeight);
        doc.setFontSize(8); doc.setTextColor(100); doc.setFont('helvetica', 'bold');
        doc.text('Altura', startX + (boxWidth * 2) + 2, y + 4);
        doc.setFontSize(11); doc.setTextColor(0);
        doc.text(`${ultimos.altura || '--'} m`, startX + (boxWidth * 2) + 2, y + 9);

        y += boxHeight;
        // Fila 3 de cajas
        doc.rect(startX, y, boxWidth, boxHeight);
        doc.setFontSize(8); doc.setTextColor(100); doc.setFont('helvetica', 'bold');
        doc.text('Talla', startX + 2, y + 4);
        doc.setFontSize(11); doc.setTextColor(0);
        doc.text(`${ultimos.talla || '--'}`, startX + 2, y + 9);

        doc.rect(startX + boxWidth, y, boxWidth, boxHeight);
        doc.setFontSize(8); doc.setTextColor(100); doc.setFont('helvetica', 'bold');
        doc.text('Fecha Registro', startX + boxWidth + 2, y + 4);
        doc.setFontSize(10); doc.setTextColor(0);
        doc.text(fechaSignos, startX + boxWidth + 2, y + 9);

        doc.rect(startX + (boxWidth * 2), y, boxWidth, boxHeight);
        // Espacio vacío o algo más

        y += boxHeight + 10;
    } else {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text('No hay registros de signos vitales disponibles.', margin, y);
        y += 10;
    }

    // Historia Médica Resumen
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Historia Médica:', margin, y);
    y += 6;

    if (historia) {
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text('Código de Historia:', margin, y);
        doc.setFont('helvetica', 'normal');
        doc.text(historia.codigo || 'N/A', margin + 35, y);
        y += 5;

        if (historia.diagnostico) {
            doc.setFont('helvetica', 'bold');
            doc.text('Último Diagnóstico:', margin, y);
            y += 5;
            doc.setFont('helvetica', 'normal');
            const splitDiag = doc.splitTextToSize(historia.diagnostico, contentWidth);
            doc.text(splitDiag, margin, y);
            y += (splitDiag.length * 5) + 5;
        }
    } else {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text('El paciente no posee una historia médica activa registrada.', margin, y);
        y += 10;
    }

    // --- SITUACIÓN ACTUAL Y REPOSOS ---
    y += 5;
    doc.setDrawColor(200);
    doc.line(margin, y, pageWidth - margin, y); // Separator line
    y += 8;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Estatus Actual del Paciente:', margin, y);

    // Determine status text/color
    const estatusTexto = paciente.estatus ? paciente.estatus.toUpperCase() : 'NO DEFINIDO';
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(estatusTexto === 'REPOSO' ? 200 : 0, estatusTexto === 'REPOSO' ? 0 : 100, 0); // Red if reposo, Green/Dark otherwise
    doc.text(estatusTexto, margin + 50, y);
    doc.setTextColor(0); // Reset color
    y += 8;

    // Check for active reposo
    const activeReposo = reposos && reposos.find(r => r.estado === 'activo');

    if (activeReposo) {
        doc.setFillColor(245, 245, 245); // Gris muy claro
        doc.rect(margin, y, contentWidth, 35, 'F');
        doc.setDrawColor(20, 40, 80);
        doc.rect(margin, y, contentWidth, 35, 'S');

        y += 6;
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(20, 40, 80);
        doc.text('REPOSO MÉDICO ACTIVO', margin + 5, y);
        doc.setTextColor(0);

        y += 6;
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text('Código:', margin + 5, y);
        doc.setFont('helvetica', 'normal');
        doc.text(activeReposo.codigo || 'N/A', margin + 25, y);

        doc.setFont('helvetica', 'bold');
        doc.text('Vigencia:', margin + 70, y);
        doc.setFont('helvetica', 'normal');
        const inicio = new Date(activeReposo.fecha_inicio).toLocaleDateString('es-VE');
        const fin = new Date(activeReposo.fecha_fin).toLocaleDateString('es-VE');
        doc.text(`${inicio} al ${fin} (${activeReposo.dias_reposo} días)`, margin + 90, y);

        y += 6;
        doc.setFont('helvetica', 'bold');
        doc.text('Diagnóstico:', margin + 5, y);
        doc.setFont('helvetica', 'normal');
        const diagReposo = activeReposo.diagnostico || 'Sin diagnóstico especificado';
        // Truncate if too long for one line in this compact view
        const splitDiagR = doc.splitTextToSize(diagReposo, contentWidth - 30);
        doc.text(splitDiagR[0] + (splitDiagR.length > 1 ? '...' : ''), margin + 25, y);

        y += 18; // Move past box
    } else {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text('No hay reposos médicos activos registrados al momento de la emisión.', margin, y);
        y += 10;
    }

    // Footer
    const totalPages = doc.internal.getNumberOfPages();
    const fechaGeneracion = new Date().toLocaleDateString('es-VE', {
        day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(7);
        doc.setTextColor(120);
        doc.text(`Ficha de Paciente - Yutong Venezuela • Generado: ${fechaGeneracion}`, margin, pageHeight - 7);
        doc.text(`Página ${i} de ${totalPages}`, pageWidth - margin, pageHeight - 7, { align: 'right' });
    }

    return doc.output('blob');
}

// ==================== INFORME DE SEGUIMIENTO Y ESTADÍSTICAS ====================
export function generateInformeSeguimientoPDF(data) {
    const { paciente, consultas = [], reposos = [], seguimientos = [] } = data;
    const doc = new jsPDF({ format: 'letter', unit: 'mm' });

    // --- Configuración General ---
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - (margin * 2);
    let y = margin;

    // --- Header ---
    try {
        doc.addImage(cintillo, 'PNG', margin, y, contentWidth, 20);
        y += 35;
    } catch (e) { y += 25; }

    // --- Título y Paciente ---
    doc.setFont('times', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(20, 40, 80);
    doc.text('INFORME DE SEGUIMIENTO Y ESTADÍSTICAS', pageWidth / 2, y, { align: 'center' });
    y += 10;

    // --- Borde de Página ---
    doc.setDrawColor(44, 62, 80);
    doc.setLineWidth(0.1);
    doc.rect(5, 5, pageWidth - 10, pageHeight - 10);

    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Paciente: ${paciente.nombre} ${paciente.apellido} (C.I: ${paciente.cedula})`, pageWidth / 2, y, { align: 'center' });
    y += 5;
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Fecha de Emisión: ${new Date().toLocaleDateString('es-VE')}`, pageWidth / 2, y, { align: 'center' });
    y += 15;

    // --- SECCIÓN 1: ESTADÍSTICAS GENERALES ---
    doc.setFillColor(240, 240, 240);
    doc.rect(margin, y, contentWidth, 25, 'F');
    doc.setDrawColor(200);
    doc.rect(margin, y, contentWidth, 25, 'S');

    const totalConsultas = consultas.length;
    const totalReposos = reposos.length;
    const totalSeguimientos = seguimientos.length;
    // Calcular total días reposo
    const totalDiasReposo = reposos.reduce((total, r) => total + (parseInt(r.dias_reposo) || 0), 0);

    let statY = y + 15;
    // Columna 1
    doc.setFont('helvetica', 'bold'); doc.setTextColor(20, 40, 80); doc.setFontSize(16);
    doc.text(totalConsultas.toString(), margin + 25, statY, { align: 'center' });
    doc.setFontSize(9); doc.setTextColor(80);
    doc.text('Consultas', margin + 25, statY + 5, { align: 'center' });

    // Columna 2
    doc.setFont('helvetica', 'bold'); doc.setTextColor(20, 40, 80); doc.setFontSize(16);
    doc.text(totalReposos.toString(), margin + 75, statY, { align: 'center' });
    doc.setFontSize(9); doc.setTextColor(80);
    doc.text('Reposos', margin + 75, statY + 5, { align: 'center' });

    // Columna 3
    doc.setFont('helvetica', 'bold'); doc.setTextColor(20, 40, 80); doc.setFontSize(16);
    doc.text(totalSeguimientos.toString(), margin + 125, statY, { align: 'center' });
    doc.setFontSize(9); doc.setTextColor(80);
    doc.text('Seguimientos', margin + 125, statY + 5, { align: 'center' });

    // Columna 4
    doc.setFont('helvetica', 'bold'); doc.setTextColor(220, 53, 69); doc.setFontSize(16);
    doc.text(totalDiasReposo.toString(), margin + 170, statY, { align: 'center' });
    doc.setFontSize(9); doc.setTextColor(80);
    doc.text('Días de Reposo', margin + 170, statY + 5, { align: 'center' });

    y += 35;

    // --- SECCIÓN 2: HISTÓRICO DE REPOSOS ---
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('HISTÓRICO DE REPOSOS', margin, y);
    y += 5;
    doc.setLineWidth(0.5);
    doc.setDrawColor(20, 40, 80);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;

    if (reposos.length > 0) {
        // Table Header
        doc.setFillColor(20, 40, 80);
        doc.rect(margin, y, contentWidth, 8, 'F');
        doc.setFontSize(9); doc.setTextColor(255); doc.setFont('helvetica', 'bold');
        doc.text('Código', margin + 2, y + 5.5);
        doc.text('Periodo', margin + 40, y + 5.5);
        doc.text('Duración', margin + 95, y + 5.5);
        doc.text('Estatus / Motivo Fin', margin + 130, y + 5.5);
        y += 8;

        doc.setTextColor(0); doc.setFont('helvetica', 'normal');
        reposos.forEach((repo, index) => {
            if (y > pageHeight - 30) {
                doc.addPage();
                y = margin + 10;
            }

            const fechaInicio = new Date(repo.fecha_inicio).toLocaleDateString('es-VE');
            const fechaFin = new Date(repo.fecha_fin).toLocaleDateString('es-VE');

            // Alternar color de fila
            if (index % 2 !== 0) {
                doc.setFillColor(245, 245, 245);
                doc.rect(margin, y, contentWidth, 8, 'F');
            }

            doc.text(repo.codigo || '-', margin + 2, y + 5);
            doc.text(`${fechaInicio} al ${fechaFin}`, margin + 40, y + 5);

            let duracion = `${repo.dias_reposo} días`;
            if (repo.hora_fin) duracion += ` (hasta ${repo.hora_fin})`;
            doc.text(duracion, margin + 95, y + 5);

            // Logic for "por qué lo sacaron" (observacion or status logic)
            let estadoInfo = repo.estado ? repo.estado.toUpperCase() : 'N/A';
            if (repo.estado === 'finalizado' && repo.observacion) {
                const obsShort = repo.observacion.length > 25 ? repo.observacion.substring(0, 22) + '...' : repo.observacion;
                estadoInfo += `: ${obsShort}`;
            }
            doc.text(estadoInfo, margin + 130, y + 5);

            y += 8;
        });
    } else {
        doc.setFontSize(10); doc.setTextColor(100); doc.setFont('helvetica', 'italic');
        doc.text('No hay reposos registrados.', margin, y + 5);
        y += 10;
    }

    y += 15;

    // --- SECCIÓN 3: CONSULTAS Y SUS SEGUIMIENTOS ---
    if (y > pageHeight - 40) { doc.addPage(); y = margin + 10; }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('CONSULTAS Y SEGUIMIENTOS ASOCIADOS', margin, y);
    y += 5;
    doc.setDrawColor(20, 40, 80);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    if (consultas.length > 0) {
        consultas.forEach((cons, i) => {
            if (y > pageHeight - 40) { doc.addPage(); y = margin + 10; }

            // Consultation Card Background
            doc.setFillColor(250, 250, 250);
            doc.setDrawColor(200);
            const cardStartY = y;
            doc.roundedRect(margin, y, contentWidth, 16, 2, 2, 'FD');

            // Date
            doc.setFontSize(10); doc.setTextColor(0); doc.setFont('helvetica', 'bold');
            const fechaCons = new Date(cons.fecha_atencion || cons.fecha_consulta || Date.now()).toLocaleDateString('es-VE');
            doc.text(`Consulta: ${fechaCons}`, margin + 5, y + 6);

            // Diagnosis
            doc.setFont('helvetica', 'normal'); doc.setFontSize(9);
            const diagCons = cons.diagnostico || 'Sin diagnóstico registrado';
            const diagText = diagCons.length > 90 ? diagCons.substring(0, 87) + '...' : diagCons;
            doc.text(`Diagnóstico: ${diagText}`, margin + 5, y + 11);

            y += 20; // Move well below the consultation card

            // Find related seguimientos
            const segsAsociados = seguimientos.filter(s => s.consulta_id === cons.id);

            if (segsAsociados.length > 0) {
                segsAsociados.forEach(seg => {
                    if (y > pageHeight - 25) { doc.addPage(); y = margin + 15; }

                    // Indentation guide
                    doc.setDrawColor(180);
                    doc.setLineWidth(0.2);
                    doc.line(margin + 12, y - 5, margin + 12, y + 5);

                    // Bullet & Date
                    doc.setFontSize(9); doc.setTextColor(20, 40, 80); doc.setFont('helvetica', 'bold');
                    const fechaSeg = new Date(seg.fecha_registro).toLocaleDateString('es-VE');
                    doc.text(`• Seguimiento (${fechaSeg})`, margin + 18, y);

                    // Observations
                    y += 4;
                    doc.setFontSize(9); doc.setTextColor(60); doc.setFont('helvetica', 'normal');
                    const obsSeg = seg.observaciones || seg.estado_clinico || 'Sin detalles';
                    const splitObs = doc.splitTextToSize(obsSeg, contentWidth - 50);
                    doc.text(splitObs, margin + 25, y);

                    y += (splitObs.length * 5) + 6;
                });
                y += 5;
            } else {
                doc.setFontSize(9); doc.setTextColor(150); doc.setFont('helvetica', 'italic');
                doc.text('Sin seguimientos registrados para esta consulta.', margin + 20, y);
                y += 12;
            }
        });
    } else {
        doc.setFontSize(10); doc.setTextColor(100); doc.setFont('helvetica', 'italic');
        doc.text('No se encontraron registros de consultas para generar la estadística completa.', margin, y);
    }

    // Footer
    const totalP = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalP; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(`Informe Estadístico - Página ${i} de ${totalP}`, pageWidth - 15, pageHeight - 10, { align: 'right' });
    }

    return doc.output('blob');
}


// ==================== FICHA INDIVIDUAL DE CONSULTA ====================
export function generateConsultaPDF(consulta) {
    const doc = new jsPDF({ format: 'letter', unit: 'mm' });

    // --- Configuración ---
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - (margin * 2);
    let y = margin;

    // --- Borde de Página ---
    doc.setDrawColor(44, 62, 80);
    doc.setLineWidth(0.1);
    doc.rect(5, 5, pageWidth - 10, pageHeight - 10);

    // --- Header (Cintillo) ---
    try {
        const imgWidth = contentWidth;
        const imgHeight = 22;
        doc.addImage(cintillo, 'PNG', margin, y, imgWidth, imgHeight);
        y += imgHeight + 10;
    } catch (e) {
        y += 20;
    }

    // --- Título Principal ---
    doc.setFont('times', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(20, 40, 80);
    doc.text('RESUMEN DE CONSULTA MÉDICA', pageWidth / 2, y, { align: 'center' });
    y += 6;

    // Código de Consulta
    doc.setFontSize(10);
    doc.setTextColor(100);
    const codigoConsulta = consulta.codigo || 'S/N';
    doc.text(`CÓDIGO DE CONTROL: ${codigoConsulta}`, pageWidth / 2, y, { align: 'center' });
    y += 10;

    // Línea decorativa
    doc.setDrawColor(20, 40, 80);
    doc.setLineWidth(0.8);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    // Helper para dibujar secciones
    const drawSectionHeader = (title) => {
        doc.setFillColor(20, 40, 80);
        doc.rect(margin, y, contentWidth, 7, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(255);
        doc.text(title, margin + 3, y + 5);
        y += 12;
        doc.setTextColor(0);
    };

    const drawTwoColRow = (label1, val1, label2, val2) => {
        doc.setFont('helvetica', 'bold'); doc.setFontSize(8); doc.setTextColor(80);
        doc.text(label1, margin + 2, y);
        doc.text(label2, pageWidth / 2 + 5, y);

        y += 5;
        doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.setTextColor(0);
        doc.text(String(val1 || 'N/A'), margin + 2, y);

        // Estatus color logic
        if (label2.toLowerCase().includes('estatus')) {
            const st = String(val2 || '').toLowerCase();
            if (st === 'realizada') doc.setTextColor(0, 100, 0);
            else if (st === 'pendiente') doc.setTextColor(200, 100, 0);
            else if (st === 'cancelada') doc.setTextColor(150, 0, 0);
        }
        doc.text(String(val2 || 'N/A').toUpperCase(), pageWidth / 2 + 5, y);
        doc.setTextColor(0);
        y += 8;
    };

    // === SECCIÓN: INFORMACIÓN GENERAL ===
    drawSectionHeader('I. INFORMACIÓN GENERAL DE LA ATENCIÓN');

    const pNombre = `${consulta.paciente_nombre || ''} ${consulta.paciente_apellido || ''}`.toUpperCase();
    const fAtencion = consulta.fecha_atencion_formatted ||
        (consulta.fecha_atencion ? new Date(consulta.fecha_atencion).toLocaleString('es-VE') : 'N/A');

    drawTwoColRow('PACIENTE:', pNombre, 'FECHA Y HORA:', fAtencion);
    drawTwoColRow('CÉDULA:', consulta.paciente_cedula, 'ESTATUS:', consulta.estatus);

    // === SECCIÓN: DIAGNÓSTICO Y TRATAMIENTO ===
    if (y > pageHeight - 80) { doc.addPage(); y = margin + 10; doc.rect(5, 5, pageWidth - 10, pageHeight - 10); }
    drawSectionHeader('II. DIAGNÓSTICO Y PLAN TERAPÉUTICO');

    if (consulta.enfermedad_nombre) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(150, 0, 0);
        doc.text(`PATOLOGÍA PRIMARIA: ${consulta.enfermedad_nombre.toUpperCase()}`, margin + 2, y);
        y += 8;
        doc.setTextColor(0);
    }

    doc.setFont('helvetica', 'bold'); doc.setFontSize(8); doc.setTextColor(80);
    doc.text('DESCRIPCIÓN CLÍNICA:', margin + 2, y);
    y += 5;
    doc.setFont('times', 'normal'); doc.setFontSize(10); doc.setTextColor(0);
    const splitDiag = doc.splitTextToSize(consulta.diagnostico || 'No especificado', contentWidth - 4);
    doc.text(splitDiag, margin + 4, y);
    y += (splitDiag.length * 5) + 8;

    doc.setFont('helvetica', 'bold'); doc.setFontSize(8); doc.setTextColor(80);
    doc.text('TRATAMIENTO INDICADO:', margin + 2, y);
    y += 5;
    doc.setFont('times', 'normal'); doc.setFontSize(10); doc.setTextColor(0);
    const splitTrat = doc.splitTextToSize(consulta.tratamientos || 'No especificado', contentWidth - 4);
    doc.text(splitTrat, margin + 4, y);
    y += (splitTrat.length * 5) + 10;

    // === SECCIÓN: MEDICAMENTOS ===
    if (consulta.medicamentos && consulta.medicamentos.length > 0) {
        if (y > pageHeight - 60) { doc.addPage(); y = margin + 10; doc.rect(5, 5, pageWidth - 10, pageHeight - 10); }
        drawSectionHeader('III. PRESCRIPCIÓN DE MEDICAMENTOS');

        autoTable(doc, {
            head: [['#', 'Medicamento', 'Presentación', 'Dosis / Concentración', 'Cant.']],
            body: consulta.medicamentos.map((m, idx) => [
                idx + 1,
                m.medicamento_nombre || 'N/A',
                m.medicamento_presentacion || '-',
                m.medicamentos_miligramos || '-',
                m.cantidad_utilizada || '-'
            ]),
            startY: y,
            theme: 'grid',
            styles: { fontSize: 8, font: 'helvetica' },
            headStyles: { fillColor: [240, 240, 240], textColor: 0, fontStyle: 'bold' }
        });
        y = doc.lastAutoTable.finalY + 12;
    }

    // === OBSERVACIONES ===
    if (consulta.observaciones) {
        if (y > pageHeight - 40) { doc.addPage(); y = margin + 10; doc.rect(5, 5, pageWidth - 10, pageHeight - 10); }
        drawSectionHeader('IV. OBSERVACIONES MÉDICAS ADICIONALES');
        doc.setFont('times', 'italic'); doc.setFontSize(9); doc.setTextColor(60);
        const splitObs = doc.splitTextToSize(consulta.observaciones, contentWidth - 4);
        doc.text(splitObs, margin + 4, y);
        y += (splitObs.length * 5) + 15;
    }

    // --- Nota de Importancia ---
    if (y > pageHeight - 30) { doc.addPage(); y = margin + 10; doc.rect(5, 5, pageWidth - 10, pageHeight - 10); }
    doc.setDrawColor(150, 0, 0);
    doc.rect(margin, y, contentWidth, 12);
    doc.setFont('helvetica', 'bold'); doc.setFontSize(7); doc.setTextColor(150, 0, 0);
    doc.text('AVISO:', margin + 2, y + 4);
    doc.setFont('helvetica', 'normal'); doc.setTextColor(0);
    doc.text('Este documento es un resumen clínico oficial. Siga las instrucciones del especialista.', margin + 2, y + 8);

    // === Footer ===
    const totalP = doc.internal.getNumberOfPages();
    const fGen = new Date().toLocaleString('es-VE');
    for (let i = 1; i <= totalP; i++) {
        doc.setPage(i);
        doc.setFontSize(7); doc.setTextColor(120);
        doc.text(`Consulta Médica - Yutong Venezuela • Generado: ${fGen}`, margin, pageHeight - 8);
        doc.text(`Página ${i} de ${totalP}`, pageWidth - margin, pageHeight - 8, { align: 'right' });
    }

    return doc.output('blob');
}

export function generateDoctorPDF(doctor) {
    const doc = new jsPDF({ format: 'letter', unit: 'mm' });

    // --- Configuración ---
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - (margin * 2);
    let y = margin;

    // --- Borde de Página (Fino y elegante) ---
    doc.setDrawColor(44, 62, 80); // Azul oscuro grisáceo
    doc.setLineWidth(0.1);
    doc.rect(5, 5, pageWidth - 10, pageHeight - 10);

    // --- Header (Cintillo) ---
    try {
        const imgWidth = contentWidth;
        const imgHeight = 22;
        doc.addImage(cintillo, 'PNG', margin, y, imgWidth, imgHeight);
        y += imgHeight + 10;
    } catch (e) {
        y += 20;
    }

    // --- Línea separadora decorativa ---
    doc.setDrawColor(20, 40, 80);
    doc.setLineWidth(0.8);
    doc.line(margin, y, pageWidth - margin, y);
    y += 12;

    // --- Título Principal ---
    doc.setFont('times', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(20, 40, 80);
    doc.text('FICHA DE REGISTRO PROFESIONAL', pageWidth / 2, y, { align: 'center' });
    y += 6;
    doc.setFontSize(10);
    doc.setFont('times', 'italic');
    doc.setTextColor(100);
    doc.text('Dirección de Salud y Seguridad Laboral - Yutong Venezuela S.A.', pageWidth / 2, y, { align: 'center' });
    y += 15;

    // === SECCIÓN 1: IDENTIFICACIÓN DEL PROFESIONAL ===
    doc.setFillColor(20, 40, 80);
    doc.rect(margin, y, contentWidth, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(255);
    doc.text('I. IDENTIFICACIÓN Y DATOS DE CONTACTO', margin + 3, y + 5);
    y += 12;

    doc.setTextColor(0);
    doc.setFontSize(10);

    // Tabla de Datos Personales
    const colLabels = margin + 2;
    const colValues = margin + 45;
    const rowHeight = 7;

    const drawRow = (label, value) => {
        doc.setFont('helvetica', 'bold');
        doc.text(label, colLabels, y);
        doc.setFont('helvetica', 'normal');
        doc.text(String(value || 'N/A'), colValues, y);
        y += rowHeight;
    };

    drawRow('Cédula de Identidad:', doctor.cedula);
    drawRow('Apellidos y Nombres:', `${doctor.nombre || ''} ${doctor.apellido || ''}`.trim());
    drawRow('Teléfono de Contacto:', doctor.contacto);
    drawRow('Correo Electrónico:', doctor.correo || 'No registrado');
    y += 5;

    // === SECCIÓN 2: INFORMACIÓN LABORAL Y ACADÉMICA ===
    doc.setFillColor(20, 40, 80);
    doc.rect(margin, y, contentWidth, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255);
    doc.text('II. PERFIL PROFESIONAL Y CARGO', margin + 3, y + 5);
    y += 12;

    doc.setTextColor(0);
    drawRow('Cargo Actual:', doctor.cargo_nombre);
    drawRow('Profesión / Área:', doctor.profesion_carrera);
    drawRow('Nivel Académico:', doctor.profesion_nivel);

    // Situación Administrativa (Estado)
    y += 3;
    doc.setFont('helvetica', 'bold');
    doc.text('Estatus Administrativo:', colLabels, y);
    const activo = doctor.estado === true || doctor.estado === 'true';
    doc.setFont('helvetica', 'bold');
    if (activo) {
        doc.setTextColor(0, 100, 0); // Verde oscuro formal
        doc.text('VIGENTE / ACTIVO', colValues, y);
    } else {
        doc.setTextColor(150, 0, 0); // Rojo oscuro formal
        doc.text('NO VIGENTE / INACTIVO', colValues, y);
    }
    doc.setTextColor(0);
    y += 15;

    // === SECCIÓN 3: HISTORIAL DE REGISTRO ===
    doc.setFillColor(20, 40, 80);
    doc.rect(margin, y, contentWidth, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255);
    doc.text('III. TRAZABILIDAD DEL REGISTRO', margin + 3, y + 5);
    y += 12;

    doc.setTextColor(0);
    const formatDate = (date) => date ? new Date(date).toLocaleString('es-VE', {
        day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
    }) : 'N/A';

    drawRow('Fecha de Inscripción:', formatDate(doctor.created_at));
    drawRow('Última Sincronización:', formatDate(doctor.updated_at));

    y += 15;

    // --- Bloque de Validez ---
    doc.setFont('times', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(80);
    const legalText = "La presente ficha profesional es un documento de uso interno de Yutong Venezuela S.A. La veracidad de la información contenida en este registro ha sido validada por el departamento de recursos humanos y el servicio médico correspondiente.";
    const splitLegal = doc.splitTextToSize(legalText, contentWidth - 40);
    doc.text(splitLegal, pageWidth / 2, y + 5, { align: 'center' });

    // --- Firmas ---
    y = pageHeight - 30;
    doc.setDrawColor(44, 62, 80);
    doc.setLineWidth(0.5);
    doc.line(margin + 10, y, margin + 60, y);
    doc.line(pageWidth - margin - 60, y, pageWidth - margin - 10, y);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('FIRMA DEL PROFESIONAL', margin + 35, y + 5, { align: 'center' });
    doc.text('SELLO Y FIRMA AUTORIZADA', pageWidth - margin - 35, y + 5, { align: 'center' });

    // --- Footer ---
    const footerY = pageHeight - 12;
    doc.setDrawColor(20, 40, 80);
    doc.setLineWidth(0.5);
    doc.line(margin, footerY - 2, pageWidth - margin, footerY - 2);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(120);
    const fechaGen = new Date().toLocaleString('es-VE');
    doc.text(`Expediente Digital: ${doctor.cedula || 'N/A'}`, margin, footerY + 3);
    doc.text(`Página 1 de 1`, pageWidth / 2, footerY + 3, { align: 'center' });
    doc.text(`Generado el: ${fechaGen}`, pageWidth - margin, footerY + 3, { align: 'right' });

    return doc.output('blob');
}

// ==================== HISTORIAL DE MEDICAMENTOS UTILS ====================

export function generateHistorialMedicamentosPDF({ paciente, medicamentos }) {
    const doc = new jsPDF({ format: 'letter', unit: 'mm' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    let y = margin;

    // Header
    try {
        const imgWidth = pageWidth - (margin * 2);
        const imgHeight = 20;
        doc.addImage(cintillo, 'PNG', margin, y, imgWidth, imgHeight);
        y += imgHeight + 10;
    } catch (e) {
        y += 20;
    }

    // Título
    doc.setFont('times', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(20, 40, 80);
    doc.text('HISTORIAL DE MEDICAMENTOS SUMINISTRADOS', pageWidth / 2, y, { align: 'center' });
    y += 10;

    // Borde de Página
    doc.setDrawColor(44, 62, 80);
    doc.setLineWidth(0.1);
    doc.rect(5, 5, pageWidth - 10, pageHeight - 10);

    // Datos Paciente
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.text(`Paciente: ${paciente.nombre} ${paciente.apellido}`.toUpperCase(), margin, y);
    doc.text(`C.I: ${paciente.cedula}`, margin + 120, y);
    y += 10;

    // Tabla
    const columns = [
        { header: 'Fecha', dataKey: 'fecha' },
        { header: 'Cód. Consulta', dataKey: 'codigo' },
        { header: 'Medicamento', dataKey: 'medicamento' },
        { header: 'Presentación', dataKey: 'presentacion' },
        { header: 'Cant.', dataKey: 'cantidad' },
        { header: 'Patología', dataKey: 'enfermedad' },
    ];

    const body = medicamentos.map(m => ({
        fecha: new Date(m.fecha).toLocaleDateString('es-VE'),
        codigo: m.consulta_codigo || 'N/A',
        medicamento: m.medicamento,
        presentacion: m.presentacion || '-',
        cantidad: m.cantidad,
        enfermedad: m.enfermedad || '-'
    }));

    autoTable(doc, {
        startY: y,
        head: [columns.map(c => c.header)],
        body: body.map(row => columns.map(c => row[c.dataKey])),
        theme: 'grid',
        headStyles: { fillColor: [20, 40, 80], textColor: 255 },
        styles: { fontSize: 9 },
        margin: { left: margin, right: margin }
    });

    // Footer
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(`Generado el ${new Date().toLocaleDateString('es-VE')}`, margin, pageHeight - 10);
        doc.text(`Página ${i} de ${totalPages}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
    }

    return doc.output('blob');
}


// ==================== REPORTE DE INVENTARIO ACTUAL ====================
export function generateInventarioPDF(medicamentos) {
    const doc = new jsPDF({ format: 'letter', unit: 'mm' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    let y = margin;

    // Header
    try {
        doc.addImage(cintillo, 'PNG', margin, y, pageWidth - (margin * 2), 20);
        y += 30;
    } catch (e) { y += 20; }

    // Título
    doc.setFont('times', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(20, 40, 80);
    doc.text('REPORTE DE INVENTARIO ACTUAL - FARMACIA', pageWidth / 2, y, { align: 'center' });
    y += 8;

    // Borde de Página
    doc.setDrawColor(44, 62, 80);
    doc.setLineWidth(0.1);
    doc.rect(5, 5, pageWidth - 10, pageHeight - 10);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Fecha de Emisión: ${new Date().toLocaleString('es-VE')}`, pageWidth / 2, y, { align: 'center' });
    y += 10;

    const columns = [
        { header: 'Medicamento', dataKey: 'nombre' },
        { header: 'Presentación', dataKey: 'presentacion' },
        { header: 'Miligramos', dataKey: 'miligramos' },
        { header: 'Stock', dataKey: 'cantidad' },
        { header: 'Estatus', dataKey: 'estatus' }
    ];

    const body = medicamentos.map(m => ({
        nombre: m.nombre,
        presentacion: m.presentacion || '-',
        miligramos: m.miligramos || '-',
        cantidad: m.cantidad_disponible,
        estatus: (m.estatus || 'disponible').toUpperCase()
    }));

    autoTable(doc, {
        startY: y,
        head: [columns.map(c => c.header)],
        body: body.map(row => columns.map(c => row[c.dataKey])),
        theme: 'grid',
        headStyles: { fillColor: [20, 40, 80], textColor: 255, fontSize: 10 },
        styles: { fontSize: 9 },
        didDrawCell: (data) => {
            if (data.section === 'body' && data.column.index === 4) {
                const estatus = data.cell.raw;
                if (estatus === 'AGOTADO') doc.setTextColor(200, 0, 0);
                else if (estatus === 'EXISTENCIA BAJA') doc.setTextColor(255, 140, 0);
                else doc.setTextColor(0, 128, 0);
            }
        },
        margin: { left: margin, right: margin }
    });

    return doc.output('blob');
}

// ==================== KÁRDEX DE MOVIMIENTOS ====================
export function generateKardexPDF(movimientos) {
    const doc = new jsPDF({ format: 'letter', unit: 'mm' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    let y = margin;

    // Header
    try {
        doc.addImage(cintillo, 'PNG', margin, y, pageWidth - (margin * 2), 20);
        y += 30;
    } catch (e) { y += 20; }

    // Título
    doc.setFont('times', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(20, 40, 80);
    doc.text('KÁRDEX DE MOVIMIENTOS DE INVENTARIO', pageWidth / 2, y, { align: 'center' });
    y += 8;

    // Borde de Página
    doc.setDrawColor(44, 62, 80);
    doc.setLineWidth(0.1);
    doc.rect(5, 5, pageWidth - 10, pageHeight - 10);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generado: ${new Date().toLocaleString('es-VE')}`, pageWidth / 2, y, { align: 'center' });
    y += 10;

    autoTable(doc, {
        startY: y,
        head: [['Fecha', 'Tipo', 'Cant.', 'Medicamento', 'Usuario', 'Motivo']],
        body: movimientos.map(m => [
            new Date(m.fecha).toLocaleDateString('es-VE'),
            (m.tipo_movimiento || '').toUpperCase(),
            m.cantidad,
            m.medicamento,
            m.usuario || 'Sistema',
            m.motivo || '-'
        ]),
        theme: 'striped',
        headStyles: { fillColor: [20, 40, 80], textColor: 255 },
        styles: { fontSize: 8 },
        didDrawCell: (data) => {
            if (data.section === 'body' && data.column.index === 1) {
                if (data.cell.raw === 'ENTRADA') doc.setTextColor(0, 128, 0);
                else doc.setTextColor(200, 0, 0);
            }
        },
        margin: { left: margin, right: margin }
    });

    return doc.output('blob');
}

// ==================== REPORTE EPIDEMIOLÓGICO (MORBILIDAD) ====================
export function generateEpidemiologicoPDF(data) {
    const { patologias, totalConsultas, periodo } = data;
    const doc = new jsPDF({ format: 'letter', unit: 'mm' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    let y = margin;

    // Header
    try {
        doc.addImage(cintillo, 'PNG', margin, y, pageWidth - (margin * 2), 20);
        y += 30;
    } catch (e) { y += 20; }

    // Título
    doc.setFont('times', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(20, 40, 80);
    doc.text('REPORTE EPIDEMIOLÓGICO DE MORBILIDAD', pageWidth / 2, y, { align: 'center' });
    y += 8;

    // Borde de Página
    doc.setDrawColor(44, 62, 80);
    doc.setLineWidth(0.1);
    doc.rect(5, 5, pageWidth - 10, pageHeight - 10);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Periodo: ${periodo || 'Histórico General'}`, pageWidth / 2, y, { align: 'center' });
    y += 10;

    // Resumen General
    doc.setFillColor(240, 240, 240);
    doc.rect(margin, y, pageWidth - (margin * 2), 12, 'F');
    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.text(`Total de Consultas Atendidas en el Periodo: ${totalConsultas}`, margin + 5, y + 8);
    y += 18;

    // Tabla de Patologías
    autoTable(doc, {
        startY: y,
        head: [['#', 'Patología / Enfermedad', 'Frecuencia (Casos)', 'Prevalencia (%)']],
        body: patologias.map((p, i) => [
            i + 1,
            p.nombre.toUpperCase(),
            p.cantidad,
            `${((p.cantidad / totalConsultas) * 100).toFixed(2)}%`
        ]),
        theme: 'grid',
        headStyles: { fillColor: [20, 40, 80], textColor: 255 },
        columnStyles: {
            0: { cellWidth: 10 },
            1: { cellWidth: 100 },
            2: { cellWidth: 40, halign: 'center' },
            3: { cellWidth: 35, halign: 'center' }
        },
        margin: { left: margin, right: margin }
    });

    return doc.output('blob');
}

// ==================== REPORTE DE AUSENTISMO POR DEPARTAMENTO ====================
export function generateAusentismoPDF(data) {
    const { departamentos, totalDiasGlobal, periodo } = data;
    const doc = new jsPDF({ format: 'letter', unit: 'mm' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    let y = margin;

    // Header
    try {
        doc.addImage(cintillo, 'PNG', margin, y, pageWidth - (margin * 2), 20);
        y += 30;
    } catch (e) { y += 20; }

    // Título
    doc.setFont('times', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(20, 40, 80);
    doc.text('REPORTE DE AUSENTISMO LABORAL (REPOSOS)', pageWidth / 2, y, { align: 'center' });
    y += 8;

    // Borde de Página
    doc.setDrawColor(44, 62, 80);
    doc.setLineWidth(0.1);
    doc.rect(5, 5, pageWidth - 10, pageHeight - 10);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Análisis por Departamento - Periodo: ${periodo || 'Todo'}`, pageWidth / 2, y, { align: 'center' });
    y += 10;

    autoTable(doc, {
        startY: y,
        head: [['Departamento / Unidad', 'N° Pacientes en Reposo', 'Total Días Acumulados', 'Impacto (%)']],
        body: departamentos.map(d => [
            d.nombre.toUpperCase(),
            d.cantidad_pacientes,
            d.total_dias,
            `${((d.total_dias / totalDiasGlobal) * 100).toFixed(2)}%`
        ]),
        theme: 'striped',
        headStyles: { fillColor: [20, 40, 80], textColor: 255 },
        styles: { fontSize: 9 },
        margin: { left: margin, right: margin }
    });

    return doc.output('blob');
}

// ==================== REPORTE DE PRODUCTIVIDAD MÉDICA ====================
export function generateProductividadPDF(data) {
    const { doctores, periodo } = data;
    const doc = new jsPDF({ format: 'letter', unit: 'mm' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    let y = margin;

    // Header
    try {
        doc.addImage(cintillo, 'PNG', margin, y, pageWidth - (margin * 2), 20);
        y += 35;
    } catch (e) { y += 25; }

    // Título
    doc.setFont('times', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(20, 40, 80);
    doc.text('REPORTE DE PRODUCTIVIDAD Y EFICIENCIA MÉDICA', pageWidth / 2, y, { align: 'center' });
    y += 8;

    // Borde de Página
    doc.setDrawColor(44, 62, 80);
    doc.setLineWidth(0.1);
    doc.rect(5, 5, pageWidth - 10, pageHeight - 10);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Periodo: ${periodo || 'Histórico'}`, pageWidth / 2, y, { align: 'center' });
    y += 10;

    autoTable(doc, {
        startY: y,
        head: [['Médico', 'Citas Prog.', 'Citas Realizadas', 'Citas Canceladas', 'Eficiencia (%)']],
        body: doctores.map(d => [
            `${d.nombre} ${d.apellido}`.toUpperCase(),
            d.total_programadas,
            d.total_realizadas,
            d.total_canceladas,
            `${((d.total_realizadas / (d.total_programadas || 1)) * 100).toFixed(1)}%`
        ]),
        theme: 'grid',
        headStyles: { fillColor: [20, 40, 80], textColor: 255 },
        styles: { fontSize: 8 },
        margin: { left: margin, right: margin }
    });

    return doc.output('blob');
}

// ==================== REPORTE DE AUDITORÍA (BITÁCORA) ====================
export function generateAuditoriaPDF(registros) {
    const doc = new jsPDF({ format: 'letter', orientation: 'landscape', unit: 'mm' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 10;
    let y = margin;

    // Header simple para landscape
    doc.setFont('times', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(20, 40, 80);
    doc.text('REPORTE DE AUDITORÍA DE SISTEMA (BITÁCORA)', margin, y + 10);

    // Borde de Página
    doc.setDrawColor(44, 62, 80);
    doc.setLineWidth(0.1);
    doc.rect(5, 5, pageWidth - 10, pageHeight - 10);
    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.text(`Fecha de Reporte: ${new Date().toLocaleString('es-VE')}`, margin, y + 15);
    y += 20;

    autoTable(doc, {
        startY: y,
        head: [['Fecha/Hora', 'Usuario', 'Acción', 'Tabla', 'Descripción']],
        body: registros.map(r => [
            new Date(r.fecha).toLocaleString('es-VE'),
            r.usuario,
            r.accion.toUpperCase(),
            r.tabla.toUpperCase(),
            r.descripcion
        ]),
        theme: 'striped',
        headStyles: { fillColor: [20, 40, 80], textColor: 255 },
        styles: { fontSize: 7, overflow: 'linebreak' },
        columnStyles: {
            0: { cellWidth: 35 },
            1: { cellWidth: 25 },
            2: { cellWidth: 25 },
            3: { cellWidth: 25 },
            4: { cellWidth: 'auto' }
        },
        margin: { left: margin, right: margin }
    });

    return doc.output('blob');
}
