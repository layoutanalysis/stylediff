#!/usr/bin/env node

var fs = require('fs');
var program = require('commander');
var dumpJaccarcCSV = require('..');


//jaccard2csv --exclude "url" <jsonfile>
program
  .version('1.0.0')
  .description('calculates the jaccard distance for the objects in the jsonl file and outputs them as csv')
  .usage('[options] <jsonfile>')
    .option("-i, --input", "path to the .jsonl file")
    .option("-e, --exclude", "comma-separated list of attributes that should be excluded from the calculation")
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