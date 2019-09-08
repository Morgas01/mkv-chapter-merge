
let ebml = require("ebml");
let ebmlJson=require("ebml-json");
let StreamArray = require("./StreamArray");

module.exports=function(fileInfo)
{
	return new Promise((resolve,reject)=>
	{
		let stream=fs.createWriteStream(fileInfo.path);
		let json=fileInfo.getFileJson();
		let tags=ebmlJson.taggify(json);
		let encoder=new ebml.Encoder({});

		stream.on("error",reject).on("finish",resolve);
		encoder.on("error",reject);

		new StreamArray(tags).pipe(encoder).pipe(stream);
	});
};