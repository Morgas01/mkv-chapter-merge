let readChapters=require("./lib/readChapters");

let getChapters=require("./lib/getChapters");
let createOrderedChapter=require("./lib/createOrderedChapter");
let mergeChapters=require("./lib/mergeChapters");


module.exports={
	getChapters,
	createOrderedChapter,
	mergeChapters,

	// internally used

	readChapters,
}