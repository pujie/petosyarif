(function($){
	toRad = function(degree){
		return degree * Math.PI / 180;
	}
	sinResult = function(degree){
		return Math.sin(toRad(degree));
	}
	cosResult = function(degree){
		return Math.cos(toRad(degree));
	}
	makeline = function(x1,y1,radius,angle){
		x2 = radius*cosResult(angle)+x1;
		y2 = radius*sinResult(angle)+y1;
		context.moveTo(x1,y1);
		context.lineTo(x2,y2);
		context.stroke();
		return {
			outx:x2,outy:y2
		}
	}
	makelinewitharrow = function(x1,y1,radius,angle,arrowangle){
		line1 = makeline(x1,y1,radius,angle);
		line2 = makeline(line1.outx,line1.outy,20,180+angle-arrowangle);
		line3 = makeline(line1.outx,line1.outy,20,180+angle+arrowangle);
	}
	getMousePos = function(canvas,evt){
		var rect = canvas.getBoundingClientRect();
		return {
			x:evt.clientX-rect.left,
			y:evt.clientY-rect.top
		};
	};
	clearRect = function(){
		context.clearRect(0,0,canvas.width,canvas.height);
		loadImage();				
	}
	drawCircle = function(mousepos,ocolor){
		context.beginPath();
		xx = Math.pow((mousepos.x - curPosX),2);
		yy = Math.pow((mousepos.y - curPosY),2);
		radius = Math.sqrt(xx+yy);
		context.arc(curPosX, curPosY, radius,0,2*Math.PI,false);
		context.lineWidth=4;
		context.strokeStyle = ocolor;
		context.stroke();				
	}
	drawFreeLine = function(mousepos,ocolor){
		context.lineTo(mousepos.x,mousepos.y);
		context.strokeStyle=ocolor;
		context.lineWidth = 4;
		context.stroke();				
	}
	drawRectangle = function(mousepos,ocolor){
		context.beginPath();
		context.rect(startX,startY,mousepos.x - startX,mousepos.y - startY);
		context.lineWidth = 4;
		context.strokeStyle = ocolor;
		context.stroke();				
	}
	drawObject = function(mousepos,ocolor,src){
		context.beginPath();
		startX = mousepos.x;
		startY = mousepos.y;
		context.moveTo(mousepos.x,mousepos.y);
		var stamp = new Image();
		stamp.src = src;
		context.strokeStyle = ocolor;
		//context.drawImage(stamp,startX,startY,40,90);
		context.drawImage(stamp,startX,startY,40,70);
	}
	drawStamp = function(mousepos,ocolor,stamp){
		context.beginPath();
		startX = mousepos.x-200;
		startY = mousepos.y-200;
		context.moveTo(startX,startY);
		img = new Image();
		img.src = stamp;
		context.strokeStyle = ocolor;
		context.drawImage(img,startX,startY,600,340);
	}
	download = function(link,canvas,filename){
		link.href = canvas.toDataURL();
		link.download = filename;
	}
	loadImage = function(){
		imageObj.onload = function(){
			context.drawImage(imageObj,0,0);
		}
	//	imageObj.src = ";
	}
	var imageObj = new Image(),
		canvas = document.getElementById("mycanvas"),
		context = canvas.getContext('2d'),
		mycursor="arrow",
		mycolor="#000000",
		buttonPushed = false,
		curPosX=0,
		curPosY=0,
		startX = 0,
		startY = 0,
		imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
	canvas.addEventListener('mousedown',function(evt){
		var mousepos = getMousePos(canvas,evt),ocolor = '#'+$('.color').val();
		buttonPushed = true;
		imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
		switch(mycursor){
			case "line":
				context.beginPath();
				startX = mousepos.x;
				startY = mousepos.y;
				context.moveTo(mousepos.x,mousepos.y);
			break;
			case "text":
				context.beginPath();
				startX = mousepos.x;
				startY = mousepos.y;
				context.moveTo(mousepos.x,mousepos.y);
			break;
			case "freedrag":
				context.beginPath();
				context.moveTo(mousepos.x,mousepos.y);
			break;
			case "circle":
				context.beginPath();
				curPosX = mousepos.x;
				curPosY = mousepos.y;
			break;
			case "rectangle":
				context.beginPath();
				startX = mousepos.x;
				startY = mousepos.y;
				context.moveTo(mousepos.x,mousepos.y);
			break;
			case "tower1":
				drawObject(mousepos,ocolor,'img/stamps/RadioTower.png');
			break;
			case "tower2":
				drawObject(mousepos,'img/stamps/antenna.png');
			break;
		}
	});
	canvas.addEventListener('mousemove',function(evt){
		var mousepos = getMousePos(canvas,evt),ocolor = '#'+$(".color").val();
		if(buttonPushed){
			clearRect();
			context.putImageData(imageData, 0, 0);
			switch(mycursor){
				case "circle":
					context.setLineDash([]);
					context.lineWidth = 4;
					drawCircle(mousepos,'brown');
				break;
				case "rectangle":
					drawRectangle(mousepos,'black');
				break;
				case 'freedrag':
					drawFreeLine(mousepos,'brown');
				break;
				case 'line':
					context.setLineDash([]);
					context.beginPath();
					context.moveTo(startX,startY);
					context.lineTo(mousepos.x,mousepos.y);
					context.strokeStyle='#'+$(".color").val();
					context.lineWidth = 4;
					context.stroke();
				break;
				case 'text':
					context.beginPath();
					context.moveTo(startX,startY);
					context.lineTo(mousepos.x,mousepos.y);
					context.strokeStyle='#'+$(".color").val();
					context.lineWidth = 4;
					context.setLineDash([5,15]);
					context.stroke();
				break;
				case 'tower1':
					drawObject(mousepos,ocolor,'img/stamps/RadioTower.png');
				break;
				case 'tower2':
					drawObject(mousepos,ocolor,'img/stamps/antenna.png');
				break;
				case "palm1":
					drawObject(mousepos,ocolor,'img/stamps/palm1.png');
					break;
				case "palm2":
					drawObject(mousepos,ocolor,'img/stamps/palm.png');
					break;
				case "forest":
					drawObject(mousepos,ocolor,'img/stamps/forest.png');
					break;
			}
		}
	});
	canvas.addEventListener('mouseup',function(evt){
		var mousepos = getMousePos(canvas,evt),ocolor = '#'+$(".color").val();
		buttonPushed = false;
		switch(mycursor){
			case "freedrag":
				drawFreeLine(mousepos,'#'+$(".color").val());
				break;
			case "circle":
				drawCircle(mousepos,ocolor);
				break;
			case "rectangle":
				drawRectangle(mousepos,ocolor);
				break;
			case "line":
				radius = Math.sqrt(Math.pow(mousepos.x-startX,2)+Math.pow(mousepos.y-startY,2));
				th = mousepos.x - startX;
				tv = mousepos.y - startY;
				radian = Math.atan2(tv , th);
				degree = radian * (180 / Math.PI);
				makelinewitharrow(startX,startY,radius,degree,20);
				break;
			case "text":
				clearRect();
				context.putImageData(imageData, 0, 0);
				context.save();
				th = mousepos.x - startX;
				tv = mousepos.y - startY;
				radian = Math.atan2(tv , th);
				context.translate(startX,startY);
				context.rotate(radian);
				context.font = "16px serif";
				context.fillStyle = "red";
				context.textAlign = "left";
				context.fillText($("#textToWrite").val(),0,0);
				context.restore();
				break;
			case "tower1":
				drawObject(mousepos,ocolor,'img/stamps/RadioTower.png');
				break;
			case "tower2":
				drawObject(mousepos,ocolor,'img/stamps/antenna.png');
				break;
			case "palm1":
				drawObject(mousepos,ocolor,'img/stamps/palm1.png');
				break;
			case "palm2":
				drawObject(mousepos,ocolor,'img/stamps/palm.png');
				break;
			case "forest":
				drawObject(mousepos,ocolor,'img/stamps/forest.png');
				break;
			case "stampApproved":
				drawStamp(mousepos,ocolor,completed);
				break;
		}
	});
	$("#btnClear").click(function(){
		context.clearRect(0,0,canvas.width,canvas.height);
		loadImage();
	});
	$("#btnUndo").click(function(){
		clearRect();
		context.putImageData(imageData, 0, 0);
		$(this).attr('disabled',true)
	});
	$("#btnSave").click(function(){
		download(this,canvas,'test.png');
	});
	$("#btnArrow").click(function(){
		mycursor = "arrow";
	});
	$("#btnLine").click(function(){
		mycursor = "line";
	});
	$("#btnCircle").click(function(){
		mycursor = "circle";
	});
	$("#btnRectangle").click(function(){
		mycursor = "rectangle";
	});
	$("#btnFreeDrag").click(function(){
		mycursor = "freedrag";
	});
	$("#btnTower1").click(function(){
		mycursor = "tower1";
	});
	$("#btnTower2").click(function(){
		mycursor = "tower2";
	});
	$("#btnPalm1").click(function(){
		mycursor = "palm1";
	});
	$("#btnPalm2").click(function(){
		mycursor = "palm2";
	});
	$("#btnForest").click(function(){
		mycursor = "forest";
	});
	$("#btnStampApproved").click(function(){
		mycursor = "stampApproved";
	});
	$("#btnText").click(function(){
		$('#dText').modal();
		mycursor = "text";
	});
	$('#saveText').click(function(){
		$('#dText').modal('hide');
	});
	$("#btnDownload").click(function(){
		var dataUrl = canvas.toDataURL();
		var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
		window.location.href=image;
	});
	$("#btnLoadImage").click(function(){
		var imageObj = new Image();
		imageObj.onload = function(){
			context.drawImage(imageObj,0,0);
		}
		imageObj.src = "";
	});
}(jQuery));
