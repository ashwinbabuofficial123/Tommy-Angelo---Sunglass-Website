import "../css/button.css";

const Button = ({ btnClass, btnSpan, children, onClick }) => {
  return (
    <>
      <button className={`button ${btnClass}  `} onClick={onClick}>
        <span className={`btn-span ${btnSpan}`}>{children}</span>
      </button>
    </>
  );
};

export default Button;
