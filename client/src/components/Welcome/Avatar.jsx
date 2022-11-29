import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
// import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
// import { autoPlay } from 'react-swipeable-views-utils';
// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: '1',
    imgPath: './avatars/avatar-temp-8.png'
  },
  {
    label: '2',
    imgPath: './avatars/avatar-temp-7.png'
  },
  {
    label: '3',
    imgPath: './avatars/avatar-temp-6.png'
  },
  {
    label: '4',
    imgPath: './avatars/avatar-temp-5.png'
  },
  {
    label: '5',
    imgPath: './avatars/avatar-temp-4.png'
  },
  {
    label: '6',
    imgPath: './avatars/avatar-temp-3.png'
  },
  {
    label: '7',
    imgPath: './avatars/avatar-temp-2.png'
  },
  {
    label: '8',
    imgPath: './avatars/avatar-temp-1.png'
  }
];

export default function ActionAvatar(props) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  useEffect(() => {
    props.setAvatar(images[activeStep].imgPath)
    console.log(images[activeStep].imgPath)
  }, [activeStep])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ maxWidth: 400, maxHeight: 210, flexGrow: 1 }}>
      <div className="tri-avatar">
        <img alt="tri" src="./tri-border.png"
        />
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {images.map((step, index) => (
            <div key={step.label} style={{
              display: 'flex',
              justifyContent: 'center',
            }}
            >
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    overflow: 'hidden',
                    maxWidth: 120,
                    width: '100%',
                  }}
                  src={step.imgPath}
                  alt={step.label}
                />
              ) : null}
            </div>
          ))}
        </SwipeableViews>
      </div>
      <MobileStepper
        sx={{
          justifyContent: 'center'
        }}
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </Button>
        }
      />
    </Box>
  );
}