/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { newUser, updateUser } from '../../controllers/userData';

const initialState = {
  username: '',
  email: '',
  phoneNumber: '',
  seller: false,
};
function UserForm({ userObj, onUpdate }) {
  const router = useRouter();
  const { user } = useAuth();

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (userObj.id) setFormData(userObj);
  }, [userObj]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userObj.id) {
      updateUser(formData)?.then(() => router.push('/'));
    } else {
      newUser({ ...formData, uid: user.uid })?.then(onUpdate);
    }
  };

  return (
    <Form className="forms" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={formData.username}
          placeholder="Enter your Username"
          onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          name="email"
          value={formData.email}
          placeholder="Enter your email"
          onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          placeholder="Enter your phone number"
          onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          type="switch"
          label="Are you a seller?"
          name="seller"
          checked={formData.seller}
          onChange={(e) => {
            setFormData((prevState) => ({
              ...prevState,
              seller: e.target.checked,
            }));
          }}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        {userObj.id ? 'Update Profile' : 'Create Profile'}
      </Button>
    </Form>
  );
}

UserForm.propTypes = {
  userObj: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    seller: PropTypes.bool,
    uid: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
};
UserForm.defaultProps = {
  userObj: initialState,
};

export default UserForm;
