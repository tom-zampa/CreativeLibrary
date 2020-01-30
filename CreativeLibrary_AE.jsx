﻿app.beginUndoGroup("Automate CL Specs");

var importFolder = new Folder;
importFolder = Folder.selectDialog ("Please select a folder to import");

if(importFolder == null) {
        alert("No folder selected", "Please run again");
    }

var files = importFolder.getFiles();

if(files.length < 1) {
        alert("No files are detected", "Please select a valid folder");
    }

var videoFiles = getVideoPaths(files);

if(videoFiles.length < 1) {
        alert("No video files in this folder");
    }

var importOptions = new ImportOptions();
var importedLayers = new Array();

var numFiles = files.length;
var numVideo = 0;
var videoArray = new Array();

for(var i = 0; i < files.length; i++) {
    importOptions.file = files[i];
    importedLayers.push(app.project.importFile(importOptions));
}

for(var e = 1; e <= app.project.numItems; e++) {
    if(app.project.item(e).hasVideo == true) {
        numVideo ++;
        videoArray.push(app.project.item(e));
    }        
}

for(var u = 0; u < videoArray.length; u++){
    var myComp = app.project.items.addComp(videoArray[u].name, videoArray[u].width, videoArray[u].height, videoArray[u].pixelAspect,videoArray[u].duration, videoArray[u].frameRate);
    var newObj = myComp.layers.add(videoArray[u]);

    newObj.Output += 10;

    var myRender = app.project.renderQueue.items.add(myComp);
}

app.endUndoGroup();

function getVideoPaths(files) {
        var thisName;
        var paths = [];
    
        for(var i = 0; i < files.length; i++) {
                thisName = files[i].name;
                if(thisName.substring(thisName.length - 3, thisName.length).toLowerCase() == "mov") {
                        paths.push(files[i].fsName);
                    }
            } 
        return paths;
    }