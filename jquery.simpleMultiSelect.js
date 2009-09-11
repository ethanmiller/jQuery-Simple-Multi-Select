/* jQuery Simple Multi-Select plugin 0.9
 *
 * Copyright (c) 2009 Ethan Miller
 *
 * http://ethanmiller.name/notes/jquery_simplemultiselect/
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 */

(function($){
 	$.fn.extend({
		simpleMultiSelect : function(options){
			settings = $.extend({
				highlight : '#CCE',
				border : '#777',
				width : 350,
				height : 150}, options);
			return this.each(function(){
				// wrapping select in a div so that the select and pseudo select 
				// will be siblings
				$(this).wrap('<div class="sms-container"></div>');
				var divselect = $('<div class="sms-pseudo-select"></div>');
				$('option', this).each(function(){
					var op = $(this);
					var dv = $('<div/>').data('v', op.val()).text(op.text());
					if(op.attr('selected')){
						// highlight pseudo option on load
						dv.css({'background-color' : settings.highlight});
					}
					dv.click(function(){
						// we still have references to op and dv here ...
						if(op.attr('selected')){
							//de-select
							op.removeAttr('selected');
							dv.css({'background-color' : 'transparent'});
						}else{
							//select
							op.attr('selected', true);
							dv.css({'background-color' : settings.highlight});
						}
					});
					divselect.append(dv);
				});
				divselect.css({
					width : settings.width,
					height : settings.height,
					cursor : "default",
					overflow : "auto",
					border : "1px solid " + settings.border});
				$(this).after(divselect).hide();
			});
		},
		smsNone : function(){
			return this.each(function(){
				siblingDivSet(this).each(function(){
					var psop = $(this);
					if(psop.css('background-color') != 'transparent'){
						psop.click();
					}
				});
			});
		},
		smsAll : function(){
			return this.each(function(){
				siblingDivSet(this).each(function(){
					var psop = $(this);
					if(psop.css('background-color') == 'transparent'){
						psop.click();
					}
				});
			});
		}
	});
	function siblingDivSet(sel){
		// expects a select object, return jquery set
		return $(sel).siblings('div.sms-pseudo-select').children('div');
	}
})(jQuery);
