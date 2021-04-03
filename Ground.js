class Ground{
    constructor(x,y,height,width,angle){
        this.object=Bodies.rectangle(x,y,width,height,{restitution:0.8,friction:1.5,density:1.0,isStatic : "true"})
        this.width=width
        this.height=height
        Matter.Body.setAngle(this.object,angle)
   
        World.add(world,this.object)
    }
    display(){
        
       var pos=this.object.position
        push()
        translate(pos.x,pos.y)
        rotate(this.object.angle)
        rectMode(CENTER)
        fill("brown")
        rect(0,0,this.width,this.height)
        pop()
   
   
   
    }
   }