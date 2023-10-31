
let ebml = require("@morgas/ebml");
let ebmlJson=require("ebml-json");
let StreamArray = require("./StreamArray");
let fs=require("fs");

module.exports=function(fileInfo)
{
	return new Promise((resolve,reject)=>
	{
		let stream=fs.createWriteStream(fileInfo.path);
		let json=fileInfo.getJson();
		let tags=ebmlJson.taggify(json);
		let encoder=new ebml.Encoder({});

		stream.on("error",reject).on("finish",resolve);
		encoder.on("error",reject);

		new StreamArray(tags).pipe(encoder).pipe(stream);
	});
};