# propget

Propget is a small helper utility for finding values/keys in deeply nested
objects without having to worry about undefined properties and what not. It uses
a human readable dot based notation to find items in your object or array.

## Installation

Just install it through npm, like you do with the all your code:

```
npm install --save propget
```

It doesn't use any fancy node.js magic or ES6 so it should be good to go for
browser usage as well using something as browserify.

## Usage

Using this module is super simple. It exports a single function which accepts
2 arguments;

1. The object that it needs to extract the data from
2. A dot notated string for deeply nested object access.

```js
'use strict';

var prop = require('propget')
  , data = { hello: 'world', yo: { deeply: ['nested', 'arrays'] } };

prop(data, 'hello'); // world
prop(data, 'yo.deeply.1'); // arrays
prop(data, 'yo.deeply.nested.unknown.keys'); // undefined
```

## License

MIT
