var chalk = require('chalk');
function CocolabsLogo(contex) {
    var logo = '\n';
        logo+= chalk.red('   ______                 __      __        \n');
        logo+= chalk.yellow('  / ____/___  _________  / /___ _/ /_  _____\n');
        logo+= chalk.green(' / /   / __ \\/ ___/ __ \\/ / __ `/ __ \\/ ___/\n');
        logo+= chalk.cyan('/ /___/ /_/ / /__/ /_/ / / /_/ / /_/ (__  ) \n');
        logo+= chalk.blue('\\____/\\____/\\___/\\____/_/\\__,_/_____/____/  ');
        logo+= '\n\n';
        logo+= 'Bienvenido al generador de proyectos "cocolabs"' + '\n';
        logo+= 'Para generar un proyecto completa los datos porfavor' + '\n';
        logo+= 'necesitas ayuda?' + chalk.cyan('  ===>  ') + chalk.green('yo cocolabs:help') + '\n';
    return logo;
}

exports.CocolabsLogo = CocolabsLogo;

// console.log(CocolabsLogo());