import {
    validBlock,
    getArray,
    hideBtns,
} from './functions';

const moveSlider = (e, socket, turn, direction) => {
    e.stopPropagation();

    if (socket.id === turn.id) {
        let counter = 0;
        let num = null;
        let srcPos = Number(e.target.parentNode.parentNode.parentNode.id);
        let calcGap = srcPos;

        if (direction === 'up') {
            num = -7;
        }
        else if (direction === 'down') {
            num = 7;
        }
        else if (direction === 'left') {
            num = -1;
        }
        else if (direction === 'right') {
            num = 1;
        } else {
            num = null;
        }
        // eslint-disable-next-line 
        while (validBlock(calcGap + num) === true && !getArray(direction).filter(number => number === calcGap).length) {
            calcGap += num;
            counter++;
        }
        socket.emit('move slider', { srcPos, tgtPos: Number(calcGap), turn, counter, direction });
    }
}

const playerMove = (currentPlayer, tgt) => {
    hideBtns(currentPlayer.parentNode);
    currentPlayer.parentNode.removeChild(currentPlayer);
    tgt.append(currentPlayer);
}

const onKeyPress = (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        document.getElementById('join').click();
    }
}

export { moveSlider, playerMove, onKeyPress }