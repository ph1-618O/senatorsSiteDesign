//Credit Keith Gilbert
Main ();

function Main(){
    if (app.documents.length > 0){
        var inDesign = app.activeDocument;
        var docName = decodeURI(inDesign.fullName);
        var inDesignName = docName.substring(0, docName.lastIndexOf("."));
        with (inDesign.htmlFXLExportPreferences){
            epubPageRangeFormat = PageRangeFormat.EXPORT_ALL_PAGES
            epubPageRangeFormat = PageRangeFormat.EXPORT_PAGE_RANGE
            epubPageRange = "1-2";
        }
        inDesign.exportFile(ExportFormat.HTMLFXL, new File(inDesignName + ".html"), true);
    }
    else{
        alert("No InDesign documents are opem, please open a document and try again.");
    }
};

