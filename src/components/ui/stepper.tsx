import React, { useState, Children, useRef, useLayoutEffect, HTMLAttributes, ReactNode } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  initialStep?: number;
  onStepChange?: (step: number) => void;
  backButtonText?: string;
  nextButtonText?: string;
  disableStepIndicators?: boolean;
}

export default function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => { },
  backButtonText = 'Volver',
  nextButtonText = 'Siguiente',
  disableStepIndicators = false,
  ...rest
}: StepperProps) {
  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  const [direction, setDirection] = useState<number>(0);
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isLastStep = currentStep === totalSteps;

  const updateStep = (newStep: number) => {
    setCurrentStep(newStep);
    onStepChange(newStep);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      setDirection(1);
      updateStep(currentStep + 1);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-full max-w-5xl md:max-w-6xl mx-auto p-6 rounded-3xl bg-card border border-border shadow-lg"
      {...rest}
    >
      {/* Step Indicators */}
      <div className="flex w-full items-center justify-between mb-10">
        {stepsArray.map((_, index) => {
          const stepNumber = index + 1;
          const isComplete = currentStep > stepNumber;
          const isActive = currentStep === stepNumber;

          return (
            <React.Fragment key={stepNumber}>
              <motion.div
                onClick={() => {
                  if (!disableStepIndicators) {
                    setDirection(stepNumber > currentStep ? 1 : -1);
                    updateStep(stepNumber);
                  }
                }}
                className={`relative flex items-center justify-center w-10 h-10 rounded-full cursor-pointer select-none
                  ${isActive
                    ? 'bg-orange-500 text-white shadow-md'
                    : isComplete
                      ? 'bg-orange-100 text-orange-500'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                whileHover={{ scale: disableStepIndicators ? 1 : 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {isComplete ? <Check className="w-5 h-5" /> : stepNumber}
              </motion.div>

              {/* Connector */}
              {index < totalSteps - 1 && (
                <motion.div
                  className="flex-1 h-1 mx-2 bg-gray-200 relative overflow-hidden rounded-full"
                  initial={false}
                >
                  <motion.div
                    className="absolute left-0 top-0 h-full bg-orange-500"
                    animate={{ width: isComplete ? '100%' : '0%' }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  />
                </motion.div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Step Content */}
      <StepContentWrapper currentStep={currentStep} direction={direction} className="w-full text-center space-y-6">
        {stepsArray[currentStep - 1]}
      </StepContentWrapper>

      {/* Footer Buttons */}
      <div className="mt-10 flex w-full justify-between">
        {currentStep > 1 ? (
          <Button
            variant="outline"
            onClick={handleBack}
            className="min-w-[120px] bg-white text-orange-500 border border-orange-300"
          >
            {backButtonText}
          </Button>
        ) : (
          <div />
        )}

        {/* Botón condicional para el último step */}
        {!isLastStep ? (
          <Button
            onClick={handleNext}
            className="min-w-[120px] bg-primary text-white hover:bg-secondary"
          >
            {nextButtonText}
          </Button>
        ) : (
          <Button
            onClick={() => {
              const target = document.querySelector('#contacto');
              if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="min-w-[120px] bg-primary text-white hover:bg-secondary"
          >
            Contactanos
          </Button>
        )}
      </div>
    </div>
  );
}

interface StepContentWrapperProps {
  currentStep: number;
  direction: number;
  children: ReactNode;
  className?: string;
}

function StepContentWrapper({ currentStep, direction, children, className = '' }: StepContentWrapperProps) {
  const [height, setHeight] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (ref.current) setHeight(ref.current.offsetHeight);
  }, [children]);

  return (
    <motion.div
      animate={{ height }}
      transition={{ duration: 0.4, type: 'spring', stiffness: 120 }}
      className="relative overflow-hidden w-full"
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        <motion.div
          key={currentStep}
          custom={direction}
          variants={stepVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4 }}
          ref={ref}
          className={className}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

const stepVariants: Variants = {
  enter: (dir: number) => ({ x: dir >= 0 ? '-100%' : '100%', opacity: 0 }),
  center: { x: '0%', opacity: 1 },
  exit: (dir: number) => ({ x: dir >= 0 ? '50%' : '-50%', opacity: 0 }),
};

export function Step({ children }: { children: ReactNode }) {
  return (
    <div className="bg-card p-6 rounded-2xl border border-border text-foreground space-y-3">
      {children}
    </div>
  );
}
