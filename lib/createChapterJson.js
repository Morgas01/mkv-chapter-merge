module.exports=function(chapterInfo)
{
	let json= {
		"_name": "ChapterAtom",
		"_raw": {
			"name": "ChapterAtom"
		},
		"ChapterUID": {
			"name": "ChapterUID",
			"data": chapterInfo.uid
		},
		"ChapterTimeStart": {
			"name": "ChapterTimeStart",
			"data": chapterInfo.timeStart
		},
		"ChapterTimeEnd": {
			"name": "ChapterTimeEnd",
			"data": chapterInfo.timeEnd
		},
		"ChapterFlagHidden": {
			"name": 'ChapterFlagHidden',
			"data":  Buffer.from([chapterInfo.hidden?1:0])
		},
		"ChapterFlagEnabled": {
			"name": 'ChapterFlagEnabled',
			"data":  Buffer.from([1])
		},
		"ChapterSegmentUID": {
			"name": "ChapterSegmentUID",
			"data": chapterInfo.segmentUID
		},
		"ChapterSegmentEditionUID": {
			"name": "ChapterSegmentEditionUID",
			"data": chapterInfo.segmentEditionUID
		},
		"ChapterDisplay": {
			"_name": "ChapterDisplay",
			"_raw": {
				"name": "ChapterDisplay",
			},
			"ChapString": {
				"name": "ChapString",
				"data": Buffer.from(chapterInfo.name,'UTF-8')
			},
			"ChapLanguage": {
				"name": "ChapLanguage",
				"data": Buffer.from('656e67','hex') //eng
			}
		}
	};
	if(!chapterInfo.timeEnd) delete json.ChapterTimeEnd;
	if(!chapterInfo.segmentEditionUID) delete json.ChapterSegmentEditionUID
	return json;
};