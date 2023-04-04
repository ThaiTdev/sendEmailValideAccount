import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ActivationAccount() {
  const { activationCode } = useParams();
  const navigate = useNavigate();

  function handleClick() {
    try {
      axios
        .post(
          `http://localhost:5000/sendMailApi/emailConfirm/${activationCode}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data.message);
          console.log(res.data.data.isActive);
          console.log(res);
          if (res.data.data.isActive) {
            navigate("/Welcome");
          }
        });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Felicitation !</h1>
      <button onClick={handleClick}>Allons-y!</button>
    </div>
  );
}

export default ActivationAccount;
