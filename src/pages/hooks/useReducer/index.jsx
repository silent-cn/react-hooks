import React, { useReducer, useState, useEffect } from 'react'
import { Button, } from '@arco-design/web-react';
import styles from './index.module.less'

export default () => {
    return (<div className={styles.wrapper}>
        <div>useReducer</div>
        <Counter />
        <hr />
        <hr />
        <MyComponent />
    </div>)
}

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: { value: state.count.value + 1, name: 'increment' } };
        case 'decrement':
            return { count: { value: state.count.value - 1, name: 'decrement' } };
        default:
            throw new Error();
    }
}

const Counter = () => {
    const initialState = {
        count: {
            value: 0,
            name: 'count'
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <div>
            {state.count.name}: {state.count.value}
            <Button type='primary' onClick={() => dispatch({ type: 'increment' })} style={{ marginLeft: 10 }}>+</Button>
            <Button type='primary' onClick={() => dispatch({ type: 'decrement' })} style={{ marginLeft: 10 }}>-</Button>
        </div>
    );
}

function useWindowSize() {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
        recommendSize: 0
    });

    const increment = () => setSize({ ...size, recommendSize: size.recommendSize + 10 });
    const decrement = () => setSize({ ...size, recommendSize: size.recommendSize - 10 });

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
                recommendSize: size.recommendSize
            });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return {
        size,
        increment,
        decrement
    };
}

function MyComponent() {
    const { size, increment, decrement } = useWindowSize();
    return <div>
        <div>自定义hook</div>
        <div>Window size: {size.width} x {size.height}</div>
        <div>{size.recommendSize}</div>
        <div>
            <Button type='primary' onClick={increment} style={{ marginRight: 10 }}>+</Button>
            <Button type='primary' onClick={decrement} style={{ marginRight: 10 }}>-</Button>
        </div>
    </div>;
}