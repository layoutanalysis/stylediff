# stylediff
stylediff was written to do quick similarity comparisons between a series of [styledump](https://github.com/layoutanalysis/styledump) outputs.
It calculates the [Jaccard index](https://en.wikipedia.org/wiki/Jaccard_index) between two neighboring objects in a [JSONLines](http://jsonlines.org/) file and output it as CSV. 



## Installation

```
npm install -g layoutanalysis/stylediff
```

## Usage (Command line)

First install [styledump](https://github.com/layoutanalysis/styledump) to collect the styledumps of a few web archive snapshots. `>> example.com.jsonl` simply appends the output of styledump to the file `example.com.jsonl`, thus generating a [JSONLines](http://jsonlines.org/) file.

```
> styledump http://web.archive.org/web/2009/http://www.example.com/ >> example.com.jsonl
> styledump http://web.archive.org/web/2014/http://www.example.com/ >> example.com.jsonl
> styledump http://web.archive.org/web/2019/http://www.example.com/ >> example.com.jsonl
```
Then invoke stylediff to generate a CSV file that compares the style attributes using the Jaccard index (1 = identity, 0 = complete dissimilarity)

```
stylediff --columns "font-family,color,line-height,background" "example.com.jsonl"
```

example output: 
```
url,font-family,color,line-height,background
http://web.archive.org/web/20150101000457/http://www.example.com/,0,0.3333333333333333,1,1
http://web.archive.org/web/20190901174525/https://example.com/,1,1,1,1
```

## License

ISC

---

