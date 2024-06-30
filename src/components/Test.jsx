import React from 'react'

function Test() {

    const [formErrors, setFormErrors] = useState({
        name: false,
        mobile: false,
        email: false,
        password: false,
        confirmPassword: false,
    });

    const validateForm = () => {
        const errors = {};
    
        if (!name) errors.name = true;
        if (!mobile) errors.mobile = true;
        if (!email) errors.email = true;
        if (!password) errors.password = true;
        if (password !== confirmPassword) errors.confirmPassword = true;
    
        setFormErrors(errors);
    
        return Object.keys(errors).length === 0;
    };

    const handleRegistration = async (e) => {
        e.preventDefault()

        const isFormValid = validateForm()

        if(!isFormValid) return
        
    }


  return (
    <div onClick={handleRegistration}> ABCDEFG </div>
  )
}

export default Test