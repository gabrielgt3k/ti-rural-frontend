import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Dialog,
  Button,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Typography,
  IconButton,
  makeStyles,
  FormControl,
  InputLabel,
  Input,
  MenuItem,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import AddIcCallIcon from '@material-ui/icons/AddIcCall';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import TextMaskCustom from './TextMaskCustom';
import api from '../services/api';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  label: {
    color: '#d3d3d3',
    marginTop: 20,
    marginRight: 20,
    fontWeight: 500,
    fontSize: 14,
  },
  formGroup: {
    width: 500,
  },
  lojaInput: {
    width: 200,
    marginRight: theme.spacing(2),
    paddingRight: theme.spacing(3),
  },
  statusInput: {
    width: 150,
    marginTop: 7,
  },
}));

const LinhasDialogForm = props => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { linha, isEditing, operadora, obtemTempLinha } = props;

  const [editLinha, setEditLinha] = useState({
    id: 0,
    numero: '',
    dono_linha: '',
    loja: '',
    operadora,
    status: '',
  });

  const clearFields = () => {
    setEditLinha({
      id: 0,
      numero: '',
      dono_linha: '',
      email_dono: '',
      loja: '',
      operadora,
      status: '',
    });
  };

  useEffect(() => {
    function loadLinha() {
      setEditLinha({ ...linha });
    }

    loadLinha();
  }, [linha]);

  useEffect(() => {
    clearFields();
  }, []);

  const handleChange = e => {
    setEditLinha({
      ...editLinha,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (!isEditing) clearFields();
    setOpen(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const linhaSubmit = editLinha;
      const method = linhaSubmit.id ? 'put' : 'post';
      const url = linhaSubmit.id ? `/linhas/${linhaSubmit.id}` : `/linhas`;
      const response = await api[method](url, linhaSubmit);
      obtemTempLinha(response.data);
      toast.success(
        method === 'put'
          ? 'Linha alterada com sucesso!'
          : 'Linha cadastrada com sucesso!'
      );
    } catch (error) {
      const errorMessage = error.response.data.error;
      toast.error(errorMessage);
    }
    if (!isEditing) clearFields();
    setLoading(false);
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: editLinha,
    validationSchema: Yup.object({
      numero: Yup.string()
        .required('Obrigatório')
        .min(11),
      loja: Yup.string().required('Obrigatório'),
    }),
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });

  const statusArray = ['Ativa', 'Inativa', 'Cancelada'];
  return (
    <>
      {isEditing ? (
        <IconButton color="primary" component="span" onClick={handleClickOpen}>
          <CreateIcon />
        </IconButton>
      ) : (
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddIcCallIcon />}
          onClick={handleClickOpen}
        >
          Cadastrar linha
        </Button>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {isEditing ? 'Editar Linha' : 'Cadastrar Linha'}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <FormControl>
              <InputLabel htmlFor="formatted-text-mask-input">
                Número da Linha
              </InputLabel>
              <Input
                autoFocus
                onChange={handleChange}
                name="numero"
                value={editLinha.numero}
                inputComponent={TextMaskCustom}
                error={formik.touched.numero && Boolean(formik.errors.numero)}
              />
            </FormControl>
            <TextField
              name="dono_linha"
              value={editLinha.dono_linha}
              onChange={handleChange}
              helperText={
                formik.touched.dono_linha ? formik.errors.dono_linha : ''
              }
              error={
                formik.touched.dono_linha && Boolean(formik.errors.dono_linha)
              }
              label="Titular da Linha"
              fullWidth
              margin="dense"
            />
            <TextField
              name="email_dono"
              value={editLinha.email_dono}
              onChange={handleChange}
              helperText={
                formik.touched.email_dono ? formik.errors.email_dono : ''
              }
              error={
                formik.touched.email_dono && Boolean(formik.errors.email_dono)
              }
              label="E-mail"
              fullWidth
              margin="dense"
            />
            <TextField
              margin="dense"
              name="loja"
              value={editLinha.loja}
              onChange={handleChange}
              helperText={formik.touched.loja ? formik.errors.loja : ''}
              error={formik.touched.loja && Boolean(formik.errors.loja)}
              label="Loja"
              className={classes.lojaInput}
            />
            <TextField
              select
              label="Status"
              name="status"
              margin="dense"
              onChange={handleChange}
              value={editLinha.status}
              className={classes.statusInput}
            >
              {statusArray.map(status => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
            {loading ? (
              <div className={classes.root}>
                <Typography className={classes.label} component="p">
                  Salvando
                </Typography>
                <CircularProgress />
              </div>
            ) : (
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancelar
                </Button>
                <Button type="submit" color="primary">
                  {isEditing ? 'Salvar' : 'Adicionar'}
                </Button>
              </DialogActions>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

LinhasDialogForm.defaultProps = {
  linha: {},
  isEditing: false,
  obtemTempLinha: () => {},
};
LinhasDialogForm.propTypes = {
  linha: PropTypes.objectOf(PropTypes.any),
  isEditing: PropTypes.bool,
  operadora: PropTypes.string.isRequired,
  obtemTempLinha: PropTypes.func,
};

export default LinhasDialogForm;
