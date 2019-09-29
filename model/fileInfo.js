
let ChapterInfo=require("./chapterInfo");
let checkArray=require("../util/checkArray");
let generateUid=require("../util/generateUid");
let numberToBuffer=require("../util/numberToBuffer");
let createFileJson=require("../lib/createFileJson");
let writeFile=require("../lib/writeFile");

let FileInfo=function(param={})
{
	({
		path:this.path,
		chapters:this.chapters=[], //ChapterInfo[]
		segmentUID:this.segmentUID, //buffer
		duration:this.duration, //number
		timecodeScale:this.timecodeScale=1E6 //number
	}=param);
	this.chapters.forEach(c=>c.fileInfo=this);
};
Object.assign(FileInfo.prototype,{
	getDurationAsBuffer()
	{
		return FileInfo.calcDurationBuffer(this.duration,this.timecodeScale);
	},
	getJson()
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
	parseJson(json,{path}={})
	{
		if(!json.SegmentUID) return null; // non mkv file

		let param={
			path,
			chapters:[],
			segmentUID:json.SegmentUID.data,
			duration:json.Duration.value,
			timecodeScale:json.TimecodeScale.value
		};

		if(json.Chapters)
		{
			let chapterTags=checkArray(json.Chapters.EditionEntry)
			.reduce((array,edition)=>
			{
				array.push(...checkArray(edition.ChapterAtom));
				return array;
			},[]);

			param.chapters=chapterTags.map(chapterTag=>ChapterInfo.parseJson(chapterTag));
		}
		else // file as chapter
		{
			param.chapters=[
				ChapterInfo.parseJson({
					ChapterSegmentUID:param.segmentUID,
					timeStart:numberToBuffer(0),
					timeEnd:FileInfo.calcDurationBuffer(param.duration,param.timecodeScale)
				})
			];
		}

		return new FileInfo(param);
	},
	calcDurationBuffer(duration,scale)
    {
    	return numberToBuffer(duration*scale);
    },
    createLinkedFile(chapters,{path="merged.mkv",uidSupplier=generateUid}={})
    {
    	return new FileInfo({
    		path,
    		uid:uidSupplier(),
    		chapters:chapters.map(chapter=>chapter.createLinkedChapter({uidSupplier}))
    	});
    }
});

module.exports=FileInfo;