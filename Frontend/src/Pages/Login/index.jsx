import './style.scss'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../Context/AuthProvider';
import { PERMISSIONS } from '../../Constant';



const Login = () => {
	const { register, handleSubmit } = useForm();
	const { LoginAuth, userInfo } = useContext(AuthContext)

	const onSubmit = async (date) => {
		const url = 'http://localhost:9999/api/login'
		const res = await axios.post(url, date)
		LoginAuth(res.data.data)
		setTimeout(() => {
			if (res.data.status === 'ok') {
				window.location.href = "/product"
			}
		}, 400)
	}

	useEffect(() => {
		if(userInfo?.role === PERMISSIONS.USER) {
			window.location.href = "/product"
		} else if (userInfo?.role === PERMISSIONS.ADMIN) {
			window.location.href = "/productmanagement"
		}
	}, [userInfo])

	return (
		<div className="logincontainer">
			<div className="screen">
				<div className="screen__content">
					<form className="login" onSubmit={handleSubmit(onSubmit)}>
						<div className="login__field">
							<i className="login__icon fas fa-user"></i>
							<input {...register("username")} type="text" className="login__input" placeholder="User name / Email" />
						</div>
						<div className="login__field">
							<i className="login__icon fas fa-lock"></i>
							<input {...register("password")} type="password" className="login__input" placeholder="Password" />
						</div>
						<button type='submit' className="button login__submit">
							<span className="button__text">Log In Now</span>
							<i className="button__icon fas fa-chevron-right"></i>
						</button>
					</form>
				</div>
				<div className="screen__background">
					<span className="screen__background__shape screen__background__shape4"></span>
					<span className="screen__background__shape screen__background__shape3"></span>
					<span className="screen__background__shape screen__background__shape2"></span>
					<span className="screen__background__shape screen__background__shape1"></span>
				</div>
			</div>
		</div>
	)
}

export default Login
