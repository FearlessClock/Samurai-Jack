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
	this.isAlive = true;
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

	//gestion du déplacement de Jack avec les touches
	this.updateAI = function(player, map)
	{	
		if(this.isAlive)
		{
			var dis = Math.sqrt(Math.pow(this.x-player.attackX, 2) + Math.pow(this.y - player.attackY, 2));
			if( dis < 2) 
			{
				console.log("DIE");
				this.isAlive = false;
			}
			else
			{
			//Check if the direction is valide (No obstacle)
			//console.log(map);
				if(this.GetMovement(map, player))
			{
				carte.actualiseCase(this.x,this.y,this.floor); 
			}
		}
	}
	}

	this.GetMovement = function(map, player)
	{
		//Check if the direction is valide (No obstacle)
		if(this.CanMove(-1,0,map) && player.x < this.x)
		{
			carte.actualiseCase(this.x,this.y,this.floor);
			this.move("left",map);
		}
		else if(this.CanMove(1,0,map) &&player.x > this.x)
		{
			carte.actualiseCase(this.x,this.y,this.floor);
			this.move("right",map);
		}
		else if(this.CanMove(0,-1,map) &&player.y < this.y)
		{
			carte.actualiseCase(this.x,this.y,this.floor);
			this.move("forward",map);
		}
		else if(this.CanMove(0,1,map) &&player.y > this.y)
		{
			carte.actualiseCase(this.x,this.y,this.floor);
			this.move("back",map);
		}
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
			return false;
		}
		return true;
	}	
}


