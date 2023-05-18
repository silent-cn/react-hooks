import React, { useState, memo } from "react";
import styles from './memo.module.less';
import { Button } from '@arco-design/web-react'

export default () => {
    console.log('memo----')
    const [count, setCount] = useState(0)
    const [list, setList] = useState([1, 2, 3, 4])
    const arrChange = () => {
        setList([...list, 6])
    }
    return (<div className={styles.wrapper}>
        <div className={styles.countWrapper}>
            <div className={styles.count}>{count}</div>
        </div>
        <div>
            <Button type='primary' onClick={() => setCount((count) => count + 1)}>count+1</Button>
        </div>
        <div className={styles.twoChild}>
            <div className={styles.item}>
                <h1>未使用Memo的子组件</h1>
                <div><Children list={list} /></div>
            </div>
            <div className={styles.item}>
                <h1>使用Memo的子组件</h1>
                <div><Children2 list={list} /></div>
            </div>
        </div>
        <div>
            <Button type='primary' onClick={() => arrChange()}>list+1</Button>
        </div>
        <div>
            <div>
                优点：
                <ul>
                    <li>提升应用性能：memo 通过浅层比较组件的 props 变化来判断是否需要重新渲染组件，能够避免一些不必要的重渲染操作，从而提升应用性能</li>
                    <li>简单易用：memo 的使用非常简单，只需要将组件通过 memo 函数包裹即可，不需要做太多额外的工作</li>
                    <li>保证组件的纯度：由于 memo 会将组件包装为一个纯组件，因此它能够保证组件的纯度，避免一些副作用带来的问题</li>
                </ul>
            </div>
            <div>
                缺点：
                <ul>
                    <li>只适用于某些场景：memo 只适用于一些 props 变化不频繁的组件，如果组件的 props 经常发生变化，那么使用 memo 反而会降低应用的性能。</li>
                    <li>增加代码复杂度：memo 的使用虽然简单，但是如果过度使用，可能会增加代码的复杂度，导致应用变得难以维护。</li>
                    <li>可能存在问题：由于 memo 是浅层比较 props 变化的，因此如果 props 中包含了复杂的数据类型，可能会出现一些意料之外的问题。在这种情况下，建议使用 useMemo 来避免这些问题。</li>
                </ul>
            </div>
            <div>
                使用场景：
                <ul>
                    <li>组件是纯组件，没有依赖外部数据，即组件的渲染只依赖于其内部的 props 和 state</li>
                    <li>组件渲染的结果比较固定，不需要频繁地进行更新；</li>
                    <li>组件渲染的代价比较昂贵，需要进行性能优化。</li>
                </ul>
            </div>
        </div>
    </div>)
}

const Children = (props) => {
    console.log('Children---1', props)
    return (
        <div>
            <ul>
                {
                    props.list.map((item) => <li key={item}>{item}</li>)
                }
            </ul>
        </div>
    )
}

const Children2 = memo((props) => {
    console.log('Children---2')
    return (
        <div>
            <ul>
                {
                    props.list.map((item) => <li key={item}>{item}</li>)
                }
            </ul>
        </div>
    )
})