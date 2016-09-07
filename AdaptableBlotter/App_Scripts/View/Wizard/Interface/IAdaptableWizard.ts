export interface AdaptableWizardStep {
    canNext(): boolean
    canBack(): boolean
    Next(): void
    Back(): void
    StepName: string
}

export interface AdaptableWizardStepProps<T> {
    Data?: T
    UpdateGoBackState?(): void
}
