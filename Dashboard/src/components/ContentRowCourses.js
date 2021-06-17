import React, { useEffect , useState }  from 'react';
import SmallCard from './SmallCard';

/*  Cada set de datos es un objeto literal */

/* <!-- Courses in DB --> */

function ContentRowCourses() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [courses, setCourses] = useState([]);
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      fetch("api/courses")
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setCourses(result.meta);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [courses]);
    useEffect(() => {
      fetch("api/users")
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setUsers(result.meta);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [users]);

    let coursesInDb = {
        title: 'Cursos en la Base de datos',
        color: 'primary', 
        cuantity: courses.count,
        icon: 'fa-clipboard-list'
    }
    
    /* <!-- Categories in DB --> */
    
    let categoriesInDb = {
        title:'Categorias en la Base de Datos', 
        color:'success', 
        cuantity: courses.countCategories,
        icon:'fa-award'
    }
    
    /* <!-- Users in DB --> */
    
    let usersInDb = {
        title:'Cantidad de usuarios registrados' ,
        color:'warning',
        cuantity: users.count,
        icon:'fa-user-check'
    }
    
    let cartProps = [coursesInDb, categoriesInDb, usersInDb];
  
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="row">
            
            {cartProps.map( (course, i) => {

                return <SmallCard {...course} key={i}/>
            
            })}

        </div>
      );
    }
  }

export default ContentRowCourses;