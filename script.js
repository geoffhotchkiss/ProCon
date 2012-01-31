var i = 1;

function makeurl(event, ui) {
	$("#shareurltext").html("Hello world" + i)	
	i++;
}


$(document).ready(
	function() {
		$("#radio").buttonset();
		$("ul").sortable({connectWith: "ul", 
											revert: true, 
											helper:'clone',
											over: makeurl});
  
		$("#proslist").disableSelection();
		$("#conslist").disableSelection();
		makeurl(null, null);


		function li_on_click(elem) {
			elem.on('click', 
				function(event) {
					if( $(this).attr('to_delete') != "true" || 
							$(this).attr('to_delete') == 'undefined') {
						$('li[to_delete="true"]').each( 
							function(index) {
								$(this).attr('to_delete', 'false');
							}
						);
						$(this).attr('to_delete', 'true');
					} 
					else {
						$(this).attr('to_delete', 'false');
					}
				}
			);
		}
  
  // initialize click events
		$('ul.selectable li').each(
			function(index){
				li_on_click($(this));
			}
		);
  
		$("#add").click(
			function(event) {
				event.preventDefault();
				makeurl(null, null);
				var inputtext = $("input:text").val();
				if(inputtext != "") {
					var new_item = $("<li>" + $("input:text").val() + "</li>");
					li_on_click(new_item);
					$("#pros").append(new_item);
				}
			}
		);
  
		$("#delete").click(
			function(event) {
				event.preventDefault();
				$('li[to_delete="true"]').each( 
					function(index) {
						$(this).remove();
					}
				);
			}
		);
	}
);

