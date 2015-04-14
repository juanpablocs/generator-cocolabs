'use strict';
var yeoman  = require('yeoman-generator');
var yosay   = require('yosay');
var logo    = require('./logo').CocolabsLogo;
var _s      = require('underscore.string');
var chalk   = require('chalk');

// init app
var CocolabsGenerator = yeoman.generators.Base.extend({

  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // mostrar logo
    this.log(logo(this));

    var prompts = [
      {
        type: 'input',
        name   : 'author',
        message: 'Author Name:',
        default: 'jpmaster'
      },
      {
        type: 'input',
        name   : 'email',
        message: 'Author Email:',
        default: 'jpmaster.net@gmail.com'
      },
      {
        type: 'string',
        name   : 'name',
        message: 'Project Name ' + chalk.red('required') + ' :',
        validate: function (input) {
          if (input === '') {
            return 'Please enter your Project Name';
          }
          else {
            return true;
          }
        }
      },
      {
        name   : 'version',
        message: 'Version:',
        default: '0.1.0'
      },
      {
        type: 'confirm',
        name: 'includeSlim',
        message: 'Project Backend install Slim?',
        default: false
      },
      {
        type: 'list',
        name: 'versionControl',
        message: 'Which ' + 'version control software'.blue + ' are you using (or plan to use)?',
        choices: ['Git', 'SVN', 'None (I like to live on the edge)'],
        filter: function(val) {
          var filterMap = {
            'Git': 'git',
            'SVN': 'svn',
            'None (I like to live on the edge)': 'none'
          };

          return filterMap[val];
        }
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      this.projectName = props.name;
      this.projectSlug = _s.slugify(props.name);

      done();
    }.bind(this));
  },

  // crea folder si no esta en la ruta del folder
  configuring: function () {
    if (!this.options['init']) {
      this.destinationRoot(this.projectSlug);
    }
  },

  writing: {
    app: function () {

      var context = {
        title: this.props.name,
        description: 'WebApp application Generated from Cocolabs',
        version: this.props.version,
        appname: this.projectSlug,
        authorname: this.props.author,
        authoremail: this.props.email
      };

      this.mkdir('static');
      this.mkdir('static/css');
      this.mkdir('static/js');
      this.mkdir('static/img');

      this.fs.copyTpl( this.templatePath('_package.json'), this.destinationPath('package.json'), context);
      this.fs.copyTpl( this.templatePath('_index.html'), this.destinationPath('index.html'), context );
      this.fs.copyTpl( this.templatePath('_base.css'), this.destinationPath('static/css/base.css'), context );
      
    }
  },

  install: function () {
    this.installDependencies();

    this.on('end', function () {
      console.log('terminooooo!');
      }.bind(this));
    }

});

module.exports = CocolabsGenerator;
