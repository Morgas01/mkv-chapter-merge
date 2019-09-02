let uuid=require("uuid/v4");
let createChapter=require("./createChapter");
let c=0;
module.exports=function(chapterInfo,fileInfo)
{
	return createChapter({
		uuid:uuid(null,Buffer.alloc(8)),
		segment:chapterInfo.segmentUID||fileInfo.segmentUID,
		edition:chapterInfo.segmentUID?chapterInfo.segmentEditionUID:chapterInfo.uid,
		timeStart:chapterInfo.timeStart,
		timeEnd:chapterInfo.timeEnd,
		name:chapterInfo.name,
		//hidden:chapterInfo.hidden
	});
}