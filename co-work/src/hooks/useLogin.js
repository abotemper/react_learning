import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc } from 'firebase/firestore'
import { useState, useEffect } from "react";
import { projectAuth, projectFirestore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [isCancelled, setIsCanselled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()
    
    const login = async (email, password) => {
        setError(null)
        setIsPending(true)

        //sign the user out
        try {
            const res = await signInWithEmailAndPassword(projectAuth, email, password)

            //update online status
            await updateDoc(doc(projectFirestore, 'users', res.user.uid),{
                online: true
            })

            //dispatch logout action
            dispatch({ type: 'LOGIN', payload: res.user })

            //update state
            if(!isCancelled){
                setIsPending(false)
                setError(null)
            }

        }catch(err){
            if(!isCancelled){
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    //依赖项为空数组， 先执行上面所有， dom整个更新完成之后， 运行 clear内容， 再运行 effect 主体内容
    //上来他就会运行一下上面所有内容之后， 运行以下 effect主体内容， 不允许 clear内容
    //更新时按照第一条注释走
    useEffect(() => {
        setIsCanselled(false)
        return () => setIsCanselled(true);
    }, []);
    return { login, error, isPending }
}