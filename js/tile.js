function Tileset(url) 
{
	this.image = new Image();
	this.image.src = url;
	this.image.isReady = false;
	this.image.refSprite = this;
	
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
	
	this.aff = function(x,y,theme,id)
	{
		//console.log("we are inside !");
		ctx.drawImage(this.image,id*32,theme*32,32,32,x,y,32,32);
	}	

}

