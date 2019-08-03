let uuid=require("uuid/v4");
let createChapter=require("./createChapter");
let c=0;
module.exports=function(chapterInfo,fileInfo)
{
	return createChapter(
		uuid(null,Buffer.alloc(8)),
		chapterInfo.segmentUID||fileInfo.segmentUID,
		chapterInfo.segmentUID?chapterInfo.segmentEditionUID:chapterInfo.uid,
		chapterInfo.timeStart,
		chapterInfo.timeEnd,
		chapterInfo.name
	);
}