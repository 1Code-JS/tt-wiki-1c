if (import.meta.hot) {
	try {
		(await (import("https://esm.sh/eruda"))).default.init()
	} catch {}
	import.meta.hot.accept()
};


import {CreatorInfoElement} from '/CreatorInfoElement.js'
import {CreatorListElement} from '/CreatorListElement.js'

const parseMarkdown = await (async ()=>{
	const md = (await import("markdown-it")).default({
		// html:true,
		linkify:true,
		breaks:true,
		highlight: await (async ()=>{
			const {default:hljs} = await import('highlight.js')
			return (str, lang)=>{
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(str, { language: lang }).value;
          } catch {}
        }
        return ''; // use external default escaping
			}
		})()
	})
	/*
	.use((await import("markdown-it-container")).default,"infobox",{
		validate: function(params) {
      return params.trim().match(/^infobox\s+(.*)$/)
    }
	})
	*/
	/*
	.use((await import("markdown-it-container")).default,"infobox",{
		validate: function(params) {
      return params.trim().match(/^infobox\s+(.*)$/)
    }
	})
	*/
	return (text)=>{
		const htmlOutput = document.createElement("div")
		htmlOutput.innerHTML = md.render(text)
		if (false) htmlOutput.innerHTML = md.render(`
# [JSON](/0)
# [JSON](https://github.com)
## JSON
### JSON
#### JSON
JSON
##### JSON
###### JSON
\`\`\`json
//
[
  {
    "v":[true,false,null],
    "c":9,
    "b":""
  }
]
\`\`\`
# C
\`\`\`c
//
#include <stdio.h>;

int main()
{
  printf("%d",0);
  return 0;
}
\`\`\`
# C++
\`\`\`c++
//
#include <iostream>
using namespace std;

int main()
{
  cout << "";
  return 0;
}
\`\`\`
# Java
\`\`\`java
//

import a.j.E;

public static class Main {
  public static void main(String[] args, int a) {
    int c = 0;
    float f = 0.5;
    String xx = "";
    System.out.printLn(fc, ("").toString());
  }
}
\`\`\`
# JavaScript
\`\`\`js
//
import {default as z} from "";

const c = 0;

class A extends Z {
  constructor(...args) {
    super(...args)
    this.c = 1
    this.d = () => {}
    this["o"] = 1
  }
}

let gt = new A();

for (const x of v) {
  ouj(\` k 4
98\${ u(4, \`n\${84}\`, null, [document,0,x,true]) }
\`)
}

console.log(98, "\\n", /^\\s.*$/)
encodeURI(y,s)
function c(u,s) {
  this.u += "itg";
  this.z = {
   k: 93,
   c: 7 == 2 + 5 / 3,
   "r":97
  };
  let [a,b,c] = [true,false,null];
}
\`\`\`
# Lua
\`\`\`lua
--
table.insert()
a.i()
b()
print(98)
function t:c(u,s)
  self.u = "itg";
  local a,b,c = true,false,nil;
end
local function z(u,s)
  self.u = "itg";
  local a,b,c = true,false,nil;
end
\`\`\`
`)
		/* htmlOutput.innerHTML = md.render(`
\`\`\`yml
#@creatorList

\`\`\`
`) */
		/* 
		htmlOutput.innerHTML = md.render(`
-# 88549
`)
		*/
		htmlOutput.normalize()
		for (const p of htmlOutput.querySelectorAll("p")) {
			let tn = p.firstChild
			while (tn) {
				if (tn && tn.nodeType === Node.TEXT_NODE) break;
				tn = tn.nextSibling
			}
			if (!tn) continue;
			const s = tn.nodeValue.match(/^-#\s(.*)$/)
			if (s) {
				tn.nodeValue = s[1]
				p.classList.add("subtext")
			}
		}
		return htmlOutput.innerHTML
	}
})()

updatePage()

window.openURL = (url)=>{
	if (!url) return
	let e = undefined
	if (typeof url == "object" && Event.prototype.isPrototypeOf(url)) {
		e = url
		url = e.target.getAttribute("href")
	}
	if (typeof url != "string") return
	const {origin} = location
	url = ((url)=>new URL(url,origin))(url);
	if (url.origin!=origin) return
	if (e) e.preventDefault()
	history.pushState(null,'',`${url.pathname}${url.searchParams}${url.hash}`,{})
	updatePage()
}

