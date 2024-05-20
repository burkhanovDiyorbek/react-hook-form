import PropTypes from "prop-types";

function FormSubmitted({ isSubmitted }) {
  return (
    <div className={isSubmitted ? "form-submitted" : "hide"}>
      <img src=".././public/img/checked.svg" alt="checked svg" />
      <h2>THANK YOU!</h2>
      <p>We’ve added your card details</p>
      <button>Continue</button>
    </div>
  );
}

FormSubmitted.propTypes = {
  isSubmitted: PropTypes.bool,
};

export default FormSubmitted;
