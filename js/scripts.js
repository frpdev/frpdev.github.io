 function clearDefault(el) {
	if (el.defaultValue==el.value) el.value = ""
}

$(function(){
	$('form').on('submit',function(event){
		var cur_form = $(this);
		var submit = validateForm(cur_form);
		if(submit === true){
			return true;
		}
		else{
			event.preventDefault();
			return false;
		}
	});
	
	$('[data-role="accordion-container"] [data-role="toggle"]').on("click",function(){
		var content = $(this).closest('[data-role="content"]');
		if(content.hasClass('active')){
			content.find('[data-role="show"]').stop().slideUp();
			content.removeClass("active");
		}
		else{
			$.each(content.siblings(),function(){
				$(this).removeClass("active");
				$(this).find('[data-role="show"]').stop().slideUp();
			});
			content.find('[data-role="show"]').stop().slideDown();
			content.addClass("active");
		}
	});
	
});

$(window).load(function(){
	fixedFooter();
});
$(window).resize(function(){
	fixedFooter();
});

function fixedFooter(){
	var winHeight = parseInt($(window).height() - $('footer.footer').outerHeight(true));
	var contentHeight = parseInt($('.content-height').outerHeight(true));
	if(winHeight >= contentHeight){
		$('footer.footer').addClass('fixed');
	}
	else{
		$('footer.footer').removeClass('fixed');
	}
}
function validateForm(cur_form){
	var validated = true;
	var message = '';
	cur_form.find('span.field-wrap').removeClass('error');
	cur_form.find('input.validate,select.validate,textarea.validate').each(function(){
		var cur_input = $(this);
		var cur_value = cur_input.val();
		var cur_title = cur_input.closest('p').find('label').text();
		cur_title = cur_title.replace(':','');
		var validationType = cur_input.attr('data-validation');
		switch(validationType){
			case 'email':
				if(!testRegex(cur_value,validationType)){
					cur_input.parent().addClass('error');
					message += "<li><strong>Please enter a valid Email Address<strong></li>";
				}
			break;
			default:
				if(cur_value == ''){
					cur_input.parent().addClass('error');
					message += "<li><strong>Please enter your " + cur_title + "</strong></li>";
				}
			break;
		}
	});
	if(message.length){
		validated = false;
		message = "<ul>" + message + "</ul>";
		$('div.error').html(message).show();
	}
	return validated;
}

function testRegex(value,type){
	var pattern;
	switch(type){
		case 'email':
			pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
		break;
	}
	return pattern.test(value);
}