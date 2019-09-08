let FS=require("fs");
let ebml = require("ebml");

const FINISH_ERROR="read chapters";

/**
 * reads file info tags and chapter tags
 * @param {String} path - path to mkv file
 * @returns {Promise.<ebmlTag[]>}
 */
module.exports=function(path)
{
	return new Promise((resolve,reject)=>
	{
		let stream=FS.createReadStream(path)
		let tags=[];
		let isChapter=false;
		stream.pipe(new ebml.Decoder()).on("data",tag=>
		{
			let [type,data]=tag
			if(type==="start"&&data.name==="Chapters")
			{
				isChapter=true;
			}
			if(data.name==="SegmentUID"||data.name==="Duration"||data.name==="TimecodeScale")
			{
				data._name=data.name; // add _name for key when wrapping in root object
				tags.push(tag);
			}
			else if(isChapter)
			{
				tags.push(tag);
			}
			if(type==="end"&&data.name==="Chapters")
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
			if(error===FINISH_ERROR)
			{
				resolve(tags);
			}
			reject(error)
		});
	});
};