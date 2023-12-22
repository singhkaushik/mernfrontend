import './App.css';
import Header from './assets/Header';
import Table from './assets/Table';
import Create from './assets/Create';
function App() {
  return (
    <div  >
      <Header/>
      <div className='flex'>
      <Table/>
      <Create/>
      </div>
    </div>
  );
}

export default App;
