import './button.styles.scss'

const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted',
}

const Button = ( {children, buttonType, ...otherProps} ) => {        //HERE WITH DESTRUCTURING OF PROPS!!!   
    return(
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]} { ...otherProps } `} >
            { children }
        </button>
    )
}


export const Button2 = (props) => {
    const { children, buttonType, ...otherProps } = props;

    return (
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>
            { children } (button-2)
        </button>
    );
}


export const Button3 = (props) => (
    <button className={`button-container ${BUTTON_TYPE_CLASSES[props.buttonType]}`} {...props}>
        { props.children } (button-3)
    </button>
);


export const Button4 = (props) => {
    const { children, buttonType } = props;

    return (
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...props}>
            { children } (button-4)
        </button>
    );
}


export const Button5 = (props) => (
    <button className="button-container inverted" {...props}>
        { props.children } (button-5)
    </button>
);




export default Button