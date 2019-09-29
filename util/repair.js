
let repairs={
	ZERO_BUFFER:Buffer.from([0]),
	/**
	 * sorts chapters ascending by timeStart
	 * does not sort when linked chapters are present
	 * @param {FileInfo} fileInfo
	 */
	sortChapters(fileInfo)
	{
		if(!repairs.hasLinkedChapters(fileInfo))
		{
			fileInfo.chapters.sort((a,b)=>
			{
				let lengthCheck=a.timeStart.length-b.timeStart.length;
				if(lengthCheck===0) return a.timeStart.compare(b.timeStart);
				return lengthCheck;
			});
		}
	},
	hasLinkedChapters(fileInfo)
	{
		return fileInfo.chapters.some(chapter=>chapter.segmentUID&&chapter.segmentUID.compare(fileInfo.segmentUID)!=0);
	},
	/**
	 * filters chapters linked to other files and returns the remaining
	 */
	filterOwnChapters(fileInfo)
	{
		return fileInfo.chapters.filter(chapter=>!chapter.segmentUID||chapter.segmentUID.compare(fileInfo.segmentUID)==0)
	},
	/**
	 * used internaly for fillEndTime and fillGaps
	 * sets chapter's timeEnd as next chapter's timeStart if predicate is true
	 *
	 * Linked chapters are ignored.uses file's duration for last chapter.
	 *
	 * @param {FileInfo} fileInfo
	 * @param {Predicate.<ChapterInfo,index>} predicate
	 */
	connectChaptersIf(fileInfo,predicate)
	{
		let fileChapters=repairs.filterOwnChapters(fileInfo)
		let size=fileChapters.length-1;
		for(let i=0;i<size;i++)
		{
			let chapter=fileChapters[i];
			if(predicate(chapter,i))
			{
				chapter.timeEnd=fileChapters[i+1].timeStart;
			}
		}
		let lastChapter=fileChapters[size];
		if(fileInfo.duration!=null&&predicate(lastChapter,size))
		{
			lastChapter.timeEnd=fileInfo.getDurationAsBuffer();
		}
	},
	/**
	 * fills chapter's timeEnd with the next chapter's timeStart if its null, 0 or same as start.
	 * @param {FileInfo} fileInfo
	 */
	fillEndTime(fileInfo)
	{
		repairs.connectChaptersIf(fileInfo,chapter=>chapter.timeEnd==null||repairs.ZERO_BUFFER.compare(chapter.timeEnd)==0||chapter.timeStart.compare(chapter.timeEnd)==0);
	},
	/**
	 * fills chapter's timeEnd with the next chapter's timeStart or to file's end
	 * @param {FileInfo} fileInfo
	 */
	fillGaps(fileInfo)
	{
		repairs.connectChaptersIf(fileInfo,()=>true);
	},
};

module.exports=repairs;