
let ChapterInfo=require("./chapterInfo");
let checkArray=require("../util/checkArray");
let generateUid=require("../util/generateUid");
let numberToBuffer=require("../util/numberToBuffer");
let createFileJson=require("../lib/createFileJson");
let writeFile=require("../lib/writeFile");

let FileInfo=function(param={})
{
	({
		chapters:this.chapters=[], //ChapterInfo[]
		segmentUID:this.segmentUID, //buffer
		duration:this.duration, //number
		timecodeScale:this.timecodeScale=1E6 //number
	}=param);
};
Object.assign(FileInfo.prototype,{
	getDurationAsBuffer()
	{
		FileInfo.calcDurationBuffer(this.duration,this.timecodeScale);
	},
	getFileJson()
	{
		return createFileJson(this);
	},
	writeToFile()
	{
		return writeFile(this);
	}
});
//static
Object.assign(FileInfo,{
	parseJson(json)
	{
		let param={
			chapters,
			segmentUID:json.SegmentUID.data,
			duration:json.Duration.value,
			timecodeScale:json.TimecodeScale.value
		};

		if(!json.SegmentUID) return null; // non mkv file

		if(json.Chapters)
		{
			let chapterTags=checkArray(json.Chapters.EditionEntry)
			.reduce((array,edition)=>
			{
				array.push(...checkArray(edition.chapterAtom));
				return array;
			}),[]);

			param.chapters=chapterTags.map(chapterTag=>ChapterInfo.parseJson(chapterTag,this));
		}
		else // file as chapter
		{
			param.chapters=[
				ChapterInfo.parseTag({
					ChapterSegmentUID:param.segmentUID,
					timeEnd:FileInfo.calcDurationBuffer(param.duration,param.timecodeScale)
				})
			];
		}

		return new FileInfo(param);
	},
	calcDurationBuffer(duration,scale)
    {
    	return numberToBuffer(duration*timecodeScale);
    },
    createLinkedFile(chapters,{path="merged.mkv",uidSupplier=generateUid}={})
    {
    	let linkedFile=new FileInfo({
    		path,
    		uid:uidSupplier()
    	});
    	linkedFile.chapters=chapters.map(chapter=>chapter.createLinkedChapter({fileInfo:linkedFile,uidSupplier))
    }
});