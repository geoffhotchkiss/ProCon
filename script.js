var i = 1;
$(document).ready(function() {
  $("ul").sortable({
	connectWith: "ul"
  });
  
  $("#tasklist").disableSelection();
  
  
  function li_on_click(elem){
	elem.on('click', function(event){
		if($(this).attr('to_delete') != "true" || $(this).attr('to_delete') == 'undefined'){
			$('li[to_delete="true"]').each( function(index) {
				$(this).attr('to_delete', 'false');
			});
			$(this).attr('to_delete', 'true');
		} else {
			$(this).attr('to_delete', 'false');
		}
	});
  }
  
  // initialize click events
  $('ul.selectable li').each(function(index){
	li_on_click($(this));
  });
  
  $("#add").click(function(event) {
    event.preventDefault();
	var new_item = $("<li>" + $("input:text").val() + "</li>");
	li_on_click(new_item);
    $("#todo").append(new_item);
	i++;
  });
  
  $("#delete").click(function(event) {
	event.preventDefault();
	$('li[to_delete="true"]').each( function(index) {
		$(this).remove();
	});
  });
});

