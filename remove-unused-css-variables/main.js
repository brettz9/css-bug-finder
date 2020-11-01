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

/** REMOVES HANGING VARIABLES, DECLARED AND NOT USED */
const remove_unused_variables = code => {
    console.log("#################################################")
    let _code = code;
    const variables = get_declared_variables(_code)

    variables.map(v => {
        if (!is_variable_used(v, _code)) {
            console.log(`REMOVING APPEARANCES OF VARIABLE ${v}`)
            const REG = new RegExp(`.*--${v}:.*`, "g")
            _code = _code.replace(REG, "")
        }
    })

    return _code;
}

const is_variable_used = (variable, code) => {
    const used_at = code.indexOf(`var(--${variable})`)
    return used_at !== -1;
}

const get_declared_variables = (sourceCode) => {
    return sourceCode.match(/(?<=--)(.*?)(?=:)/g)
}

const _ = remove_unused_variables;

// it eventually does nothing, but have to call it many times, junky recursion :p
fs.writeFileSync("output.css", _(_(_(_(_(_(_(_(_(_(_(_(_(css))))))))))))))