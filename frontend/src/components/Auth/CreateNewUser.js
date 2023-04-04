import { useCreateUser } from "../hooks/useCreateUser";
import { accountService } from "../../_services/accountServices";
import { useState } from "react";

const CreateNewUser = () => {
  const [register, handleSubmit] = useCreateUser();
  const [newTruc, setNewTruc] = useState("");
  const showData = async (data) => {
    let value = {
      email: data.email,
      password: data.password,
    };
    accountService
      .createUser(value, {
        headers: {
          "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "http://localhost:3000",
        },
      })
      .then((res) => setNewTruc(res.message));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(showData)}>
        <p>{newTruc}</p>
        <label htmlFor="email">email</label>
        <input
          type="email"
          name="email"
          id="email"
          {...register("email")}
          required
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          name="password"
          id="password"
          {...register("password")}
          required
        />
        <button type="submit">Validez</button>
      </form>
    </div>
  );
};
export default CreateNewUser;
