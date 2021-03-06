// OPEN MODULE
;(function(w, d){

	w.AppAdv = function(options) {
		
		var domReady = function(fun) {
			setTimeout(function go(){
				 d.readyState === "complete" ? fun() : setTimeout(go, 5);
			},1);
		};
		var Creator = function() {
			this.el = null;
		};
		Creator.prototype.getId = function(id) {
			this.el = d.getElementById(id);
			return this;
		};
		Creator.prototype.getTag = function(tag, index) {
			var el = d.getElementsByTagName(tag);
			this.el = (!!index) ? el[index] : el;
			return this;
		};
		Creator.prototype.createEl = function(name) {
			this.el = d.createElement(name);
			return this;
		};
		Creator.prototype.createText   = function(txt) {
			return d.createTextNode(txt);
		};
		Creator.prototype.createComent = function(text) {
			return d.createComment(text);
		};
		Creator.prototype.addAttr = function(obj) {
			for(var attr in obj){
				this.el.setAttribute(attr, obj[attr]);
			}
			return this;
		};
		Creator.prototype.addStyle = function(obj, fun) {
			for(var key in obj){
				this.el.style[key] = fun ? this.scale(obj[key]) : obj[key];
			}
			return this;
		};
		Creator.prototype.append = function(el) {
			this.el.appendChild(el);
			return this;
		};
		Creator.prototype.insertText = function(text) {
			this.el.appendChild(this.createText(text));
			return this;
		};
		Creator.prototype.view = function() {
			return this.el;
		};
		Creator.prototype.scale = function(key) {
			return (key * options.scale) + 'px';
		};

		// Add script to DOM
		var script = (new Creator).createEl('script').addAttr({src: options.dataUrl}).view(),
			head   = (new Creator).getTag('head',"0");

		head.append(script);

		// Add Style to DOM
		domReady(function(){
			var link = (new Creator).createEl('link').addAttr({
					'rel' : 'stylesheet',
					'href': dataAdver[0]['cssUrl']
				}).view(),
				ie9 = '[if gte IE 9]><style type="text/css">#vcene-advertisiment a{filter: none;}</style><![endif]';
			head.append(link).append((new Creator).createComent(ie9));
		});

		// Append root el to html
		domReady(function(){
			var root = (new Creator).getId(options.append);
				root.addStyle(dataAdver[0]['styleScale'], true);
				environment = (new Creator).createEl('img').addAttr({
					'src': dataAdver[0]['src'],
					'alt':''
				});
			root.append(environment.view());
		});

		// get & add labels to DOM
		domReady(function(){

			var item = (new Creator).createEl('a').addAttr(dataAdver[1]['attr']);
				item.addStyle(dataAdver[1]['styleScale'], true);

			var img = (new Creator).createEl('img').addAttr({
					'src': dataAdver[1]['imgUrl'],
					'alt':''
				});

			item.append(img.view());

			var labels = dataAdver[1]['labels'];
			for(var i = labels.length - 1; i >= 0; i -=1){
				var label = (new Creator).createEl('span');

				label.addStyle( labels[i]['styleScale'], true)
					 .addStyle(labels[i]['style'])
					 .insertText(labels[i].title);

				item.append(label.view());
			}

			var el = (new Creator).getId(options.append);
				el.append(item.view());
		});

	};

}(window, document));