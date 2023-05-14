import './style.scss'
import axios from 'axios'
import { useForm } from "react-hook-form";

const Registration = () => {
	const { register, handleSubmit } = useForm();
	const onSubmit = async (date) => {
		const url = 'http://localhost:9999/api/register'
		const res = await axios.post(url, date)
		if(res.data.status==='ok') {
			alert('registered successfully')
		}
	}
  return (
    <div className="container">
	<div className="screen">
		<div className="screen__content">
			<form className="login" onSubmit={handleSubmit(onSubmit)}>
            <div className="login__field">
					<i className="login__icon fas fa-user"></i>
					<input {...register("name")} type="text" className="login__input" placeholder="Name"/>
				</div>
				<div className="login__field">
					<i className="login__icon fas fa-user"></i>
					<input {...register("username")} type="text" className="login__input" placeholder="Email"/>
				</div>
				<div className="login__field">
					<i className="login__icon fas fa-lock"></i>
					<input {...register("password")} type="password" className="login__input" placeholder="Password"/>
				</div>
				<button type='submit' className="button login__submit">
					<span className="button__text">Register Now</span>
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
	{/* <ToastContainer/> */}
</div>
  )
}

export default Registration
