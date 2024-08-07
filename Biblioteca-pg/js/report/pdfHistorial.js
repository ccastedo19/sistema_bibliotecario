document.getElementById('downloadPdf').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Título del documento
    doc.setFontSize(18);
    doc.text('Historial de Reservas', 14, 22);

    // Información del estudiante
    const ci = document.getElementById('studentCi').innerText;
    const nombreCompleto = document.getElementById('studentName').innerText;
    doc.setFontSize(12);
    doc.text(`CI: ${ci}`, 14, 30);
    doc.text(`Nombre Completo: ${nombreCompleto}`, 14, 36);

    // Obtener la tabla de reservas
    const res = doc.autoTableHtmlToJson(document.getElementById('reservaTable'));
    
    // Generar la tabla en el PDF
    doc.autoTable({
        startY: 40,
        head: [res.columns],
        body: res.data,
        styles: { fontSize: 10 }
    });

    // Descargar el PDF
    doc.save('HistorialReservas.pdf');
});
