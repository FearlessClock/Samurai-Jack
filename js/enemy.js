//gestion du déplacement de Jack avec les touches
function updateAI()
{	
	carte.actualiseCase(mob.x,mob.y,mob.floor); 
	//Check if the direction is valide (No obstacle)
	if(mob.CanMove(-1,0,carte.carte[mob.floor]) && jack.x < mob.x)
	{
		mob.move("left",carte.carte[mob.floor]);
	}
	else if(mob.CanMove(1,0,carte.carte[mob.floor]) &&jack.x > mob.x)
	{
		mob.move("right",carte.carte[mob.floor]);
	}
	else if(mob.CanMove(0,-1,carte.carte[mob.floor]) &&jack.y < mob.y)
	{
		mob.move("forward",carte.carte[mob.floor]);
	}
	else if(mob.CanMove(0,1,carte.carte[mob.floor]) &&jack.y > mob.y)
	{
		mob.move("back",carte.carte[mob.floor]);
	}
}

//class Personnage
function Enemy(url, x, y, floor) 
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
	this.CanMove = function(L,H,map)
	{
		if(map[this.x+L][this.y+H] >=2)
		{
			console.log(L + " " + H + " " + map[this.x+L][this.y+H]);
			return false;
		}
		return true;
	}	
}