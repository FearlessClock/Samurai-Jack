function generateMap(perc, size)
{
	var map = new Array();
	var nmbrDeTiles = 4; //valeur max du random

	for(var i = 0; i < size; i++)
	{
		map[i] = new Array(size);
	}

	for(var i = 0; i < size; i++)
	{
		for(var j = 0; j < size; j++)
		{
			map[i][j] = 0;//Math.floor(Math.random() * nmbrDeTiles);
		}
	}
	var nmbrDeCase = (size * size) * (perc/100);
	while(nmbrDeCase > 0)
	{
		var X = Math.floor(Math.random()*size);
		var Y = Math.floor(Math.random()*size);
		if(map[X][Y] == 0)
		{
			map[X][Y] = Math.floor(Math.random() * nmbrDeTiles);
			nmbrDeCase--;
		}
	}
	return map;
}

function simple(map,nmbrDeSimplification)
{
	for(var i = 0; i < nmbrDeSimplification; i++)
		map = simplify(map);
	return map;
}

function RunRule(num, alive)
{
	if(alive != 0 && num < 4)
	{
		alive = 0;
	}
	else if(alive == 0 && num >= 5)
	{
		alive = 1;
	}
	return alive;
}

function CountCellsAround(arr, X, Y)
{
	var somme = 0;
	if(X-1 >= 0 && Y+1 < arr.length && arr[X-1][Y+1] != 0)
		somme++;
	if(Y+1 < arr.length && arr[X][Y+1] != 0)
		somme++;
	if(X+1 < arr.length && Y+1 < arr.length && arr[X+1][Y+1] != 0)
		somme++;
	if(X-1 >= 0 && arr[X-1][Y] != 0)
		somme++;
	if(X+1 < arr.length && arr[X+1][Y] != 0)
		somme++;
	if(X-1 >= 0 && Y-1 >= 0 && arr[X-1][Y-1] != 0)
		somme++;
	if(Y-1 >= 0 && arr[X][Y-1] != 0)
		somme++;
	if(X+1 < arr.length && Y-1 >= 0 && arr[X+1][Y-1] != 0)
		somme++;
	return somme;
}

function simplify(arr)
{
	var returner = new Array();
	for(var i = 0; i < arr.length; i++)
	{
		returner[i] = new Array();
	}
	for(var i = 0; i < arr.length; i++)
	{
		for(var j = 0; j < arr[0].length; j++)
		{
			var count = CountCellsAround(arr, i, j);
			returner[i][j] = RunRule(count, arr[i][j]);
		}
	}
	return returner;
}

function FillWalls(arr, thickness)
{
	for(var i = 0; i < arr.length; i++)
	{
		for(var j = 0; j < arr.length; j++)
		{
			if(i < thickness || j < thickness || j > arr.length-1-thickness || i > arr.length-1-thickness)
			{
				var r =  Math.floor((Math.random() * 3) + 1);
				arr[i][j] = r;// 1 et 0 sont des case non solide (=sol) 2 et 3 sont des cases solide
				//console.log(r);
			}
		}
	}
	return arr;
}

// affiche un tableau 2D
function print_2d_array(a) {
	for (var i = 0; i < a.length; i++) {
		for (var j = 0; j < a[i].length; j++) {
			if(a[i][j] != 0)
			{
				document.write(a[i][j]+1);
				/*if(a[i][j] == 1)
				{
					document.write("# ");
				}
				else if(a[i][j] == 2)
				{
					document.write("0 ");
				}
				else if(a[i][j] == 3)
				{
					document.write("X ");
				}*/
			}
			else
				document.write("_");
		}
		document.write("<br/>");
	}
	document.write("<br>\n");
	document.write("<br/>");
}

function createFloor(side,it1,walls,it2,perc )
{
	var floor = generateMap(perc, side);	//Genere une carte
	
	floor = simple(floor,it1);	//Creuse la carte
	
	FillWalls(floor, walls);	//remplit les murs du bord

	floor = Portails(true,true,true,true,floor,1,0);
	
	floor = simple(floor,it2); // creuse une Seconde fois
	
	return floor;
}


function Map(nbrEtage,taille,texture)  //class map (contient les matrice qui représente les map et les textures)
{
	this.texture = texture;
	this.carte = new Array(nbrEtage);
	
	for(var i = 0; i<this.carte.length; i++){this.carte[i] = createFloor(taille,4,2,2,60);}
	
	this.actualiseCase = function(x,y,floor)
	{
		//affiche la case x,y de l'étage 'floor'
		ctx.drawImage(this.texture.image,this.carte[floor][x][y]*32,floor*32,32,32,x*32,y*32,32,32);
	}
	
	this.aff = function (floor)// affiche la map de l'étage floor
	{
		for(var i = 0; i<this.carte[floor].length; i++)
		{
			for(var j = 0; j<this.carte[floor][0].length; j++)
			{
				this.actualiseCase(i,j,floor);
			}
		}
	}
}

function Portails(nord,sud,est,ouest,tab,largeur,remplissage)
{
	if (nord == true)
	{
		for (i=(tab.length/2)-largeur;i<(tab.length/2)+largeur;i++)
		{
			for (j=0;j<(tab.length/2);j++)
			{
				tab[i][j] = remplissage;
			}
		}
	}

	if (sud == true)
	{
		for (i=(tab.length/2)-largeur;i<(tab.length/2)+largeur;i++)
		{
			for (j=(tab.length-1);j>(tab.length/2);j--)
			{
				tab[i][j] = remplissage;
			}
		}
	}

	if (ouest == true)
	{
		for (i=(tab.length/2)-largeur;i<(tab.length/2)+largeur;i++)
		{
			for (j=0;j<(tab.length/2);j++)
			{
				tab[j][i] = remplissage;
			}
		}
	}

	if (est == true)
	{
		for (i=(tab.length/2)-largeur;i<(tab.length/2)+largeur;i++)
		{
			for (j=(tab.length-1);j>(tab.length/2);j--)
			{
				tab[j][i] = remplissage;
			}
		}
	}

	return tab;
}