
import './App.css';
import Product_List from './Component/Product_List';
import Product_forms from './Component/Product_forms';



function App() {
  return (
    <>
      <div className='container'>
        <div className="column">
          <div className="col-md-6"><Product_forms/></div>
          <div className="col-md-6"><Product_List/></div>
        </div>
      </div>
    </>
  );
}

export default App;

