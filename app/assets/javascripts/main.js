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
		stage.toDataURL({
          callback: function(dataUrl) {
          	dataUrl= dataUrl.replace(/^data:image\/(png|jpg);base64,/, "");
          	$.post("upload",{data:dataUrl});
          }
       });
	});
});

function init_drag_and_drop() {
	
	$("#catalog").accordion();
	$(".cartoon").draggable({
		helper : "clone",
		revert : "invalid"
	});
	$("#container").droppable({
		activeClass : "ui-state-default",
		hoverClass : "ui-state-hover",
		accept : ":not(.ui-sortable-helper)",
		drop : function(event, ui) {
			img_id = ui.draggable.attr("id");
			console.log(img_id);
			load_image(stage,$("#" + img_id).find("img").attr("src"));
		}
	});
}
