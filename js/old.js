// OPEN MODULE
;(function(w, d){

	// library
	var getId = function(id){
		return d.getElementById(id);
	},
	getTag = function(tag){
		return d.getElementsByTagName(tag);
	},
	createEl = function(name){
		return d.createElement(name);
	},
	createText = function(txt) {
		return d.createTextNode(txt);
	},
	createComent = function(text) {
		return d.createComment(text);
	},
	domReady = function(fun) {
		setTimeout(function go(){
			 d.readyState === "complete" ? fun() : setTimeout(go, 5);
		},1);
	},
	addStyle = function(el, obj) {
		for(var key in obj){
			el.style[key] = obj[key];
		}
		return el;
	},
	addAttr = function(el, obj) {
		for(var attr in obj){
			el.setAttribute(attr, obj[attr]);
		}
		return el;
	};

	// Class advertisiment
	w.AppAdv = function(options) {

		var html = '';

		// Add script to DOM
		getTag('head')[0].appendChild(addAttr(createEl('script'),{
			src: options.dataUrl
		}));

		// Append style to DOM
		domReady(function(){
			getTag('head')[0].appendChild(addAttr(createEl('link'),{
				'rel' : 'stylesheet',
				'href': dataAdver[0]['cssUrl']
			}));

			// ie9
			var ie9 = '[if gte IE 9]><style type="text/css">#vcene-advertisiment a{filter: none;}</style><![endif]';
			getTag('head')[0].appendChild(createComent(ie9));
		});

		// Append root el to html
		domReady(function(){
			var dim = dataAdver[0]['dimension'].split(',');

			// Add style to root el
			addStyle(getId(options.append),{
				width: (dim[0] * options.scale) + 'px',
				height: height = (dim[1] * options.scale) + 'px'
			});

			//set img environment
			html += '<img src="'+dataAdver[0]['src']+'">';
		});

		// Append collection to html
		domReady(function() {

			for (i  = 1,ln = dataAdver.length; i < ln; i += 1) {
				
				var dim     = dataAdver[i]['dimension'].split(','),
					pos     = dataAdver[i]['position'].split(','),
					item    = createEl('a');

					item.setAttribute("href", dataAdver[i]['linkUrl']);
					addStyle(item, {
						width    : (dim[0] * options.scale) + 'px',
						height   : (dim[1] * options.scale) + 'px',
						top      : (pos[0] * options.scale) + 'px',
						left     : (pos[1] * options.scale) + 'px',
						fontSize : (dataAdver[i].textSize * options.scale) + 'px'
					});

				var img     = createEl('img');
					img.setAttribute('src', dataAdver[i]['imgUrl']);
					img.setAttribute('alt', '');

				var text1   = createEl('span');
					text1.appendChild(createText(dataAdver[i].name));
					text1.setAttribute('class','AppAdvLeft');
					addStyle(text1, {
						left 			: (dataAdver[i].nameLeft * options.scale) + "px",
						top 			: (dataAdver[i].nameTop  * options.scale) + "px",
						color 			:  dataAdver[i].nameColor,
						borderColor 	:  dataAdver[i].nameColor,
						backgroundColor :  dataAdver[i].nameBgCol,
						padding 		:  dataAdver[i].innerOffset
					});

				var text2   = createEl('span');
					text2.appendChild(createText(dataAdver[i].price));
					text2.setAttribute('class','AppAdvRight');
					addStyle(text2, {
						left 			: (dataAdver[i].priceLeft * options.scale) + "px",
						top 			: (dataAdver[i].priceTop  * options.scale) + "px",
						color 			:  dataAdver[i].priceColor,
						fontWeight 		:  'bold',
						borderColor 	:  dataAdver[i].priceColor,
						backgroundColor :  dataAdver[i].priceBgCol,
						padding 		:  dataAdver[i].innerOffset
					});

				item.appendChild(img);
				item.appendChild(text1);
				item.appendChild(text2);

				html += item.outerHTML;
			}
		});

		// Add to HTML
		domReady(function() {
			getId(options.append).innerHTML += html;
		});

	};

}(window, document));