function timer (rightBound, context){
    let timePassed = 0;

    function addTime(time) {
        timePassed += time
    }

    function getTime() {
        return (timePassed / 1000).toFixed(3);
    }

    function render() {
        let timeText = `Time: ${(timePassed / 1000).toFixed(3)} sec`;

        context.fillStyle = "white"
        context.font = "bolder 24px Courier";

        fontHeight = context.measureText("m").width;

        context.fillText(timeText, rightBound + 10, 10 + fontHeight);
    }

    return {
        addTime : addTime,
        getTime : getTime,
        render : render
    }
}