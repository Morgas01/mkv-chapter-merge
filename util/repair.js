
let repairs={
	ZERO_BUFFER:Buffer.from([0]),
	/**
	 * sorts chapters ascending by timeStart
	 * @param {FileInfo} fileInfo
	 */
	sortChapters(fileInfo)
	{
		fileInfo.chapters.sort((a,b)=>a.timeStart.compare(b.timeStart));
	},
	/**
	 * used internaly for fillEndTime and FillGaps
	 * sets chapter's timeEnd as next chapter's timeStart if predicate is true
	 * @param {FileInfo} fileInfo
	 * @param {Predicate.<ChapterInfo,index>} predicate
	 */
	connectChaptersIf(fileInfo,predicate)
	{
		let size=fileInfo.chapters.length-1;
		for(let i=0;i<size;i++)
		{
			let chapter=fileInfo.chapters[i];
			if(predicate(chapter,i))
			{
				chapter.timeEnd=fileInfo.chapters[i+1].timeStart;
			}
		}
		if(fileInfo.duration!=null&&predicate(fileInfo.chapters[size],size))
		{
			chapter.timeEnd=fileInfo.getDurationAsBuffer();
		}
	},
	/**
	 * fills chapter's timeEnd with the next chapter's timeStart if its null or 0.
	 * uses file's duration for last chapter.
	 * @param {FileInfo} fileInfo
	 */
	fillEndTime(fileInfo)
	{
		repairs.connectChaptersIf(fileInfo,chapter=>chapter.timeEnd==null||repairs.ZERO_BUFFER.compare(chapter.timeEnd)==0);
	},
	/**
	 * fills chapter's timeEnd with the next chapter's timeStart if its not equal to it.
	 * uses file's duration for last chapter.
	 * @param {FileInfo} fileInfo
	 */
	fillGaps(fileInfo)
	{
		repairs.connectChaptersIf(fileInfo,function(chapter,index)
		{
			let nextTime;
			let nextChapter=fileInfo.chapters[index];
			if(nextChapter) nextTime=nextChapter.timeStart;
			else nextChapter=fileInfo
		});
	},
};

module.exports=repairs;