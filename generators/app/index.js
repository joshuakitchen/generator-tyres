"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const extend = require("deep-extend");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Generate your ${chalk.red("TyRES")} project!`));

    return this.prompt([
      {
        type: "input",
        name: "name",
        message: "What would you like to call your project?",
        default: ""
      }
    ]).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  default() {
    this.composeWith(require.resolve("generator-node/generators/app"), {
      boilerplate: false,
      name: this.props.name
    });
  }

  writing() {
    const pkg = this.fs.readJSON(this.destinationPath("package.json"), {});

    extend(pkg, {
      scripts: {
        start: "node out/index.js",
        build: "npm run webpack:build && npm run server:build",
        "server:dev":
          "NODE_ENV=development nodemon -x ts-node --ignore ./static --ignore src/client src/server/index.ts",
        "server:build": "tsc -p ./src/server/tsconfig.json",
        "webpack:dev":
          "NODE_ENV=development webpack --watch --progress --mode=development",
        "webpack:build":
          "NODE_ENV=production webpack --mode=production --progress"
      },
      dependencies: {
        dotenv: "16.0.1",
        express: "4.18.1",
        morgan: "1.10.0",
        nunjucks: "3.2.3",
        winston: "3.7.2"
      },
      devDependencies: {
        "@types/express": "4.17.13",
        "@types/morgan": "1.9.3",
        "@types/nunjucks": "3.2.1",
        "@types/react": "18.0.9",
        "@types/react-dom": "18.0.4",
        "css-loader": "6.7.1",
        "mini-css-extract-plugin": "2.6.0",
        nodemon: "2.0.16",
        react: "18.1.0",
        "react-dom": "18.1.0",
        "react-router": "6.3.0",
        "react-router-dom": "6.3.0",
        sass: "1.52.0",
        "sass-loader": "13.0.0",
        "style-loader": "3.3.1",
        "ts-loader": "9.3.0",
        "ts-node": "10.7.0",
        "tsconfig-paths-webpack-plugin": "3.5.2",
        typescript: "4.6.4",
        webpack: "5.72.1",
        "webpack-cli": "4.9.2"
      }
    });

    this.fs.writeJSON(this.destinationPath("package.json"), pkg);

    this.fs.copy(
      this.templatePath("webpack.config.js"),
      this.destinationPath("webpack.config.js")
    );
    this.fs.copy(
      this.templatePath("Dockerfile"),
      this.destinationPath("Dockerfile")
    );
    this.fs.copy(
      this.templatePath("templates"),
      this.destinationPath("templates")
    );
    this.fs.copy(this.templatePath("src"), this.destinationPath("src"));
  }
};
