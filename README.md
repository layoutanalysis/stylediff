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
URL 1,URL 2,AVERAGE SIMILARITY,font-family,color,line-height,background
http://web.archive.org/web/20091231215808/http://www.example.com/,http://web.archive.org/web/20150101000457/http://www.example.com/,0.5833333333333333,0,0.3333333333333333,1,1
http://web.archive.org/web/20150101000457/http://www.example.com/,http://web.archive.org/web/20190901174525/https://example.com/,1,1,1,1,1
```
## Command Line Interface

Usage: stylediff [options] <jsonlfile>

compare the similarity of two or more styledump'ed webpages and output them as CSV

Options:
  -V, --version               output the version number
  -r, --reduce                reduce CSS property values by removing dead values, alternate font-families and fractional digits for pixel values.
  -c, --columns <columnlist>  comma-separated list of CSS properties in the CSV output (default: all)
  -h, --help                  output usage information

The `-r` option tries to remove irrelevant (parts) of CSS property values before performing the comparison. Examples:

| Before Removal | After Removal | Description |
| --- | --- |---|
| `"font-family":["Georgia, \"Times New Roman\", Times, serif","Arial", "Arial, sans-serif"]` | `"font-family":["Georgia","Arial"]` | Fallback font families are rarely effective in the age of web fonts. By removing them, we get a more accurate number of the used font-families  |
| `"border":["0px solid #595959","1px solid #C8C8C8","none","0"]` |  `"border":["1px solid #C8C8C8"]` | zero-pixel or "none" borders are not visible, so they shouldn't be counted as border style |
| `"margin-top": ["80px", "21.44px", "21px", "0px"]` |`"margin-top": ["80px", "21px", "0px"]` | dimensions specified in units other than pixel sometimes lead to fractional digits, which have no relevance for the page display. |

## License

ISC

---

