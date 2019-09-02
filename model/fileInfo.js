
let ChapterInfo=require("./chapterInfo");
let checkArray=require("../util/checkArray");

let FileInfo=function(param={})
{
	({
		chapters:this.chapters=[], //ChapterInfo[]
		segmentUID:this.segmentUID, //buffer
		duration:this.duration, //number
		timecodeScale:this.timecodeScale //number
	}=param);
};
FileInfo.parseTag=function(tag)
{
	let param={
		chapters,
		segmentUID:tags.SegmentUID.data,
		duration:tags.Duration.value,
		timecodeScale:tags.TimecodeScale.value
	};

	if(!tags.SegmentUID) return null; // non mkv file

	if(tags.Chapters)
	{
		let chapterTags=checkArray(tags.Chapters.EditionEntry)
		.reduce((array,edition)=>
		{
			array.push(...checkArray(edition.chapterAtom));
			return array;
		),[]);

		param.chapters=chapterTags.map(chapterTag=>ChapterInfo.parseTag(chapterTag,this));
	}
	else // file as chapter
	{
		param.chapters=[ChapterInfo.parseTag({timeEnd:Buffer.from((param.duration*param.timecodeScale).toString(16),"hex")})];
	}

	return new FileInfo(param);
}