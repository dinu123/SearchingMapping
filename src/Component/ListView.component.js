import {useState, useEffect} from 'react';
function ListView() {
    const [searchParm, setSearchParm] = useState('');
    const [isLoaded, setIsLoaded] = useState(true);
    const [items, setItems] = useState();
    const [error, setError] = useState(null);
  const onChangehandler = (event) => {
    const value = event.target.value;
    setSearchParm(value);
    
    
  }
  const getData = (event) => {
   const value = event.target.value;
    if (value) {
     
      const url = 'https://pokeapi.co/api/v2/pokemon/'+ value;
      setIsLoaded(false);
      fetch(url)
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }
  }
    
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    /* useEffect(() => {
      fetch("https://raw.githubusercontent.com/iamspruce/search-filter-painate-reactjs/main/data/countries.json")
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            console.log(result);
            setItems(result);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])
*/
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else { 
      return (
        <div className="wrapper">
                    <input placeholder='Searching..' type="text" value = {searchParm} onChange = {onChangehandler} onBlur = {getData}/> 
                  
                    {items &&
                    <div>
                      <p>Abilities</p>
                      <ul>
                          {items?.abilities.map((rec) =>
                            <li key={rec.slot}>
                              {rec.ability.name}
                            </li>
                          )}
                        </ul>
                        <p>Images</p>
                        <ul className='image-list'>
                          <li>
                            <img src={items.sprites.back_default} alt = {items.sprites.back_default}/>
                          </li>
                          <li>
                            <img src={items.sprites.back_shiny} alt = {items.sprites.back_shiny}/>
                          </li>
                          <li>
                            <img src={items.sprites.front_default} alt = {items.sprites.front_default}/>
                          </li>
                          <li>
                            <img src={items.sprites.front_shiny} alt = {items.sprites.front_shiny}/>
                          </li>
                        </ul>
                        <p>Stats</p>
                        <ul>
                          {items?.stats.map((rec) =>
                            <li key={rec.stat.name}>
                              <span>{rec.stat.name}</span>
                              <span>{rec.effort}</span>
                            </li>
                          )}
                        </ul>
                        <p>Held Items</p>
                        <ul>
                          {items?.held_items.map((rec) =>
                            <li key={rec.item.name}>
                              <span>{rec.item.name}</span>
                            </li>
                          )}
                          
                        </ul>
                    </div>
                  }
                </div>
      );
     } 
  }
  export default ListView;