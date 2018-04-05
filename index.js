const webpack = require('webpack')
const _ = require('lodash')
const chalk = require('chalk')
const assert = require('assert')
const beautify = require('js-beautify').html
const webpackLatest = !_.isNil(webpack.version) && /.*4(\.\d+){0,2}/gi.test(webpack.version)

function HtmlBeautifyPlugin ({ config = {}, replace } = { config: {}, replace: [] }) {

	assert(config && typeof config === 'object' , chalk.red('Beautify config should be an object.'))

	this.options = {
		config: _.extend({
			indent_size: 4,
			indent_with_tabs: false,
			html: {
				end_with_newline: true,
				indent_inner_html: true,
				preserve_newlines: true,
			}
		}, config),
		replace: replace || []
	}
}

function htmlPluginDataFunction (htmlPluginData, callback, _this) {
    htmlPluginData.html = beautify(_.reduce(_this.options.replace, (res, item) => {
        if(typeof item === 'string' || item instanceof RegExp)
            return res.replace(item instanceof RegExp ? item : new RegExp(item, 'gi'), '')
        else
            return res.replace(item.test instanceof RegExp ? item.test : new RegExp(item.test, 'gi'), item.with || '')
    }, htmlPluginData.html), _this.options.config)

    callback(null, htmlPluginData)
}

HtmlBeautifyPlugin.prototype.apply = function (compiler) {
    if (!webpackLatest) {
        compiler.plugin('compilation', compilation =>
            compilation.plugin('html-webpack-plugin-after-html-processing', (htmlPluginData, callback) => {
                htmlPluginDataFunction(htmlPluginData, callback, this)
            })
        )
    } else {
        compiler.hooks.compilation.tap('HtmlBeautifyPlugin', compilation =>
            compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync('HtmlBeautifyPlugin', (htmlPluginData, callback) => {
                htmlPluginDataFunction(htmlPluginData, callback, this)
            })
        )
    }
}

module.exports = HtmlBeautifyPlugin