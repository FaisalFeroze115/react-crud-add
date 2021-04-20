import React from 'react'
//import PropTypes from 'prop-types'
import PetCard from './PetCard'
import "./Home.css"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));

 
const Home = ({pets, onRemove, onFavorite}) => {
    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();
    const handleChange = (event) => {
        setSpacing(Number(event.target.value));
      };

    return (
        <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
            >
                {pets.map((pet)=> 
                    <PetCard pet={pet} key={pet.id} onRemove={onRemove} onFavorite={onFavorite}/>
                )}
        </Grid>
    )
}



// Home.defaultProps = {
//     text: "Home Page",
// }

// Home.propTypes = {
//     text: PropTypes.string.isRequired,
// }

export default Home
