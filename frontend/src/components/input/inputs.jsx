import React from 'react'
import "./inputs.css"

export function InputStandard(
    {
        type,
        name,
        id,
        label,
        form,
        className = {},
        messageExito = "",
        validate=true,
        params = {},
        ...props
    }
) {
    const { errors, register, isSubmitted } = form;
    const {
        classInput = "",
        classContent = "w-100",
        classLabel = ""
    } = className
    return (
        <div className={classContent}>
            <label htmlFor={id} className={`form-label fw-bold ${classLabel}`}>{label}</label>
            <input
                type={type}
                className={`form-control ${classInput}  ${errors[name] && "is-invalid"} ${!errors[name] && isSubmitted  && validate && "is-valid"}`}
                id={id}
                name={name}
                {...register(name, params)}
                {...props}
            />
            <div className="valid-feedback fw-medium">
                {messageExito}
            </div>
            <div className="invalid-feedback fw-medium">
                {errors[name] && errors[name].message}
            </div>
        </div>
    )
}


export function InputcheckRadio(
    {
        name,
        type,
        elements,
        form,
        validate=true,
        className = {},
        messageExito = "",
        params = {},
        ...props
    }
) {
    const { errors, register, isSubmitted } = form;
    const {
        classInput = "",
        classContent = "d-flex flex-column w-100",
        classLabel = ""
    } = className
    return (
        <div className={`${classContent}`}>
            {
                elements.map((e, index) => (
                    <div className={`form-check ${e.className || ""}`} key={`${name}-${index}`}>
                        <input type={type} className={`form-check-input ${classInput} ${errors[name]  && "is-invalid"} ${!errors[name] && isSubmitted &&  validate && "is-valid"}`} id={`${e.id}`} name={name}
                            {...register(name, params)}
                            {...props}
                        />
                        <label className="form-check-label fw-medium" htmlFor={`${e.id}`}>{e.label}</label>
                    </div>
                ))
            }
            <div className={`invalid-feedback fw-medium w-100 mt-0 text-start ${errors[name] && validate && "d-block"}`}>
                {errors[name] && errors[name].message}
            </div>
        </div>
    )
}


export function TexTarea(
    {
        name,
        id,
        label,
        form,
        validate=true,
        className = {},
        messageExito = "",
        rows = 3,
        params = {},
        ...props
    }
) {
    const { errors, register, isSubmitted } = form;
    const {
        classInput = "",
        classContent = "w-100 mb-3",
        classLabel = ""
    } = className

    return (
        <>
            <div className={classContent}>
                <label htmlFor={id} className={`form-label fw-bold ${classLabel}`}>{label}</label>
                <textarea
                    rows={rows}
                    className={`form-control ${classInput} ${errors[name] && "is-invalid"} ${!errors[name] && isSubmitted && validate && "is-valid"}`}
                    id={id}
                    name={name}
                    {...register(name, params)}
                    {...props}
                ></textarea>
                <div className="valid-feedback fw-medium">
                    {messageExito}
                </div>
                <div className="invalid-feedback fw-medium">
                    {errors[name] && errors[name].message}
                </div>
            </div>
        </>
    )
}


export function Select(
    {
        name,
        id,
        label,
        form,
        validate=true,
        className = {},
        options,
        messageExito = "",
        placeholder = "...",
        params = {},
        ...props
    }
) {
    const { errors, register, isSubmitted } = form;
    const {
        classInput = "",
        classContent = "w-100",
        classLabel = ""
    } = className

    return (
        <div className={classContent}>
            <label htmlFor={id} className={`form-label fw-bold ${classLabel}`}>{label}</label>
            <select
                className={`form-control ${classInput}  ${errors[name] && "is-invalid"} ${!errors[name] && isSubmitted && validate && "is-valid"}`}
                id={id}
                defaultValue=""
                name={name}
                {...register(name, params)}
                {...props}
            >
                {placeholder && <option value=""  >{placeholder}</option>}
                {
                    options.length &&
                    options.map((option, index) => (
                        <option key={`element-${label}-${index}`} value={option.value}>
                            {option.label}
                        </option>
                    ))
                }
            </select>
            <div className="valid-feedback fw-medium">
                {messageExito}
            </div>
            <div className="invalid-feedback fw-medium">
                {errors[name] && errors[name].message}
            </div>
        </div>
    )
}

