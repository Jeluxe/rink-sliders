import React, { useEffect, useState } from 'react'
import { Color, ColorPicker, ColorsContainer, ColorsWrapper } from '../styles/sc-colors'

const Colors = ({ getColor }) => {
    const colors = ['blue', 'lightblue', 'purple', 'pink', 'red', 'green'];
    const [flag, setFlag] = useState(false);
    const [pickedColor, setPickedColor] = useState('');
    const [target, setTarget] = useState(null);

    useEffect(() => {
        // window.localStorage
    }, [])

    useEffect(() => {
        getColor(pickedColor);
        // eslint-disable-next-line
    }, [pickedColor])

    useEffect(() => {
        const colorElements = document.getElementsByClassName('colors');
        for (let i = 0; i < colorElements.length; i++) {
            if (colorElements[i] === target && !flag) {
                colorElements[i].style.border = `4px solid white`;
                colorElements[i].style.outline = `2px solid orange`;
                getColor(colors[i]);
            } else {
                colorElements[i].style.border = 'none';
                colorElements[i].style.outline = 'none';
            }
        }
        // eslint-disable-next-line
    }, [flag, target])


    const onClick = (e, type) => {
        if (type === 'color') {
            setTarget(e.target);
            setFlag(false);
        } else {
            if (pickedColor === '') {
                setPickedColor(e.target.value);
            }
            setFlag(true);
        }
    }

    return (
        <ColorsContainer>
            <ColorsWrapper>
                {colors.map((color, i) =>
                    <Color
                        key={i}
                        className='colors'
                        flag={flag}
                        bg={color}
                        onClick={(e) => onClick(e, 'color')}
                    />
                )}
            </ColorsWrapper>
            <ColorsWrapper>
                Custom Color:
                <ColorPicker
                    defaultValue={'black'}
                    getColor={getColor}
                    flag={flag}
                    onClick={onClick}
                    onChange={(e) => setPickedColor(e.target.value)}
                />
            </ColorsWrapper>
        </ColorsContainer>
    )
}

export default Colors