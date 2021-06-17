import React from 'react';


function AllCoursesRow(props){


    return (
                <tr>
                    <td><a href={props.urlDetail}>{props.Title}</a></td>
                    <td>{props.Teacher}</td>
                    <td>{props.Categories}</td>
                    <td>{props.Price}</td>
                    <td>{props.Discount}</td>
                </tr>
            )
    }
    
        

export default AllCoursesRow;