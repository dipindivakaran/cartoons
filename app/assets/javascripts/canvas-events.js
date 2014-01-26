
$(document).ready(function(){
	
	stage = new Kinetic.Stage({
        container: 'container',
        width: 578,
        height: 200
      });
	
});

function load_image(stage,image_url){
	var layer = new Kinetic.Layer();
    console.log(image_url);
      var imageObj = new Image();
      imageObj.onload = function() {
        var yoda = new Kinetic.Image({
          x: 200,
          y: 50,
          image: imageObj,
          width: 200,
          height: 200,
          draggable:true
        });
        
        layer.add(yoda);

        // add the layer to the stage
        stage.add(layer);
      };
      imageObj.src = image_url;
}
