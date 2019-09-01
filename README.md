# jaccard2csv
calculate the [Jaccard index](https://en.wikipedia.org/wiki/Jaccard_index) between two neighboring objects in a [JSONLines](http://jsonlines.org/) file and output it as CSV. 

jaccard2csv was written to do quick similarity comparisons between a series of [styledump](https://github.com/layoutanalysis/styledump) outputs.

## Installation

```
npm install -g layoutanalysis/jaccard2csv
```

## Usage (Command line)

```
jaccard2csv jsonobjects.jsonl > jaccard.csv
```
jsonobjects.jsonl
```
{"font-size": ["11px","13px"], "font-family":["Arial","sans-serif"]}
{"font-size": ["11px","20px",13px"], "font-family":["Arial","sans-serif"]}
{"font-size": ["11px","20px",13px"], "font-family":["Verdana","sans-serif"]}
```

example output: 
```
TBD
```

## License

ISC

---

