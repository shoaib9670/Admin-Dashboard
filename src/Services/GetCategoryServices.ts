import { app } from "../firebaseConfig";
import { db } from "../firebaseConfig";
import { getDocs, collection, query, where } from "firebase/firestore";
const CateRef = collection(db, "category");

export const getCategories = async () => {
    let newArr: any = []
    const docsSnap = await getDocs(CateRef);
    docsSnap.forEach(doc => {
        newArr.push(doc.data().categoryName)
    })
    return newArr;
}

export const getSubCat = async (cate: string) => {
    let newArr: any[] = []
    const q = query(CateRef, where("categoryName", "==", cate))
    const data = await getDocs(q)
    data.forEach(doc => {
        doc.data().subCategories.forEach((doc: any) => {
            newArr.push(doc.subCategoryName)
        })
    })
    return newArr

}


export const setCateId = async (cate: string) => {
    let id: string = ''
    const q = query(CateRef, where("categoryName", "==", cate))
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        id = doc.id
    })
    return id;
}

