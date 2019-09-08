# mkv-chapter-merge
simple API to manipulate and chapters and create a linking matroska file.

#install 
npm\
``npm install mkv-chapter-merge``


# Usage
```
//get the api
let api=require("mkv-chapter-merge");
//get the FileInfo;
api.readFileInfo(pathToFile)
.then(fileInfo=>
{
    //do stuff ...
    api.repair.sortChapters(fileInfo);
    api.repair.fillGaps(fileInfo);
    
    let linkedFileInfo=api.FileInfo.createLinkedFile(fileInfo.chapters,{path:"output.mkv"});
    //write new file
    return linkedFileInfo.writeToFile(); //returns promise
})
.then(()=>
{
    console.log("finish");
},
(error)=>
{
    console.error(error)
});
```

#API
TODO