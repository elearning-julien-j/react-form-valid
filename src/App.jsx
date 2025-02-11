import React from "react";
import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, submitCount },
    reset,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      name: "",
      age: null,
      other: {
        happy: false,
        sign: "",
      },
      gender: null,
      password: "",
      confim: "",
    },
  });

  async function submit(values) {
    try {
      clearErrors();
      const response = await fetch("https://restapi.fr/api/testr", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        throw new Error("Test erreur globale"); // A commenter pour fonctionnement normal
        // const newUser = await response.json();
        // reset();
        // console.log(newUser);
      } else {
        console.eror("ERREUR");
      }
    } catch (e) {
      setError("globalError", { type: "global", message: e.message });
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      <form onSubmit={handleSubmit(submit)}>
        <div className="d-flex flex-column mb-20">
          <label htmlFor="name" className="mb-5">
            Nom
          </label>
          <input id="name" type="text" {...register("name")} />
          {errors?.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>
        <div className="d-flex flex-column mb-20">
          <label htmlFor="name" className="mb-5">
            Age
          </label>
          <input
            id="age"
            type="number"
            {...register("age", {
              valueAsNumber: true,
            })}
          />
          {errors?.age && <p style={{ color: "red" }}>{errors.age.message}</p>}
        </div>
        <div className="d-flex flex-column mb-20">
          <label htmlFor="happy" className="mb-5">
            Content ?
            <input id="happy" type="checkbox" {...register("other.happy")} />
          </label>
          {errors?.happy && <p style={{ color: "red" }}>{errors.happy.message}</p>}
        </div>
        <div className="d-flex flex-column mb-20">
          <label htmlFor="sign" className="mb-5">
            Signe astro
          </label>
          <select {...register("other.sign")} id="sign">
            <option disabled value="">
              Choisissez un signe
            </option>
            <option value="fish">Poisson</option>
            <option value="aquarius">Verseau</option>
          </select>
          {errors?.sign && <p style={{ color: "red" }}>{errors.sign.message}</p>}
        </div>
        <div className="d-flex flex-column mb-20">
          <label htmlFor="gender" className="mb-5">
            Genre
          </label>
          <div>
            <label htmlFor="male" className="mb-5">
              Homme
            </label>
            <input {...register("gender")} type="radio" value="male" id="male" />
          </div>
          <div>
            <label htmlFor="female" className="mb-5">
              Femme
            </label>
            <input {...register("gender")} type="radio" value="female" id="female" />
          </div>
          {errors?.gender && <p style={{ color: "red" }}>{errors.gender.message}</p>}
        </div>
        <div className="d-flex flex-column mb-20">
          <label htmlFor="password" className="mb-5">
            Mot de passe
          </label>
          <input id="password" type="password" {...register("password")} />
          {errors?.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
        </div>
        <div className="d-flex flex-column mb-20">
          <label htmlFor="confirmPassword" className="mb-5">
            Confirmation du mot de passe
          </label>
          <input id="confirmPassword" type="password" {...register("confirmPassword")} />
          {errors?.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>}
        </div>
        {errors?.globalError && <p style={{ color: "red" }}>{errors.globalError.message}</p>}
        <button disabled={isSubmitting} className="btn btn-primary">
          Sauvegarder ({submitCount})
        </button>
      </form>
    </div>
  );
}

export default App;
