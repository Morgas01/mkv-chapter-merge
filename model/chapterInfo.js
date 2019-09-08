
let checkArray=require("../util/checkArray");
let generateUid=require("../util/generateUid");
let createChapterJson=require("../lib/createChapterJson");

let ChapterInfo=function(param={})
{
	({
		fileInfo:this.fileInfo,
		name:this.name=ChapterInfo.DEFAULT_NAME, //string
		uid:this.uid, //buffer
		segmentUID:this.segmentUID, //buffer
		segmentEditionUID:this.segmentEditionUID,//buffer
		timeStart:this.timeStart,//buffer
		timeEnd:this.timeEnd,//buffer
		hidden:this.hidden,//boolean
		_raw:this._raw
	}=param);
};
Object.assign(ChapterInfo.prototype,{
	createLinkedChapter({fileInfo=null,uidSupplier=generateUid}={})
	{
		return new ChapterInfo({
			fileInfo,
			uid:uidGenerator(),
			name:this.name,
			segmentUID:this.segmentUID,
			segmentEditionUID:this.segmentEditionUID||this.uid,
			timeStart:this.timeStart,
			timeEnd:this.timeEnd,
		});
	},
	getChapterJson()
	{
		return createChapterJson(this);
	}
});
//static
Object.assign(ChapterInfo,{
	DEFAULT_NAME:"unnamed Chapter",

	parseJson(chapterJson,fileInfo)
	{
		let param={
			fileInfo
			name:DEFAULT_NAME,
			uid:null,
			segmentUID:null,
			segmentEditionUID:null,
			timeStart:chapterJson.ChapterTimeStart.data,
			timeEnd:null,
			hidden:false,
			_raw:chapterJson
		};

		let display=checkArray(chapterJson.ChapterDisplay)[0];
		if(display&&display.ChapString) param.name=display.ChapString.value;

		param.uid=chapterJson.ChapterUID.data;
		if(chapterJson.ChapterSegmentUID) param.segmentUID=chapterJson.ChapterSegmentUID.data;
		if(chapterJson.ChapterSegmentEditionUID) param.segmentEditionUID=chapterJson.ChapterSegmentEditionUID.data;
		if(chapterJson.ChapterFlagHidden) param.hidden=chapterJson.ChapterFlagHidden.value!=0
		if((chapterJson.ChapterTimeEnd)) param.timeEnd=chapterJson.ChapterTimeEnd.data;

		return new ChapterInfo(param);
	}
});

mdules.exports=ChapterInfo;