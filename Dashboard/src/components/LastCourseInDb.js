import React, { useEffect , useState }  from 'react';
import imagenFondo from '../assets/images/course.jpg';

function LastCourseInDb(){

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [courses, setCourses] = useState([]);
  
    useEffect(() => {
      fetch("api/lastcourse")
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setCourses(result.LastCourse);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [courses]);

    let urlDetail = `http://localhost:8000/products/${courses.id}/productDetail`

    return(
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Ultimo curso agregado a la Base de datos</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={courses.url} alt=""/>
                    </div>
                    <p>{courses.short_description}</p>
                    <a className="btn btn-danger" target="_blank" rel="nofollow" href={urlDetail}>View course detail</a>
                </div>
            </div>
        </div>
    )
}

export default LastCourseInDb;
