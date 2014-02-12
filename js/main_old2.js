// OPEN MODULE
;(function(){

	"use strict";

	// Trim
	if(!String.prototype.trim){
		String.prototype.trim = function() {
			return this.replace(/^\s+|\s+$/gm,'');
		};
	}

	var inherit = function(Parent, Child){
		function F(){};
		F.prototype = Parent.prototype;
		Child.prototype = new F();
		Child.prototype.constructor = Child;
	};

	var d = document;

	var $ = function(str, index) {
		var str = str.trim(),
			id  = /^#/.test(str),
			tag = /^[a-z]+/.test(str),
			cEl = /^\<[a-z]+\>/.test(str);

		return id ? getId(str): tag ? getTag(str, index) : cEl ? createEl(str) : '';
	},
	getId = function(id) {
		return d.getElementById(id.replace(/^#/,''));
	},
	getTag = function(tag, index) {
		var el  = d.getElementsByTagName(tag);
		return index ? el[index] : el;
	},
	createEl = function(name) {
		return d.createElement(name.replace(/^\<|\>$/,''));
	},
	createComent = function(text) {
		return d.createComment(text);
	};

	var library = function() {};

	library.prototype.addAttr = function(obj) {
		for(var attr in obj){
			this.el.setAttribute(attr, obj[attr]);
		}
		return this;
	};
	library.prototype.addStyle = function(obj, fun) {
		for(var key in obj){
			this.el.style[key] = fun ? this.scale(obj[key]) : obj[key];
		}
		return this;
	};
	library.prototype.append = function(el) {
		this.el.appendChild(el);
		return this;
	};


	inherit($, library);



	console.log( $ );

}());

