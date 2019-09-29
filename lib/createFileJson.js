
let numberToBuffer=require("../util/numberToBuffer");
let generateUid=require("../util/generateUid");
let packageJson=require("../package.json");

let buffer1=numberToBuffer(1);
let buffer4=numberToBuffer(4);
let buffer8=numberToBuffer(8);
let buffer1E6=numberToBuffer(1E6);
let bufferApp=Buffer.from(packageJson.name+" v"+packageJson.version);

module.exports=function(fileInfo)
{
	return {
		"EBML": {
			"_name": "EBML",
			"_raw": {
				"name": "EBML",
			},
			"EBMLVersion": {
				"name": "EBMLVersion",
				"data": buffer1
			},
			"EBMLReadVersion": {
				"name": "EBMLReadVersion",
				"data": buffer1
			},
			"EBMLMaxIDLength": {
				"name": "EBMLMaxIDLength",
				"data": buffer4
			},
			"EBMLMaxSizeLength": {
				"name": "EBMLMaxSizeLength",
				"data": buffer8
			},
			"DocType": {
				"name": "DocType",
				"data": Buffer.from('matroska')
			},
			"DocTypeVersion": {
				"name": "DocTypeVersion",
				"data": buffer1
			},
			"DocTypeReadVersion": {
				"name": "DocTypeReadVersion",
				"data": buffer1
			}
		},
		"Segment": {
			"_name": "Segment",
			"_raw": {
				"name": "Segment"
			},
			"Chapters": {
				"_name": "Chapters",
				"_raw": {
					"name": "Chapters"
				},
				"EditionEntry": {
					"_name": "EditionEntry",
					"_raw": {
						"name": "EditionEntry"
					},
					"EditionFlagOrdered": {
						"name": "EditionFlagOrdered",
						"data": buffer1
					},
					"ChapterAtom": fileInfo.chapters.map(chapter=>chapter.getJson())
				}
			},
			"Info": {
				"_name": "Info",
				"_raw": {
					"name": "Info"
				},
				"TimecodeScale": {
					"name": "TimecodeScale",
					"data": buffer1E6
				},
				"MuxingApp": {
					"name": "MuxingApp",
					"data": bufferApp
				},
				"WritingApp": {
					"tagStr": "5741",
					"name": "WritingApp",
					"data": bufferApp
				},
				"SegmentUID": {
					"name": "SegmentUID",
					"data": generateUid()
				}
			}
		}
	};
};