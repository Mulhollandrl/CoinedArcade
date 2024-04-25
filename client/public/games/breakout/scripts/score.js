function score (windowWidth, windowHeight, context){
    let scoreAmount = 0;

    function addScore(color) {
        let amount = 0;

        switch (color) {
            case "yellow":
                amount = 1;
                break;
            case "orange":
                amount = 2;
                break;
            case "blue":
                amount = 3;
                break;
            case "green":
                amount = 5;
                break;
            case "row":
                amount = 25;
                break;
        }

        scoreAmount += amount;
    }

    function getScore() {
        return scoreAmount;
    }

    function render() {
        let scoreText = `Score: ${scoreAmount}`;

        context.fillStyle = "black"
        context.font = "bolder 24px Courier";

        fontHeight = context.measureText("m").width;

        context.fillText(scoreText, windowWidth - (context.measureText(scoreText).width), windowHeight - fontHeight);
    }

    return {
        addScore : addScore,
        getScore : getScore,
        render : render
    }
}