let readChapters=require("./lib/readChapters");

let getChapters=require("./lib/getChapters");
let createOrderedChapter=require("./lib/createOrderedChapter");
let createChapter=require("./lib/createChapter");
let mergeChapters=require("./lib/mergeChapters");
let empty_mkv=require("./lib/empty_mkv");


module.exports={
	getChapters,
	createOrderedChapter,
	mergeChapters,

	// internally used
	createChapter,
	readChapters,
	empty_mkv
}