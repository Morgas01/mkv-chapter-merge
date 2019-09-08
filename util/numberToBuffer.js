modules.exports=function(number)
{
	let hex=number.toString(16);
	if(hex.length%2==1) hex="0"+hex;
	return Buffer.from(hex,"hex");
};