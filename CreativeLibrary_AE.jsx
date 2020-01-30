main();

function main() {

    // Prompt user to input --> Folder Selection

    var importFolder = new importFolder;
    importFolder = Folder.selectDialog("Select a folder to import");

    if(importFolder == null) {
        alert("No folder selected", "Please run again");
        return false;
    }

    var files = importFolder.getFiles();

    if(files.length < 1) {
        alert("No files detected", "Please select a valid folder");
        main();
    }

    var videoFiles = getVideoPaths(files);

    if(videoFiles.length < 1) {
        alert("No video files in this folder");
        main();
    }

    // Prompt user for frame input

    var frames = prompt("Added frames per clip", 10, "");

    // Define project

    var project = app.project;
    var projectItem = project.rootItem;

    // Import selected files 

    project.importFiles(videoFiles);

    // Create clipFolder

    var clipFolder = projectItem.createBin("Clip Folder");
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