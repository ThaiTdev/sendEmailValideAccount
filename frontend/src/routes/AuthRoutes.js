import { Routes, Route } from "react-router-dom";
import CreateNewUser from "../components/Auth/CreateNewUser";
import ActivationAccount from "../components/Auth/ActivationAccount";
import Welcome from "../components/Auth/WelcomePage";
const Create = () => {
  return (
    <Routes>
      <Route path="/" element={<CreateNewUser />} />
      <Route
        path="/emailConfirm/:activationCode"
        element={<ActivationAccount />}
      />
      <Route path="/welcome" element={<Welcome />} />
    </Routes>
  );
};
export default Create;
