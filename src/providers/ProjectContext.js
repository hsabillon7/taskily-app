import createDataContext from "./createDataContext";
import { firebase } from "../firebase";

// Acciones disponibles para el reducer
const projectReducer = (state, action) => {
  switch (action.type) {
    case "errorMessage":
      return { ...state, error: action.payload };
    case "message":
      return { ...state, message: action.payload };
    default:
      return state;
  }
};

// Crear una referencia a la colleción de proyectos
const projectsRef = firebase.firestore().collection("projects");

// Almacenar un nuevo proyecto para el usuario actual
const createProject = (dispatch) => (title, timestamp, user) => {
  const data = {
    title,
    timestamp,
    userId: user,
  };

  projectsRef
    .add(data)
    .then((_doc) => {
      dispatch({ type: "message", payload: "Project created!" });
    })
    .catch((error) => {
      dispatch({ type: "errorMessage", payload: error.message });
    });
};

// Exportar las funcionalidades del contexto y el proveedor
export const { Provider, Context } = createDataContext(
  projectReducer,
  {
    createProject,
  },
  {
    errorMessage: null,
  }
);
