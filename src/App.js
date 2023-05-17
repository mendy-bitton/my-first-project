import Content from "./components/Content";
import "./css/App.css";
import Context from "./components/Context";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Context>
        <ToastContainer />
        <Content />
      </Context>
    </div>
  );
}

export default App;
