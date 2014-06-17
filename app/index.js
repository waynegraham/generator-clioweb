'se strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var CliowebGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Clioweb generator!'));

    var prompts = [
      {
        name: 'projectName',
        message: 'What would you like to name this project?',
        default: 'Foobar'
      },
      {
        name: 'description',
        message: 'Describe the project',
        default: "Just another Scholars' Lab Joint"
      },
      {
        type: 'confirm',
        name: 'compass',
        message: "Would you like to enable Compass & Susy?",
        default: true
      },
      {
        type: 'confirm',
        name: 'bower',
        message: 'Would you like to use bower?',
        default: true
      }
    ];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;
      this.description = props.description;
      this.bower       = props.bower;
      this.compass     = props.compass;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('_layouts');
    this.mkdir('_includes');
    this.mkdir('css');
    this.mkdir('js');

    if (this.compass) {
      this.mkdir("scss");
      this.mkdir("scss/common");
      this.mkdir("scss/modules");

      this.copy("_config.yml", "_config.yml");
      this.copy("_Gemfile", "Gemfile");
      this.copy("scss/style.scss", "scss/style.scss");
    }

    this.copy('_Gruntfile.js', 'Gruntfile.js');
    this.copy('_LICENSE', 'LICENSE');
    this.copy('_README.md', 'README.md');
    this.copy('index.html', 'index.html');
    this.copy('css/main.css', 'css/main.css');
    this.copy('js/plugin.js', 'js/plugin.js');

    this.copy('_layouts/default.html', '_layouts/default.html');
    this.copy('_includes/footer.html', '_includes/footer.html');
    this.copy('_includes/head.html', '_includes/head.html');
    this.copy('_includes/header.html', '_includes/header.html');

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = CliowebGenerator;
