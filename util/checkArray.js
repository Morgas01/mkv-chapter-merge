module.exports=function checkArray(data)
{
	if(!Array.isArray(data)) data=[data];
	return data;
}