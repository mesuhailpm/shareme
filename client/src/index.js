import App from './App';
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));

root.render(
<BrowserRouter>
    <App />
</BrowserRouter>
);
