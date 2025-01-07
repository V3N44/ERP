import { Document, Packer, Paragraph, TextRun } from 'docx';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const generateDocx = async (content: string, filename: string) => {
  const doc = new Document({
    sections: [{
      properties: {},
      children: content.split('\n').map(line => 
        new Paragraph({
          children: [new TextRun({ text: line })]
        })
      )
    }]
  });

  const blob = await Packer.toBlob(doc);
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${filename}.docx`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

export const generatePDF = (content: string, filename: string) => {
  const lines = content.split('\n');
  const docDefinition = {
    content: lines.map(line => ({
      text: line,
      margin: [0, 2]
    })),
    defaultStyle: {
      fontSize: 10
    }
  };

  pdfMake.createPdf(docDefinition).download(`${filename}.pdf`);
};