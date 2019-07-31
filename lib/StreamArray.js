let {Readable} = require("stream");

let StreamArray=function (list)
{
    if (!Array.isArray(list)) throw new TypeError('First argument must be an Array');

	if(!(this instanceof StreamArray)) return new StreamArray(...arguments);

    Readable.call(this, {objectMode:true});

    this._list = list.slice();
    this._list.push(null); //closes the stream
}

StreamArray.prototype = Object.assign(Object.create(Readable.prototype),
{
	constructor:StreamArray,
	_read(size)
	{
		process.nextTick(()=>
		{
			this.push(this._list.shift());
		});
	}
});

module.exports = StreamArray;