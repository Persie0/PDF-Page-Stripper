# PDF Page Stripper

Enhance your study materials by removing redundant slides with PDF Page Stripper.

[Live Demo](https://persie0.github.io/PDF-Page-Stripper/)

<img src="images/screenshot.jpg" alt="PDF Page Stripper Screenshot" style="max-width: 600px; width: 100%;" />

## Features

- Remove incrementally built slides, keeping only the final versions
- Process multiple PDFs simultaneously
- Choose between word and full text comparison modes
- Drag and drop support for easy file uploading
- Detailed results summary for each processed PDF

## How to Use

1. Visit the [web app](https://persie0.github.io/PDF-Page-Stripper/)
2. Upload PDFs by clicking the file input or dragging and dropping files
3. Select comparison mode:
   - Word comparison (default): Strips more pages
   - Full text comparison: Strips fewer pages
4. Click "Process PDFs"
5. Download the cleaned PDFs as a ZIP file

## How It Works

1. Extract content from each PDF page
2. Compare current page with the previous page
3. Remove previous page if current page contains all its content
4. Retain only relevant pages in the final PDF

## Inspiration

This project was inspired by [pdf-page-stripper](https://github.com/fsinf/pdf-page-stripper), which for my taste often removes too many slides.