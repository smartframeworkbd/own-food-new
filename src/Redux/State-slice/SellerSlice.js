import { createSlice } from "@reduxjs/toolkit";

 const SellerSilce = createSlice({
    name:'seller',
    initialState:{
        limitedSellerList:[],
        getSellerInfo:[],
        getSellerFoodData:[],
        getNearestSellerData:[]
    },
    reducers:{
        setLimitedSellerList:(state,action)=>{
            state.limitedSellerList=action.payload;

        },
        getSellerInfo:(state,action)=>{
            state.getSellerInfo=action.payload
        },
        getSellerFood:(state,action)=>{
            state.getSellerFoodData=action.payload
        },
        getNearestSeller:(state,action)=>{
            state.getNearestSellerData=action.payload;
        }

    }
 })

 export default SellerSilce.reducer
 export const {setLimitedSellerList,getSellerInfo,getSellerFood,getNearestSeller} =SellerSilce.actions