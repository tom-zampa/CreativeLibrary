main();

function main() {
        
var importFolder = new Folder;
importFolder = Folder.selectDialog ("Please select a folder to import");

if(importFolder == null) {
        alert("No folder selected", "Please run again");
        return false;
    }

var files = importFolder.getFiles();

if(files.length < 1) {
        alert("No files are detected", "Please select a valid folder");
        main();
    }

var videoFiles = getVideoPaths(files);

if(videoFiles.length < 1) {
        alert("No video files in this folder");
        main();
    }

var frames = prompt("Added frames per clip", 10, "");

var project = app.project;
var projectItem = project.rootItem;

project.importFiles(videoFiles);

var clipFolder = projectItem.createBin("Clip Folder");

// project.createClipSequences(projectItem);

}


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

function getVideoProjectItems(projectItem) {
        var thisName;
        var projectClips = [];
        
        for(var i = 0; i < projectItem.children.numItem; i++) {
                thisName = project.item.children[i].name;
                if(thisName.substring(thisName.length - 3, thisName.length).toLowerCase() == "mov") {
                        projectClips.push(projectItem.children[i]);
                    }
            }    
        return projectClips;
    }

function createClipSequences(projectItem) {
        var thisName;
        var sequenceTitles = [];
        
        for(var i = 0; i < sequenceTitles.length; i++) {
                thisName = project.item.children[i].name;
                if(thisName.substring(thisName.length - 3, thisName.length).toLowerCase() == "mov") {
                        // project.createNewSequence("`${thisName}`", "xxx");
                    }
            }
        return sequenceTitles;
    }