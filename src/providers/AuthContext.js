import createDataContext from "./createDataContext";
import { firebase } from "../firebase";

// Acciones disponibles para el reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case "signup":
      return state;
    case "errorMessage":
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

// Funciones
const signup = (dispatch) => (fullname, email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      console.log("usuario creado");
    })
    .catch((error) => {
      dispatch({ type: "errorMessage", payload: error.message });
    });
};

// Exportar las funcionalidades del contexto
export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signup,
  },
  {
    user: {},
    errorMessage: "",
  }
);
