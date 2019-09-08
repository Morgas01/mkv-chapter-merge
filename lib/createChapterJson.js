module.exports=function(chapterInfo)
{
	let json= {
		"_name": "ChapterAtom",
		"_raw": {
			"tagStr": "b6",
			"type": "m",
			"dataSize": 65,
			"tag": 54,
			"name": "ChapterAtom",
			"start": 95,
			"end": 162
		},
		"ChapterUID": {
			"tagStr": "73c4",
			"type": "u",
			"dataSize": 8,
			"tag": 13252,
			"name": "ChapterUID",
			"start": 151,
			"end": 162,
			"data": chapterInfo.uid
		},
		"ChapterTimeStart": {
			"tagStr": "91",
			"type": "u",
			"dataSize": 1,
			"tag": 17,
			"name": "ChapterTimeStart",
			"start": 97,
			"end": 100,
			"data": chapterInfo.timeStart
		},
		"ChapterTimeEnd": {
			"tagStr": "92",
			"type": "u",
			"dataSize": 5,
			"tag": 18,
			"name": "ChapterTimeEnd",
			"start": 100,
			"end": 107,
			"data": chapterInfo.timeEnd
		},
		"ChapterFlagHidden": {
			"tagStr": '98',
			"type": 'u',
			"dataSize": 1,
			"tag": 24,
			"name": 'ChapterFlagHidden',
			"start": 233187,
			"end": 233190,
			"data":  Buffer.from([chapterInfo.hidden?1:0])
		},
		"ChapterFlagEnabled": {
			"tagStr": '4598',
			"type": 'u',
			"dataSize": 1,
			"tag": 1432,
			"name": 'ChapterFlagEnabled',
			"start": 233190,
			"end": 233194,
			"data":  Buffer.from([1])
		},
		"ChapterSegmentUID": {
			"tagStr": "6e67",
			"type": "b",
			"dataSize": 16,
			"tag": 11879,
			"name": "ChapterSegmentUID",
			"start": 107,
			"end": 126,
			"data": chapterInfo.segmentUID
		},
		"ChapterSegmentEditionUID": {
			"tagStr": "6ebc",
			"type": "u",
			"dataSize": 5,
			"tag": 11964,
			"name": "ChapterSegmentEditionUID",
			"start": 126,
			"end": 134,
			"data": chapterInfo.segmentEditionUID,
			"value": 40184433400
		},
		"ChapterDisplay": {
			"_name": "ChapterDisplay",
			"_raw": {
				"tagStr": "80",
				"type": "m",
				"dataSize": 15,
				"tag": 0,
				"name": "ChapterDisplay",
				"start": 134,
				"end": 151
			},
			"ChapString": {
				"tagStr": "85",
				"type": "8",
				"dataSize": 7,
				"tag": 5,
				"name": "ChapString",
				"start": 136,
				"end": 145,
				"data": Buffer.from(chapterInfo.name,'UTF-8'),
				"value": chapterInfo.name
			},
			"ChapLanguage": {
				"tagStr": "437c",
				"type": "s",
				"dataSize": 3,
				"tag": 892,
				"name": "ChapLanguage",
				"start": 145,
				"end": 151,
				"data": Buffer.from('656e67','hex') //eng
			}
		}
	};
	if(!timeEnd) delete json.ChapterTimeEnd;
	if(!edition) delete json.ChapterSegmentEditionUID
	return json;
};