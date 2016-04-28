//gestion du déplacement de Jack avec les touches


//class Personnage
function Perso(url, x, y, floor) 
{
	this.image = new Image();
	this.image.src = url;
	this.image.isReady = false;
	this.image.refSprite = this;
	
	this.floor = floor;
	this.x = x;
	this.y = y;

	this.isAlive = true;

	this.attackX = -1;
	this.attackY = -1;

	this.look = 0; // 0 = back; 1 = right; 2 = left; 3 = face;
	
	this.image.onload = function()
	{
		if(!this.complete) 
		{
			console.log("Erreur de chargement du sprite : \"" + url + "\".");
			this.isReady = false;
		}
		else
		{
			this.isReady = true;
			launch();
		}
	}

	this.UpdatePlayer = function(event)
	{
		if(this.isAlive)
		{
	var key = event.keyCode;
	switch (key) {
    	case 37 :
			carte.actualiseCase(this.x,this.y,this.floor);
			this.move("left",carte.carte[this.floor]);
    		break;
			
    	case 39 :
			carte.actualiseCase(this.x,this.y,this.floor);
			this.move("right",carte.carte[this.floor]);
    		break;
			
    	case 38 :
			carte.actualiseCase(this.x,this.y,this.floor);
			this.move("forward",carte.carte[this.floor]);
    		break;
			
    	case 40 :
			carte.actualiseCase(this.x,this.y,this.floor);
			this.move("back",carte.carte[this.floor]);
    		break;
			
		case 65 :
			carte.actualiseCase(this.x,this.y,this.floor);
			this.floor++;
			if (this.floor >4){this.floor = 0;}
			carte.aff(this.floor);
			this.aff()
    		break;
			
		case 90 :
			carte.actualiseCase(this.x,this.y,this.floor);
			this.floor--;
			if (this.floor <0){this.floor = 4;}
			carte.aff(this.floor);
			this.aff()
    		break;

    	default:
    		if(this.look == 0)
    		{
    			this.attackY = this.y-1;
    			this.attackX = this.x;
    		}
    		else if(this.look == 1)
    		{
    			this.attackY = this.y;
    			this.attackX = this.x+1;
    		}
    		else if(this.look == 2)
    		{
    			this.attackY = this.y;
    			this.attackX = this.x-1;
    		}
    		else if(this.look == 3)
    		{
    			this.attackY = this.y+1;
    			this.attackX = this.x;
    		}
    		ctx.drawImage(this.image, 4*16,0,16,32,this.attackX*32,this.attackY*32,16,32);
    		setTimeout(stop, 400);
    		break;
    	}
    }
	
	
}
	function stop()
	{
		jack.stopper();
	}
	this.Die = function()
	{
		this.isAlive = false;
		console.log("He is dead");
	}
	this.stopper = function()
	{
		console.log(this.attackX, this.attackY, this.floor);
		carte.actualiseCase(this.attackX,this.attackY,this.floor);
		this.attackX = -1;
		this.attackY = -1;
	}
	this.aff = function()
	{
		//console.log("dessin du perso");
		ctx.drawImage(this.image,this.look*16,0,16,32,this.x*32,this.y*32,16,32);
	}	
	
	this.move = function(side,map)
	{
		var a = this.x;
		var b = this.y;
		if (side == "forward")
		{
			this.y --;
			this.look = 0;
		}
		
		if (side == "back")
		{
			this.y ++;
			this.look = 3;
		}
		
		if (side == "left")
		{
			this.x --;
			this.look = 2;
		}
		
		if (side == "right")
		{
			this.x ++;
			this.look = 1;
		}
		
		if(map[this.x][this.y] >=2)
		{
			this.x = a; this.y = b;
			console.log("obstacle");
		}
		this.aff()//on affiche le perso
	}	
}