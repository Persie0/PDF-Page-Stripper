pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.worker.min.js';

const downloadBtn = document.getElementById('downloadBtn');
const progressBar = document.querySelector('.progress-bar');
const progress = document.querySelector('.progress');
const pdfCreationStatus = document.getElementById('pdfCreationStatus');
const resultSeparator = document.getElementById('resultSeparator');

let processedPDFs = [];

async function processFiles() {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;
    if (files.length === 0) {
        alert('Please select at least one PDF file.');
        return;
    }

    progressBar.style.display = 'block';
    downloadBtn.style.display = 'none';
    pdfCreationStatus.textContent = 'Processing PDFs...';

    processedPDFs = [];
    let outputHtml = '';

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const result = await processPDF(file);
        processedPDFs.push({ name: `stripped_${file.name}`, pdf: result.pdf });
        outputHtml += result.html;

        progress.style.width = `${((i + 1) / files.length) * 100}%`;
    }

    document.getElementById('output').innerHTML = outputHtml;
    progress.style.width = '0%';
    progressBar.style.display = 'none';
    pdfCreationStatus.textContent = 'All PDFs processed successfully!';
    resultSeparator.style.display = 'block';
    downloadBtn.style.display = 'inline-block';
}

async function processPDF(file) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
    const numPages = pdf.numPages;
    let pagesToKeep = [];
    let allPages = [];

    const wordComparisonMode = document.getElementById('wordComparisonMode').checked;

    function getWords(text) {
        return text.toLowerCase().match(/\b\w+\b/g) || [];
    }

    function includesAllWords(newText, existingText) {
        const newWords = new Set(getWords(newText));
        const existingWords = new Set(getWords(existingText));
        for (let word of existingWords) {
            if (!newWords.has(word)) {
                return false;
            }
        }
        return true;
    }

    function includesContent(currentText, previousText) {
        const currentWords = new Set(currentText.toLowerCase().split(/\s+/));
        const previousWords = new Set(previousText.toLowerCase().split(/\s+/));
        for (let word of previousWords) {
            if (!currentWords.has(word)) {
                return false;
            }
        }
        return true;
    }

    for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        allPages.push({ pageNumber: i, text: pageText });
        
        if (pagesToKeep.length === 0 || 
            (wordComparisonMode && !includesAllWords(pageText, pagesToKeep[pagesToKeep.length - 1].text)) ||
            (!wordComparisonMode && !includesContent(pageText, pagesToKeep[pagesToKeep.length - 1].text))) {
            pagesToKeep.push({ pageNumber: i, text: pageText });
        } else {
            pagesToKeep.pop();
            pagesToKeep.push({ pageNumber: i, text: pageText });
        }
    }

    const processedPDF = await createProcessedPDF(file, pagesToKeep);
    const html = displayResults(file.name, pagesToKeep, allPages);
    return { pdf: processedPDF, html: html };
}


function displayResults(fileName, pagesToKeep, allPages) {
    const keptPageNumbers = new Set(pagesToKeep.map(p => p.pageNumber));
    const removedPages = allPages.length - pagesToKeep.length;
    const comparisonMode = document.getElementById('wordComparisonMode').checked ? 'Word' : 'Full text';
    
    let html = `<h2>${fileName}</h2>`;
    html += `
        <div class="results-summary">
            <div>
                <h3>Total Pages</h3>
                <p>${allPages.length}</p>
            </div>
            <div>
                <h3>Pages Kept</h3>
                <p>${pagesToKeep.length}</p>
            </div>
            <div>
                <h3>Pages Removed</h3>
                <p>${removedPages}</p>
            </div>
            <div>
                <h3>Comparison Mode</h3>
                <p>${comparisonMode}</p>
            </div>
        </div>
    `;
    html += `<h3>Page breakdown:</h3>`;
    html += `<div class="pages-list">`;
    for (let page of allPages) {
        const chipClass = keptPageNumbers.has(page.pageNumber) ? 'page-kept' : 'page-removed';
        html += `<span class="page-chip ${chipClass}">Page ${page.pageNumber}</span>`;
    }
    html += `</div>`;
    
    return html;
}

async function createProcessedPDF(file, pagesToKeep) {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
    const newPdfDoc = await PDFLib.PDFDocument.create();

    for (const page of pagesToKeep) {
        const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [page.pageNumber - 1]);
        newPdfDoc.addPage(copiedPage);
    }

    return await newPdfDoc.save();
}

async function downloadProcessedPDFs() {
    if (processedPDFs.length === 1) {
        pdfCreationStatus.textContent = 'Creating PDF...';
        await new Promise(resolve => setTimeout(resolve, 100));
        const pdfFile = processedPDFs[0];
        download(pdfFile.pdf, pdfFile.name, 'application/pdf');
        pdfCreationStatus.textContent = 'PDF downloaded successfully!';
    } else {
        pdfCreationStatus.textContent = 'Creating ZIP file...';
        await new Promise(resolve => setTimeout(resolve, 100));
        const zip = new JSZip();

        for (const pdfFile of processedPDFs) {
            zip.file(pdfFile.name, pdfFile.pdf);
        }

        const content = await zip.generateAsync({ type: 'blob' });
        download(content, 'processed_pdfs.zip', 'application/zip');
        pdfCreationStatus.textContent = 'ZIP file downloaded successfully!';
    }
}

function showInfo() {
    document.getElementById('infoModal').style.display = 'block';
}

function closeInfo() {
    document.getElementById('infoModal').style.display = 'none';
}