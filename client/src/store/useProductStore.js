// import { create } from "zustand";


// export const useProductStore = create((set)=>({

//     products : [],
//     setProducts : (products) => set({products})

// }))


import { create } from "zustand"

console.log("Creating Zustand store...")

export const useProductStore = create((set) => {
  console.log("Store function called")
  return {
    products: [],
    setProducts: (products) => set({ products })
  }
})

console.log("Store created:", useProductStore)