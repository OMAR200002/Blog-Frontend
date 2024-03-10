import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/config/firebase";

export const uploadImage = async (selectedImage) => {
  const image = selectedImage;
  const imageRef = ref(storage, image.name);

  try {
    const snapshot = await uploadBytes(imageRef, image);
    return await getDownloadURL(snapshot.ref);
  } catch (e) {
    throw new Error("An error occurred while uploading images");
  }
};
