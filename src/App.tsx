import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Cards from './pages/Cards'
import Transactions from './pages/Transactions'
import Profile from './pages/Profile'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Layout>
  )
}

export default App
