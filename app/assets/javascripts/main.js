$(document).ready(function() {

	$.ajax({
		type : "GET",
		url : "/cartoons",
		dataType : 'json',
		success : function(msg) {
			$.each(msg, function(key, value) {
				$("#cartoons").append("<span class='cartoon' id='image" + key + "'><img class='cartoon-image' src='" + value + "'></img></span>");
			});
			init_drag_and_drop();
		}
	});

	$("#convert").click(function() {
		var datastring = $('#workspace')[0].toDataURL("image/png");
		alert(datastring);
		datastring = datastring.replace(/^data:image\/(png|jpg);base64,/, "");
		$.post('upload', {
			data : JSON.stringify(datastring)
		});

	});

});

function init_drag_and_drop() {
	$("#catalog").accordion();
	$(".cartoon").draggable({
		helper : "clone",
		revert : "invalid"
	});
	$("#workspace").droppable({
		activeClass : "ui-state-default",
		hoverClass : "ui-state-hover",
		accept : ":not(.ui-sortable-helper)",
		drop : function(event, ui) {
			img_id = ui.draggable.attr("id");
			draw_imge_on_canvas($("#" + img_id).find("img").attr("src"));
		}
	});
}
