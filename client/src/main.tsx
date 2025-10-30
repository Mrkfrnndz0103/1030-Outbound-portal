import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { getCLS, getFID, getLCP } from 'web-vitals';

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Report web vitals
getCLS(console.log);
getFID(console.log);
getLCP(console.log);
