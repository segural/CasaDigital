import React from 'react';
import SideBar from './SideBar';
import {Switch, Route} from 'react-router-dom';
import ContentWrapper from './ContentWrapper';
import LastCourseInDb from './LastCourseInDb';
import CategoriesInDb from './CategoriesInDb';
import AllCourses from './AllCourses';
import Error404 from './Error404';

function App() {
  return (
    <React.Fragment>
      	<div id="wrapper">
          <SideBar />
                <Switch>
                <Route path="/" exact component={ContentWrapper} />
                <Route path="/LastCourseInDb" component={LastCourseInDb} />
                <Route path="/CategoriesInDb" component={CategoriesInDb} />               
                <Route path="/AllCourses" component={AllCourses} />                
                <Route component={Error404} />
                </Switch>
        </div>
    </React.Fragment>
  );
}

export default App;
