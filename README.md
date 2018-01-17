# html-beautify-webpack-plugin
Beautifier for output of [HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin)

Installation
------------
Install the plugin with npm:
```shell
$ npm i -D html-beautify-webpack-plugin
```

Usage
-----------


```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');

...
    plugins: [
        new HtmlWebpackPlugin()
        new HtmlBeautifyPlugin()
    ]
...
```

```javascript
...
    plugins: [
        new HtmlWebpackPlugin()
        new HtmlBeautifyPlugin({
                config: {
                    html: {
                        end_with_newline: true,
                        indent_size: 2,
                        indent_with_tabs: true,
                        indent_inner_html: true,
                        preserve_newlines: true,
                        unformatted: ['p', 'i', 'b', 'span']
                    }
                },
                replace: [ ' type="text/javascript"' ]
            })
    ]
...
```

    Order is important

Configuration
-------------
You can pass a configuration options.
Allowed values are as follows:

- `config`: `{...}` [js-beautify](https://github.com/beautify-web/js-beautify)'s options as object to beatify the output.
- `replace`: `[string | { test: (string | RegExp), with?: (string | func)}]` Optional array of items to replace in destination file

