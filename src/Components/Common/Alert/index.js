import * as React from "react";

/*
 props : class,
         show (status),
         message
         clearer (func)
         clearButton (set true , if no 'x' button needed)
 */
function Alert(props){
    const buttonStatus = props.clearButton || false
    return(
        <div className={`alert  alert-dismissible alert-`+props.class} style={{display: (props.show?'block':'none')}} role="alert">
            {
                (buttonStatus)?
                    <></>
                    :
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={props.clearer}><span
                    aria-hidden="true">&times;</span></button>
            }
            {props.message}
        </div>
    )
}
export default Alert