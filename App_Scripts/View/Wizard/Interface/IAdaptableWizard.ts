export interface AdaptableWizardStep {
    StepName: string
    canNext(): boolean
    canBack(): boolean
    Next(): void
    Back(): void
}

export interface AdaptableWizardStepProps<T> {
    Data?: T
    UpdateGoBackState?(finish?: boolean): void
}
