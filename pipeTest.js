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
	let source=new SC.File("c:/XDCC/#Neu/Comic Girls/chapters.mkv");
	let output=new SC.File("c:/XDCC/#Neu/Comic Girls/merged.mkv");
	return Promise.all([source.readStream(),output.writeStream()])
	.then(function([read,write])
	{
		return new Promise(rs=>{
			let decoder= new ebml.Decoder();
			let encoder=new ebml.Encoder();
			/*
			read.pipe(decoder).pipe(encoder).pipe(write).on("end",()=>{console.log("end"),rs(encoder)});
			*/
			let tags=[]
			read.pipe(decoder).on("data",tag=>tags.push(tag))
			.on("end",()=>
			{
				let transformed=ebmlJson.taggify(ebmlJson.parse(tags));
				transformed.forEach(t=>encoder.write(t));
				encoder.end();
			});
			encoder.pipe(write).on("finish",rs);
		});
	});
	//*/
};