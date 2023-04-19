import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../firebaseConfig";
import { db } from "../firebaseConfig";
import { doc, query, where, addDoc, collection, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { StoreModel } from "../Model/StoreModel";


// Get a non-default Storage bucket
const App = app;
const storage = getStorage(App, "gs://kube-dev-13e3f.appspot.com");
const storesRef = collection(db, "stores");

export const getVendor = async () => {
  const storreArr: any[] = []
  const querySnapshot = await getDocs(collection(db, "stores"));
  querySnapshot.forEach((doc) => {
    storreArr.push(doc.data())
  });
  // console.log(storreArr);
  return storreArr;
}

export const UploadVendor = async (data: StoreModel) => {


  console.log(data);

  const q = query(collection(db, "users"), where("phoneNo", "==", data.phoneNo));
  let userId: string;
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    userId = doc.id;
  });
  addDoc(storesRef, data)
    .then(async (docRef) => {
      console.log("Document has been added successfully with : " + docRef.id);
      const updatestoresRef = doc(db, "stores", docRef.id);
      await updateDoc(updatestoresRef, {
        uniqueId: docRef.id,
        userId: userId
      });
    })

    .catch(error => {
      console.log(error);
    })
}

export const deleteVendor = async (data: any) => {
  console.log(data + 'Vendor delete Function');
  // await deleteDoc(doc(db, "stores", data));

}




export const handleImageUpload = async (imageData: any) => {
  const fileName = imageData.name;
  const storageRef = ref(storage, `/uploads/mgapr/${fileName}`);
  const pathToFile = URL.createObjectURL(imageData);
  // console.log('fileName:',fileName,'storageRef:',storageRef,"path:",pathToFile);

  try {
    const response = await fetch(pathToFile);
    const blob = await response.blob();
    await uploadBytes(storageRef, blob);
    console.log('Image uploaded successfully');
  } catch (err) {
    console.log('Error while uploading image:', err);
  }
  const url = await getDownloadURL(storageRef);
  // console.log(url, 'url');
  return url;
};

export const getLocality = async (city: string) => {
  let newArr: string[] = []
  const cityRef = collection(db, "stores");
  const q = query(cityRef, where("city", "==", city))
  const data = await getDocs(q);
  data.forEach(doc => {

    newArr.push(doc.data().locality)
    // console.log('asdv', newArr);
  })
  const local: Set<string> = new Set(newArr);
  const uArray: string[] = [...local]
  // console.log('asdv', uArray.length);

  return uArray;
}

