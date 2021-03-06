'use strict';
var util 	= require('util');
var yeoman 	= require('yeoman-generator');
var _s      = require('underscore.string');
var chalk 	= require('chalk');
var os 		= require('os');
var fs 		= require('fs');

var CocolabsGenerator = yeoman.generators.Base.extend({

	initializing: function () {
		this.path = '.' + this.env.cwd.replace(process.cwd(), '');
		var pkg = process.cwd()+'/package.json';
		if(fs.existsSync(pkg))
		{
			this.error_project = 0;
			this.pkg = require(pkg);
		}
		else
		{
			this.log('error: project not exists');
			this.log('please type command:' + chalk.green('yo cocolabs') + ' for initializing project');
			this.error_project = 1;
		}
	},
    prompting: function () {
    	var done = this.async();

    	if(this.error_project)
    		return;

    	// message
    	this.log(' ');
    	this.log('creando un modulo');
    	this.log('===================');
    	this.log(' ');

    	var tipeo = this.args.join(' ');
    	if(tipeo.length>2)
    	{
    		this.module = tipeo;
	    	this.moduleSlug = _s.slugify(tipeo);
	    	done();
    	}
    	else
    	{
    		var blockPrompts = [{
			    type: 'string',
			    name: 'module',
			    message: tipeo.length>1 ?'Crear Modulo? enter': 'Escribe Nombre de Modulo',
			    default: tipeo,
			    validate: function (answer) {
			        if (answer === '') {
			          return 'se necesita nombre del modulo';
			        }
			        else {
			          return true;
			        }
			    }
			}];

			this.prompt(blockPrompts, function (props) {
		    	this.module = props.module;
		    	this.moduleSlug = _s.slugify(props.module);
		    	done();
		    }.bind(this));

    	}

    },
    writing: function(){
    	var context = {
    		module: this.module,
    		moduleslug: this.moduleSlug,
	        appname: this.pkg.name,
	        authorname: this.pkg.author.name,
	        authoremail: this.pkg.author.email
	    };
    	this.fs.copyTpl( this.templatePath('_module.css'), this.destinationPath('static/css/'+this.moduleSlug+'.css'), context);
    	this.fs.copyTpl( this.templatePath('_module.js'), this.destinationPath('static/js/'+this.moduleSlug+'.js'), context);
    	this.fs.copyTpl( this.templatePath('_module.html'), this.destinationPath(this.moduleSlug+'.html'), context);
	}

});

module.exports = CocolabsGenerator;