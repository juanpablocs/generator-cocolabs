'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var os = require('os');

var CocolabsHelpGenerator = yeoman.generators.Base.extend({

    askFor: function()
    {
    	var cb = this.async();
    	var that = this;
		this.pkg = require('../package.json');
		
		var txt = [
			'',
			'cocolabs@v'+this.pkg.version,
			'node@v'+process.version.substring(1),
			'os@'+os.type() + ' ' + os.release(),
			'',
			'Cocolabs Commands',
			'	yo cocolabs 		"crea un proyecto"',
			'	yo cocolabs:module	"1 argumento (string) crea un modulo"',
			'	yo cocolabs:backend	"crea tecnologias backend"',
			'	yo cocolabs:frontend	"crea tecnologias frontend"',
			'	yo cocolabs:help	"lista de comandos"',
			'',
			'Gulp Commands',
			'	gulp		"compila las tareas"',
			'	gulp watch	"escucha cambios"',
			'	gulp deploy	"sube ficheros a un servidor remoto"',
			'	gulp coffee	"compila coffescript a javascript"',
			'	gulp stylus	"compila stylus a css"',
			'	gulp icons	"genera icons de fuentes ttf"',
			'',
			'Fork：https://github.com/cocolabs/generator-cocolabs',
			'author by juanpablocs21@gmail.com',
			''
		].forEach(function(item){
			that.log(item);
		});
    }
});

module.exports = CocolabsHelpGenerator;