import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

class lobby extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div id={ROOT.id} className={ROOT.class}>
        <div id={APPLICANT.id} className={APPLICANT.class}>
          <div id={APPLICANT_NAME.id} className={APPLICANT_NAME.class}>
            <this.FormElement type={APPLICANT_NAME_FIRST} />
            <this.FormElement type={APPLICANT_MIDDLE_NAME} />
            <this.FormElement type={APPLICANT_LAST_NAME} />
          </div>
        </div>
        <div id={APPLICANT_CONTACT.id} className={APPLICANT_CONTACT.class}>
          <this.FormElement type={APPLICANT_CONTACT_PHONE} />
          <div id={APPLICANT_CONTACT_EMAIL.id} className={APPLICANT_CONTACT_EMAIL.class}>
            <this.FormElement type={APPLICANT_CONTACT_EMAIL_1} />
            <this.FormElement type={APPLICANT_CONTACT_EMAIL_2} />
          </div>
        </div>
        <div id={APPLICANT_ADDRESS.id} className={APPLICANT_ADDRESS.class}>
          <label htmlFor={APPLICANT_ADDRESS.id}>{APPLICANT_ADDRESS.label}</label>
          <this.FormElement type={APPLICANT_ADDRESS_LINE1} />
          <this.FormElement type={APPLICANT_ADDRESS_LINE2} />
          <this.FormElement type={APPLICANT_ADDRESS_CITY} />
          <this.FormElement type={APPLICANT_ADDRESS_STATE} />
          <this.FormElement type={APPLICANT_ADDRESS_ZIP} />
        </div>
        <div id={APPLICANT_PII.id} className={APPLICANT_PII.class}>
          <this.FormElement type={APPLICANT_PII_SOCIAL} />
          <this.FormElement type={APPLICANT_PII_DOB} />
        </div>
        <div id={APPLICANT_EMPLOYMENT.id} className={APPLICANT_EMPLOYMENT.class}>
          <label htmlFor={APPLICANT_EMPLOYMENT.id}>{APPLICANT_EMPLOYMENT.label}</label>
          <this.FormElement type={APPLICANT_EMPLOYMENT_INCOME} />
          <this.FormElement type={APPLICANT_EMPLOYMENT_TIMEATJOB} />
        </div>
        <div id={SUBMIT.id} className={SUBMIT.class} onClick={(e) => this.props[SUBMIT.func]()}>{SUBMIT.label}</div>
        <a onClick={()=>{this.props.history.push('/')}}>PurchaseOptions</a>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ['lobby']: state.lobby,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ["Func1"]: (firstName) => { dispatch(/*function*/); }
  };
};

const Lobby = connect(mapStateToProps, mapDispatchToProps)(lobby);

export default Lobby;