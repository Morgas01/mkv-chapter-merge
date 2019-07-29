
let emptyMKV=require("./empty_mkv");
let ebmlJson=require("ebml-json");
let ebml = require("ebml");
let StreamArray = require("./StreamArray");

module.exports=function(chapters, outputFile)
{
	let merged=emptyMKV();
	mergedChapters=merged.Segment.Chapters.EditionEntry.ChapterAtom;
	mergedChapters.push(...chapters);

	let tags=ebmlJson.taggify(merged);
	//*
	return outputFile.writeStream().then(stream=>
	{
		return new Promise((resolve,reject)=>
		{
			let encoder=new ebml.Encoder({});

			stream.on("error",reject).on("finish",resolve);
			encoder.on("error",reject);
			/*
			let write=()=>
			{
				if(tags.length==0)
				{
					console.log("end");
					encoder.end();
					return;
				}
				whiencoder.write(tags.shift())
				{
					console.log("wrote");
					encoder.once('drain', ()=>{console.log("drain");process.nextTick(write)});
				}
            }
			write();
			*/
			encoder.pipe(stream);
			tags.forEach(t=>encoder.write(t));
			encoder.end();
		});
	})
	/*/
	return new Promise((resolve,reject)=>
	{

		console.log(tags.length);
		let encoder=new ebml.Encoder({objectMode:true,readableObjectMode:true});
		encoder.on("error",console.error).on("readable",()=>console.log("readable")).on("finish",()=>console.log("finish")).on("end",()=>console.log("end"));

		let write=()=>
		{
			if(tags.length==0)
			{
				console.log("end");
				encoder.end();
				return;
			}
			let tag = tags.shift();
			if(encoder.write(tag))
			{
				console.log("wrote",tag);
				setTimeout(write,500);
			}
			else
			{
				console.log("wait");
				encoder.once('drain', ()=>{console.log("drain");setTimeout(write,2000);});

			}
		}
		write();

		encoder.on("data",()=>console.log("data"));
		//setTimeout(()=>encoder.end(),5000);
	});
	//*/
}