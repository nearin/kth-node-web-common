## Handlebar Helpers ##

This is a set of standard helpers needed in most KTH node-web projects. 

Register helpers:

```JavaScript
const registerHeaderContentHelper = require('kth-node-web-common/lib/handlebars/helpers/headerContent')

registerHeaderContentHelper({
  proxyPrefixPath: '/app/mount/point',
  version: 'x.x.x'
})
```

Usage in templates:

- {{ withVersion url }} -- appends `'?v=' + version` to the passed string
- {{ extend name options }} -- calls the function options.fn with content of block **name** as param and adds it to named block
- {{ prefixScript url name }} -- add a script tag with version set to script block **name**
- {{ prefixStyle url name media }} -- add a style tag for named media type with version set to style block **name**
- {{ render name }} -- used by a layout to render script and style blocks in appropriate places

## Cortina Blocks ##

Express middleware to fetch Cortina CMS blocks for requests with layouts requiring them:

Uses https://github.com/KTH/kth-node-cortina-block

```JavaScript
route.use('/app/mount/point', require('kth-node-web-common/lib/web/cortina')({
  blockUrl: 'https://url.to/fetch/block',
  addBlocks: {  // Optional way of adding Cortina blocks on top of defaults
    menu: '1.678435'
  },
  proxyPrefixPath: '/app/mount/point',
  hostUrl: 'http://server_host:port',
  redisConfig: { ... } // Redis config object, see kth-node-configuration
}))
```

## Crawler Redirect ##
Middleware to handle redirects for crawlers.

```JavaScript
const excludePath = '/app/mount/point' + '(?!/static).*'
const excludeExpression = new RegExp(excludePath)
server.use(excludeExpression, require('kth-node-web-common/lib/web/crawlerRedirect')({
  hostUrl: 'http://sertver_host:port',
}))
```

## Language ##
Middleware and helper methods to set and get language for this request.

Register the middleware:

```JavaScript
const { languageHandler } = require('kth-node-web-common/lib/language')
sever.use('/app/mount/point', languageHandler)
```

In a controller you can get the language using the helper method **getLanguage**:

```JavaScript
const language = require('kth-node-web-common/lib/language')
const lang = language.getLanguage(res)

```