import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthButtons from './component/button'
import Dashboard from './pages/dashboard';
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import MySkillTable from './pages/crudSkills'
import MyEducationTable from './pages/crudEducation'
import MyProjectTable from './pages/crudProjects'
import MyExpierenceTable from './pages/crudExpierence'
import MyAchviementTable from './pages/crudAchviement'
import Chatbot from './pages/chatbot'
import Layout from './component/layout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthButtons />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/curdSkills" element={<MySkillTable />} />
          <Route path="/curdEducation" element={<MyEducationTable />} />
          <Route path="/curdProject" element={<MyProjectTable />} />
          <Route path="/curdExpierence" element={<MyExpierenceTable />} />
          <Route path="/curdAchviement" element={<MyAchviementTable />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
