---
title: Format JavaScript date
tags: [javascript, wiki]
updated: Dec 31 2022
---

For custom-delimited date formats, you have to pull out the date (or time) components from a `DateTimeFormat` object (which is part of the ECMAScript Internationalization API), and then manually create a string with the delimiters you want.

To do this, you can use `DateTimeFormat.formatToParts()`:

```
const date = new Date('2010-08-05');
const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' });
const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat.formatToParts(date);

console.log(`${day}-${month}-${year}`);
```

You can also pull out the parts of a `DateTimeFormat` one-by-one using `DateTimeFormat.format()`, but note that when using this method, as of March 2020, there is a bug in the ECMAScript implementation when it comes to leading zeros on minutes and seconds (this bug is circumvented by the approach above).

```
const d = new Date('2010-08-05');
const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);

console.log(`${da}-${mo}-${ye}`);
```
