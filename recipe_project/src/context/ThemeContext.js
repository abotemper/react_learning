import { createContext, useReducer } from "react";

export const ThemeContext = createContext()

const themeReducer = (state, action) => {
    //state的初始值是blue，这里如果action的type对上了，就可以换成新的state，
    switch (action.type){
        case 'CHANGE_COLOR':
            //...将所有的对象的值都拿过来，后面的如果跟前面的某一个key一致，那么就更新它
            return { ...state, color: action.payload }
        case 'CHANGE_MODE' :
            return { ...state, mode: action.payload }
    }
}

export function ThemeProvider({ children }){
    // usereducer的第二个参数是初始化的值或者状态
    const [state, dispatch] = useReducer(themeReducer, {
        color: '#58249c',
        mode: 'dark'
    })
    
    const changeColor = (color) => {
        //dispatch 需要一个object作为参数 如下，这里也就是themereducer中的action参数。
        dispatch({ type: 'CHANGE_COLOR', payload: color })
    }
    const changeMode = (mode) => {
        dispatch({ type: 'CHANGE_MODE', payload: mode })
    }

    return (
        //这里就是将 这个value作为全局变量，谁都可以用
        <ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
            {children}
        </ThemeContext.Provider>
    )
}