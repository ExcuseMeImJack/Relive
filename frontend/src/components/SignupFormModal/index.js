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
    if(password.trim().length < 6) err.password = 'Password must be more than 6 characters.';
    if(email.trim().length < 1) err.email = 'Email must not be empty.'
    if(firstName.trim().length < 1) err.firstName = 'First Name must not be empty.'
    if(lastName.trim().length < 1) err.lastName = 'Last Name must not be empty.'
    setErrors(err);
  }, [username, password, email, firstName, lastName])

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (password === confirmPassword) {
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
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <div className="signup-modal-div">
      <div className="signup-text-div">
        <h2-semibold>Sign Up</h2-semibold>
      </div>
      <div className="errors-div">
        {isSubmitted && errors.firstName && <p className="errors-shown-removepadding">{errors.firstName}</p>}
        {isSubmitted && errors.lastName && <p className="errors-shown-removepadding">{errors.lastName}</p>}
        {isSubmitted && errors.email && <p className="errors-shown-removepadding">{errors.email}</p>}
        {isSubmitted && errors.username && <p className="errors-shown-removepadding">{errors.username}</p>}
        {isSubmitted && errors.password && <p className="errors-shown-removepadding">{errors.password}</p>}
        {isSubmitted && errors.confirmPassword && (<p className="errors-shown-removepadding">{errors.confirmPassword}</p>)}
      </div>
      <div className="signup-form-div">
      <form onSubmit={handleSubmit}>
        <div className="signup-input">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="First Name"
          />
        </div>

        <div className="signup-input">
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Last Name"
          />
        </div>
        <div className="signup-input">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
        </div >

        <div className="signup-input">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Username"
          />
        </div>

        <div className="signup-input">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </div>

        <div className="signup-input">
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm Password"
          />
        </div>

        <button className={Object.values(errors).length > 0 ? 'login-button-invalid' : 'login-button-valid changeCursor'} type="submit" disabled={Object.values(errors).length > 0}>Sign Up</button>
      </form>
      </div>
    </div>
  );
}

export default SignupFormModal;
