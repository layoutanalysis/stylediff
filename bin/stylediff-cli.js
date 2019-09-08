#!/usr/bin/env node

var fs = require('fs');
var program = require('commander');
var dumpJaccarcCSV = require('..');


program
  .version('1.0.0')
  .description("compare the similarity of two or more styledump'ed webpages and output them as CSV")
  .usage('[options] <jsonfile>')
    .option('-r, --reduce', 'reduce CSS property values by removing dead values, alternate font-families and fractional digits for pixel values.')
    .option('-c, --columns <columnlist>', 'comma-separated list of CSS properties in the CSV output (default: all)')
  .action(function(jsonfile, options) {
    if(jsonfile.length > 0) {
      dumpJaccarcCSV(jsonfile, options, function (csv){
        console.log(csv);
      });
    }
    else {
        console.error("no jsonfile provided");
        program.outputHelp()
    }
  });

program.parse(process.argv);