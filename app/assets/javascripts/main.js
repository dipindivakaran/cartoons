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
		var oCanvas = document.getElementById("#myCanvas");  
		
		var strDataURI = oCanvas.toDataURL("image/jpeg");  
		alert(strDataURI);

		var data = "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>" + "<foreignObject width='100%' height='100%'>" + "<div xmlns='http://www.w3.org/1999/xhtml'>" +

		/// extract the html content of div
		document.getElementById('cart').innerHTML + "</div>" + "</foreignObject>" + "</svg>";

		var DOMURL = self.URL || self.webkitURL || self;
		var img = new Image();
		var svg = new Blob([data], {
			type : "image/svg+xml;charset=utf-8"
		});
		var reader = new window.FileReader();
		reader.readAsDataURL(svg);
		reader.onloadend = function() {
			base64data = reader.result;
			alert(base64data);
			$.post('upload',{image : base64data});
       };
		/// create an url that we can use for the image tag
		var url = DOMURL.createObjectURL(svg);
		img.onload = function() {

			/// now we can draw the "html" to canvas.
			ctx.drawImage(img, 0, 0);
			DOMURL.revokeObjectURL(url);
		};
		img.src = url;

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
			
			 var context = $(this)[0].getContext("2d");
			 
			context.fillHtml($(ui.draggable).clone());
			$("#workspace > img").draggable();
		}
	});
}
