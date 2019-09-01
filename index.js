var jsonlines = require('jsonlines');
var csv_stringify = require('csv-stringify');
var jaccard = require('jaccard');
var fs = require('fs');


function dumpJaccarcCSV(jsonlinesFile, options, cb){
    var parser = jsonlines.parse({ emitInvalidLines: true });
    var parsedRows = [];
    parser.on('data', function (data) {
        data.properties.url = data.url;
        parsedRows.push(data.properties);
    });

    parser.on('end', function (){
        var jaccardRows = parsedRows.map(function(row, index, array){
            if (index > 0){
                var jaccardValues = {};
                var rowProps = Object.keys(row);
                var previousRow = array[index - 1];
                rowProps.forEach(function(prop){
                    if (Array.isArray(previousRow[prop]) && Array.isArray(row[prop])){
                        jaccardValues[prop] = jaccard.index(previousRow[prop],row[prop]);
                    }
                });
                jaccardValues['url'] = row.url; //TODO: make this configurable
                return jaccardValues
            }
            else {
                return {};
            }
        });
        jaccardRows.shift(); //remove first entry because we have no previousRow to compare
       csv_stringify(jaccardRows, {header: true}, function(err, data){
            console.log(data);
        });
    });
    parser.write(fs.readFileSync(jsonlinesFile));
    parser.end();
}

module.exports = dumpJaccarcCSV;