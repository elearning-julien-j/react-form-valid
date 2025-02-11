import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function App() {
  const schema = yup.object({
    name: yup
      .string()
      .required("Le champ est obligatoire")
      .min(2, "Trop court")
      .max(5, "Trop long")
      .test("isYes", "Vous n'avez pas de chance", async () => {
        const response = await fetch("https://yesno.wtf/api");
        const result = await response.json();
        console.log(result);
        return result.answer === "yes";
      }),
    age: yup.number().typeError("Veuillez entre un nombre").min(18, "Trop jeune"),
    password: yup.string().required("Le mot de passe est obligatoire").min(5, "Mot de passe trop court").max(10, "Mot de passe trop long"),
    confirmPassword: yup
      .string()
      .required("Vous devez confirmer votre mot de passe")
      .oneOf([yup.ref("password"), ""], "Les mots de passe ne correspondent pas"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
    },
    resolver: yupResolver(schema),
  });

  function submit(values) {
    console.log(values);
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", width: "100%" }}>
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
        <button className="btn btn-primary">Sauvegarder</button>
      </form>
    </div>
  );
}

export default App;
