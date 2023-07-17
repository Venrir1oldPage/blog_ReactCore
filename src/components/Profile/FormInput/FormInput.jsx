import classes from './FormInput.module.scss'

const FormInput = ({label, placeholder, type, options, error, defaultValue=null, autofocus}) => {

  const inputClass = error ? `${classes.input} ${classes.inputError}` : classes.input
  let labelClass = classes.label
  let input
 
  switch(type){
  case 'password':
    input = <input type={type} className={inputClass}  placeholder="Password" {...options} />
    break
  case('checkbox'):
    labelClass ='checkboxLabel'
    input = <input type='checkbox' className={classes['checkboxInput']} id='agree' defaultChecked {...options} />
    break
  default: 
    input = <input placeholder={placeholder}  type={type} className={inputClass} autoFocus={autofocus}
      {...options} defaultValue={defaultValue}/>
  }

  return(
    < div className={classes['wrapper']}>
      <label className={classes[labelClass]}>{label}{input}</label>
      <p className={classes['errMessage']}>{error ? error.message || 'Error' : ''}</p>
    </div >
  )
}

export default FormInput