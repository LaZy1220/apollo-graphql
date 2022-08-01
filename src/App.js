import {useQuery} from '@apollo/client'
import { GET_PRODUCT } from './query/products';

function App() {
  const  {data} =useQuery(GET_PRODUCT)
  console.log(data);
  return (
    <div className="App">
    </div>
  );
}

export default App;
