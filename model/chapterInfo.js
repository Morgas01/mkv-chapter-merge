
let checkArray=require("../util/checkArray");

let ChaperInfo=function(param={})
{
	({
		fileInfo:this.fileInfo,
		name:this.name=ChaperInfo.DEFAULT_NAME, //string
		uid:this.uid, //buffer
		segmentUID:this.segmentUID, //buffer
		segmentEditionUID:this.segmentEditionUID,//buffer
		timeStart:this.timeStart,//buffer
		timeEnd:this.timeEnd,//buffer
		hidden:this.hidden,//boolean
		_raw:this._raw
	}=param);
};
ChaperInfo.DEFAULT_NAME="unnamed Chapter";

ChaperInfo.parseTag=function(chapterTag,fileInfo)
{
	let param={
		fileInfo
		name:DEFAULT_NAME,
		uid:null,
		segmentUID:null,
		segmentEditionUID:null,
		timeStart:chapterTag.ChapterTimeStart.data,
		timeEnd:null,
		hidden:false,
		_raw:chapterTag
	};

	let display=checkArray(chapterTag.ChapterDisplay)[0];
	if(display&&display.ChapString) param.name=display.ChapString.value;

	param.uid=chapterTag.ChapterUID.data;
	if(chapterTag.ChapterSegmentUID) param.segmentUID=chapterTag.ChapterSegmentUID.data;
	if(chapterTag.ChapterSegmentEditionUID) param.segmentEditionUID=chapterTag.ChapterSegmentEditionUID.data;
	if(chapterTag.ChapterFlagHidden) param.hidden=chapterTag.ChapterFlagHidden.value!=0
	if((chapterTag.ChapterTimeEnd)) param.timeEnd=chapterTag.ChapterTimeEnd.data;

	return new ChaperInfo(param);
}

mdules.exports=ChaperInfo;