// #@ts-check
(function(window, document){
  
  // prerequisites
  if ( ! ( 'querySelectorAll' in document ) ||
       ! ( 'filter' in [] ) ||
       ! ( 'content' in document.createElement('template') ) ){ return; }

  if ( ! ( 'JekyllWebmentionIO' in window ) ){ window.JekyllWebmentionIO = {}; }

  //
  // Public Properties
  //
  JekyllWebmentionIO.existing_webmentions = [];

  //
  // Public Methods
  //

  JekyllWebmentionIO.processWebmentions = function( data ){
    // console.log( 'incoming webmentions', data.links );
    if ( data && ! ( 'error' in data ) )
    {
      var webmentions = data.links.reverse();
      
      webmentions = rationalizeIds( webmentions );
      
      webmentions = removeDuplicates( webmentions );

      // We may not need to proceed if we had them all
      if ( webmentions.length )
      {
        webmentions = addMetadata( webmentions );

        // hande them out
        doleOutWebmentions( webmentions );

        // reset the counters
        if ( this.counter_update_event )
        {
          document.dispatchEvent( this.counter_update_event );
        }
      }
      else
      {
        // console.log( 'no new webmentions to add' );
      }
    }
  };

  //
  // Private Properties
  //

  var webmention_receivers = {},
      templates = {};

  //
  // Private Methods
  //

  // Gathers embewdded templates
  function collectTemplates()
  {
    var $templates = document.querySelectorAll( 'template[id^=webmention-]' ),
        t = $templates.length,
        $template;
    
    while ( t-- )
    {
      $template = $templates[t];
      // We only need the list (if one exists)
      if ( $template.content.querySelector('ol') )
      {
        templates[$template.id] = $template.content.querySelector('ol');
      }
      else
      {
        templates[$template.id] = $template.content;
      }
    }
    $template = null;
  }

  // Collects webmentions that are already on the page
  function collectExistingWebmentions()
  {
    var $existing_webmentions = document.querySelectorAll( '[id^=webmention-]' ),
        e = $existing_webmentions.length;
    
    while ( e-- )
    {
      JekyllWebmentionIO.existing_webmentions.push(
        $existing_webmentions[e]
            .getAttribute( 'id' )
            .replace( 'webmention-', '' )
      );
    }

    $existing_webmentions = null;
  }

  function identifyWebmentionCollections()
  {
    var $webmention_collections = document.querySelectorAll( '.webmentions' ),
        w = $webmention_collections.length,
        $webmention_collection,
        type,
        types, t;

    // Assign the type & template if we can determine it
    while ( w-- )
    {
      $webmention_collection = $webmention_collections[w];

      // Assign the type
      type = 'webmentions'; // Generic
      if ( $webmention_collection.className.indexOf('webmentions--') > -1 )
      {
        type = $webmention_collection.className.match(/webmentions\-\-(.*)/)[1];
      }
      $webmention_collection.type = type;
      
      // Assign the template
      if ( templates['webmention-' + type] )
      {
        $webmention_collection.template = templates['webmention-' + type];
      }
      
      // Add to the queues
      if ( 'dataset' in $webmention_collection &&
          'webmentionTypes' in $webmention_collection.dataset )
      {
        types = $webmention_collection.dataset.webmentionTypes.split(',');
      }
      else
      {
        types = [ type ];
      }
      t = types.length;
      while (t--)
      {
        type = types[t];
        if ( ! ( type in webmention_receivers ) )
        {
          webmention_receivers[type] = [];
        }
        webmention_receivers[type].push( $webmention_collection );
      }
    }
    
    $webmention_collection = null;
  }

  // Divvies up the webmentions and populate the lists
  function doleOutWebmentions( webmentions )
  {
    var i = 0, j,
        webmention,
        incoming = {},
        queue_keys = Object.keys( webmention_receivers ),
        plural_type,
        typeFilter = function(key) {
          return JekyllWebmentionIO.types[key] === this.type;
        },
        typeFilterLoop;
    
    // set up the queues
    i = queue_keys.length;
    while( i--)
    {
      incoming[queue_keys[i]] = [];
    }

    // Assign the webmentions to their respective queues
    i = webmentions.length;
    
    while ( i-- )
    {
      webmention = webmentions[i];
      // reverse lookup to get the plural from the singular
      typeFilterLoop = typeFilter.bind(webmention);
      plural_type = Object.keys(JekyllWebmentionIO.types)
                          .filter(typeFilterLoop)[0];
      
      // Is there a specific queue requesting this?
      if ( queue_keys.indexOf( plural_type ) > -1 )
      {
        incoming[plural_type].push( webmention );
      }
      
      // If there’s a generic, add it there too
      if ( incoming.webmentions )
      {
        incoming.webmentions.push( webmention );
      }
    }
    
    // Now hand them out
    i = queue_keys.length;
    while( i-- )
    {
      j = webmention_receivers[queue_keys[i]].length;
      while ( j-- )
      {
        // No point passing nothing
        if ( incoming[queue_keys[i]].length > 0 )
        {
          addWebmentionsToCollection( incoming[queue_keys[i]], webmention_receivers[queue_keys[i]][j] );
        }
      }      
    }

  }

  function addWebmentionsToCollection( mentions, $webmention_collection )
  {
    if ( mentions.length < 1 )
    {
      console.warn( 'No webmentions to add, check your application code' );
      return;
    }

    if ( ! $webmention_collection.template )
    {
      console.error( 'No template found for this webmention group', $webmention_collection );
      return;
    }

    if ( ! ( 'Liquid' in window ) )
    {
      console.error( 'Liquid parsing engine is not available' );
      return;
    }

    var $list = $webmention_collection.querySelector('.webmentions__list'),
        template = $webmention_collection.template,
        mode = 'append',
        html;

    // Already working with a list
    if ( $list )
    {
      template = Liquid.parse( template.innerHTML );
    }
    // Need a list
    else
    {
      template = Liquid.parse( template.outerHTML );
      mode = 'replace';
    }

    // append
    html = template.render({ 'webmentions': mentions });
    if ( mode == 'append' )
    {
      $list.innerHTML += html;
    }
    else
    {
      $webmention_collection.innerHTML = html;
    }

    // console.log( 'Successfully added', mentions.length );
  }
    
  // Uses the ID attribute for everything except tweets
  function rationalizeIds( webmentions )
  {
    // console.log( 'rationizing IDs' );
    var i = webmentions.length,
        id,
        url;

    while ( i-- )
    {
      id = webmentions[i].id;
      url = webmentions[i].data.url || webmentions[i].source;
      if ( url && url.indexOf( 'twitter.com/' ) > -1 )
      {
        // Unique tweets gets unique IDs
        if ( url.indexOf( '#favorited-by' ) < 0 )
        {
          id = url.replace( /^.*?status\/(\d+)$/, '$1' );
        }
      }
      // coerce to a string
      webmentions[i].id = id + '';
    }

    //console.log( webmentions.length, 'IDs rationalized' );
    return webmentions;
  }

  // Removes duplicate webmentions
  function removeDuplicates( webmentions )
  {
    // console.log( 'removing duplicates' );
    // going backwards, so reverse things to start out
    webmentions.reverse();

    var unique_webmentions = [],
        i = webmentions.length,
        id;
    
    while ( i-- )
    {
      if ( JekyllWebmentionIO.existing_webmentions.indexOf( webmentions[i].id ) < 0 )
      {
        unique_webmentions.push(webmentions[i]);
        JekyllWebmentionIO.existing_webmentions.push(webmentions[i].id);
      }
    }

    // console.log( 'removed', webmentions.length - unique_webmentions.length, 'duplicates', unique_webmentions );
    return unique_webmentions;
  }

  // Adds the necessary metadata to each webmention object for the liquid templates
  function addMetadata( webmentions )
  {
    // console.log( 'adding metadata' );
    // going backwards, so reverse things to start out
    webmentions.reverse();

    var i = webmentions.length,
        webmention,
        webmention_object,
        uri,
        source,
        pubdate,
        type,
        title,
        content,
        read = function( html_source ){
          if ( html_source )
          {
            updateTitle( this.id, this.uri, html_source );
          }
        },
        loop_read;

    while ( i-- )
    {
      webmention = webmentions[i];

      uri = webmention.data.url || webmention.source;

      source = false;
      if ( uri.indexOf('twitter.com/') )
      {
        source = 'twitter';
      }
      else if ( uri.indexOf('/googleplus/') > -1 )
      {
        source = 'googleplus';
      }

      pubdate = webmention.data.published_ts;
      if ( ! pubdate && webmention.verified_date )
      {
        pubdate = webmention.verified_date;
      }
      if ( pubdate )
      {
        pubdate = (new Date(pubdate)).getTime();
      }
      
      webmention_object = {
        id:      webmention.id,
        url:     uri,
        source:  source,
        pubdate: pubdate,
        raw:     webmentions[i]
      };

      if ( 'author' in webmention.data )
      {
        webmention_object.author = webmentions[i].data.author;
      }
              
      type = webmentions[i].activity.type;
      if ( ! type )
      {
        if ( source == 'googleplus' )
        {
          if ( uri.indexOf('/like/') > -1 )
          {
            type = 'like';
          }
          else if ( uri.indexOf( '/repost/' ) > -1 )
          {
            type = 'repost';
          }
          else if ( uri.indexOf( '/comment/' ) > -1 )
          {
            type = 'reply';
          }
          else
          {
            type = 'link';
          }
        }
        else
        {
          type = 'post';
        }
      }
      webmention_object.type = type;

      // Posts
      title = false;
      if ( type == 'post' )
      {
        loop_read = read.bind({
          id: webmention_object.id,
          uri: uri
        });
        readWebPage( uri, loop_read );
      }

      content = webmention.data.content;
      if ( type != 'bookmark' && type != 'link' && type != 'post' && type != 'reply' )
      {
        content = webmention.activity.sentence_html;
      }
      webmention_object.content = content;

      // replace the existing webmention
      webmentions[i] = webmention_object;
    }

    // console.log( 'added metadata to', webmentions.length, 'webmentions' );
    return webmentions;
  }

  // Async update of the title
  function updateTitle( webmention_id, url, html_source )
  {
    var $webmention = document.querySelector( '#webmention-' + webmention_id ),
        $current_title = $webmention.querySelector( '.webmention__title' ),
        $page = document.createElement('html'),
        title = '',
        $link_title,
        $title,
        $h1;

    $page.innerHTML = html_source;
    $title = $page.querySelector('title');
    $h1 = $page.querySelector('h1');

    if ( $current_title.length < 0 )
    {
      $current_title = $webmention.querySelector( '.webmention__content' );
    }

    if ( $current_title.length > 0 )
    {
      if ( $title.length > 0 )
      {
        title = $title.innerText;
      }
      else
      {
        if ( $h1.length > 0 )
        {
          title = $h1.innerHTML;
        }
        else
        {
          title = 'No title available';
        }
      }

      if ( title )
      {
        // cleanup
        title = title.replace( /<\/?[^>]+?>}/, '' );
        $link_title = document.createElement('a');
        $link_title.href = url;
        $link_title.appendChild( document.createTextNode( title ) );
        // replace title contents
        $current_title.innerHTML = $link_title.outerHTML;
      }
    }
  }

  // Synchromous XHR proxied through whateverorigin.org
  function readWebPage( uri, callback )
  {
      // jshint -W021
      if ( 'XMLHttpRequest' in window )
      {
        var XHR = new XMLHttpRequest();
        readWebPage = function( uri, callback ){
          var done = false;
          uri = '//whateverorigin.org/get?url=' + encodeURIComponent( uri );
          XHR.onreadystatechange = function() {
            if ( this.readyState == 4 && ! done ) {
              done = true;
              callback( XHR.responseText );
            }
          };
          XHR.onabort = function() {
            if ( ! done )
            {
              done = true;
              callback( false );
            }
          };
          XHR.onerror = XHR.onabort;
          XHR.open( 'GET', uri );
          XHR.send( null );
        };
      }
      else
      {
        readWebPage = function( uri, callback ){
          callback( false );
        };
      }
      // jshint +W021
      return readWebPage( uri, callback );
  }

  // init
  collectTemplates();
  collectExistingWebmentions();
  identifyWebmentionCollections();
  
}(this, this.document));// @ts-check
/**
 *  WebMentions.io JS
 *  A re-tooling of Aaron Parecki’s recommended JS for using the WebMention.io API
 * 
 *  Updates Webmentions on a static site immediately when the page is loaded and
 *  in real-time (using WebSockets) as the user engages with the page.
 * 
 * To inform the JavaScript of additional URLs to check (e.g. when the current page 
 * receives redirects from old URLs), use the following meta element:
 * 
 *  <meta property="webmention:redirected_from" content="URL_1,URL_2">
 * 
 * The content should be a single URL or multiple, separated by commas.
 */

