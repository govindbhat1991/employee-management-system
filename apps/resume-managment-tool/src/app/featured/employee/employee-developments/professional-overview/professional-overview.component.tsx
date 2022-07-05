import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import classes from './professional-overview.module.scss';
import {
    ProfessionalOverview,
    UpdateProfessionalOverviewArgs,
} from '@resume-managment-tool/api-interfaces';
import CardComponent from '../../../../components/card/card.component';
import TextAreaComponent from '../../../../components/forms/textarea/textarea.component';
import {
    useProfessionalOverviewQuery,
    useUpdateProfessionalOverview,
} from './services/professional-overview.service';

const ProfessionalOverviewComponent = () => {
    const professionalOverview = useProfessionalOverviewQuery();
    const { mutation: updateProfessionalOverview } = useUpdateProfessionalOverview();

    const [professionalOverviewData, setProfessionalOverviewValue] =
        useState<ProfessionalOverview>();

    /** professionalOverview details form intialization */
    const professionalOverviewForm = useFormik<ProfessionalOverview>({
        initialValues: {
            professionalSummary: professionalOverviewData?.professionalSummary || '',
        },
        enableReinitialize: true,
        onSubmit: (professionalOverview) => {
            const professionalOverviewInput = {
                professionalSummary: professionalOverview.professionalSummary || null,
            } as UpdateProfessionalOverviewArgs;

            updateProfessionalOverview({
                variables: {
                    updateProfessionalOverviewArgs: professionalOverviewInput,
                },
            }).then(({ data }) => {
                if (!data?.updateProfessionalOverview) {
                    return;
                }
                setProfessionalOverviewValue(data.updateProfessionalOverview);
            });
        },
    });

    /** employee form edit state handling */
    const [professionalOverviewEditState, setProfessionalOverviewEditState] =
        useState<boolean>(false);
    const editStateHandler = (state: boolean) => {
        setProfessionalOverviewEditState(state);
    };

    /** employee form data resetting to last saved value */
    const resetHanlder = () => {
        professionalOverviewForm.resetForm({
            values: professionalOverviewData as ProfessionalOverview,
        });
    };

    useEffect(() => {
        if (professionalOverview) {
            setProfessionalOverviewValue(professionalOverview);
        }
    }, [professionalOverview]);

    return (
        <CardComponent
            header="Professional Overview"
            styleClass={classes['professional-overview__card']}
            onSave={professionalOverviewForm.handleSubmit}
            onClose={resetHanlder}
            editState={editStateHandler}
        >
            <form>
                <div className="row">
                    <div className="col-12">
                        <TextAreaComponent
                            id="professionalSummary"
                            label="Professional Summary"
                            name="professionalSummary"
                            value={professionalOverviewForm.values.professionalSummary}
                            disabled={!professionalOverviewEditState}
                            onChange={professionalOverviewForm.handleChange}
                        />
                    </div>
                </div>
            </form>
        </CardComponent>
    );
};

export default ProfessionalOverviewComponent;
