---
title: Miscellaneous
description: Everything else that doesn't fit into another category
---

## Format JavaScript date

For custom-delimited date formats, you have to pull out the date (or time)
components from a `DateTimeFormat` object (which is part of the ECMAScript
Internationalization API), and then manually create a string with the delimiters
you want.

To do this, you can use `DateTimeFormat.formatToParts()`:

```
const date = new Date('2010-08-05');
const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' });
const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat.formatToParts(date);

console.log(`${day}-${month}-${year}`);
```

You can also pull out the parts of a `DateTimeFormat` one-by-one using
`DateTimeFormat.format()`, but note that when using this method, as of March
2020, there is a bug in the ECMAScript implementation when it comes to leading
zeros on minutes and seconds (this bug is circumvented by the approach above).

```
const d = new Date('2010-08-05');
const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);

console.log(`${da}-${mo}-${ye}`);
```

## Freestyle Jenkins Webhook

1. Create a personal ai token for your user.

`User > Settings > Developer Settings > Personal access tokens`

2. Append the token to repository url.

`https://<API-TOKEN>@github.com/jsnal/<REPO>`

3. Add webhook to Jenkins

`Settings > Webhooks > http://<URL>/github-webhook`

## Style Gallery

This is a sample show-casing how different kinds of Markdown syntax get marked
up and styled when rendered on this website.

## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

### Inline styles

- *Italics*
- **Bold**
- ~~Strikethrough~~

### Blocks

> This is a block quote.

### Unordered lists

*  Bullet point
*  Bullet point
    * Nested point
    * Nested point

### Ordered lists

1.  First
2.  Second
    1.  Nested
    2.  Nested

### Code

This sentence contains an `inline code` snippet.

```javascript
console.log('This is a fenced code block');
`````

### Links

Here we have [an example link](http://example.com).

### Tables

| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |

### Other

This is a horizontal rule:

---

