
import pkg from "./package.json";

export default {
    input: "index.js",
    output: [
        { file: pkg.main, format: "umd", name: 'index.umd.js' },
    ],
}