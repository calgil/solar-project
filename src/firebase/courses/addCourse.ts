import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config";

export type Course = {
  id: string;
  year: number;
  name: string;
  hours: number;
  link?: string;
  info?: string;
};

export type NewCourse = {
  year: number;
  name: string;
  hours: number;
  link?: string;
  info?: string;
};

export const addCourse = async (newCourse: NewCourse) => {
  if (!newCourse) {
    return;
  }
  const newCourseRef = doc(collection(db, "courses"));
  try {
    await setDoc(newCourseRef, newCourse);
  } catch (error) {
    console.error(error);
    throw new Error("could not create course");
  }
};