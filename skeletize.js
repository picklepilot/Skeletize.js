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

	//this.el = document.getElementById(elem);
	console.log(this);

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

	let el,
		template,
		childs;

	el = document.getElementById(elem);

	Array.from(el.children).forEach((element) => {

		let new_skeleton_part = document.createElement('DIV');
		new_skeleton_part.classList.add('skeletize-part');
		new_skeleton_part.style.width = element.clientWidth + 'px';
		new_skeleton_part.style.height = element.offsetHeight + 'px';
		new_skeleton_part.style.top = element.offsetTop + 'px';
		new_skeleton_part.style.left = element.offsetLeft + 'px';

		el.appendChild(new_skeleton_part);

	});

}



Skeletize.prototype.destroy = function ()
{



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



