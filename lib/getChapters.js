
let ebmlJson=require("ebml-json");
let readChapters=require("./readChapters");
let SC=require("morgas").shortcut({
	encase:"encase",
	File:"File"
});

let checkArray=function(data)
{
	if(Array.isArray(data)) return data[0];
	return data;
};

module.exports=function(files)
{
	files=files.map(SC.File.stringToFile);
	return Promise.all(files.map(file=>
	{
		return readChapters(file).then(tags=>ebmlJson.wrapRoot(ebmlJson.parse(tags)));
	}))
	.then(fileChapters=>
	{
		return files.filter((file,index)=>fileChapters[index].SegmentUID)
		.map((file,index)=>
		{
			let chapters=SC.encase(checkArray(fileChapters[index].Chapters.EditionEntry).ChapterAtom);

			let fileSegmentUID=fileChapters[index].SegmentUID.data;
			let chapterInfo=chapters.map((chapter,chapterIndex)=>
			{
				let name;
				let display=checkArray(chapter.ChapterDisplay);
				if(display&&display.ChapString) name=display.ChapString.value;
				else name="chapter "+chapterIndex;
				let uid=chapter.ChapterUID.data;
				let segmentUID;
				if(chapter.ChapterSegmentUID) segmentUID=chapter.ChapterSegmentUID.data;
				let segmentEditionUID;
				if(chapter.ChapterSegmentEditionUID) segmentEditionUID=chapter.ChapterSegmentEditionUID.data;

				let timeStart=chapter.ChapterTimeStart.data;
				let timeEnd;
				if((chapter.ChapterTimeEnd)) timeEnd=chapter.ChapterTimeEnd.data;


				return {name,uid,segmentUID,segmentEditionUID,timeStart,timeEnd,_raw:chapter};
			});
			return {file,chapters:chapterInfo,segmentUID:fileSegmentUID}
		});
	});
};