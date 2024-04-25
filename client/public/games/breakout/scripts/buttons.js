function button (specs, windowWidth, context){
    let hovered = false;

    function render() {
        context.beginPath();
        context.rect(100, specs.y, windowWidth - 200, specs.height)

        if (!hovered) {
            context.fillStyle = "#8b0000"
        } else {
            context.fillStyle = "#660000"
        }

        context.fill();
        context.closePath();

        context.beginPath();
        context.font = "24px Courier";
        context.fillStyle = "white"
        let fontHeight = context.measureText("m").width;

        context.fillText(specs.text, (windowWidth/2) - (context.measureText(specs.text).width/2), specs.y + (specs.height/2) + (fontHeight/2));
        context.closePath();
    }

    function hover() {
        hovered = true;
    }
    
    function unhover() {
        hovered = false;
    }

    return {
        render : render,
        hover : hover,
        unhover : unhover
    }
}