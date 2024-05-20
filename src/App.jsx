import { useForm } from "react-hook-form";
import FormSubmitted from "./components/FormSubmitted";
import { useState } from "react";
import "./App.css";

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm();

  const formFunc = () => {
    setIsSubmitted(!isSubmitted);
  };

  return (
    <div className="container">
      <div className="cards">
        <div className="card-1 card">
          <img src=".././public/img/ovals.svg" alt="ovals" />
          <p className="card-number">
            {watch("number")
              ? watch("number")?.slice(0, 4) +
                " " +
                watch("number")?.slice(4, 8) +
                " " +
                watch("number")?.slice(8, 12) +
                " " +
                watch("number")?.slice(12, 16)
              : "0000 0000 0000 0000"}
          </p>
          <div className="card-details">
            <p className="card-holder">{watch("name") || "JANE APPLESEED"} </p>
            <p className="card-date">
              {watch("mm") || "00"}/{watch("yy") || "00"}
            </p>
          </div>
        </div>
        <div className="card-2 card">
          <p className="card-cvc">{watch("cvc") || "000"}</p>
          <img src=".././public/img/liners.svg" alt="liners" />
        </div>
      </div>
      <form
        className={!isSubmitted ? "form" : "hide"}
        onSubmit={handleSubmit(formFunc)}
      >
        <label htmlFor="card-holder">Cardholder Name</label>
        <input
          id="card-holder"
          minLength={3}
          placeholder="e.g. Jane Appleseed"
          className={
            errors.name?.type === "required" ||
            (!isNaN(getValues("name")) && getValues("name")?.length)
              ? "error-inp"
              : ""
          }
          {...register("name", {
            required: true,
            minLength: 3,
          })}
        />
        {errors.name?.type === "required" ? (
          <p className="error-msg">Can`t be blank</p>
        ) : (
          ""
        )}
        {!isNaN(getValues("name")) && getValues("name")?.length > 0 && (
          <p className="error-msg">Wrong format, characters only</p>
        )}
        <label htmlFor="card-number">Card Number</label>
        <input
          id="card-number"
          maxLength={16}
          minLength={16}
          placeholder="e.g. 1234 5678 9123 0000"
          className={
            errors.number?.type === "required" ||
            isNaN(getValues("number") || getValues("number")?.length < 16)
              ? "error-inp"
              : ""
          }
          {...register("number", {
            required: true,
            maxLength: 16,
            minLength: 16,
          })}
        />
        {errors.number?.type === "required" && (
          <p className="error-msg">Can`t be blank</p>
        )}
        {isNaN(getValues("number")) && getValues("number")?.length > 0 && (
          <p className="error-msg">Wrong format, numbers only</p>
        )}
        <div className="card-inform">
          <div className="card-inform_date">
            <label>Exp. Date (MM/YY)</label>
            <input
              placeholder="MM"
              maxLength={2}
              className={
                errors.mm?.type === "required" ||
                (isNaN(getValues("mm")) && getValues("mm")?.length > 0)
                  ? "error-inp"
                  : "true-mm"
              }
              {...register("mm", {
                required: true,
                maxLength: 2,
              })}
            />
            <input
              placeholder="YY"
              maxLength={2}
              className={
                errors.yy?.type === "required" ||
                (isNaN(getValues("yy")) && getValues("yy")?.length > 0)
                  ? "error-inp"
                  : ""
              }
              {...register("yy", {
                required: true,
                maxLength: 2,
              })}
            />
            {errors.yy?.type === "required" && (
              <p className="error-msg">Can`t be blank</p>
            )}
            {isNaN(getValues("yy")) && getValues("yy")?.length > 0 && (
              <p className="error-msg">Wrong format, numbers only</p>
            )}
            {Number(getValues("mm")) >= 13 && (
              <p className="error-msg">Wrong format, numbers only</p>
            )}
          </div>
          <div className="card-inform_cvc">
            <label htmlFor="card-cvc">CVC</label>
            <input
              id="card-cvc"
              placeholder="e.g. 123"
              maxLength={3}
              minLength={3}
              className={errors.cvc?.type === "required" ? "error-inp" : ""}
              {...register("cvc", {
                required: true,
                maxLength: 3,
                minLength: 3,
              })}
            />
            {errors.cvc?.type === "required" && (
              <p className="error-msg">Can`t be blank</p>
            )}
          </div>
        </div>
        <button>Confirm</button>
      </form>
      <FormSubmitted isSubmitted={isSubmitted} />
    </div>
  );
}
export default App;
