let readFileInfo=require("./lib/readFileInfo");
let repair=require("./util/repair");
let FileInfo=require("./model/FileInfo");
let ChapterInfo=require("./model/ChapterInfo");


module.exports={
	readFileInfo,
    repair,
    //classes
    FileInfo,
    ChapterInfo
}