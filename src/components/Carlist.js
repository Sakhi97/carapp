import React, {useState, useEffect} from "react";
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import AddCar from "./AddCar";
import { API_URL } from "../constants";
import EditCar from "./EditCar";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

// Separate here all functions in own file (delete, edit, ...)

function Carlist() {
    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState();

    // We are not going to use setColumnDefs, so no need to define it
    const [columnDefs] = useState([
        {field: 'brand', sortable: true, filter: true},
        {field: 'model', sortable: true, filter: true},
        {field: 'color', sortable: true, filter: true},
        {field: 'fuel', sortable: true, filter: true, width: 100},
        {field: 'year', sortable: true, filter: true, width: 100},
        {field: 'price', sortable: true, filter: true, width: 100}, 
        {
            cellRenderer: params => <EditCar params={params.data} updateCar={updateCar} />,
            width: 120
        },
        {cellRenderer: params => 
          <Button 
            size='small' 
            color='error'
            onClick={() => deleteCar(params)}
          >
              Delete
            </Button>
            , width: 120}   
    ])

    const deleteCar = (params) => {
        if (window.confirm('Are you sure?')) {
            fetch(params.data._links.car.href, {method: 'DELETE'})
            .then(response => {
                if(response.ok) {
                    setMsg("Car deleted successfully");
                    setOpen(true);
                    getCars();
                }
                else {
                    alert('Something went wrong in deletion');
                }
            })
            .catch(err => console.error(err))
        }    
    }

    const getCars = () => {
        fetch(API_URL + '/cars')
        .then(response => {
            if(response.ok)
                return response.json();
            else
                alert('Something went wrong in GET request');
        })
        .then(data => setCars(data._embedded.cars))
        .catch(err => console.error(err))
    }

    // use parameter "car" to add the car
    const addCar = (car) => {
        fetch(API_URL + 'cars', {
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(car)
        })
        .then(response => {
            if(response.ok) {
                getCars();
            }
            else {
                alert('Something went wrong in addition: ' + response.statusText);
            }
        })
        .catch(err => console.error(err))
    }

    const updateCar = (updatedCar, url) => {

        fetch(url, {
            method: 'PUT',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(updatedCar)
        })
        .then(response => {
            if (response.ok) {
                setMsg("Car edited successfully");
                setOpen(true);
                getCars();
            }
            else {
                alert('Something went wrong when editing');
            }
        })
        .catch(err => console.error(err))
    }

    useEffect(() => {
        //Fetch cars (must be httpS)
        getCars();
    }, []);

    return (
        <>
            <AddCar addCar={addCar}/>
            <div 
              className='ag-theme-material'
              style={{width:'80%', height:600, margin:'auto'}}>
              <AgGridReact
                //Define where the data comes from: 
                rowData={cars}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}
              />
            </div>
            <Snackbar 
                open={open}
                message={msg}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
            />
        </>
    )
}

export default Carlist;