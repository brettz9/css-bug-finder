import fs from "fs"

const code = fs.readFileSync("./css-variables.test.css", "utf-8")

// LOOKS FOR VARIABLES THAT ARE USED IN SOME POINT, I.E: var(--XXX)
// XXX gets captured and added to the array of used variables
const __variables_in_use = code.match(/(?<=var\(--)(.*?)(?=\))/g)
const variables_in_use = [...new Set(__variables_in_use)]

// COUNTS AMOUNT OF VARIABLES THAT WON'T HAVE A DECLARATION --XXX:
const nuked_variables = variables_in_use.filter(variable => !code.includes(`--${variable}:`))
console.log(`${nuked_variables.length} OUT OF ${variables_in_use.length} VARIABLES ARE BROKEN`)