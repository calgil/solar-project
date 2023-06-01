/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import s from "../styles/components/ClassCard.module.scss";
import { Modal } from "./Modal";
import { AddClass } from "./AddClass";
import plus from "../assets/plus.png";
import { AddCourse } from "./AddCourse";
import { Class } from "../types/class.type";
import { getCoursesByClassId } from "../firebase/training/getCoursesByClassId";
import { Course } from "../types/course.type";
import { CourseCard } from "./CourseCard";

type ClassCardProps = {
  training: Class;
  edit?: boolean;
};

export const ClassCard = ({ training }: ClassCardProps) => {
  const { id: classId, name, hours } = training;
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [courses, setCourses] = useState<Course[] | null>(null);

  useEffect(() => {
    if (classId) {
      const unsubscribe = getCoursesByClassId(classId, setCourses);
      return () => unsubscribe();
    }
  }, [classId]);

  return (
    <div className={s.class}>
      <div className={s.classInfo}>
        <div className={s.classDetails}>
          <h3 className={s.name}>{name}</h3>
          <p className={s.hours}>{hours} Hours</p>
        </div>
        <div className={s.btnContainer}>
          <button className={s.add} onClick={() => setIsAddCourseOpen(true)}>
            <div className={s.plus}>
              <img className={s.plusImg} src={plus} alt="plus" />
            </div>
            Add Course
          </button>
          <button className={s.edit} onClick={() => setIsEditOpen(true)}>
            {"\u270E"} Edit
          </button>
        </div>
      </div>
      <div className={s.courses}>
        {courses &&
          courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
      </div>
      <Modal
        isOpen={isAddCourseOpen}
        onClose={() => setIsAddCourseOpen(false)}
        title="Add Course"
      >
        <AddCourse
          classId={training.id}
          closeModal={() => setIsAddCourseOpen(false)}
        />
      </Modal>
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title={`Edit ${name}`}
      >
        <AddClass
          closeModal={() => setIsEditOpen(false)}
          classToEdit={training}
        />
      </Modal>
    </div>
  );
};
