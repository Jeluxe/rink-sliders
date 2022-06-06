import Slider from './components/slider';

const createBoard = (socket, player1, player2, turn, newTurn, getWinner) => {
    const array = [];
    let i = 1;
    while (i <= 49) {
        if (i === 1 || i === 2 || i === 6 || i === 7 ||
            i === 8 || i === 14 || i === 36 || i === 42 ||
            i === 43 || i === 44 || i === 48 || i === 49) {
            if (i === 1 || i === 49) {
                array.push(<div id={i} key={i} className="blocks">
                    <Slider
                        socket={socket}
                        player={(i === 1) ? player1 : player2}
                        turn={turn}
                        setTurn={newTurn}
                        players={[player1, player2]}
                        getWinner={getWinner} />
                </div>);
            } else {
                array.push(<div id={i} key={i} className="blocks">
                    <Slider
                        socket={socket}
                        turn={turn}
                        setTurn={newTurn}
                        players={[player1, player2]}
                        getWinner={getWinner} />
                </div>);
            }
        }
        else if (i === 25) {
            array.push(<div id={i} key={i} className="blocks end"></div>);
        } else {
            array.push(<div id={i} key={i} className="blocks"></div>);
        }
        i++;
    }

    return array;
}

const checkSurroundings = (turn, playerPos, tgt) => {
    let tgtPos = Number(tgt);
    if (playerPos - 7 === tgtPos && borders(tgtPos, 'up')) {
        turn.pos = tgtPos;
        return true;
    }
    else if (playerPos + 7 === tgtPos && borders(tgtPos, 'down')) {
        turn.pos = tgtPos;
        return true;
    }
    else if (playerPos - 1 === tgtPos && borders(tgtPos + 1, 'left')) {
        turn.pos = tgtPos;
        return true;
    }
    else if (playerPos + 1 === tgtPos && borders(tgtPos - 1, 'right')) {
        turn.pos = tgtPos;
        return true;
    } else {
        return false;
    }
}

const checkValidDirections = (pos, block) => {
    if ((pos, 'up')) {
        let position = pos;
        if (validBlock(position - 7)) {
            showBtns(block, 'up');
        }
    }
    if ((pos, 'down')) {
        let position = pos;
        if (validBlock(position + 7)) {
            showBtns(block, 'down');
        }
    }
    if (borders(pos, 'left')) {
        let position = pos;
        if (validBlock(position - 1)) {
            showBtns(block, 'left');
        }
    }
    if (borders(pos, 'right')) {
        let position = pos;
        if (validBlock(position + 1)) {
            showBtns(block, 'right');
        }
    }
}

const validBlock = (pos) => {
    if (pos <= 0 || pos >= 50) {
        return false;
    }
    const children = document.getElementsByClassName('blocks')[pos - 1].children;
    if (children.length === 0) {
        return true;
    } else {
        return false;
    }
}

const borders = (tgt, direction) => {
    let array = getArray(direction);
    if (array.filter(item => item === tgt).length) {
        if (direction === 'up' || direction === 'down') {
            return true;
        }
        return false;
    } else {
        return true;
    }
}

const getDirectionType = (playerPos, tgtPos) => {
    if (playerPos - 7 === tgtPos) {
        return 'up';
    }
    else if (playerPos + 7 === tgtPos) {
        return 'down';
    }
    else if (playerPos - 1 === tgtPos) {
        return 'left';
    }
    else if (playerPos + 1 === tgtPos) {
        return 'right';
    }
}

const getArray = (type) => {
    switch (type) {
        case 'up':
            return [1, 2, 3, 4, 5, 6, 7];
        case 'down':
            return [43, 44, 45, 46, 47, 48, 49];
        case 'left':
            return [1, 8, 15, 22, 29, 36, 43];
        case 'right':
            return [7, 14, 21, 28, 35, 42, 49];
        default:
            return;
    }
}

const showBtns = (block, direction) => {
    const btn = block.querySelector(`.${direction}Btn`);
    btn.classList.remove('hide');
}

const hideBtns = (block) => {
    const matches = block.querySelectorAll('button');
    matches.forEach(element => {
        return element.classList.add('hide');
    });
}

const playerAnimation = (player, direction) => {
    if (direction === 'left') {
        player.style.transform = (window.outerWidth > 768) ? 'translateX(' + (-105) + 'px)' : 'translateX(' + (-43) + 'px)';
        return 'translateX(' + (0) + 'px)';
    }
    else if (direction === 'right') {
        player.style.transform = (window.outerWidth > 768) ? 'translateX(' + (105) + 'px)' : 'translateX(' + (43) + 'px)';
        return 'translateX(' + (0) + 'px)';
    }
    else if (direction === 'up') {
        player.style.transform = (window.outerHeight > 852) ? 'translateY(' + (-105) + 'px)' : 'translateY(' + (-43) + 'px)';
        return 'translateY(' + (0) + 'px)';
    }
    else if (direction === 'down') {
        player.style.transform = (window.outerHeight > 852) ? 'translateY(' + (105) + 'px)' : 'translateY(' + (43) + 'px)';
        return 'translateY(' + (0) + 'px)';
    }
}

const sliderAnimation = (src, counter, direction) => {
    if (direction === 'left') {
        src.style.transform = (window.outerWidth > 768) ? 'translateX(' + (-111 * counter) + 'px)' : 'translateX(' + (-43 * counter) + 'px)';
        return 'translateX(' + (0) + 'px)';
    }
    else if (direction === 'right') {
        src.style.transform = (window.outerWidth > 768) ? 'translateX(' + (111 * counter) + 'px)' : 'translateX(' + (43 * counter) + 'px)';
        return 'translateX(' + (0) + 'px)';
    }
    else if (direction === 'up') {
        src.style.transform = (window.outerHeight > 852) ? 'translateY(' + (-111 * counter) + 'px)' : 'translateY(' + (-43 * counter) + 'px)';
        return 'translateY(' + (0) + 'px)';
    }
    else if (direction === 'down') {
        src.style.transform = (window.outerHeight > 852) ? 'translateY(' + (111 * counter) + 'px)' : 'translateY(' + (43 * counter) + 'px)';
        return 'translateY(' + (0) + 'px)';
    }
}

const checkPlayerStatus = (playerStatus) => {
    if (playerStatus === 'waiting') {
        return 'black';
    }
    else if (playerStatus === 'Ready') {
        return 'green';
    }
    else {
        return 'red';
    }
}

export {
    createBoard,
    checkSurroundings,
    checkValidDirections,
    validBlock,
    getDirectionType,
    getArray,
    hideBtns,
    playerAnimation,
    sliderAnimation,
    checkPlayerStatus
}