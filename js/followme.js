function Followme(){
	new Pointer().init();
}


//站的地点，有四个角度 
function Pointer(){
	this.upPointer = null;
	this.downPointer = null;
	this.leftPointer = null;
	this.rightPointer = null;
	this.north_Img_url = "img/A.png";
	this.east_Img_url = "img/B.png";
	this.south_Img_url = "img/C.png";
	this.west_Img_url = "img/D.png";
	this.curView = "east";//当前视角
	this.$view = $('.show_img .view');

	this.show_img_width = 500;//图片的宽度为500象素
}

Pointer.prototype = {
	turnLeft : function(){//向左转，根据当前视角来变换视角
		if(this.curView=="east"){
			this.curView = "north";
		}else if(this.curView=="north"){
			this.curView = "west";
		}else if(this.curView=="west"){
			this.curView = "south";
		}else if(this.curView=="south"){
			this.curView = "east";
		}
	},
	turnRight : function(){//向右转
		if(this.curView=="east"){
			this.curView = "south";
		}else if(this.curView=="south"){
			this.curView = "west";
		}else if(this.curView=="west"){
			this.curView = "north";
		}else if(this.curView=="north"){
			this.curView = "east";
		}
	},
	turnBack : function(){//向后转
		if(this.curView=="east"){
			this.curView = "west";
		}else if(this.curView=="south"){
			this.curView = "north";
		}else if(this.curView=="west"){
			this.curView = "east";
		}else if(this.curView=="north"){
			this.curView = "south";
		}
	},
	setView : function(){
		this.$view.attr('src',this[this.curView+'_Img_url']);
	},
	gohead : function(){//向前走,只有当前点的视角前方有视点的时候，才能向前走

	},
	init : function(){
		this.setView();
		this.turn_event();
	},
	turn_event : function(){
		var _this = this;
		//向左转
		var animate_finish = true;
		$('.turnLeftBtn').click(function(){
			if(animate_finish){
				animate_finish = false;
				_this.turnLeft();
				_this.$view.fadeOut(1000);
				var $tmpImg = $('<img class="view tmp" src="'+_this[_this.curView+'_Img_url']+'"></img>').css({top:0,left:-_this.show_img_width,position:"absolute"});
				$('.show_img').append($tmpImg);
				$tmpImg.stop().animate({left:0},3000,function(){
					_this.setView();
					this.remove();
					_this.$view.fadeIn(3000,function(){
						animate_finish = true;
					});
				});
			}
			
		});

		//向右转
		$('.turnRightBtn').click(function(){
			_this.turnRight();
			_this.setView();
		});

		//向后转
		$('.turnBackBtn').click(function(){
			_this.turnBack();
			_this.setView();
		});
	}
}



var data = [
		[],
		[]
	];