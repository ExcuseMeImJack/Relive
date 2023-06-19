import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { closeModal } = useModal();

  useEffect(() => {
    const err = {};
    if(username.trim().length < 4) err.username = 'Username must be more than 4 characters.';
    if(username.trim().length > 16) err.username = 'Username must be less than 16 characters.';
    if(password.trim().length < 6) err.password = 'Password must be more than 6 characters.';
    if(email.trim().length < 1) err.email = 'Email must not be empty.'
    if(firstName.trim().length < 1) err.firstName = 'First Name must not be empty.'
    if(lastName.trim().length < 1) err.lastName = 'Last Name must not be empty.'
    if(confirmPassword.trim().length < 1) err.confirmPassword = 'Please retype your password.'
    setErrors(err);
  }, [username, password, email, firstName, lastName, confirmPassword])

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (password === confirmPassword && Object.values(errors).length < 1) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    } else if (password !== confirmPassword) {
      return setErrors({
        confirmPassword: "Confirm Password field must be the same as the Password field"
      });
    }
  };

  return (
    <div className="signup-modal-div">
      <div className="signup-text-div">
        <h2-semibold>Sign Up</h2-semibold>
      </div>
      <div className="errors-div">
      </div>
      <div className="signup-form-div">
      <form onSubmit={handleSubmit}>
        {isSubmitted && errors.firstName && <p className="errors-shown-removepadding">{errors.firstName}</p>}
        <div className="signup-input">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
        </div>

        {isSubmitted && errors.lastName && <p className="errors-shown-removepadding">{errors.lastName}</p>}
        <div className="signup-input">
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
        </div>
        {isSubmitted && errors.email && <p className="errors-shown-removepadding">{errors.email}</p>}
        <div className="signup-input">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div >

        {isSubmitted && errors.username && <p className="errors-shown-removepadding">{errors.username}</p>}
        <div className="signup-input">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>

        {isSubmitted && errors.password && <p className="errors-shown-removepadding">{errors.password}</p>}
        <div className="signup-input">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        {isSubmitted && errors.confirmPassword && (<p className="errors-shown-removepadding">{errors.confirmPassword}</p>)}
        <div className="signup-input">
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
        </div>

        <button className='login-button-valid changeCursor' type="submit" >Sign Up</button>
      </form>
      </div>
    </div>
  );
}

export default SignupFormModal;
