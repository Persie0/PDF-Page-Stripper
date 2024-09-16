# PDF Page Stripper

**PDF Page Stripper** is a simple web-based tool that processes PDF files by removing pages that are considered redundant, specifically those that contain all the words from the previous page. This is particularly useful for cleaning up presentations or documents where slides/pages incrementally build on the previous ones. 

Live Demo: [PDF Page Stripper](https://persie0.github.io/PDF-Page-Stripper/)

## How to Use

1. Open the [PDF Page Stripper web app](https://persie0.github.io/PDF-Page-Stripper/).
2. Select one or more PDF files by clicking on the file input.
3. Click "Process PDFs" to start analyzing the documents.
4. After processing, a "Download Processed PDFs" button will appear. Click it to download a ZIP file containing the cleaned PDFs.

## How It Works

1. **Upload PDF Files**: You can upload one or more PDF files using the file input field.
2. **Page Comparison**: The tool extracts text from each page and compares it to the previous page. If the current page contains all the words from the previous page, the previous page is considered redundant and is removed.
3. **Download Processed PDFs**: After processing, you can download the modified PDFs, which only retain the relevant pages. The result is available as a downloadable ZIP file containing all processed PDFs.

## Features

- **Multi-file support**: You can upload multiple PDF files at once, and each will be processed individually.
- **Text-based analysis**: The comparison is based purely on the text content of each page.
- **No external dependencies**: This tool is built entirely with HTML, JavaScript, and PDF libraries like [PDF.js](https://github.com/mozilla/pdf.js) and [PDF-Lib](https://pdf-lib.js.org/).
- **Progress Indicator**: A progress bar is displayed while the PDFs are being processed, indicating the status of the operation.
- **Results Summary**: For each PDF, the tool provides a breakdown of total pages, pages kept, and pages removed, along with a visual representation of the page retention.

### Idea and Inspiration

This project was inspired by [pdf-page-stripper](https://github.com/fsinf/pdf-page-stripper) on GitHub. But for me, the original often works "too good" and removes more than it should.

