import {BrowserRouter} from "react-router-dom";
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App.jsx';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(
  "pk_test_51TAvn2Q128oz7Bpusp2UIjc1bVOKQU35YLb2uJQbBAktDdHi0CJU15FdQKWmawfqyyutSzXzC4n7yyT9dK29GKSa003kV5xw0I"
);

createRoot(document.getElementById('root')).render(
     <Elements stripe={stripePromise}>
<BrowserRouter>
    <App />
</BrowserRouter>
</Elements>
)
