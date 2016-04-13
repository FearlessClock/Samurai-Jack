//class Personnage
function GameController() 
{
	//Check for updates with the different enemies and players
	//Check player movement
	//Check for collisions, attacks, picking up stuff
	//Display everything

	

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
		
	}	
	
	this.move = function(side,map)
	{
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