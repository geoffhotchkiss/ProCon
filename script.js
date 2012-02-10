function getarray(kind) {
	var thearray = new Array();
	$("#" + kind + "  > li").each( 
		function(index) {
			thearray[index] = $(this).text();
		});
	return thearray;
}

function makelist() {
	var pros = decodeURI(window.location.getParameter("pros"));
	if(pros != "") {
		pros = pros.split(",");
		for(var pro in pros) {
			$("#pros").append("<li>" + pros[pro] + "</li>");
		}
	}
	var cons = decodeURI(window.location.getParameter("cons"));
	if(cons != "") {
		cons = cons.split(",");
		for(var con in cons) {
			$("#cons").append("<li>" + cons[con] + "</li>");
		}
	}
}

function makeurl(event, ui) {
	var url = "http://csh.rit.edu"
	var proarray = getarray("pros");
	var conarray = getarray("cons");
	var toappend = "?pros=" + proarray.toString() + "&cons=" + conarray.toString();
	$("#shareurltext").html("<a href=\"" + url + window.location.pathname + encodeURI(toappend) + "\">Share</a>");
	// window.location.getParameter
}


$(document).ready(
	function() {
		$("#radio").buttonset();
		$("ul").sortable({connectWith: "ul", 
											revert: true, 
											helper:'clone',
											stop: makeurl});
  
		$("#proslist").disableSelection();
		$("#conslist").disableSelection();
		$('.tabs').button();
		makelist();	
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
				var inputtext = $("input:text").val();
				if(inputtext != "") {
					var new_item = $("<li>" + $("input:text").val() + "</li>");
					li_on_click(new_item);
					$("#pros").append(new_item);
				}
				makeurl(null, null);
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
				makeurl(null, null);
			}
		);
	}
);

