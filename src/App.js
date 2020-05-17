import React from 'react';
import './App.css';
import { Formik, useField, Form } from 'formik';
import * as Yup from 'yup';

const CustomTextInput = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<>
			<label htmlFor={props.id || props.name}>{label}</label>
			<input
				className={`text-input ${meta.error && `border-error`}`}
				{...field}
				{...props}
			/>
			{meta.touched && meta.error ? (
				<div className='error'>{meta.error}</div>
			) : null}
		</>
	);
};

const CustomCheckbox = ({ children, ...props }) => {
	const [field, meta] = useField(props, 'checkbox');
	return (
		<>
			<label className='checkbox'>
				<input type='checkbox' {...field} {...props} />
				{children}
			</label>
			{meta.touched && meta.error ? (
				<div className='error'>{meta.error}</div>
			) : null}
		</>
	);
};

const CustomSelect = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<>
			<label htmlFor={props.id || props.name}>{label}</label>
			<select {...field} {...props} />
			{meta.touched && meta.error ? (
				<div className='error'>{meta.error}</div>
			) : null}
		</>
	);
};

function App() {
	return (
		<Formik
			initialValues={{
				name: '',
				email: '',
				acceptedTerms: false,
				specialPower: ''
			}}
			validationSchema={Yup.object({
				name: Yup.string()
					.min(3, 'Must be at least 3 characters')
					.max(15, 'Must be 15 characters or less')
					.required('Field is required'),
				email: Yup.string()
					.email('Invalid Email address')
					.required('Field is required'),
				acceptedTerms: Yup.boolean()
					.required('Field is required')
					.oneOf([true], 'You must accept the terms and conditions'),
				specialPower: Yup.string()
					.oneOf(
						['flight', 'invisibility', 'Wealthy bad guy', 'other'],
						'Invalid special power'
					)
					.required('Field is required')
			})}
			onSubmit={(values, { setSubmitting, resetForm }) => {
				//Chamar a action
				setTimeout(() => {
					alert(JSON.stringify(values, null, 2));
					resetForm();
					setSubmitting(false);
				}, 3000);
			}}
		>
			{(props) => (
				<Form>
					<h1>Sign Up</h1>
					<CustomTextInput
						label='Name'
						name='name'
						type='text'
						placeholder='Frank'
					/>
					<CustomTextInput
						label='Email'
						name='email'
						type='email'
						placeholder='frank@thetank.com'
					/>
					<CustomSelect
						label='Special Power'
						name='specialPower'
						type='text'
						placeholder='Frank'
					>
						<option value=''>Select a special power</option>
						<option value='flight'>Flight</option>
						<option value='invisibility'>Invisibility</option>
						<option value='wealthy bad guy'>Wealthy bad guy</option>
						<option value='other'>Other</option>
					</CustomSelect>
					<CustomCheckbox name='acceptedTerms'>
						I accept the terms and conditions
					</CustomCheckbox>
					<button type='submit'>
						{props.isSubmitting ? 'Loading...' : 'Submit'}
					</button>
				</Form>
			)}
		</Formik>
	);
}

export default App;
