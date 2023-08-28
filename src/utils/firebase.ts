import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
const firebaseConfig: any = {
  apiKey: "AIzaSyBr7L2I0AyuFQ5VcTuxm0_2qbsTGiN-5JI",
  authDomain: "playbook-59a53.firebaseapp.com",
  projectId: "playbook-59a53",
  storageBucket: "playbook-59a53.appspot.com",
  messagingSenderId: "476962525328",
  appId: "1:476962525328:web:b875edd83b6482219a8815",
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

export const uploadToFirebase = async (file: any) => {
  console.log("🚀 ~ file: firebase.ts:26 ~ uploadToFirebase ~ file:", file);
  if (file) {
    const storageRef = ref(storage, `${uuidv4()}_${file.name}`);
    const metaData = {
      contentType: file?.type,
    };
    // const upload = await uploadBytes(storageRef, file, metaData)
    //   .then(async (snapshot: any) => {
    //     console.log(
    //       "🚀 ~ file: firebase.ts:33 ~ uploadToFirebase ~ snapshot:",
    //       snapshot
    //     );
    //     const downloadURL = await getDownloadURL(storageRef);
    //     console.log("Download URL:", downloadURL);
    //     return downloadURL;
    //   })
    //   .catch((err) => console.log("errir", err));
  } else throw new Error("Please Upload File");
};
