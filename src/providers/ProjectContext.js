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
    case "addTask":
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          tasks: [...state.currentProject.tasks, action.payload],
        },
      };
    case "updateTask":
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          tasks: state.currentProject.tasks.map((task) => {
            if (task.timestamp === action.payload.timestamp) {
              return action.payload;
            }
            return task;
          }),
        },
      };
    default:
      return state;
  }
};

// Crear una referencia a la colleción de proyectos
const projectsRef = firebase.firestore().collection("projects");

// Almacenar un nuevo proyecto para el usuario actual
const createProject = (dispatch) => (title, description, timestamp, user) => {
  const data = {
    title,
    description,
    timestamp,
    userId: user,
    tasks: [],
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

// Agregar una tarea a un proyecto
const addTask = (dispatch) => (idProject, name, description, timestamp) => {
  projectsRef
    .doc(idProject)
    .update({
      tasks: firebase.firestore.FieldValue.arrayUnion({
        name,
        description,
        timestamp,
        done: false,
      }),
    })
    .then(() => {
      dispatch({
        type: "addTask",
        payload: { name, description, done: false, timestamp },
      });
    })
    .catch((error) => {
      dispatch({ type: "errorMessage", payload: error.message });
    });
};

// Actualizar el estado de una tarea
const udpateTaskStatus = (dispatch) => (project, task) => {
  const tasks = project.tasks.map((aTask) => {
    if (aTask.timestamp === task.timestamp) return task;
    return aTask;
  });

  projectsRef
    .doc(project.id)
    .set(
      { ...project, tasks: firebase.firestore.FieldValue.arrayUnion(...tasks) },
      { merge: false }
    )
    .then(() => {
      dispatch({ type: "updateTask", payload: task });
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
    getProjects,
    setCurrentProject,
    addTask,
    udpateTaskStatus,
  },
  {
    errorMessage: null,
    projects: [],
    currentProject: { id: "", title: "", timestamp: "" },
  }
);
