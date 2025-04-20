import { Routes, Route } from 'react-router-dom';
import AddressPage from './pages/Analysis/AddressPage';
import DemoPage from './pages/Analysis/DemoPage';
import HomePage from './pages/Analysis/HomePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/analysis/address" element={<AddressPage />} />
      <Route path="/analysis/demo" element={<DemoPage />} />
    </Routes>
  );
}