async function updatePage() {
	const editUrl = document.getElementById("gh-url")
	const htmlOutput = document.getElementById("md-html-output")
	const timeModifiedE = document.getElementById("date-modified")
	timeModifiedE.querySelector("#t").innerText = ""
	let pageName
	/*
	{
		const params=new URLSearchParams(location.search);
		pageName=params.get("p")
		if (!pageName || pageName.length<1) pageName = "Creator-list";
		pageName = pageName.replaceAll(/\s/g,"-");
		params.set("p",pageName)
		history.replaceState(null,'',`${location.pathname}?${params}`,{})
	}
	*/
	{
		const path = location.pathname.split("/")
		const {length} = path
		pageName = encodeURIComponent(path[length-1] || '').replaceAll(/\s/g,"-")
		if (pageName.length<1) pageName = "Creator-list";
		pageName = decodeURIComponent(pageName);
		path[length-1] = pageName
		history.replaceState(null,'',`${path.join("/")}${location.search}`,{})
	}
	
	const pageNameE = ()=>pageName;
	const fileUrl = `https://raw.githubusercontent.com/1Code-JS/tt-wiki-1c/wiki/pages/${pageNameE()}.md`
	let response
	{
		response = await new Promise((s)=>{
			requestAnimationFrame(()=>{
				let b = new Blob([`
					addEventListener("message",async ({data:fileUrl})=>{
						let o = {cache:"reload"};
						let f; f = async ()=>{
							try {
								return await fetch(fileUrl,o)
							} catch (e) {
								return await f()
							}
						}
						const r = await f(); o = f = undefined
						try {
							postMessage([
								await r.arrayBuffer(),
								{
									status: r.status,
									statusText: r.statusText,
									headers: (()=>{
										let h = r.headers
										return [...h.entries()]
									})()
								}
							])
						} catch (e) {
							postMessage(e.message)
						}
					})
				`.substr(0)],{type:"text/javascript"})
				let u = URL.createObjectURL(b)
				let w = new Worker(u,{type:"module"})
				w.addEventListener("message",({data})=>{
					if (typeof data == "string") {
						console.error(data)
					} else {
						console.log(data)
						URL.revokeObjectURL(u)
						w.terminate()
						s(new Response(...data))
					}
				})
				w.addEventListener("error",(e)=>{
					console.error(e)
					URL.revokeObjectURL(u)
					w.terminate()
				})
				w.postMessage(fileUrl)
			})
		})
	}
	const text = await response.text()
	console.log(response)
	//console.log([...response.headers.entries()])
	editUrl.href=`https://github.com/1Code-JS/tt-wiki-1c/wiki/${pageNameE()}/_edit`
	htmlOutput.innerHTML = response.ok ? parseMarkdown(text) : "";
	for (const e of htmlOutput.querySelectorAll("pre")) {
		{
			const {children} = e
			if (!(children.length == 1)) continue
			const ee = children[0]
			if (!(ee.tagName == "CODE" && ee.classList.contains("language-yml"))) continue
		}
		let {textContent} = e
		let aa = (textContent.trim().split("\n")[0] ?? '').match(/^#@(\w+).*$/)
		if (Array.isArray(aa)) {aa = aa[1]} else continue
		if (false) continue
		switch (aa) {
			case "creatorList": {
				let l =document.createElement("ctr-l")
				e.parentElement.replaceChild(l,e)
				l.reload(textContent)
			}
		}
	}
	/*
	for (const ci of htmlOutput.querySelectorAll("ctr-l")) {
		let p = ci.parentElement
		switch (p.tagName) {
			case "H1": case "H2": case "H3":
			case "H4": case "H5": case "H6": case "P":
			if (p.children.length == 1 && p.innerText.length == 0) {
				p.parentElement.replaceChild(ci,p)
				ci.reload()
			}
		}
	}
	*/
	for (const a of htmlOutput.querySelectorAll("a[href]")) {
		// a.setAttribute("onclick","return false")
		a.addEventListener("click",(...arg)=>openURL(...arg))
	}
	const tlbr = document.getElementById("tlbr")
	tlbr.querySelector("#title").innerText = `${pageNameE()}`
	let pages = await fetch("https://raw.githubusercontent.com/1Code-JS/tt-wiki-1c/wiki/pages.json").then((r)=>{
		console.log(r)
		return r.json()
	})
	let {[`${pageNameE()}.md`]:data} = pages.data
	if (data) {
		const timeModified = new Date(data["time modified"])
		timeModifiedE.querySelector("#t").innerText =
	    `Last edited on ${timeModified.toDateString()} ${''
	    }${timeModified.toTimeString().match(/\d\d:\d\d:\d\d/)}`
	}
}

addEventListener("popstate",()=>updatePage());

try {
	customElements.define("ctr-l",CreatorListElement)
	customElements.define("ctr-i",CreatorInfoElement)
} catch {}


// console.log(document.documentElement.innerHTML)