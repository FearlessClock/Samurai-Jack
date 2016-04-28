

//class Personnage
function SetupUpdate() 
{
	//Vars needed:
	//The map
	//Array of enemies, Otherplayers
	//player

	//Functions needed
	//Get the Map info from the server
	//Get the enemy info from the server
	//Get the other player info from the server
	//Update the player
	//Check combat
	//Send player and world data
	//Display

	//Check for updates with the different enemies and players
	//Check player movement
	//Check for collisions, attacks, picking up stuff
	//Send player data
	//Display everything
	this.launch = function()// fonction callback appellé uniquement quand les images de tile et jack ont été chargées
	{
		if(tile.image.isReady && jack.image.isReady)// une fois tile chargé on peut créer la carte qui dépend de tile.
		{
			console.log("Fonction launch is ready");
			carte = new Map(5,20,tile); //creation de l'ensemble des maps dans un objet Map ( contient une matrice 3D et les textures)
			carte.aff(0);
		}
		jack.aff();
		for(var i = 0; i < 2; i++)
		{
			mob[i].aff();
		}
	}

	this.canvas = document.getElementById('canvas');
	this.ctx = canvas.getContext('2d');
	this.tile = new Tileset("image/texture3.png");// creation de l'objet qui contient les textures
	this.jack = new Perso ("image/jack.png",10,10,0); //jack est créer aux coordonés 10,10 sur la map 0 ( corespond à map.map[0][10][10])
	this.mob = new Array();
	this.mob[0] = new Enemy("image/mob.png", 15, 17, 0);
	this.mob[1] = new Enemy("image/mob.png", 15, 3, 0);
	this.carte = "lol"; // Objet carte créer dans la fonction launch
	
	timeoutVar = setInterval(GameController, 700);

	function GameController()
	{
		//Get data
		GetData();
		this.PlayerKill();
	}
	this.PlayerKill = function()
	{
		for(var i = 0; i < mob.length; i++)
		{
			var dis = Math.sqrt(Math.pow(mob[i].x-jack.x, 2) + Math.pow(mob[i].y - jack.y, 2));
			console.log(dis);
			if(dis < 1.6)
			{
				jack.Die();
			}
		}
	}
	this.GameUpdate = function (event)
	{
		this.jack.UpdatePlayer(event);
	}
	this.GetData = function()
	{
		for(var i = 0; i < 2; i++)
		{
			mob[i].updateAI(this.jack, this.carte.carte[mob[i].floor]);
		}
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