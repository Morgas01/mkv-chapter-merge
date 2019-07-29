let SC=require("morgas").shortcut({
	File:"File",
	flatten:"flatten"
});
ebml = require("ebml");
ebmlJson=require("../ebml-json");

let getChapters=require("./lib/getChapters");
let createChapter=require("./lib/createChapter");
let mergeChapters=require("./lib/mergeChapters");

const FINISH_ERROR="read chapters2";

module.exports=function(options={})
{
	/*

	return new Promise(res=>
	{
		//let file=(new (µ.getModule("File"))).changePath("c:/XDCC/#Neu/Comic Girls/(Hi10)_Comic_Girls_-_03_(720p)_(HS)_(5360924D).mkv")
		let file=(new (µ.getModule("File"))).changePath("c:/temp/mkvtoolnix/chapters.mkv")
		let tags=[];
		let decoder=new ebml.Decoder();
		let ejson=new ebmlJson(options);
		file.readStream().then(stream=>stream.pipe(decoder).pipe(ejson).on("data",chunk=>tags.push(chunk)).on("end",()=>{console.log("stream end");res(ebmlJson.wrapRoot(tags));}).on("error",console.error))
	});

	/*
	//let file=(new (µ.getModule("File"))).changePath("c:/XDCC/#Neu/Comic Girls/(Hi10)_Comic_Girls_-_03_(720p)_(HS)_(5360924D).mkv")
	let file=(new (µ.getModule("File"))).changePath("c:/temp/mkvtoolnix/chapters.mkv")
	let tags=[];
	let decoder=new ebml.Decoder();
	let ejson=new ebmlJson(options);
	return file.readStream().then(stream=>
	{
		return new Promise((resolve,reject)=>
		{
			let isChapter=false;
			stream.pipe(decoder).on("data",chunk=>
			{

				if(chunk[0]=="start"&&chunk[1].name=="Chapters")
				{
					isChapter=true;
				}
				if(isChapter)
				{
					tags.push(chunk);
				}
				if(chunk[0]=="end"&&chunk[1].name=="Chapters")
				{
					isChapter=false;
					stream.destroy(FINISH_ERROR);
				}
			})
			.on("end",()=>
			{
				resolve(tags);
			})
			.on("error",error=>
			{
				reject(error)
			});
			stream.on("error",error=>
			{
				console.log(error,error.message)
				if(error===FINISH_ERROR)
				{
					resolve(tags);
				}
				reject(error)
			});
		}).then(tags=>ebmlJson.parse(tags,true));
	});
	/*/

	let files=[
		new SC.File("c:/XDCC/#Neu/Comic Girls/(Hi10)_Comic_Girls_-_01_(720p)_(HS)_(4ECC9095).mkv"),
		new SC.File("c:/XDCC/#Neu/Comic Girls/(Hi10)_Comic_Girls_-_02_(720p)_(HS)_(77DFB700).mkv"),
		new SC.File("c:/XDCC/#Neu/Comic Girls/(Hi10)_Comic_Girls_-_03_(720p)_(HS)_(5360924D).mkv"),
		new SC.File("c:/XDCC/#Neu/Comic Girls/(Hi10)_Comic_Girls_-_04_(720p)_(HS)_(FFDB9F61).mkv")
	];
	let output=new SC.File("c:/XDCC/#Neu/Comic Girls/merged2.mkv");
	//let file=(new (µ.getModule("File"))).changePath("c:/temp/mkvtoolnix/chapters.mkv");
	return getChapters(files)
	.then(fileChapters=>
	{
		let chapterIndex=1;
		return SC.flatten(fileChapters.map(fileInfo=>
		{
			return fileInfo.chapters.map(c=>
			{
				let mappedChapter=createChapter(
					Buffer.from([chapterIndex++]),
					c.segmentUID||fileInfo.segmentUID,
					c.segmentUID?c.segmentEditionUID:c.uid,
					c.timeStart,
					c.timeEnd,
					fileInfo.file.getName()+":"+c.name
				);
				return mappedChapter;
			});
		}));
	})
	.then(linkedChapters=>
	{
		//return linkedChapters[0];
		//return ebmlJson.taggify(linkedChapters[0]);
		return mergeChapters(linkedChapters,output);
	});
	//*/
};