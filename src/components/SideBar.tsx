import { useEffect, useState } from 'react';

import '../styles/sidebar.scss';
import { Button } from './Button';

import { api } from '../services/api';

interface GenreResponseProps{
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function SideBar(props:any) {

  const setUpdatedId = props.setUpdatedId;
  const updatedId = props.updatedId;

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  
  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  function handleClickButton(id: number) {
    setUpdatedId(id)
  }

  return (
    <>
      <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={updatedId === genre.id}
          />
        ))}
      </div>

      </nav>
    </>
  )
  
}