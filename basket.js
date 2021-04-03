class Basket
{
	constructor(x,y)
	{
		this.x=x;
		this.y=y;
		this.basketWidth=120;
		this.basketHeight=80;
		this.wallThickness=10;
		
		this.image=loadImage("sprites/basket.png")
		this.bottomBody=Bodies.rectangle(this.x, this.y, this.basketWidth, this.wallThickness, {isStatic:true})
		this.leftWallBody=Bodies.rectangle(this.x-this.basketWidth/2, this.y-this.basketHeight/2, this.wallThickness, this.basketHeight, {isStatic:true})
		
		

		this.rightWallBody=Bodies.rectangle(this.x+this.basketWidth/2, this.y-this.basketHeight/2, this.wallThickness, this.basketHeight, {isStatic:true})
		
		World.add(world, this.bottomBody)
		World.add(world, this.leftWallBody)
		World.add(world, this.rightWallBody);

	}
	display()
	{
			var posBottom=this.bottomBody.position;
			var posLeft=this.leftWallBody.position;
			var posRight=this.rightWallBody.position;

			

			push()
			translate(posLeft.x, posLeft.y);
			rectMode(CENTER)
			angleMode(RADIANS)
			fill(0)
			rotate(this.angle)
			pop()

			push()
			translate(posRight.x, posRight.y);
			rectMode(CENTER)
			angleMode(RADIANS)
			fill(0)
			rotate(-1*this.angle)
			pop()

			push()
			translate(posBottom.x, posBottom.y+10);
			rectMode(CENTER)
			
			angleMode(RADIANS)
			fill(0)
			imageMode(CENTER);
			image(this.image, 0,-this.basketHeight/2,this.basketWidth, this.basketHeight+40)
			pop()
			
	}

}