import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Image from 'next/image'


const styles = theme => ({
  root: {
    maxWidth: 800,
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    border: theme.palette.border,
    boxShadow: theme.palette.boxShadow,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing.unit * 4,
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.spacing.unit * 2,

    
  },
  img: {
    height: 255,
    maxWidth: 400,
    overflow: 'hidden',
    display: 'block',
    width: '100%',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
  },
  mobileStepper: {
    backgroundColor: '#fff',
    padding: '0px',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
    color: '#000',
    '& .MuiMobileStepper-dotActive': {
      backgroundColor: '#000',
    }
  },
  headerText: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#000',
    margin: '0px',
    padding: '0px',
   
  }

});

const TextMobileStepper = (props) =>{

    const [activeStep, setActiveStep] = useState(0)
    const [captions, setCaptions] = useState()
    const { images } = props
    console.log("activeStep", activeStep)
    const handleNext = () => {
      setActiveStep(prevState => prevState + 1 )
    }
    
    console.log("captions", )

    if( images[activeStep]) {
      console.log("caption", images[activeStep].caption)
      //  setCaptions(images[activeStep].caption)
    }
    
      const handleBack = () => {
        setActiveStep(prevState =>  prevState - 1 )
      };

     const formatImgUrl = (url) => {
        return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}` + url;
    };
    
    const { classes, theme } = props;
    console.log("theme", theme);
    const maxSteps = images.length;
    // console.log("tutSteps", tutorialSteps[activeStep])
    return (
       
      <div className={classes.root}>
     
        {images[activeStep]  && (
          <>
             <Paper square elevation={0} className={classes.header}>
              <Typography className={classes.headerText}>{images[activeStep].caption}</Typography>
              </Paper>
          <Image  
            className={classes.img}
            src={formatImgUrl(images[activeStep].url)}
            alt={images[activeStep].alternativeText}
            width={800}
            height={300}
          
            quality={100}

          />
          </>
        )}
           {images[activeStep]  && (
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          className={classes.mobileStepper}
          nextButton={
            <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
              Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Back
            </Button>
          }
        />
        )}
        
      </div>
    );
  }

TextMobileStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(TextMobileStepper);
