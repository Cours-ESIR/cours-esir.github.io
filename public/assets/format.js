const options = {
    displayMode: true,
    throwOnError: false,
    macros: {
        "\\(": "\\lparen",
        "\\)": "\\rparen",
        "\\{": "\\lbrace",
        "\\}": "\\rbrace",
        "\\[": "\\lbrack",
        "\\]": "\\rbrack",
        "\\n": "\\\\ \\ \\\\",
        "\\vec": "\\overrightarrow{#1}",
        "\\embrace": "\\left#2\\begin{split} #1 \\end{split}\\right#3",
        "\\aembrace": "\\embrace{#1}{\\{}{\\}}",
        "\\pembrace": "\\embrace{#1}{\\(}{\\)}",
        "\\cembrace": "\\embrace{#1}{\\[}{\\]}",
        "\\abs": "\displaystyle\left\lvert{#1}\right\rvert"
    }
}

function code(text){
    let lang = text.split("\n")[0]
    let code = text.split("\n").slice(1).join("\r\n")

	if ( lang == "" ) {
		return "<pre class='language-python'>" + code + "</pre>"
	}
	else {
		return "<pre class='language-"+lang+"'>" + Prism.highlight(code, Prism.languages[lang], lang) + "</pre>"
	}
}

function math(text){
    return katex.renderToString(text, options)
}

function allindexof(caracters, text) {
    let indices = [];
    let last;
    while (last != -1) {
        last = text.indexOf(caracters, (last + 1));
        if (last != -1) {
            indices.push(last);
        }
    }
    return indices;
}

function dico_add(text,char,dico,indices,func) {
    let codechar = allindexof(char,text).reverse()
    let t = char.length
    for ( let i in codechar) {
        if (i%2 == 0) {codechar[i] +=t; continue;}
        let y0 = codechar[i]
        let y1 = codechar[i-1]
        let content = text.substring(y0+t, y1-t)
        dico[y0] = func(content)
    }
    return indices.concat(codechar)
}

function page(text){
    let dico = {}
    let indices = []
    indices = dico_add(text,"$$",dico,indices,math)
    indices = dico_add(text,"```",dico,indices,code)
    indices.sort(function(a, b) { return a - b; }).reverse()
    let mark = indices

	if (mark.length == 0) {
		return marked.parse(text)
	}

    for ( let i in mark ) {
	if ( indices[i] == 0 ) { continue }

        let limit = mark.length-1
        if (i%2 == 1 && i!=limit) continue;
        let y0 = mark[i]
        let y1 = mark[i-1]
        let content
        if (y1 == undefined) {
            content = text.substring(y0)
        }
        else if (i == limit) {
            content = text.substring(0, y0)
            y0 = 0
        }
        else{
            content = text.substring(y0, y1)
        }
        dico[y0] = marked.parse(content)
    }

    let html = ""
    for ( let i in dico ) {
        html += dico[i]
    }
    return html
}