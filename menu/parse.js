let api=require("..");
let Enquirer=require("enquirer");
let SC=require("morgas").shortcut({
	Helper:"FileHelper",
	File:"File",
	flatten:"flatten"
});

module.exports=async function ({files,outStream,path,enquirer=new Enquirer()})
{
	outStream.write("parsing...\n");
	let fileInfos=await api.getChapters(files).catch(e=>{console.error(e);return []});
	outStream.write("mapping...\n");
	let chapters=SC.flatten(fileInfos.map(api.linkFileChapters));

	let chapterMenuIndex=0;
	let chapterMenu=()=>
	{
		let prompt=new Enquirer.Select({
			header:chapters.length+" Chapters",
			message:"select an action",
			index:chapterMenuIndex,
			choices:[
				{
					message:"edit chapter",
					value:"edit"
				},
				{
					message:"merge chapters",
					value:"merge"
				},
				{
					message:"back",
					value:"back"
				}
			]
		});
		let p=prompt.run();
		p.then(()=>chapterMenuIndex=prompt.index);
		return p;
	};

	let showChapterMenu=async()=>
	{
		while(true)
		{
			let chapterMenuAction=await chapterMenu();

			try
			{
				switch(chapterMenuAction)
				{
					case "edit":
						await edit();
						break;
					case "sort":
						await sort();
						break;
					case "merge":
						await merge();
						break;
					case "back":
						return;
						break;
				}
			}
			catch(e)
			{
				if(error)console.error(error)
			}
		}
	}


	await showChapterMenu();
}