import './form-input.styles.scss'

const FormInput = ( { label, ...inputProps }) => {
    return(
        <div className="group">
            <input className="form-input" { ...inputProps } />
            { label &&
                <label className={` ${inputProps.value.length > 0 ? 'shrink' : ''} form-input-label `}>{ label }</label>
            }
            {/* <input className="form-input" { ...inputProps } /> // this line move up so we can get shrink effect, 
            // also when selecting from drop-down list (e.g. emails saved through chrome), and not only when typing */}
        </div>
    )
}   

export default FormInput