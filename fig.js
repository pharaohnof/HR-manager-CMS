const figlet = require('figlet');
const chalk = require('chalk');

// figlet.fonts(function(err, fonts) {
//     if (err) {
//         console.log('something went wrong...');
//         console.dir(err);
//         return;
//     }
//     console.dir(fonts);
// });

figlet('H. R. Management System', {font: 'dos rebel' },(err, data) => {
    if (err){
        console.dir(err);
        return;
    }
    console.log(chalk.blue(data))
})