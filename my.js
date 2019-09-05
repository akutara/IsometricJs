var Monument = function(el) {
	if(this === window) return new Monument(el);
	this.el = checkfrom(el);
	this.el.classList.add("monument");

	return this;
}
function checkfrom(el){
	let firstchar = el.charAt(0);
	if(firstchar == '#')
		return document.getElementById(el.substr(1));
	else if(firstchar == '.')
		return document.getElementsByClassName(el.substr(1));
	else
		alert('Error !'+el)
}
Monument.prototype.create = function(geo){
	
	this.geo = geo;
	
	let geometry = document.createElement("DIV"),
		island = document.createElement("DIV");
	geometry.classList.add("block");
	island.classList.add("island");

	if(this.el.childNodes.length == 0){
		this.el.appendChild(island);
	}
	
	let islandEl = this.el.firstElementChild;
	this.me = islandEl.appendChild(geometry);
	
	for(i=0;i<6;i++){
		
		let side = document.createElement("DIV");
		
		side.classList.add(
			i==0 ? "block-t":
			i==1 ? "block-f" : 
			i==2 ? "block-l" : 
			i==3 ? "block-bh":
			i==4 ? "block-r" :
			i==5 ? "block-b" :
			null
		)
		if(i == 0){
			let inside = document.createElement("DIV");
			inside.classList.add('light');
			side.appendChild(inside);
		}
		if(i == 4){
			let inside = document.createElement("DIV");
			inside.classList.add('shadow');
			side.appendChild(inside);
		}
		
		geometry.appendChild(side);
	}

	return this;
}

Monument.prototype.size = function(dimen){
	
	let side;

	side = [[0,1],[0,2],[2,1],[0,2],[2,1],[0,1]];	

	if(this.geo == 'block'){
		this.checkmynode = this.me.childNodes;
		for(i=0;i<this.checkmynode.length;i++){
			if(this.me.childNodes[i].nodeName.toLowerCase() == 'div'){					
				this.checkmynode[i].style.width = arguments[side[i][0]]+"px";
				this.checkmynode[i].style.height = arguments[side[i][1]]+"px";
				
				if(i==0){
					this.checkmynode[i].style.transform = "translateZ("+arguments[2]+"px)";	
				}
				if(i == 1 || i== 4){
					let val = i == 1 ? arguments[1] - arguments[2] :arguments[0] - arguments[2] ,
					 	propTrans = i == 1 ? "translateY("+val+"px) rotateX(-90deg)" : "translateX("+val+"px) rotateY(90deg)" ;
						
					this.checkmynode[i].style.transform = propTrans;
				}
			}
		}
	}

	return this;
}

Monument.prototype.position = function(x,y,z){
	this.me.style.transform = " translate3d("+x+"px , "+y+"px ,"+z+"px)";
	return this;
}

Monument.prototype.setColor = function(mycolor){
	for(i=0;i<this.checkmynode.length;i++){
		this.checkmynode[i].style.backgroundColor = mycolor;
	}
	
	return this;
}
