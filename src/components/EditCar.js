import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditCar(props) {
  const [open, setOpen] = React.useState(false);
  const [car, setCar] = React.useState({
    brand: '',
    model: '',
    color: '',
    fuel: '',
    year: '',
    price: ''
  });

  const handleClickOpen = () => {
    //console.log(props.params);
    setCar({
        brand: props.params.brand,
        model: props.params.model,
        color: props.params.color,
        fuel: props.params.fuel,
        year: props.params.year,
        price: props.params.price,
    })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.updateCar(car, props.params._links.car.href);
    setOpen(false);
  };

  // Make own functions for TextField form!!!!
  
  return (
    <div>
      <Button size='small' onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Car</DialogTitle>
        <DialogContent>
          <TextField
            //autoFocus
            value={car.brand}
            onChange={e => setCar({...car, brand: e.target.value})}
            margin="dense"
            label="Brand"
            fullWidth
            variant="standard"
          />
          <TextField
            value={car.model}
            onChange={e => setCar({...car, model: e.target.value})}
            margin="dense"
            label="Model"
            fullWidth
            variant="standard"
          />
          <TextField
            value={car.color}
            onChange={e => setCar({...car, color: e.target.value})}
            margin="dense"
            label="Color"
            fullWidth
            variant="standard"
          />
          <TextField
            value={car.fuel}
            onChange={e => setCar({...car, fuel: e.target.value})}
            margin="dense"
            label="Fuel"
            fullWidth
            variant="standard"
          />
          <TextField
            value={car.year}
            onChange={e => setCar({...car, year: e.target.value})}
            margin="dense"
            label="Year"
            fullWidth
            variant="standard"
          />
          <TextField
            value={car.price}
            onChange={e => setCar({...car, price: e.target.value})}
            margin="dense"
            label="Price"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}