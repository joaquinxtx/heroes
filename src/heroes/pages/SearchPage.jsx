import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string'
import { useForm } from '../../hooks/useForm'
import { HeroCard } from '../components/HeroCard'
import { getHeroesByName } from '../helper/getHeroesByName'

export const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {q = ''} = queryString.parse(location.search);
  const heroes = getHeroesByName(q);

  const showSeach = ( q.length===0 );
  const showError = ( q.length > 0 ) && heroes.length === 0 ;

  const{searchText,onInputChange}=useForm({
    searchText:q
  });

  const onSeachSubmit = (event)=>{
    event.preventDefault();
    // if(searchText.trim().length <= 1)return
    

    navigate(`?q=${searchText}`)
  };

  return (
    <>
      <h1>Search</h1>
      <hr />
     <div className="row">
      <div className="col-5">
            <h4>Searching</h4>
            <hr />
            <form onSubmit={onSeachSubmit}>
              <input 
              type="text"
              placeholder='Search a Hero'
              className='form-control'
              name='searchText'
              autoComplete='off'
              value={searchText}
              onChange={onInputChange} />
              <button className='btn btn-primary mt-1'>
                search
              </button>
            </form>
        </div>
        <div className="col-7">
          <h4>Result</h4>
          <hr />
          <div className="alert alert-primary" style={{display: showSeach ?'': 'none'}}>
            Search a hero
          </div>
          <div className="alert alert-danger" style={{display: showError ?'':'none'}}>
            No Hero with<b> {q} </b>
          </div>
          {
            heroes.map(hero => (
              <HeroCard 
              key={hero.id}
              {...hero} /> 

            ))
          }

        </div>

     </div>
    </>
  )
}
