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
			loadImage = function(){
				imageObj.onload = function(){
					context.drawImage(imageObj,0,0);
				}
				imageObj.src = "https://teknis/media/installs/"+$("#imagename").val();
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
				var mousepos = getMousePos(canvas,evt);
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
						context.beginPath();
						startX = mousepos.x;
						startY = mousepos.y;
						context.moveTo(mousepos.x,mousepos.y);
						var stamp = new Image();
						stamp.src = 'img/stamps/RadioTower.png';
						context.drawImage(stamp,startX,startY,40,90);
					break;
					case "tower2":
						context.beginPath();
						startX = mousepos.x;
						startY = mousepos.y;
						context.moveTo(mousepos.x,mousepos.y);
						var stamp = new Image();
						stamp.src = 'img/stamps/antenna.png';
						context.drawImage(stamp,startX,startY,40,90);
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
							drawCircle(mousepos,'brown');
						break;
						case "rectangle":
							context.beginPath();
							context.rect(startX,startY,mousepos.x - startX,mousepos.y - startY);
							context.strokeStyle = 'black';
							context.stroke();
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
				}
			});
			$("#btnClear").click(function(){
				context.clearRect(0,0,canvas.width,canvas.height);
				loadImage();
			});
			$("#btnSave").click(function(){
				var dataUrl = canvas.toDataURL(),
				arrfilename=$("#imagename").val().split(".");
				$.ajax({
					url:thisdomain+"adm/canvasinstallupload2",
					data:{imgBase64:dataUrl,filename:arrfilename[0],fileextension:arrfilename[1]},
					type:"post"
				}).done(function(data){
					console.log("Returned value "+data);
				});
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
				imageObj.src = "https://teknis/media/installs/"+$("#imagename").val();
			});
			loadImage();
		}(jQuery));
