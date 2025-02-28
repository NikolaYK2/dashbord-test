import { createRoot } from "react-dom/client";

import App from "@app/routes/_index.tsx";

import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/nunito/700.css";

createRoot(document.getElementById("root")!).render(<App />);
