import firebaseApp from "./firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadFilesToFirebaseAndGetUrl = async (
  file: any,
  folder: string
) => {
  try {
    const storage = getStorage(firebaseApp);
    let url = "";

    const storageRef = ref(storage, `${folder}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    url = downloadURL;

    return url;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
