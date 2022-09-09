import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ResultDialog({open, onClose, result }) {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent sx={{p:0}}>
          <DialogContentText id="alert-dialog-slide-description">
            <img src={(result === "correct") ? "/images/goodjob.png" : "/images/oops.png"}
              alt={(result === "correct") ? "Good Job!" : "Try Again!"} style={{width:"100%"}}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>{(result === "correct") ? "Next" : "Try Again"}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
