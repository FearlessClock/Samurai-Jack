//gestion du déplacement de Jack avec les touches
function deplacement(event)
{
	var key = event.keyCode;
	carte.actualiseCase(jack.x,jack.y,jack.floor);
	switch (key) {
    	case 37 :
			jack.move("left",carte.carte[jack.floor]);
    		break;
			
    	case 39 :
			jack.move("right",carte.carte[jack.floor]);
    		break;
			
    	case 38 :
			jack.move("forward",carte.carte[jack.floor]);
    		break;
			
    	case 40 :
			jack.move("back",carte.carte[jack.floor]);
    		break;
			
		case 65 :
			jack.floor++;
			if (jack.floor >4){jack.floor = 0;}
			carte.aff(jack.floor);
			jack.aff()
    		break;
			
		case 90 :
			jack.floor--;
			if (jack.floor <0){jack.floor = 4;}
			carte.aff(jack.floor);
			jack.aff()
    		break;
    }
	
	
}






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