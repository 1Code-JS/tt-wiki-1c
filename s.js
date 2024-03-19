import path from "path"
import fs from "fs/promises"

// await fs.rm("./pages.json",{force:true,recursive:true})

let pages = {}
for (let fn of (await fs.readdir("./pages"))) {
  const name = fn.match(/^(.*)\.md$/)[1]
  if (name == null) continue
	const stats = await fs.stat(path.join('./pages',fn))
	pages[name] = {
		"time created": stats.birthtimeMs,
		"time modified": stats.mtimeMs,
	}
}

await fs.writeFile("./pages.json",JSON.stringify(pages,null,2))