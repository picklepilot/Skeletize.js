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
	 * @param { boolean } on_parent Specify whether to build the skeleton over the target element or its children.
	 */
	this.on_parent = false;

}

Skeletize.prototype.defaults = {};


/**
 * Initialize and place the skeleton screen over the speicified element.
 * 
 * @param  {string} elem The ID string (without "#") to target.
 * @return {[type]}      [description]
 */
Skeletize.prototype.create = function (elem)
{

	let el;

	el = document.getElementById(elem);

	if (this.on_parent) {

		this.buildOnParent(el);

	} else {

		Array.from(el.children).forEach((element) => {

			this.buildOnParent(element);

		});

	}

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



Skeletize.prototype.destroy = function (elem)
{

	let el;

	el = document.getElementById(elem);

	Array.from(el.querySelectorAll('.skeletize-part')).forEach((element) => {

		element.remove();

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



