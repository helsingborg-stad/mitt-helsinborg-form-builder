import React, { useState, useEffect, useContext } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import FormBuilder from '../components/specific/FormBuilder';
import { Question, Form } from '../types/FormTypes';
import { useParams, Link, Redirect } from 'react-router-dom';
import FormContext from '../contexts/FormContext';

const emptyQuestions: Question[] = [];
const emptyBanner = {
  imageSrc: '',
  iconSrc: '',
  backgroundColor: '',
};
const emptyForm = {
  name: '',
  description: '',
  subform: false,
  steps: [
    {
      title: '',
      description: '',
      group: '',
      banner: emptyBanner,
      questions: emptyQuestions,
      id: '' + Math.random(),
    },
  ],
};

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const FormBuilderScreen: React.FC<any> = () => {
  const [loading, setLoading] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [redirectComp, setRedirectComp] = useState(<> </>);
  const { id } = useParams();

  const { updateForm, createForm, getForm } = useContext(FormContext);

  const showMessage = () => {
    setShowSnackbar(true);
  };
  const hideMessage = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowSnackbar(false);
  };

  const loadForm = (id: string): void => {
    if (loading) {
      getForm(id).then((res: Record<string, any>) => {
        setForm(res.data);
        setLoading(false);
      });
    }
  };

  const create = (form: Form) => {
    createForm(form).then((res: Record<string, any>) => {
      console.log('create response', res);
      const formId = res.data.Item.id;
      console.log('new id:', formId);
      setRedirectComp(<Redirect to={`/edit/${formId}`} />);
    });
  };

  const update = (form: Form) => {
    if (id && id !== '') {
      updateForm(id, form);
    }
  };

  const onSubmit = (form: Form) => {
    if (id && id !== '') {
      update(form);
    } else {
      create(form);
    }
    showMessage(); //To do: error handling!
  };

  useEffect(() => {
    if (id && id !== '') {
      loadForm(id);
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return <h3>Loading...{redirectComp}</h3>;
  }

  return (
    <div>
      <Link style={{ color: 'white' }} to="/">
        Back to list
      </Link>
      <FormBuilder onSubmit={onSubmit} {...form} />
      {redirectComp}

      <Snackbar open={showSnackbar} autoHideDuration={6000} onClose={hideMessage}>
        <Alert onClose={hideMessage} severity="success">
          The form was successfully submitted!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default FormBuilderScreen;
