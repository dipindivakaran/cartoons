function draw_imge_on_canvas (image_url){

    var canvas=document.getElementById("workspace");
    var ctx=canvas.getContext("2d");

    var canvasOffset=$("#workspace").offset();
    var offsetX=canvasOffset.left;
    var offsetY=canvasOffset.top;

    var startX;
    var startY;
    var isDown=false;


    var pi2=Math.PI*2;
    var resizerRadius=8;
    var rr=resizerRadius*resizerRadius;
    var draggingResizer={x:0,y:0};
    var imageX=50;
    var imageY=50;
    var imageWidth,imageHeight,imageRight,imageBottom;
    var draggingImage=false;
    var startX;
    var startY;



    var img=new Image();
    img.onload=function(){
        imageWidth=img.width/2;
        imageHeight=img.height/2;
        imageRight=imageX+imageWidth;
        imageBottom=imageY+imageHeight;
        console.log(imageWidth,imageHeight,imageRight,imageBottom);
        draw(true,false);
    };
    img.src=image_url;
    
    
    
    function draw(withAnchors,withBorders){

        // clear the canvas
        ctx.clearRect(0,0,canvas.width,canvas.height);

        // draw the image
        ctx.drawImage(img,0,0,(img.width),(img.height),imageX,imageY,imageWidth,imageHeight);
        
        // optionally draw the draggable anchors
        if(withAnchors){
            drawDragAnchor(imageX,imageY);
            drawDragAnchor(imageRight,imageY);
            drawDragAnchor(imageRight,imageBottom);
            drawDragAnchor(imageX,imageBottom);
        }

        // optionally draw the connecting anchor lines
        if(withBorders){
            ctx.beginPath();
            ctx.moveTo(imageX,imageY);
            ctx.lineTo(imageRight,imageY);
            ctx.lineTo(imageRight,imageBottom);
            ctx.lineTo(imageX,imageBottom);
            ctx.closePath();
            ctx.stroke();
        }

    }

    function drawDragAnchor(x,y){
        ctx.beginPath();
        ctx.arc(x,y,resizerRadius,0,pi2,false);
        ctx.closePath();
        ctx.fill();
    }

    function anchorHitTest(x,y){

        var dx,dy;
  
        console.log(imageX+offsetX,imageY+offsetY);
        // top-left
        dx=x-imageX;
        dy=y-imageY;
        console.log(x,y);
        console.log(dx,dy,rr);
        if(dx*dx+dy*dy<=rr){ return(0); }
        // top-right
        dx=x-imageRight;
        dy=y-imageY;
        if(dx*dx+dy*dy<=rr){ return(1); }
        // bottom-right
        dx=x-imageRight;
        dy=y-imageBottom;
        if(dx*dx+dy*dy<=rr){ return(2); }
        // bottom-left
        dx=x-imageX;
        dy=y-imageBottom;
        if(dx*dx+dy*dy<=rr){ return(3); }
        return(-1);

    }


    function hitImage(x,y){
        return(x>imageX && x<imageX+imageWidth && y>imageY && y<imageY+imageHeight);
    }

    
	function addText(x, y) {

		ctx.fillStyle = "blue";
		ctx.font = "bold 16px Arial";
		ctx.fillText("Zibri", x, y);
	}


    function handleMouseDown(e){
      console.log("Canvas offset :"+ offsetX , offsetY ,e.clientY);
      startX=parseInt(e.clientX-offsetX);
      startY=parseInt(e.clientY-offsetY);
      draggingResizer=anchorHitTest(startX,startY);
      console.log(draggingResizer);
      draggingImage= draggingResizer<0 && hitImage(startX,startY);
      console.log(draggingImage);
    }

    function handleMouseUp(e){
      draggingResizer=-1;
      draggingImage=false;
      draw(true,false);
    }

    function handleMouseOut(e){
      handleMouseUp(e);
    }

    function handleMouseMove(e){

      if(draggingResizer>-1){

          mouseX=parseInt(e.clientX-offsetX);
          mouseY=parseInt(e.clientY-offsetY);

          // resize the image
          switch(draggingResizer){
              case 0: //top-left
                  imageX=mouseX;
                  imageWidth=imageRight-mouseX;
                  imageY=mouseY;
                  imageHeight=imageBottom-mouseY;
                  break;
              case 1: //top-right
                  imageY=mouseY;
                  imageWidth=mouseX-imageX;
                  imageHeight=imageBottom-mouseY;
                  break;
              case 2: //bottom-right
                  imageWidth=mouseX-imageX;
                  imageHeight=mouseY-imageY;
                  break;
              case 3: //bottom-left
                  imageX=mouseX;
                  imageWidth=imageRight-mouseX;
                  imageHeight=mouseY-imageY;
                  break;
          }

          // enforce minimum dimensions of 25x25
          if(imageWidth<25){imageWidth=25;}
          if(imageHeight<25){imageHeight=25;}

          // set the image right and bottom
          imageRight=imageX+imageWidth;
          imageBottom=imageY+imageHeight;

          // redraw the image with resizing anchors
          draw(true,true);

      }else if(draggingImage){

          imageClick=false;

          mouseX=parseInt(e.clientX-offsetX);
          mouseY=parseInt(e.clientY-offsetY);

          // move the image by the amount of the latest drag
          var dx=mouseX-startX;
          var dy=mouseY-startY;
          imageX+=dx;
          imageY+=dy;
          imageRight+=dx;
          imageBottom+=dy;
          // reset the startXY for next time
          startX=mouseX;
          startY=mouseY;

          // redraw the image with border
          draw(false,true);

      }


    }
    $("#workspace").mousedown(function(e) {
				handleMouseDown(e);
			});
			$("#workspace").mousemove(function(e) {
				handleMouseMove(e);
			});
			$("#workspace").mouseup(function(e) {
				handleMouseUp(e);
			});
			$("#workspace").mouseout(function(e) {
				handleMouseOut(e);
			});
			$("#workspace").dblclick(function(e) {
				addText(e.clientX-offsetX,e.clientY-offsetY);
			});
    
}

    
