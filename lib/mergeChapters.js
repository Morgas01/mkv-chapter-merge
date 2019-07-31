
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
			encoder.pipe(stream);
			tags.forEach(t=>encoder.write(t));
			encoder.end();
			/*/
			new StreamArray(tags).pipe(encoder).pipe(stream);
			//*/
		});
	})
}