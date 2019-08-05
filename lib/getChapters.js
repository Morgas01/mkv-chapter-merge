
let ebmlJson=require("ebml-json");
let readChapters=require("./readChapters");
let SC=require("morgas").shortcut({
	encase:"encase",
	File:"File"
});

let colors=require("ansi-colors");

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
		let rtn=[];
		for(let index=0;index<files.length;index++)
		{
			let file=files[index];
			let fileTags=fileChapters[index];
			if(!fileTags.SegmentUID) continue; // filter non mkv files
			let fileSegmentUID=fileTags.SegmentUID.data;
			let chapters;
			if(fileTags.Chapters)
			{
				chapters=SC.encase(checkArray(fileTags.Chapters.EditionEntry).ChapterAtom)
				.map((chapter,chapterIndex)=>
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
			}
			else
			{
				chapters=[{name:file.getName(),timeEnd:Buffer.from((fileTags.Duration.value*fileTags.TimecodeScale.value).toString(16),"hex")}];
			}
			for(let cIndex=0;cIndex+1<chapters.length;cIndex++)
			{
				if(!chapters[cIndex].timeEnd)chapters[cIndex].timeEnd=chapters[cIndex+1].timeStart;
			}
			let lastChapter=chapters[chapters.length-1]
			if(!lastChapter.timeEnd)
			{
				if(!fileTags.Duration||fileTags.Duration.value==0) process.stdout.write(colors.bgYellow("[WARN]")+" "+file.getName()+" no chapter end time and no total duration! (must be fixed externally)\n");
				else lastChapter.timeEnd=Buffer.from((fileTags.Duration.value*fileTags.TimecodeScale.value).toString(16),"hex");
			}
			rtn.push({file,chapters:chapters,segmentUID:fileSegmentUID});
		}
		return rtn;
	});
};