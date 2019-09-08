var jsonlines = require('jsonlines');
var csv_stringify = require('csv-stringify');
var jaccard = require('jaccard');
var fs = require('fs');

function roundCSSValues (parsedRow){
    var processedProps ={};
    Object.entries(parsedRow).forEach(entry => {
        let propName = entry[0];
        let propValues = entry[1];
        //round property values to full pixels
        propValues = propValues.map(propVal => {
            if (propVal && propVal.endsWith && propVal.endsWith('px')){
                return Math.round(parseFloat(propVal)) + 'px';
            }
            return propVal;
        });

        //font-family to lowercase, only use first font -> more accurate similarity
        if (propName === 'font-family'){
            propValues = propValues.map(pVal => pVal.split(',')[0].toLowerCase());
        }

        //remove 0px border properties (browser default)
        if (propName.startsWith('border')){
            propValues = propValues.filter(pVal => !pVal.startsWith('0px '));
        }
        var uniquePropValues = Array.from(new Set(propValues));
        processedProps[propName] = uniquePropValues;
    
    });
    return processedProps;
}

function dumpJaccarcCSV(jsonlinesFile, options, cb){
    var parser = jsonlines.parse({ emitInvalidLines: true });
    var csvOptions = {header: true};
 
    if (options.columns){
        var cols = options.columns.split(',');
        cols.unshift("AVERAGE SIMILARITY");
        cols.unshift("URL 2");
        cols.unshift("URL 1");
        csvOptions.columns = cols;
    }


    var parsedRows = [];
    parser.on('data', function (data) {
        data.properties.url = data.url;
        parsedRows.push(data.properties);
    });

    parser.on('end', function (){       
        var jaccardRows = parsedRows.map(function(row, index, array){
            if (options['round']){
                var {url, ...rowWithoutURL} = parsedRows[index]
                parsedRows[index] = roundCSSValues(rowWithoutURL);
            }
            if (index > 0){
                var jaccardValues = {};
                var rowProps = Object.keys(row);
                var previousRow = array[index - 1];
                var jaccardIndexSum = 0;
                var comparedPropertiesNum = 0;
                
                rowProps.forEach(function(prop){
                    //return if the property is not it the desired css properties
                    if (options.columns && options.columns.split(',').indexOf(prop) == -1){
                        return false;
                    }
                    if (Array.isArray(previousRow[prop]) && Array.isArray(row[prop])){
                        var jaccardIndex = jaccard.index(previousRow[prop],row[prop]);
                        jaccardIndexSum += jaccardIndex;
                        jaccardValues[prop] = jaccardIndex;
                        comparedPropertiesNum++;
                    }
                });

                jaccardValues['AVERAGE SIMILARITY'] = jaccardIndexSum / comparedPropertiesNum;
                jaccardValues['URL 1'] = array[index-1]['url'];
                jaccardValues['URL 2'] = row.url;
                return jaccardValues;
            }
            else {
                return {};
            }
        });
        jaccardRows.shift(); //remove first entry because we have no previousRow to compare
       csv_stringify(jaccardRows, csvOptions, function(err, data){
            console.log(data);
        });
    });
    parser.write(fs.readFileSync(jsonlinesFile));
    parser.end();
}

module.exports = dumpJaccarcCSV;