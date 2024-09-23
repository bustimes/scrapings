this tries to use the [git scraping](https://simonwillison.net/2020/Oct/9/git-scraping/) technique to track changes to:

- bustimes.org's advertising script ([bustimes.js](bustimes.js))
  - using [js-beautify](https://github.com/beautifier/js-beautify) to reverse some minification
- the traveline national operator codes (NOC) database ([nocrecords.xml](nocrecords.xml))[^1]
  - using iconv to fix the encoding and xmllint to indent the XML nicely
- the national public transport access nodes (NaPTAN) bus stops list ([naptan/](naptan))[^1]
  - using [qsv](https://github.com/jqnatividad/qsv) to partition the data by AdministrativeAreaCode so it's not one big file

[^1]: Contains public sector information licensed under the [Open Government Licence v3.0](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/)
