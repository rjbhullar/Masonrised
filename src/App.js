
import './App.css';
import { useEffect, useReducer } from 'react';
// import MasonryComp from './Masnory';
import axios from 'axios';

let API_URL = "https://api.unsplash.com/photos/?client_id=QnoShfzoGvJZjOi029m4sxFmAcorM5flRkj7WtU5Ymo&per_page=20&page="
const stateReducer = (state, action) => ({
  ...state,
  ...(typeof (action) == "function" ? action(state) : action)
});

function App() {
  let [state, setState] = useReducer(stateReducer, {
    activePageNumber: 1,
    images: [],
    requestState: "loading",
  });

  useEffect(() => {
    let url = API_URL + state.activePageNumber;
    axios.get(url)
      .then(res => {
        console.log('res: ', res);
        setState(state => ({
          images: [...state.images, ...res.data],
          requestState: "loaded",
        }));
      })
      .catch({ requestState: "error" })
  }, [state.activePageNumber]);

  let { images, requestState } = state;

  return (
    <div className="App">
      <header className="App-header"></header>
      {requestState === "loading" && "loader"}
      {/*<MasonryComp list={images} />*/}
      {requestState === "loading" && "loading..."}
    </div>
  );
}

export default App;
