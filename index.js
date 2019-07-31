let readChapters=require("./lib/readChapters");

let getChapters=require("./lib/getChapters");
let linkFileChapters=require("./lib/linkFileChapters");
let mergeChapters=require("./lib/mergeChapters");


module.exports={
	getChapters,
	linkFileChapters,
	mergeChapters,
	getChapters,

	// internally used

	readChapters,
}