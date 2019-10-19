const chalk = require('chalk');
const server = require('./controller.js');
const port = 3000;

server.listen(port, (error)  => {
    if (error){
        console.log(chalk.red('Something went wrong', error))
    } else {
        console.log(chalk.green('Server is listening on port ' + port+'...'))
    }
})