import createDataContext from "./createDataContext";
import { firebase } from "../firebase";

// Acciones disponibles para el reducer
const projectReducer = (state, action) => {
  switch (action.type) {
    case "errorMessage":
      return { ...state, error: action.payload };
    case "message":
      return { ...state, message: action.payload };
    case "getProjects":
      return { ...state, projects: action.payload };
    case "setCurrentProject":
      return { ...state, currentProject: action.payload };
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

// Obtener todas los proyectos del usuario
const getProjects = (dispatch) => (userId) => {
  projectsRef
    .where("userId", "==", userId)
    // .orderBy("timestamp", "desc")
    .onSnapshot(
      (querySnapshot) => {
        const projects = [];

        querySnapshot.forEach((doc) => {
          const project = doc.data();
          project.id = doc.id;
          projects.push(project);
        });

        dispatch({ type: "getProjects", payload: projects });
      },
      (error) => {
        dispatch({ type: "errorMessage", payload: error.message });
      }
    );
};

// Establecer el proyecto seleccionado por el usuario
const setCurrentProject = (dispatch) => (project) => {
  dispatch({ type: "setCurrentProject", payload: project });
};

// Exportar las funcionalidades del contexto y el proveedor
export const { Provider, Context } = createDataContext(
  projectReducer,
  {
    createProject,
    getProjects,
    setCurrentProject,
  },
  {
    errorMessage: null,
    projects: [],
    currentProject: { id: "", title: "", timestamp: "" },
  }
);
