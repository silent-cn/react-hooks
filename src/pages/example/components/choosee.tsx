import React, { useReducer, useRef, useEffect, useCallback } from "react";
import { Input, Button } from '@arco-design/web-react';

function Choose(props) {
    const initState = {
        name: "",
        pwd: "",
        isLoading: false,
        error: "",
        isLoggedIn: false,
    };

    const loginReducer = (state, action) => {
        switch (action.type) {
            case "name":
                return {
                    ...state,
                    name: action.payload.name,
                };
            case "pwd":
                return {
                    ...state,
                    pwd: action.payload.pwd,
                };
            case "login":
                return {
                    ...state,
                    isLoading: true,
                    error: "",
                };
            case "success":
                return {
                    ...state,
                    isLoggedIn: true,
                    isLoading: false,
                    error: "",
                };
            case "error":
                return {
                    ...state,
                    error: action.payload.error,
                    name: "",
                    pwd: "",
                    isLoading: false,
                    isLoggedIn: false,
                };
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(loginReducer, initState)
    const { name, pwd, isLoading, error, isLoggedIn } = state;

    const login = (name, pwd) => {
        dispatch({ type: "login" });
        if (name === "123" && pwd === "123") {
            dispatch({ type: "success" });
        } else {
            dispatch({
                type: "error",
                payload: { error: "登录失败" },
            });
        }
    };

    const inputEl = useRef(null)

    const handleFocus = () => {
        // `current` 指向已挂载到 DOM 上的文本输入元素
        inputEl.current.focus()
        console.log(inputEl.current.dom.value, 23);
    }

    const fun = useCallback(() => {
        console.log('mount');
    }, []);

    return (
        <div>
            用户名:
            <input
                type="text"
                onChange={(e) => {
                    dispatch({
                        type: "name",
                        payload: { name: e.target.value },
                    });
                }}
                value={name}
            />
            <br />
            密码:
            <input
                type="text"
                onChange={(e) => {
                    dispatch({
                        type: "pwd",
                        payload: { pwd: e.target.value },
                    });
                }}
                value={pwd}
            />
            <br />
            <button onClick={() => login(name, pwd)} disabled={isLoading}>
                登录
            </button>
            <br />
            {isLoggedIn ? "登录成功" : error}
            <Input ref={inputEl} style={{ width: 200, marginRight: 10 }} />
            <Button onClick={handleFocus}>点击</Button>
        </div>
    )
}

export default React.memo(Choose)