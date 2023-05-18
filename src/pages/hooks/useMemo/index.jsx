import React, { useState, useEffect, useMemo, memo } from 'react'
import { Button, } from '@arco-design/web-react';
import styles from './index.module.less'

export default () => {

    return (<div className={styles.wrapper}>
        <div><Children /></div>
        <hr />
        <hr />
        <div><Children2 /></div>
        <div>
            <div>
                使用场景：
                <ul>
                    <li>避免重复计算：如果某个计算结果需要在多个地方使用，但是它的计算量比较大，那么可以使用 useMemo 缓存计算结果，避免在每次使用时都重新计算。</li>
                    <li>优化子组件渲染：如果父组件的渲染会触发子组件的渲染，但是子组件中只有某些值发生变化时才需要重新渲染，可以使用 useMemo 缓存子组件的 props，只有这些 props 发生变化时才重新渲染子组件。</li>
                    <li>处理大量数据：如果需要在页面中展示大量数据，例如一个列表，可以使用 useMemo 缓存处理后的数据，避免在每次渲染时都重新处理数据。。</li>
                </ul>
            </div>
        </div>
    </div>)
}
const Children = (props) => {
    const [count, setCount] = useState(0)
    const [number, setNumber] = useState(0);
    const [isOdd, setIsOdd] = useState(false);
    const memoizedValue = () => {
        console.log('未使用useMemo...');
        const newValue = number + 10;
        return isOdd ? newValue : newValue + 1;
    }

    return (
        <div>
            <div className={styles.countWrapper}>
                <div className={styles.count}>{count}</div>
            </div>
            <div>
                <Button type='primary' onClick={() => setCount(count + 1)}>count+1</Button>
            </div>
            <hr />
            <div className={styles.countWrapper}>
                <div className={styles.count}>
                    <p>Number: {number}</p>
                    <p>Is odd: {isOdd ? '奇数' : '偶数'}</p>
                    <p>Memoized value: {memoizedValue()}</p>
                </div>
            </div>

            <div>
                <Button type='primary' onClick={() => setNumber(number + 1)}>number+1</Button>
                <Button type='primary' style={{ marginLeft: 10 }} onClick={() => setIsOdd(!isOdd)}>切换奇偶</Button>
            </div>
        </div>
    )
}

const Children2 = memo((props) => {
    const [count, setCount] = useState(0)
    const [number, setNumber] = useState(0);
    const [isOdd, setIsOdd] = useState(false);
    const memoizedValue = useMemo(() => {
        console.log('使用了useMemo...');
        const newValue = number + 10;
        return isOdd ? newValue : newValue + 1;
    }, [number, isOdd]);

    return (
        <div>
            <div className={styles.countWrapper}>
                <div className={styles.count}>{count}</div>
            </div>
            <div>
                <Button type='primary' onClick={() => setCount(count + 1)}>count+1</Button>
            </div>
            <hr />
            <div className={styles.countWrapper}>
                <div className={styles.count}>
                    <p>Number: {number}</p>
                    <p>Is odd: {isOdd ? '奇数' : '偶数'}</p>
                    <p>Memoized value: {memoizedValue}</p>
                </div>
            </div>

            <div>
                <Button type='primary' onClick={() => setNumber(number + 1)}>number+1</Button>
                <Button type='primary' style={{ marginLeft: 10 }} onClick={() => setIsOdd(!isOdd)}>切换奇偶</Button>
            </div>
        </div>
    )
})
