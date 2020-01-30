app.beginUndoGroup("Automate CL Specs");

var importFolder = new importFolder;
importFolder = Folder.selectDialog("Please select folder to import");

if(importFolder == null) {
    alert("No folder selected", "Please run again");
    return false;
}

var importOptions = new importOptions();
var importedLayers = new Array();

var files = importFolder.getFiles("*.mov");
var numFiles = files.length;
var numVideo = 0;
var videoArray = [];

for(var i = 0; i < files.length; i++) {
    importOptions.file = files[i];
    importedLayers.push(app.project.importFile(importOptions));
}

app.endUndoGroup();