import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './home.tsx';


const App = () => {
  return (
     <BrowserRouter basename="/rain-mixer">
       <Routes>
         <Route path="/" element={<Home />} />
       </Routes>
     </BrowserRouter>
  );
};

export default App;
