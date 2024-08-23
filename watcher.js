const chokidar = require("chokidar")
const fs = require("fs-extra")
const path = require('path');

const source = process.cwd() + "/src"
const destination = "src/styles"


// Check if --watch flag is present in the command line arguments
const watch = process.argv.includes("--watch")

// Paths to watch
const paths = [
  'src/**/*.css'
];

// Watch for changes if --watch flag is present

// if (watch) {
const watcher = chokidar.watch(paths, {
  persistent: true
});




watcher.on('change', filePath => {
    //const relativePath = path.relative(source, path)
  //const destinationPath = path.join(destination, relativePath)
    // Combine and minify CSS files (you can use a custom script or tool)
    // exec('npm run build-css', (err, stdout, stderr) => {
    //   if (err) {
    //     console.error(`Error: ${err.message}`);
    //     return;
    //   }
    //   console.log(stdout);
    // });
    fs.copyFile(filePath, destination+ "/" + path.basename(filePath))

  })
  .on('error', error => console.error(`Watcher error: ${error}`));