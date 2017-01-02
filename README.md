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

Using the module is super simple. We export the `propget` method as default
function:

```js
var propget = require('propget');
```

The function accepts the following arguments:

- `object`, data structure that we need to walk.
- `string`, dot notated string for deeply nested object access.
- `..`, rest arguments that will be used for optional function calls.

So accessing a complex data structure can be as easy as this:

```js
'use strict';

var prop = require('propget')
  , data = { hello: 'world', yo: { deeply: ['nested', 'arrays'] } };

prop(data, 'hello'); // world
prop(data, 'yo.deeply.1'); // arrays
prop(data, 'yo.deeply.nested.unknown.keys'); // undefined
```

#### Function execution

Of one the unique functions of this module is that it allows you to execute
functions that are inside data structure. We can then re-use the result of the
function and walk it further.

```js
data = { 
  hello: { 
    world: function () { 
      return { 
        hi: 'hello'
      };
    }
  }
};

prop(data, 'hello.world().hi') // hello
```

But in addition to simple function execution we can also call these functions
with arguments. We automatically use the additionally supplied arguments to the
propget method for this.

```js
data = { 
  hello: { 
    world: function (arg) { 
      return { 
        hi: arg
      };
    }
  }
};

prop(data, 'hello.world(what).hi', 'additional') // additional
```

## License

MIT