;(function( window, document ){
  'use strict';
  
  if ( ! window.location.origin )
  {
    window.location.origin = window.location.protocol + '//' + window.location.host;
  }

  // http://tokenposts.blogspot.com.au/2012/04/javascript-objectkeys-browser.html
  if (!Object.keys) Object.keys = function(o) {
    if (o !== Object(o))
    throw new TypeError('Object.keys called on a non-object');
    var k=[],p;
    for (p in o) if (Object.prototype.hasOwnProperty.call(o,p)) k.push(p);
    return k;
  };

}(this,this.document));var Liquid={author:'Matt McCray <darthapo@gmail.com>',version:'1.3.2',readTemplateFile:function(path){throw("This liquid context does not allow includes.");},registerFilters:function(filters){Liquid.Template.registerFilter(filters);},parse:function(src){return Liquid.Template.parse(src);}};Liquid.extensions={};Liquid.extensions.object={};Liquid.extensions.object.update=function(newObj){for(var p in newObj){this[p]=newObj[p];}
return this;};Liquid.extensions.object.hasKey=function(arg){return!!this[arg];};Liquid.extensions.object.hasValue=function(arg){for(var p in this){if(this[p]==arg)return true;}
return false;};Liquid.extensions.object.isEmpty=function(obj){if(!obj||Liquid.extensions.stringTools.strip(obj.toString())==="")return true;if(obj.length&&obj.length>0)return false;if(typeof obj==='number')return false;for(var prop in obj)if(obj[prop])return false;return true;};Liquid.extensions.stringTools={};Liquid.extensions.stringTools.capitalize=function(str){return str.charAt(0).toUpperCase()+str.substring(1).toLowerCase();};Liquid.extensions.stringTools.strip=function(str){return str.replace(/^\s+/,'').replace(/\s+$/,'');};Liquid.extensions.arrayTools={};Liquid.extensions.arrayTools.last=function(array){return array[array.length-1];};Liquid.extensions.arrayTools.indexOf=function(array,obj){for(var i=0;i<array.length;i++){if(array[i]==obj)return i;}
return-1;};Liquid.extensions.arrayTools.map=function(obj,fun){var len=obj.length;if(typeof fun!="function")
throw'Liquid.extensions.arrayTools.map requires first argument to be a function';var res=new Array(len);var thisp=arguments[2];for(var i=0;i<len;i++){if(i in obj)
res[i]=fun.call(thisp,obj[i],i,obj);}
return res;};Liquid.extensions.arrayTools.flatten=function(array){var len=array.length;var arr=[];for(var i=0;i<len;i++){if(array[i]instanceof Array){arr=arr.concat(array[i]);}else{arr.push(array[i]);}}
return arr;};Liquid.extensions.arrayTools.each=function(obj,fun){var len=obj.length;if(typeof fun!="function"){throw'Liquid.extensions.arrayTools.each requires first argument to be a function';}
var thisp=arguments[2];for(var i=0;i<len;i++){if(i in obj){fun.call(thisp,obj[i],i,obj);}}
return null;};Liquid.extensions.arrayTools.include=function(array,arg){var len=array.length;return Liquid.extensions.arrayTools.indexOf(array,arg)>=0;for(var i=0;i<len;i++){if(arg==array[i])return true;}
return false;};(function(){var initializing=false,fnTest=/xyz/.test(function(){xyz;})?/\b_super\b/:/.*/;this.Class=function(){};this.Class.extend=function(prop){var _super=this.prototype;initializing=true;var prototype=new this();initializing=false;for(var name in prop){prototype[name]=typeof prop[name]=="function"&&typeof _super[name]=="function"&&fnTest.test(prop[name])?(function(name,fn){return function(){var tmp=this._super;this._super=_super[name];var ret=fn.apply(this,arguments);this._super=tmp;return ret;};})(name,prop[name]):prop[name];}
function Class(){if(!initializing&&this.init)
this.init.apply(this,arguments);}
Class.prototype=prototype;Class.prototype.constructor=Class;Class.extend=arguments.callee;return Class;};}).call(Liquid);Liquid.Tag=Liquid.Class.extend({init:function(tagName,markup,tokens){this.tagName=tagName;this.markup=markup;this.nodelist=this.nodelist||[];this.parse(tokens);},parse:function(tokens){},render:function(context){return'';}});Liquid.Block=Liquid.Tag.extend({init:function(tagName,markup,tokens){this.blockName=tagName;this.blockDelimiter="end"+this.blockName;this._super(tagName,markup,tokens);},parse:function(tokens){if(!this.nodelist)this.nodelist=[];this.nodelist.length=0;var token=tokens.shift();tokens.push('');while(tokens.length){if(/^\{\%/.test(token)){var tagParts=token.match(/^\{\%\s*(\w+)\s*(.*)?\%\}$/);if(tagParts){if(this.blockDelimiter==tagParts[1]){this.endTag();return;}
if(tagParts[1]in Liquid.Template.tags){this.nodelist.push(new Liquid.Template.tags[tagParts[1]](tagParts[1],tagParts[2],tokens));}else{this.unknownTag(tagParts[1],tagParts[2],tokens);}}else{throw("Tag '"+token+"' was not properly terminated with: %}");}}else if(/^\{\{/.test(token)){this.nodelist.push(this.createVariable(token));}else{this.nodelist.push(token);}
token=tokens.shift();}
this.assertMissingDelimitation();},endTag:function(){},unknownTag:function(tag,params,tokens){switch(tag){case'else':throw(this.blockName+" tag does not expect else tag");break;case'end':throw("'end' is not a valid delimiter for "+this.blockName+" tags. use "+this.blockDelimiter);break;default:throw("Unknown tag: "+tag);}},createVariable:function(token){var match=token.match(/^\{\{(.*)\}\}$/);if(match){return new Liquid.Variable(match[1]);}
else{throw("Variable '"+token+"' was not properly terminated with: }}");}},render:function(context){return this.renderAll(this.nodelist,context);},renderAll:function(list,context){return Liquid.extensions.arrayTools.map((list||[]),function(token,i){var output='';try{output=(token['render'])?token.render(context):token;}catch(e){output=context.handleError(e);}
return output;});},assertMissingDelimitation:function(){throw(this.blockName+" tag was never closed");}});Liquid.Document=Liquid.Block.extend({init:function(tokens){this.blockDelimiter=[];this.parse(tokens);},assertMissingDelimitation:function(){}});Liquid.Strainer=Liquid.Class.extend({init:function(context){this.context=context;},respondTo:function(methodName){methodName=methodName.toString();if(methodName.match(/^__/))return false;if(Liquid.extensions.arrayTools.include(Liquid.Strainer.requiredMethods,methodName))return false;return(methodName in this);}});Liquid.Strainer.filters={};Liquid.Strainer.globalFilter=function(filters){for(var f in filters){Liquid.Strainer.filters[f]=filters[f];}}
Liquid.Strainer.requiredMethods=['respondTo','context'];Liquid.Strainer.create=function(context){var strainer=new Liquid.Strainer(context);for(var f in Liquid.Strainer.filters){strainer[f]=Liquid.Strainer.filters[f];}
return strainer;}
Liquid.Context=Liquid.Class.extend({init:function(assigns,registers,rethrowErrors){this.scopes=[assigns?assigns:{}];this.registers=registers?registers:{};this.errors=[];this.rethrowErrors=rethrowErrors;this.strainer=Liquid.Strainer.create(this);},get:function(varname){return this.resolve(varname);},set:function(varname,value){this.scopes[0][varname]=value;},hasKey:function(key){return(this.resolve(key))?true:false;},push:function(){var scpObj={};this.scopes.unshift(scpObj);return scpObj},merge:function(newScope){return Liquid.extensions.object.update.call(this.scopes[0],newScope);},pop:function(){if(this.scopes.length==1){throw"Context stack error";}
return this.scopes.shift();},stack:function(lambda,bind){var result=null;this.push();try{result=lambda.apply(bind?bind:this.strainer);}finally{this.pop();}
return result;},invoke:function(method,args){if(this.strainer.respondTo(method)){var result=this.strainer[method].apply(this.strainer,args);return result;}else{return(args.length==0)?null:args[0];}},resolve:function(key){switch(key){case null:case'nil':case'null':case'':return null;case'true':return true;case'false':return false;case'blank':case'empty':return'';default:if((/^'(.*)'$/).test(key))
{return key.replace(/^'(.*)'$/,'$1');}
else if((/^"(.*)"$/).test(key))
{return key.replace(/^"(.*)"$/,'$1');}
else if((/^(\d+)$/).test(key))
{return parseInt(key.replace(/^(\d+)$/,'$1'));}
else if((/^(\d[\d\.]+)$/).test(key))
{return parseFloat(key.replace(/^(\d[\d\.]+)$/,'$1'));}
else if((/^\((\S+)\.\.(\S+)\)$/).test(key)){var range=key.match(/^\((\S+)\.\.(\S+)\)$/),left=parseInt(range[1]),right=parseInt(range[2]),arr=[];if(isNaN(left)){let varLeft=this.resolve(range[1]);left=parseInt(varLeft);if(isNaN(left)){throw new Error('Incorrect param for range: '+key);}}
if(isNaN(right)){let varRight=this.resolve(range[2]);right=parseInt(varRight);if(isNaN(right)){throw new Error('Incorrect param for range: '+key);}}
var limit=right-left+1;for(var i=0;i<limit;i++)arr.push(i+left);return arr;}else{var result=this.variable(key);return result;}}},findVariable:function(key){for(var i=0;i<this.scopes.length;i++){var scope=this.scopes[i];if(scope&&typeof(scope[key])!=='undefined'){var variable=scope[key];if(typeof(variable)=='function'){variable=variable.apply(this);scope[key]=variable;}
if(variable&&this._isObject(variable)&&('toLiquid'in variable)){variable=variable.toLiquid();}
if(variable&&this._isObject(variable)&&('setContext'in variable)){variable.setContext(self);}
return variable;}};return null;},variable:function(markup){if(typeof markup!='string'){return null;}
var parts=markup.match(/\[[^\]]+\]|(?:[\w\-]\??)+/g),firstPart=parts.shift(),squareMatch=firstPart.match(/^\[(.*)\]$/);if(squareMatch)
{firstPart=this.resolve(squareMatch[1]);}
var object=this.findVariable(firstPart),self=this;if(object){Liquid.extensions.arrayTools.each(parts,function(part){var squareMatch=part.match(/^\[(.*)\]$/);if(squareMatch){var part=self.resolve(squareMatch[1]);if(typeof(object[part])=='function'){object[part]=object[part].apply(this);}
object=object[part];if(self._isObject(object)&&('toLiquid'in object)){object=object.toLiquid();}}else{if((self._isObject(object)||typeof(object)=='hash')&&(part in object)){var res=object[part];if(typeof(res)=='function'){res=object[part]=res.apply(self);}
if(self._isObject(res)&&('toLiquid'in res)){object=res.toLiquid();}
else{object=res;}}
else if((/^\d+$/).test(part)){var pos=parseInt(part);if(typeof(object[pos])=='function'){object[pos]=object[pos].apply(self);}
if(self._isObject(object)&&self._isObject(object[pos])&&('toLiquid'in object[pos])){object=object[pos].toLiquid();}
else{object=object[pos];}}
else if(object&&typeof(object[part])=='function'&&Liquid.extensions.arrayTools.include(['length','size','first','last'],part)){object=object[part].apply(part);if('toLiquid'in object){object=object.toLiquid();}}
else{return object=null;}
if(self._isObject(object)&&('setContext'in object)){object.setContext(self);}}});}
return object;},addFilters:function(filters){filters=Liquid.extensions.arrayTools.flatten(filters);Liquid.extensions.arrayTools.each(filters,function(f){if(!this._isObject(f)){throw("Expected object but got: "+typeof(f))}
this.strainer.addMethods(f);});},handleError:function(err){this.errors.push(err);if(this.rethrowErrors){throw err;}
return"Liquid error: "+(err.message?err.message:(err.description?err.description:err));},_isObject:function(obj){return obj!=null&&typeof(obj)=='object';}});Liquid.Template=Liquid.Class.extend({init:function(){this.root=null;this.registers={};this.assigns={};this.errors=[];this.rethrowErrors=false;},parse:function(src){this.root=new Liquid.Document(Liquid.Template.tokenize(src));return this;},render:function(){if(!this.root){return'';}
var args={ctx:arguments[0],filters:arguments[1],registers:arguments[2]}
var context=null;if(args.ctx instanceof Liquid.Context){context=args.ctx;this.assigns=context.assigns;this.registers=context.registers;}else{if(args.ctx){Liquid.extensions.object.update.call(this.assigns,args.ctx);}
if(args.registers){Liquid.extensions.object.update.call(this.registers,args.registers);}
context=new Liquid.Context(this.assigns,this.registers,this.rethrowErrors)}
if(args.filters){context.addFilters(arg.filters);}
try{return this.root.render(context).join('');}finally{this.errors=context.errors;}},renderWithErrors:function(){var savedRethrowErrors=this.rethrowErrors;this.rethrowErrors=true;var res=this.render.apply(this,arguments);this.rethrowErrors=savedRethrowErrors;return res;}});Liquid.Template.tags={};Liquid.Template.registerTag=function(name,klass){Liquid.Template.tags[name]=klass;}
Liquid.Template.registerFilter=function(filters){Liquid.Strainer.globalFilter(filters)}
Liquid.Template.tokenize=function(src){var tokens=src.split(/(\{\%.*?\%\}|\{\{.*?\}\}?)/);if(tokens[0]==''){tokens.shift();}
return tokens;}
Liquid.Template.parse=function(src){return(new Liquid.Template()).parse(src);}
Liquid.Variable=Liquid.Class.extend({init:function(markup){this.markup=markup;this.name=null;this.filters=[];var self=this;var match=markup.match(/\s*("[^"]+"|'[^']+'|[^\s,|]+)/);if(match){this.name=match[1];var filterMatches=markup.match(/\|\s*(.*)/);if(filterMatches){var filters=filterMatches[1].split(/\|/);Liquid.extensions.arrayTools.each(filters,function(f){var matches=f.match(/\s*(\w+)/);if(matches){var filterName=matches[1];var filterArgs=[];Liquid.extensions.arrayTools.each(Liquid.extensions.arrayTools.flatten((f.match(/(?:[:|,]\s*)("[^"]+"|'[^']+'|[^\s,|]+)/g)||[])),function(arg){var cleanupMatch=arg.match(/^[\s|:|,]*(.*?)[\s]*$/);if(cleanupMatch)
{filterArgs.push(cleanupMatch[1]);}});self.filters.push([filterName,filterArgs]);}});}}},render:function(context){if(this.name==null){return'';}
var output=context.get(this.name);Liquid.extensions.arrayTools.each(this.filters,function(filter){var filterName=filter[0],filterArgs=Liquid.extensions.arrayTools.map((filter[1]||[]),function(arg){return context.get(arg);});filterArgs.unshift(output);output=context.invoke(filterName,filterArgs);});return output;}});Liquid.Condition=Liquid.Class.extend({init:function(left,operator,right){this.left=left;this.operator=operator;this.right=right;this.childRelation=null;this.childCondition=null;this.attachment=null;},evaluate:function(context){context=context||new Liquid.Context();var result=this.interpretCondition(this.left,this.right,this.operator,context);switch(this.childRelation){case'or':return(result||this.childCondition.evaluate(context));case'and':return(result&&this.childCondition.evaluate(context));default:return result;}},or:function(condition){this.childRelation='or';this.childCondition=condition;},and:function(condition){this.childRelation='and';this.childCondition=condition;},attach:function(attachment){this.attachment=attachment;return this.attachment;},isElse:false,interpretCondition:function(left,right,op,context){if(!op)
{return context.get(left);}
left=context.get(left);right=context.get(right);op=Liquid.Condition.operators[op];if(!op)
{throw("Unknown operator "+op);}
var results=op(left,right);return results;},toString:function(){return"<Condition "+this.left+" "+this.operator+" "+this.right+">";}});Liquid.Condition.operators={'==':function(l,r){return(l==r);},'=':function(l,r){return(l==r);},'!=':function(l,r){return(l!=r);},'<>':function(l,r){return(l!=r);},'<':function(l,r){return(l<r);},'>':function(l,r){return(l>r);},'<=':function(l,r){return(l<=r);},'>=':function(l,r){return(l>=r);},'contains':function(l,r){if(Object.prototype.toString.call(l)==='[object Array]'){return Liquid.extensions.arrayTools.indexOf(l,r)>=0;}else{return l.match(r);}},'hasKey':function(l,r){return Liquid.extensions.object.hasKey.call(l,r);},'hasValue':function(l,r){return Liquid.extensions.object.hasValue.call(l,r);}}
Liquid.ElseCondition=Liquid.Condition.extend({isElse:true,evaluate:function(context){return true;},toString:function(){return"<ElseCondition>";}});Liquid.Drop=Liquid.Class.extend({setContext:function(context){this.context=context;},beforeMethod:function(method){},invokeDrop:function(method){var results=this.beforeMethod();if(!results&&(method in this))
{results=this[method].apply(this);}
return results;},hasKey:function(name){return true;}});var hackObjectEach=function(fun){if(typeof fun!="function")
throw'Object.each requires first argument to be a function';var i=0;var thisp=arguments[1];for(var p in this){var value=this[p],pair=[p,value];pair.key=p;pair.value=value;fun.call(thisp,pair,i,this);i++;}
return null;};Liquid.Template.registerTag('assign',Liquid.Tag.extend({tagSyntax:/((?:\(?[\w\-\.\[\]]\)?)+)\s*=\s*(.+)/,init:function(tagName,markup,tokens){var parts=markup.match(this.tagSyntax);if(parts){this.to=parts[1];this.from=parts[2];}else{throw("Syntax error in 'assign' - Valid syntax: assign [var] = [source]");}
this._super(tagName,markup,tokens)},render:function(context){var value=new Liquid.Variable(this.from);Liquid.extensions.arrayTools.last(context.scopes)[this.to.toString()]=value.render(context);return'';}}));Liquid.Template.registerTag('cache',Liquid.Block.extend({tagSyntax:/(\w+)/,init:function(tagName,markup,tokens){var parts=markup.match(this.tagSyntax)
if(parts){this.to=parts[1];}else{throw("Syntax error in 'cache' - Valid syntax: cache [var]");}
this._super(tagName,markup,tokens);},render:function(context){var output=this._super(context);Liquid.extensions.arrayTools.last(context.scopes)[this.to]=Liquid.extensions.arrayTools.flatten([output]).join('');return'';}}));Liquid.Template.registerTag('capture',Liquid.Block.extend({tagSyntax:/(\w+)/,init:function(tagName,markup,tokens){var parts=markup.match(this.tagSyntax)
if(parts){this.to=parts[1];}else{throw("Syntax error in 'capture' - Valid syntax: capture [var]");}
this._super(tagName,markup,tokens);},render:function(context){var output=this._super(context);Liquid.extensions.arrayTools.last(context.scopes)[this.to.toString()]=Liquid.extensions.arrayTools.flatten([output]).join('');return'';}}));Liquid.Template.registerTag('case',Liquid.Block.extend({tagSyntax:/("[^"]+"|'[^']+'|[^\s,|]+)/,tagWhenSyntax:/("[^"]+"|'[^']+'|[^\s,|]+)(?:(?:\s+or\s+|\s*\,\s*)("[^"]+"|'[^']+'|[^\s,|]+.*))?/,init:function(tagName,markup,tokens){this.blocks=[];this.nodelist=[];var parts=markup.match(this.tagSyntax)
if(parts){this.left=parts[1];}else{throw("Syntax error in 'case' - Valid syntax: case [condition]");}
this._super(tagName,markup,tokens);},unknownTag:function(tag,markup,tokens){switch(tag){case'when':this.recordWhenCondition(markup);break;case'else':this.recordElseCondition(markup);break;default:this._super(tag,markup,tokens);}},render:function(context){var self=this,output=[],execElseBlock=true;context.stack(function(){for(var i=0;i<self.blocks.length;i++){var block=self.blocks[i];if(block.isElse){if(execElseBlock==true){output=Liquid.extensions.arrayTools.flatten([output,self.renderAll(block.attachment,context)]);}
return output;}else if(block.evaluate(context)){execElseBlock=false;output=Liquid.extensions.arrayTools.flatten([output,self.renderAll(block.attachment,context)]);}};});return output;},recordWhenCondition:function(markup){while(markup){var parts=markup.match(this.tagWhenSyntax);if(!parts){throw("Syntax error in tag 'case' - Valid when condition: {% when [condition] [or condition2...] %} ");}
markup=parts[2];var block=new Liquid.Condition(this.left,'==',parts[1]);this.blocks.push(block);this.nodelist=block.attach([]);}},recordElseCondition:function(markup){if(Liquid.extensions.stringTools.strip((markup||''))!=''){throw("Syntax error in tag 'case' - Valid else condition: {% else %} (no parameters) ")}
var block=new Liquid.ElseCondition();this.blocks.push(block);this.nodelist=block.attach([]);}}));Liquid.Template.registerTag('comment',Liquid.Block.extend({render:function(context){return'';}}));Liquid.Template.registerTag('cycle',Liquid.Tag.extend({tagSimpleSyntax:/"[^"]+"|'[^']+'|[^\s,|]+/,tagNamedSyntax:/("[^"]+"|'[^']+'|[^\s,|]+)\s*\:\s*(.*)/,init:function(tag,markup,tokens){var matches,variables;matches=markup.match(this.tagNamedSyntax);if(matches){this.variables=this.variablesFromString(matches[2]);this.name=matches[1];}else{matches=markup.match(this.tagSimpleSyntax);if(matches){this.variables=this.variablesFromString(markup);this.name="'"+this.variables.toString()+"'";}else{throw("Syntax error in 'cycle' - Valid syntax: cycle [name :] var [, var2, var3 ...]");}}
this._super(tag,markup,tokens);},render:function(context){var self=this,key=context.get(self.name),output='';if(!context.registers['cycle']){context.registers['cycle']={};}
if(!context.registers['cycle'][key]){context.registers['cycle'][key]=0;}
context.stack(function(){var iter=context.registers['cycle'][key],results=context.get(self.variables[iter]);iter+=1;if(iter==self.variables.length){iter=0;}
context.registers['cycle'][key]=iter;output=results;});return output;},variablesFromString:function(markup){return Liquid.extensions.arrayTools.map(markup.split(','),function(varname){var match=varname.match(/\s*("[^"]+"|'[^']+'|[^\s,|]+)\s*/);return(match[1])?match[1]:null});}}));Liquid.Template.registerTag('for',Liquid.Block.extend({tagSyntax:/(\w+)\s+in\s+((?:\(?[\w\-\.\[\]]\)?)+)/,init:function(tag,markup,tokens){var matches=markup.match(this.tagSyntax);if(matches){this.variableName=matches[1];this.collectionName=matches[2];this.name=this.variableName+"-"+this.collectionName;this.attributes={};var attrmarkup=markup.replace(this.tagSyntax,'');var attMatchs=markup.match(/(\w*?)\s*\:\s*("[^"]+"|'[^']+'|[^\s,|]+)/g);if(attMatchs){Liquid.extensions.arrayTools.each(attMatchs,function(pair){pair=pair.split(":");this.attributes[Liquid.extensions.stringTools.strip(pair[0])]=Liquid.extensions.stringTools.strip(pair[1]);},this);}}else{throw("Syntax error in 'for loop' - Valid syntax: for [item] in [collection]");}
this._super(tag,markup,tokens);},render:function(context){var self=this,output=[],collection=(context.get(this.collectionName)||[]),range=[0,collection.length];if(!context.registers['for']){context.registers['for']={};}
if(this.attributes['limit']||this.attributes['offset']){var offset=0,limit=0,rangeEnd=0,segment=null;if(this.attributes['offset']=='continue')
{offset=context.registers['for'][this.name];}
else
{offset=context.get(this.attributes['offset'])||0;}
limit=context.get(this.attributes['limit']);rangeEnd=(limit)?offset+limit+1:collection.length;range=[offset,rangeEnd-1];context.registers['for'][this.name]=rangeEnd;}
segment=collection.slice(range[0],range[1]);if(!segment||segment.length==0){return'';}
context.stack(function(){var length=segment.length;Liquid.extensions.arrayTools.each(segment,function(item,index){context.set(self.variableName,item);context.set('forloop',{name:self.name,length:length,index:(index+1),index0:index,rindex:(length-index),rindex0:(length-index-1),first:(index==0),last:(index==(length-1))});output.push((self.renderAll(self.nodelist,context)||[]).join(''));});});return Liquid.extensions.arrayTools.flatten([output]).join('');}}));Liquid.Template.registerTag('if',Liquid.Block.extend({tagSyntax:/("[^"]+"|'[^']+'|[^\s,|]+)\s*([=!<>a-z_]+)?\s*("[^"]+"|'[^']+'|[^\s,|]+)?/,init:function(tag,markup,tokens){this.nodelist=[];this.blocks=[];this.pushBlock('if',markup);this._super(tag,markup,tokens);},unknownTag:function(tag,markup,tokens){if(Liquid.extensions.arrayTools.include(['elsif','else'],tag)){this.pushBlock(tag,markup);}else{this._super(tag,markup,tokens);}},render:function(context){var self=this,output='';context.stack(function(){for(var i=0;i<self.blocks.length;i++){var block=self.blocks[i];if(block.evaluate(context)){output=self.renderAll(block.attachment,context);return;}};})
return Liquid.extensions.arrayTools.flatten([output]).join('');},pushBlock:function(tag,markup){var block;if(tag=='else'){block=new Liquid.ElseCondition();}else{var expressions=markup.split(/\b(and|or)\b/).reverse(),expMatches=expressions.shift().match(this.tagSyntax);if(!expMatches){throw("Syntax Error in tag '"+tag+"' - Valid syntax: "+tag+" [expression]");}
var condition=new Liquid.Condition(expMatches[1],expMatches[2],expMatches[3]);while(expressions.length>0){var operator=expressions.shift(),expMatches=expressions.shift().match(this.tagSyntax);if(!expMatches){throw("Syntax Error in tag '"+tag+"' - Valid syntax: "+tag+" [expression]");}
var newCondition=new Liquid.Condition(expMatches[1],expMatches[2],expMatches[3]);newCondition[operator](condition);condition=newCondition;}
block=condition;}
block.attach([]);this.blocks.push(block);this.nodelist=block.attachment;}}));Liquid.Template.registerTag('ifchanged',Liquid.Block.extend({render:function(context){var self=this,output='';context.stack(function(){var results=self.renderAll(self.nodelist,context).join('');if(results!=context.registers['ifchanged']){output=results;context.registers['ifchanged']=output;}});return output;}}));Liquid.Template.registerTag('include',Liquid.Tag.extend({tagSyntax:/((?:"[^"]+"|'[^']+'|[^\s,|]+)+)(\s+(?:with|for)\s+((?:"[^"]+"|'[^']+'|[^\s,|]+)+))?/,init:function(tag,markup,tokens){var matches=(markup||'').match(this.tagSyntax);if(matches){this.templateName=matches[1];this.templateNameVar=this.templateName.substring(1,this.templateName.length-1);this.variableName=matches[3];this.attributes={};var attMatchs=markup.match(/(\w*?)\s*\:\s*("[^"]+"|'[^']+'|[^\s,|]+)/g);if(attMatchs){Liquid.extensions.arrayTools.each(attMatchs,function(pair){pair=pair.split(":");this.attributes[Liquid.extensions.stringTools.strip(pair[0])]=Liquid.extensions.stringTools.strip(pair[1]);},this);}}else{throw("Error in tag 'include' - Valid syntax: include '[template]' (with|for) [object|collection]");}
this._super(tag,markup,tokens);},render:function(context){var self=this,source=Liquid.readTemplateFile(context.get(this.templateName)),partial=Liquid.parse(source),variable=context.get((this.variableName||this.templateNameVar)),output='';context.stack(function(){self.attributes.each=hackObjectEach;self.attributes.each(function(pair){context.set(pair.key,context.get(pair.value));})
if(variable instanceof Array){output=Liquid.extensions.arrayTools.map(variable,function(variable){context.set(self.templateNameVar,variable);return partial.render(context);});}else{context.set(self.templateNameVar,variable);output=partial.render(context);}});output=Liquid.extensions.arrayTools.flatten([output]).join('');return output}}));Liquid.Template.registerTag('unless',Liquid.Template.tags['if'].extend({render:function(context){var self=this,output='';context.stack(function(){var block=self.blocks[0];if(!block.evaluate(context)){output=self.renderAll(block.attachment,context);return;}
for(var i=1;i<self.blocks.length;i++){var block=self.blocks[i];if(block.evaluate(context)){output=self.renderAll(block.attachment,context);return;}};})
return Liquid.extensions.arrayTools.flatten([output]).join('');}}));Liquid.Template.registerTag('raw',Liquid.Block.extend({parse:function(tokens){if(!this.nodelist)this.nodelist=[];this.nodelist.length=0;var token=tokens.shift();tokens.push('');while(tokens.length){if(/^\{\%/.test(token)){var tagParts=token.match(/^\{\%\s*(\w+)\s*(.*)?\%\}$/);if(tagParts){if(this.blockDelimiter==tagParts[1]){this.endTag();return;}}}
this.nodelist.push(token||'');token=tokens.shift();}
this.assertMissingDelimitation();},render:function(context){return this.nodelist.join('');}}));Liquid.Template.registerTag('increment',Liquid.Tag.extend({tagSyntax:/((?:\(?[\w\-\.\[\]]\)?)+)/,init:function(tagName,markup,tokens){var parts=markup.match(this.tagSyntax);console.log(tagName,markup,tokens);console.log(parts[1]);if(parts){this.name=parts[1];}else{throw("Syntax error in 'assign' - Valid syntax: increment [var]");}
this._super(tagName,markup,tokens)},render:function(context){var self=this,key=self.name,output='';if(!context.registers['increment']){context.registers['increment']={};}
if(!context.registers['increment'][key]){context.registers['increment'][key]=0;}
output=String(context.registers['increment'][key]);context.registers['increment'][key]++;return output;}}));Liquid.Template.registerTag('decrement',Liquid.Tag.extend({tagSyntax:/((?:\(?[\w\-\.\[\]]\)?)+)/,init:function(tagName,markup,tokens){var parts=markup.match(this.tagSyntax);console.log(tagName,markup,tokens);console.log(parts[1]);if(parts){this.name=parts[1];}else{throw("Syntax error in 'assign' - Valid syntax: decrement [var]");}
this._super(tagName,markup,tokens)},render:function(context){var self=this,key=self.name,output='';if(!context.registers['decrement']){context.registers['decrement']={};}
if(!context.registers['decrement'][key]){context.registers['decrement'][key]=-1;}
output=String(context.registers['decrement'][key]);context.registers['decrement'][key]--;return output;}}));Liquid.Template.registerFilter({_HTML_ESCAPE_MAP:{'&':'&amp;','>':'&gt;','<':'&lt;','"':'&quot;',"'":'&#39;'},size:function(iterable){return(iterable['length'])?iterable.length:0;},downcase:function(input){return input.toString().toLowerCase();},upcase:function(input){return input.toString().toUpperCase();},capitalize:function(input){return Liquid.extensions.stringTools.capitalize(input.toString());},escape:function(input){var self=this;return input.replace(/[&<>"']/g,function(chr){return self._HTML_ESCAPE_MAP[chr];});},h:function(input){var self=this;return input.replace(/[&<>"']/g,function(chr){return self._HTML_ESCAPE_MAP[chr];});},default:function(input,default_value){return Liquid.extensions.object.isEmpty(input)?default_value:input;},truncate:function(input,length,string){if(!input||input==''){return'';}
length=length||50;string=string||"...";var seg=input.slice(0,length);return(input.length>length?input.slice(0,length)+string:input);},truncatewords:function(input,words,string){if(!input||input==''){return'';}
words=parseInt(words||15);string=string||'...';var wordlist=input.toString().split(" "),l=Math.max((words),0);return(wordlist.length>l)?wordlist.slice(0,l).join(' ')+string:input;},truncate_words:function(input,words,string){if(!input||input==''){return'';}
words=parseInt(words||15);string=string||'...';var wordlist=input.toString().split(" "),l=Math.max((words),0);return(wordlist.length>l)?wordlist.slice(0,l).join(' ')+string:input;},strip_html:function(input){return input.toString().replace(/<.*?>/g,'');},strip_newlines:function(input){return input.toString().replace(/\n/g,'')},join:function(input,separator){separator=separator||' ';return input.join(separator);},split:function(input,separator){separator=separator||' ';return input.split(separator);},sort:function(input){return input.sort();},reverse:function(input){return input.reverse();},replace:function(input,string,replacement){replacement=replacement||'';return input.toString().replace(new RegExp(string,'g'),replacement);},replace_first:function(input,string,replacement){replacement=replacement||'';return input.toString().replace(new RegExp(string,""),replacement);},newline_to_br:function(input){return input.toString().replace(/\n/g,"<br/>\n");},date:function(input,format){var date;if(input instanceof Date){date=input;}
if(!(date instanceof Date)&&input=='now'){date=new Date();}
if(!(date instanceof Date)&&typeof(input)=='number'){date=new Date(input*1000);}
if(!(date instanceof Date)&&typeof(input)=='string'){date=new Date(Date.parse(input));}
if(!(date instanceof Date)){return input;}
return date.strftime(format);},first:function(input){return input[0];},last:function(input){input=input;return input[input.length-1];},minus:function(input,number){return(Number(input)||0)-(Number(number)||0);},plus:function(input,number){return(Number(input)||0)+(Number(number)||0);},times:function(input,number){return(Number(input)||0)*(Number(number)||0);},divided_by:function(input,number){return(Number(input)||0)/(Number(number)||0);},modulo:function(input,number){return(Number(input)||0)%(Number(number)||0);},map:function(input,property){input=input||[];var results=[];for(var i=0;i<input.length;i++){results.push(input[i][property]);}
return results;},escape_once:function(input){var self=this;return input.replace(/["><']|&(?!([a-zA-Z]+|(#\d+));)/g,function(chr){return self._HTML_ESCAPE_MAP[chr];});},remove:function(input,string){return input.toString().replace(new RegExp(string,'g'),'');},remove_first:function(input,string){return input.toString().replace(string,'');},prepend:function(input,string){return''+(string||'').toString()+(input||'').toString();},append:function(input,string){return''+(input||'').toString()+(string||'').toString();}});if(!(new Date()).strftime){(function(){Date.ext={};Date.ext.util={};Date.ext.util.xPad=function(x,pad,r){if(typeof(r)=="undefined"){r=10}for(;parseInt(x,10)<r&&r>1;r/=10){x=pad.toString()+x}return x.toString()};Date.prototype.locale="en-GB";if(document.getElementsByTagName("html")&&document.getElementsByTagName("html")[0].lang){Date.prototype.locale=document.getElementsByTagName("html")[0].lang}Date.ext.locales={};Date.ext.locales.en={a:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],A:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],b:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],B:["January","February","March","April","May","June","July","August","September","October","November","December"],c:"%a %d %b %Y %T %Z",p:["AM","PM"],P:["am","pm"],x:"%d/%m/%y",X:"%T"};if(typeof JSON!='undefined'){Date.ext.locales['en-US']=JSON.parse(JSON.stringify(Date.ext.locales.en));}else{Date.ext.locales["en-US"]=Date.ext.locales.en;};Date.ext.locales["en-US"].c="%a %d %b %Y %r %Z";Date.ext.locales["en-US"].x="%D";Date.ext.locales["en-US"].X="%r";Date.ext.locales["en-GB"]=Date.ext.locales.en;Date.ext.locales["en-AU"]=Date.ext.locales["en-GB"];Date.ext.formats={a:function(d){return Date.ext.locales[d.locale].a[d.getDay()]},A:function(d){return Date.ext.locales[d.locale].A[d.getDay()]},b:function(d){return Date.ext.locales[d.locale].b[d.getMonth()]},B:function(d){return Date.ext.locales[d.locale].B[d.getMonth()]},c:"toLocaleString",C:function(d){return Date.ext.util.xPad(parseInt(d.getFullYear()/100,10),0)},d:["getDate","0"],e:["getDate"," "],g:function(d){return Date.ext.util.xPad(parseInt(Date.ext.util.G(d)/100,10),0)},G:function(d){var y=d.getFullYear();var V=parseInt(Date.ext.formats.V(d),10);var W=parseInt(Date.ext.formats.W(d),10);if(W>V){y++}else{if(W===0&&V>=52){y--}}return y},H:["getHours","0"],I:function(d){var I=d.getHours()%12;return Date.ext.util.xPad(I===0?12:I,0)},j:function(d){var ms=d-new Date(""+d.getFullYear()+"/1/1 GMT");ms+=d.getTimezoneOffset()*60000;var doy=parseInt(ms/60000/60/24,10)+1;return Date.ext.util.xPad(doy,0,100)},m:function(d){return Date.ext.util.xPad(d.getMonth()+1,0)},M:["getMinutes","0"],p:function(d){return Date.ext.locales[d.locale].p[d.getHours()>=12?1:0]},P:function(d){return Date.ext.locales[d.locale].P[d.getHours()>=12?1:0]},S:["getSeconds","0"],u:function(d){var dow=d.getDay();return dow===0?7:dow},U:function(d){var doy=parseInt(Date.ext.formats.j(d),10);var rdow=6-d.getDay();var woy=parseInt((doy+rdow)/7,10);return Date.ext.util.xPad(woy,0)},V:function(d){var woy=parseInt(Date.ext.formats.W(d),10);var dow1_1=(new Date(""+d.getFullYear()+"/1/1")).getDay();var idow=woy+(dow1_1>4||dow1_1<=1?0:1);if(idow==53&&(new Date(""+d.getFullYear()+"/12/31")).getDay()<4){idow=1}else{if(idow===0){idow=Date.ext.formats.V(new Date(""+(d.getFullYear()-1)+"/12/31"))}}return Date.ext.util.xPad(idow,0)},w:"getDay",W:function(d){var doy=parseInt(Date.ext.formats.j(d),10);var rdow=7-Date.ext.formats.u(d);var woy=parseInt((doy+rdow)/7,10);return Date.ext.util.xPad(woy,0,10)},y:function(d){return Date.ext.util.xPad(d.getFullYear()%100,0)},Y:"getFullYear",z:function(d){var o=d.getTimezoneOffset();var H=Date.ext.util.xPad(parseInt(Math.abs(o/60),10),0);var M=Date.ext.util.xPad(o%60,0);return(o>0?"-":"+")+H+M},Z:function(d){return d.toString().replace(/^.*\(([^)]+)\)$/,"$1")},"%":function(d){return"%"}};Date.ext.aggregates={c:"locale",D:"%m/%d/%y",h:"%b",n:"\n",r:"%I:%M:%S %p",R:"%H:%M",t:"\t",T:"%H:%M:%S",x:"locale",X:"locale"};Date.ext.aggregates.z=Date.ext.formats.z(new Date());Date.ext.aggregates.Z=Date.ext.formats.Z(new Date());Date.ext.unsupported={};Date.prototype.strftime=function(fmt){if(!(this.locale in Date.ext.locales)){if(this.locale.replace(/-[a-zA-Z]+$/,"")in Date.ext.locales){this.locale=this.locale.replace(/-[a-zA-Z]+$/,"")}else{this.locale="en-GB"}}var d=this;while(fmt.match(/%[cDhnrRtTxXzZ]/)){fmt=fmt.replace(/%([cDhnrRtTxXzZ])/g,function(m0,m1){var f=Date.ext.aggregates[m1];return(f=="locale"?Date.ext.locales[d.locale][m1]:f)})}var str=fmt.replace(/%([aAbBCdegGHIjmMpPSuUVwWyY%])/g,function(m0,m1){var f=Date.ext.formats[m1];if(typeof(f)=="string"){return d[f]()}else{if(typeof(f)=="function"){return f.call(d,d)}else{if(typeof(f)=="object"&&typeof(f[0])=="string"){return Date.ext.util.xPad(d[f[0]](),f[1])}else{return m1}}}});d=null;return str};})();}
var split;split=split||function(undef){var nativeSplit=String.prototype.split,compliantExecNpcg=/()??/.exec("")[1]===undef,self;self=function(str,separator,limit){if(Object.prototype.toString.call(separator)!=="[object RegExp]"){return nativeSplit.call(str,separator,limit);}
var output=[],flags=(separator.ignoreCase?"i":"")+
(separator.multiline?"m":"")+
(separator.extended?"x":"")+
(separator.sticky?"y":""),lastLastIndex=0,separator=new RegExp(separator.source,flags+"g"),separator2,match,lastIndex,lastLength;str+="";if(!compliantExecNpcg){separator2=new RegExp("^"+separator.source+"$(?!\\s)",flags);}
limit=limit===undef?-1>>>0:limit>>>0;while(match=separator.exec(str)){lastIndex=match.index+match[0].length;if(lastIndex>lastLastIndex){output.push(str.slice(lastLastIndex,match.index));if(!compliantExecNpcg&&match.length>1){match[0].replace(separator2,function(){for(var i=1;i<arguments.length-2;i++){if(arguments[i]===undef){match[i]=undef;}}});}
if(match.length>1&&match.index<str.length){Array.prototype.push.apply(output,match.slice(1));}
lastLength=match[0].length;lastLastIndex=lastIndex;if(output.length>=limit){break;}}
if(separator.lastIndex===match.index){separator.lastIndex++;}}
if(lastLastIndex===str.length){if(lastLength||!separator.test("")){output.push("");}}else{output.push(str.slice(lastLastIndex));}
return output.length>limit?output.slice(0,limit):output;};String.prototype.split=function(separator,limit){return self(this,separator,limit);};return self;}();if(typeof exports!=='undefined'){if(typeof module!=='undefined'&&module.exports){exports=module.exports=Liquid;}
exports.Liquid=Liquid;}// @ts-check
;(function(window, document, JekyllWebmentionIO){
  'use strict';
  
  // prerequisites
  if ( ! ( 'querySelectorAll' in document ) ){ return; }
  
  if ( ! ( 'JekyllWebmentionIO' in window ) ){ window.JekyllWebmentionIO = {}; }
  
  var $webmention_counts = document.querySelectorAll( '.webmention-count' ),
      event_name = 'JekyllWebmentionIO:update_counters';
  
  function updateCounts(){
    var w = $webmention_counts.length,
        $counter,
        types, t, type,
        count;
    
    while ( w-- )
    {
      $counter = $webmention_counts[w];
      // limited scope?
      if ( 'dataset' in $counter &&
           'webmentionTypes' in $counter.dataset )
      {
        types = $counter.dataset.webmentionTypes.split(',');
        t = types.length;
        count = 0;
        while ( t-- )
        {
          type = JekyllWebmentionIO.types[types[t]];
          count += document.querySelectorAll( '.webmention.webmention--' + type ).length;
        }
        $counter.innerText = count;
      }
      else
      {
        $counter.innerText = document.querySelectorAll( '.webmention' ).length;
      }
    }
  }

  if ( $webmention_counts.length )
  {
    JekyllWebmentionIO.counter_update_event = new Event(event_name);
    document.addEventListener(event_name, updateCounts, false);
  }

}(this, this.document, this.JekyllWebmentionIO));// @ts-check
(function(window, document){
  
  // prerequisites
  if ( ! ( 'querySelectorAll' in document ) ){ return; }

  if ( ! ( 'JekyllWebmentionIO' in window ) ){ window.JekyllWebmentionIO = {}; }
  
  var targets = [],
      $redirects = document.querySelector('meta[property="webmention:redirected_from"]'),
      redirects,
      base_url = window.location.origin,
      $script;
  
  targets.push( base_url + window.location.pathname );
  if ( $redirects )
  {
    redirects = $redirects.getAttribute('content').split(',');
    redirects.forEach(function( value ){
      targets.push( 
        value.indexOf('//') < 0 ? base_url + value : value
      );
    });
    redirects = false;
  }

  // Load up any unpublished webmentions on load
  $script = document.createElement('script');
  $script.async = true;
  $script.src = 'https://webmention.io/api/mentions?' +
                'jsonp=window.JekyllWebmentionIO.processWebmentions&target[]=' +
                targets.join( '&target[]=' );
  document.querySelector('head').appendChild( $script );
  
}(this, this.document));          ;(function(window,JekyllWebmentionIO){
            if ( ! ( 'JekyllWebmentionIO' in window ) ){ window.JekyllWebmentionIO = {}; }
            JekyllWebmentionIO.types = { 'bookmarks': 'bookmark','likes': 'like','links': 'link','posts': 'post','replies': 'reply','reposts': 'repost','rsvps': 'rsvp' };
          }(this, this.JekyllWebmentionIO));
