import React from "react";

// Destructuring the props
const Button = ({ title, id, rightIcon, leftIcon, containerClass }) => {
  return (
    // The button component with left and right icons,
    // along with a container class for styling.
    // The title and id are passed as props.
    // The left and right icons are optional and default to null.
    <button
      id={id}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${containerClass}`}
    >
      {/*Left Icon*/}
      {leftIcon}

      {/*Button text*/}
      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
          {title}
        </div>
        <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
          {title}
        </div>
      </span>

      {/*Right Icon*/}
      {rightIcon}
    </button>
  );
};
export default Button;
