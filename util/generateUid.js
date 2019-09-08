
let uuid=require("uuid/v4");

module.exports=function()
{
	return uuid(null,Buffer.alloc(8));
};