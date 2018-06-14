/**
 * This is a very simple skeleton screen generator for AJAX loading purposes.
 * The general logic is that through data-attributes, you can trigger an element
 * to enter a "skeletized" state during requests. Then you can destroy that state
 * once the request is finished.
 *
 * For now this plugin will only create a skeleton screen out of the first level 
 * children of the specified container. The only requirements out of the box is 
 * that the element passed to the plugin have a `position:relative` set.
 *
 * @author Justin Kaczmar <kaczmar.justin@gmail.com>
 */

var Skeletize = function () 
{

	/**
	 * @param { boolean } on_parent  Specify whether to build the skeleton over the target element or its children.
	 */
	this.on_parent = false;

	/**
	 * @param { HTMLElement } target  The element(s) on which each operation will be done.
	 */
	this.target = null;

	/**
	 * @param { string } text  The text (optional) to insert into the skeleton container as a message.
	 */
	this.text = '';

	/**
	 * @param { string } type  The type of loading to create (skeleton or spinner).
	 */
	this.type = 'skeleton';

	/**
	 * @param { string } type  Show/hide the flashing gray background.
	 */
	 this.show_background = true;

}

Skeletize.prototype.defaults = {};


/**
 * Initialize and place the skeleton screen over the speicified element.
 * 
 * @return {[type]}      [description]
 */
Skeletize.prototype.create = function ()
{
	
	this.target.forEach((element) => {

		this.text = element.dataset.skeletizeText;
		this.buildOnParent(element);

	});

}



Skeletize.prototype.buildOnParent = function (el)
{

	let new_skeleton_part = this.createSkeletonPart(el);
	el.appendChild(new_skeleton_part);

}



Skeletize.prototype.createSkeletonPart = function (element)
{
	
	// Create the element and give it out custom class.
	let new_skeleton_part = document.createElement('DIV');
	new_skeleton_part.classList.add('skeletize-part');

	if (this.type === 'spinner')
		new_skeleton_part.classList.add('spinner');

	if (this.show_background)
		new_skeleton_part.classList.add('skeletize-bg');

	if (typeof this.text != "undefined") 
		new_skeleton_part.innerHTML = this.text;


	// By default always set the width and height of the skeleton container.
	new_skeleton_part.style.width = element.offsetWidth + 'px';
	new_skeleton_part.style.height = element.offsetHeight + 'px';

	if (this.on_parent) 
	{

		new_skeleton_part.style.top = '0px';
		new_skeleton_part.style.left = '0px';

	} 
	else 
	{

		new_skeleton_part.style.top = element.offsetTop + 'px';
		new_skeleton_part.style.left = element.offsetLeft + 'px';

	}

	return new_skeleton_part;

}



Skeletize.prototype.onParent = function (on_parent = false) 
{

	this.on_parent = on_parent;
	return this;

}


Skeletize.prototype.type = function (type = 'skeleton')
{

	this.type = type;
	return this;

}


Skeletize.prototype.showBackground = function (show_background = true)
{

	this.show_background = show_background;
	return this;

} 


Skeletize.prototype.setTarget = function (element) 
{

	if (element[0] == '#')
		this.target = [document.getElementById(element.substr(1))];
	else if (element[0] == '.')
		this.target = Array.from(document.getElementsByClassName(element.substr(1)));
	else if (
		typeof HTMLElement === "object" ? element instanceof HTMLElement : //DOM2
    	element && typeof element === "object" && element !== null && element.nodeType === 1 && typeof element.nodeName==="string"
    )
		this.target = [element];
	else 
		throw "SKELETIZE.JS ERROR: A valid class or ID is required.";
	
	return this;

}



Skeletize.prototype.clear = function ()
{

	this.target.forEach((element) => {

		element.classList.remove('skeletize-on-load');

	});

	
	return this;

}




Skeletize.prototype.getLength = function ()
{

	return this.target.length;

}



Skeletize.prototype.destroy = function ()
{

	this.target.forEach((element) => {

		Array.from(element.querySelectorAll('.skeletize-part')).forEach((el) => {

			el.remove();

		});

	});

}


/**
 * This function could be used in the future to actually accept a data
 * attribute to create your own custom skeletized layouts.
 *
 * @todo  Perhaps integrate this.
 * 
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
Skeletize.prototype.parse = function (str)
{

	let template = '<div class="skeletize-container">';

	if (str.indexOf('header') >= 0) {
		template += '<div class="skeletize-header"></div>';
	}
	
	if (str.indexOf('body') >= 0) {
		template += '<div class="skeletize-body"></div>';
	}

	template += '</div>';

	return template;

}



