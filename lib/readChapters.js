
let ebml = require("ebml");

const FINISH_ERROR="read chapters";

/**
 * @param {Morgas.File} file
 */
module.exports=function(file)
{
	return file.readStream().then(stream=>
	{
		return new Promise((resolve,reject)=>
		{
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
	});
};