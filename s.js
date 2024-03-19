import path from "path"
import fs from "fs/promises"

// await fs.rm("./pages.json",{force:true,recursive:true})

let pages = await fs.readdir("./pages")
let data = {}

for (const name of pages) {
	const stats = await fs.stat(path.join('./pages',name))
	data[name] = {
		"time created": stats.birthtimeMs,
		"time modified": stats.mtimeMs,
	}
}

await fs.writeFile("./pages.json",JSON.stringify({
	list: pages,
	data
},null,2))