let {Readable} = require("stream");

let StreamArray=function (list) {
    if (!Array.isArray(list)) throw new TypeError('First argument must be an Array');

    Readable.call(this, {objectMode:true});

    this._i = 0;
    this._l = list.length;
    this._list = list;
}

StreamArray.prototype = Object.assign(Object.create(Readable.prototype),
{
	constructor:StreamArray,
	_read(size)
	{
		process.nextTick(()=>
		{
			this.push(this._i < this._l ? this._list[this._i++] : null);
		});
	}
});

module.exports = StreamArray;