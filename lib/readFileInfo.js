let ebmlJson=require("ebml-json");
let readFileTags=require("./readFileTags");
let FileInfo=require("../model/fileInfo");

/**
 * @param {String} path - path to mkv file
 * @returns {Promise.<FileInfo>} - null if no tags could be read (non .mkv/.ebml file)
 */
module.exports=async function(path)
{
	let tags=await readFileTags(path);
	let json=ebmlJson.wrapRoot(ebmlJson.parse(tags));
	return FileInfo.parseJson(json,{path});
}