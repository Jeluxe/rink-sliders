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
    if (tgt === array[0] ||
        tgt === array[1] ||
        tgt === array[2] ||
        tgt === array[3] ||
        tgt === array[4] ||
        tgt === array[5] ||
        tgt === array[6]) {
        if (direction === 'up' || direction === 'down') {
            return true;
        }
        return false;
    } else {
        return true;
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

module.exports = { checkValidDirections, validBlock, borders, getArray, hideBtns }