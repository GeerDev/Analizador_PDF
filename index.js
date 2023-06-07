const fs = require('fs');

const { PDFDocument } = require('pdf-lib');

async function analizarMetadatosPDF(rutaArchivo) {
  const archivoPDF = await PDFDocument.load(fs.readFileSync(rutaArchivo));
  const { major, minor } = archivoPDF.getForm().doc.context.header;

  console.log('--------------------------------------------------------------------------------------------------------------------')
  console.log('Name:', rutaArchivo)
  //console.log('Funciones disponibles en archivoPDF:', Object.keys(archivoPDF.__proto__).filter(key => typeof archivoPDF[key] === 'function'));
  console.log('Title:', archivoPDF.getTitle())
  console.log('Author:', archivoPDF.getAuthor())
  console.log('Subject:', archivoPDF.getSubject())
  console.log('Creator:', archivoPDF.getCreator())
  console.log('Keywords:', archivoPDF.getKeywords())
  console.log('Producer:', archivoPDF.getProducer())
  console.log('Creation Date:', archivoPDF.getCreationDate())
  console.log('Modification Date:', archivoPDF.getModificationDate())
  console.log('Version:', `${major}.${minor}`)
  console.log('--------------------------------------------------------------------------------------------------------------------')
}

const directorio = 'repositorio_pdfs';

fs.readdir(directorio, (error, archivos) => {
  if (error) {
    console.error('Error al leer el directorio:', error);
    return;
  }

  console.log('Archivos en el directorio:', archivos);
  archivos.forEach(archivo => analizarMetadatosPDF(`${directorio}/${archivo}`))
});
