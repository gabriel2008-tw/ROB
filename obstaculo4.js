class obstaculo4{
    constructor(x,y,width,height) {
        var options = {
            isStatic: true
        }
     
        this.image = loadImage("obj10.png");
        this.body = Bodies.rectangle(x, y, width, height, options);
        this.width = width;
        this.height = height;
        World.add(world, this.body);
    }
    display(){
       
        push();
        imageMode(CENTER);
        image(this.image,this.body.position.x,this.body.position.y, this.width, this.height);
        pop();

      }
}
 