let uuid=require("uuid/v1");
let createChapter=require("./createChapter");

module.exports=function(fileInfo)
{
	return fileInfo.chapters.map(c=>
	{
		let mappedChapter=createChapter(
			uuid({},Buffer.from([])),
			c.segmentUID||fileInfo.segmentUID,
			c.segmentUID?c.segmentEditionUID:c.uid,
			c.timeStart,
			c.timeEnd,
			fileInfo.file.getName()+":"+c.name
		);
		return mappedChapter;
	});
}