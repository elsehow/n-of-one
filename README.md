# n-of-one

an HTTP interface for tracking events in a simple way

## quick start 

let's say you want to make a timestamp every time you drink coffee

in one shell,

```sh
n-of-one --port=8993 --cors=true --out=coffees.csv
```

now, whenever you hit localhost:8993, a timestamp will be written to coffees.csv

```sh
curl http://locahost:8993
cat coffees.csv
```

[Usage for the CLI](USAGE.txt)

## install

```
npm i n-of-one
```

## license

BSD
