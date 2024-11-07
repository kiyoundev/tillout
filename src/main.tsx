import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Form } from './Form.tsx'
import { CustomForm } from './CustomForm.tsx'
// import {Test} from './test.tsx';
import { CurrencySelector } from './components/CurrencySelect.tsx'

// const { register, handleSubmit, reset, control, setValue } = useForm();


createRoot(document.getElementById('root')!).render(
  // <StrictMode>
      <Form/>
  // </StrictMode>
)