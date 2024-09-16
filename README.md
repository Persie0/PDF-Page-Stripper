# PDF Page Stripper

**PDF Page Stripper** is a simple web-based tool that processes PDF files by removing pages that are considered redundant, specifically those that contain all the words from the previous page. This is particularly useful for cleaning up presentations or documents where slides/pages incrementally build on the previous ones. 

Live Demo: [PDF Page Stripper](https://persie0.github.io/PDF-Page-Stripper/)

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

## Project Overview

This tool is implemented in **pure HTML and JavaScript**, making it lightweight and easy to deploy on static hosting environments (like GitHub Pages).

- **HTML/CSS**: For the interface and layout.
- **JavaScript**: Handles all the logic for PDF processing using libraries like [PDF.js](https://mozilla.github.io/pdf.js/) for reading PDF content and [PDF-Lib](https://pdf-lib.js.org/) for creating the modified PDFs.

### Idea and Inspiration

This project was inspired by [pdf-page-stripper](https://github.com/fsinf/pdf-page-stripper) on GitHub. The original idea of stripping redundant pages from PDFs has been simplified and adapted for web usage with a focus on accessibility and ease of use.

## How to Use

1. Open the [PDF Page Stripper web app](https://persie0.github.io/PDF-Page-Stripper/).
2. Select one or more PDF files by clicking on the file input.
3. Click "Process PDFs" to start analyzing the documents.
4. After processing, a "Download Processed PDFs" button will appear. Click it to download a ZIP file containing the cleaned PDFs.

## Development and Contributions

Feel free to contribute to the project by forking the repository and submitting pull requests. We welcome improvements to the core functionality, user interface, and documentation.

### Tools and Libraries Used:

- [PDF.js](https://github.com/mozilla/pdf.js): A popular open-source PDF rendering library used to extract text content from PDFs.
- [PDF-Lib](https://pdf-lib.js.org/): A powerful library used to manipulate and create new PDFs.
- [JSZip](https://stuk.github.io/jszip/): A library used for generating ZIP files that bundle the processed PDFs together.

---

This project is maintained and open to collaboration. Please create an issue if you encounter any bugs or have feature requests!
