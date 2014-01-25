$(document).ready(function(){
	
	
	$.ajax({
		type : "GET",
		url : "/cartoons",
		dataType:'json',
		success : function(msg){
			$.each(msg, function(key, value) {
			$( "#cartoons" ).append("<span class='cartoon' id='image"+key+"'><img class='cartoon-image' src='"+value+"'></img></span>");
		}); 
		init_drag_and_drop();	
		}
				
	}); 
		
	});
	
 function init_drag_and_drop(){
 	$( "#catalog" ).accordion();
		$( ".cartoon" ).draggable({
			helper: "clone",
			revert: "invalid"
			});
		$( "#cart" ).droppable({
			activeClass: "ui-state-default",
			hoverClass: "ui-state-hover",
			accept: ":not(.ui-sortable-helper)",
			drop: function( event, ui ) {
				console.log("dropped");
				$( this ).find( ".placeholder" ).remove();
				image_id = ui.draggable.attr('id');
				html_element = $("#"+image_id).html();
				$( "<div class='workspace-cartoon'></div>" ).html(html_element).appendTo( this );
				$(".workspace-cartoon").draggable();
			}
		});
 }
