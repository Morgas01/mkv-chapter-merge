/**
 * if data is not an Array, an array containing data is returned
 * @param {any} data
 * @returns {any[]}
 */
module.exports=function checkArray(data)
{
	if(!Array.isArray(data)) data=[data];
	return data;
}