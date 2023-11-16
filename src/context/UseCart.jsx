import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "./AuthContext";
import { updateCart, getCart, deleteCartItem } from "../api/firebase";

export default function UseCart(){
    const { uid } = useAuthContext();
    const queryClient = useQueryClient();
    console.log(uid)

    const cartInfo = useQuery(['cart', uid || ''],() => getCart(uid),{
        enabled : !!uid
    })

    const addItemCart = useMutation(
        //useMutation() : 정보를 업데이트 할 때 사용하는 구문
        (product) => updateCart(uid, product),
        {
            onSuccess : () => {
                queryClient.invalidateQueries(['cart',uid])
            }
        }
    )

    const deleteItem = useMutation((id)=>deleteCartItem(uid,id),{
        onSuccess : () => {
            queryClient.invalidateQueries(['cart',uid])
        }
    })

    return { cartInfo, addItemCart, deleteItem }
}