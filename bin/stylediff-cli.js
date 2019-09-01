#!/usr/bin/env node

var fs = require('fs');
var program = require('commander');
var dumpJaccarcCSV = require('..');


program
  .version('1.0.0')
  .description("compare the similarity of two or more styledump'ed webpages and output them as CSV")
  .usage('[options] <jsonfile>')
    .option('-r, --round-pixels', 'round pixel values before comparison (11.775 px -> 12px)')
  .action(function(jsonfile, options) {
    if(jsonfile.length > 0) {
      dumpJaccarcCSV(jsonfile, {"exclude": []}, function (csv){
        console.log(csv);
      });
    }
    else {
        console.error("no jsonfile provided");
        program.outputHelp()
    }
  });

program.parse(process.argv);