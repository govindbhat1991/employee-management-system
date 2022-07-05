import classes from './employee.module.scss';
import CardComponent from '../../components/card/card.component';
import EmployeeDetailsComponent from './employee-details/employee-details.component';
import EmployeeDevelopmentComponent from './employee-developments/employee-developments.component';
const EmployeeComponent = () => {
    return (
        <section className={classes['employee-details']}>
            <div className="row margin-bottom-hg">
                <div className="col-8">
                    <EmployeeDetailsComponent></EmployeeDetailsComponent>
                </div>
                <div className="col-4">
                    <CardComponent styleClass="full-height" header="Downloads"></CardComponent>
                </div>
            </div>
            <div className={`row ${classes['employee-details__bottom-row-height']}`}>
                <div className="col-12">
                    <EmployeeDevelopmentComponent></EmployeeDevelopmentComponent>
                </div>
            </div>
        </section>
    );
};

export default EmployeeComponent;
