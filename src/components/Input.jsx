/**
 * A reusable input component that forwards its ref and accepts standard input props.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.type='text'] - The type of the input element.
 * @param {string} [props.className=''] - Additional CSS classes for the input.
 * @param {string} [props.placeholder=''] - Placeholder text for the input.
 * @param {React.Ref} ref - Ref forwarded to the input element.
 * @returns {JSX.Element} The rendered input element.
 */
import React, { forwardRef } from 'react';

const Input = forwardRef(({ type = 'text', className = '', placeholder = '', ...rest }, ref) => {
    return (
        <input
            type={type}
            className={className}
            placeholder={placeholder}
            ref={ref}
            {...rest}
        />
    );
});

export default Input;
