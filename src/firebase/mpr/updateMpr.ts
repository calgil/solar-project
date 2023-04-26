import { doc, setDoc, updateDoc } from "firebase/firestore";
import { UploadMpr } from "./createMpr";
import { db } from "../config";
import { toast } from "react-toastify";

export const updateMpr = async (id: string, mpr: UploadMpr) => {
  console.log("start update");

  try {
    await setDoc(doc(db, "mprs", id), mpr);
    console.log("success");
    toast.success("MPR updated successfully!");
  } catch (error) {
    console.error(error);
    toast.error("Failed to update MPR");
  }
};