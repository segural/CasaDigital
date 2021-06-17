import React, { useEffect , useState }  from 'react';

function CategoriesInDb() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("api/courses")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCourses(result.meta.countByCategory);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [courses]);


  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Categorias en la Base de Datos
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-lg-6 mb-4">
              <div className="card bg-dark text-white shadow">
                <div className="card-body">Desarrollo: {courses.Desarrollo}</div>
              </div>
            </div>
            <div className="col-lg-6 mb-4">
              <div className="card bg-dark text-white shadow">
                <div className="card-body">Fotografía: {courses.Fotografía}</div>
              </div>
            </div>
            <div className="col-lg-6 mb-4">
              <div className="card bg-dark text-white shadow">
                <div className="card-body">Finanzas: {courses.Finanzas}</div>
              </div>
            </div>
            <div className="col-lg-6 mb-4">
              <div className="card bg-dark text-white shadow">
                <div className="card-body">Excel: {courses.Excel}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoriesInDb;
