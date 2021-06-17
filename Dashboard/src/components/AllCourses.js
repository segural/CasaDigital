import React, { useEffect , useState }  from 'react';
import AllCoursesRow from './AllCoursesRow';

function AllCourses (){

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [courses, setCourses] = useState([]);
  
    useEffect(() => {
      fetch("api/courses")
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setCourses(result.Product);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [courses]);


    const tableRowsData = courses.map(curso => {
        let course = {
                Title: curso.course_title,
                Teacher: curso.course_owner,
                Categories: curso.category.category_name,
                Price: curso.price,
                Discount: curso.discount,
                urlDetail: `http://localhost:8000/products/${curso.id}/productDetail`      
        }
        return course
              
    });
    

    return (
        /* <!-- DataTales Example --> */
        <div className="card shadow mb-4">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Profesor</th>
                                <th>Categoría</th>
                                <th>Precio</th>
                                <th>Descuento</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Título</th>
                                <th>Profesor</th>
                                <th>Categoría</th>
                                <th>Precio</th>
                                <th>Descuento</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            {
                            tableRowsData.map( ( row , i) => {
                                return <AllCoursesRow { ...row} key={i}/>
                            })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default AllCourses;