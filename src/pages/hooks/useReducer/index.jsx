import React, { useReducer, useState, useEffect } from 'react'
import { Button, } from '@arco-design/web-react';
import styles from './index.module.less'

export default () => {
    useEffect(() => {
        // 组合式继承（原型链继承+借用构造函数继承的组合）
        function Parent (name) {
            this.name = name;
            this.colors = ['red', 'blue', 'green'];
        }
        
        function Child (name, age) {
        
            Parent.call(this, name);
            
            this.age = age;
        
        }
        
        Child.prototype = new Parent();
        
        var child1 = new Child('kevin', '18');
        
        child1.colors.push('black');
        
        console.log(child1.name); // kevin
        console.log(child1.age); // 18
        console.log(child1.colors); // ["red", "blue", "green", "black"]
        
        var child2 = new Child('daisy', '20');
        
        console.log(child2.name); // daisy
        console.log(child2.age); // 20
        console.log(child2.colors); // ["red", "blue", "green"]
        
    }, [])
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