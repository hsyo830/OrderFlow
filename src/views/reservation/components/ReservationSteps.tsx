type ReservationStepsProps = {
  currentStep?: number;
};

const STEPS = ["좌석 선택", "예매 정보", "결제하기", "예매 완료"];

const ReservationSteps = ({ currentStep = 1 }: ReservationStepsProps) => {
  return (
    <div className="flex w-full items-start justify-center py-6 md:py-8">
      {STEPS.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <div key={step} className="flex min-w-0 items-start">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold md:h-9 md:w-9 md:text-sm ${
                  isActive || isCompleted
                    ? "border-brand bg-brand text-primary-foreground"
                    : "border-border-strong bg-surface text-muted"
                }`}
              >
                {stepNumber}
              </div>
              <span
                className={`text-[11px] font-semibold whitespace-nowrap sm:text-xs md:text-sm ${isActive ? "text-brand" : "text-muted"}`}
              >
                {step}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <div className="bg-border mx-2 mt-4 h-px w-5 sm:w-8 md:mx-6 md:mt-4.5 md:w-16 lg:w-24" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ReservationSteps;
