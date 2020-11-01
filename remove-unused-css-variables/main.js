const fs = require("fs")

/* Sometimes there is code like

body {
    color: var(my-color)
}

:root {
    my-color: blue;
    whatever: green;
}

This code will get rid of whatever, as it's not used
*/


let css = fs.readFileSync("test.css", "utf-8")

/* Takes some giant code and a variable name / css custom property
    If it finds a var(variable) outside of :root {} scope then the variable matters
*/
const is_variable_actually_used = (variable, code) => {
    const used_at = code.indexOf(`var(--${variable})`)
    if(used_at === -1) return false;
    
    const before = code.slice(0, used_at)
    const after = code.slice(used_at+1)
    const root = /(?=:root)([\s\S]*?)(?=})/g

    // if it was used inside root (we are in root if is not behind or after)
    const used = before.search(root) !== -1 || after.search(root) !== -1

    return used;
}

const get_declared_variables = (sourceCode) => {
    return sourceCode.match(/(?<=--)(.*?)(?=:)/g)
}

const variables = get_declared_variables(css)

variables.map(variable => {
    if (!is_variable_actually_used(variable, css)) {
        console.log(`REMOVING APPEARANCES OF VARIABLE ${variable}`)

        const REG = new RegExp(`.*--${variable}.*`, "g")
        css = css.replace(REG, "")
    }
})

fs.writeFileSync("output.css", css)