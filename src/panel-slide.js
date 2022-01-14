import gsap from "gsap";

//Animate text
export const showAddTodo = () => {
  gsap.to(".add-todo-container", {
    // top: 120,
    y: -380,
    duration: 0.5,
  });
};

export const hideAddTodo = () => {
  // const scrnHeight = window.innerHeight;
  gsap.to(".add-todo-container", {
    y: 200,
    duration: 0.5,
  });
};
