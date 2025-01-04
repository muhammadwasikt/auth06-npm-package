import { useForm } from 'react-hook-form';
import { registerd } from '../functions/AuthFunctions';

const SignupForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        await registerd(data)
        console.log('Form Data:', data);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-blue-600">
            <div className="card w-full max-w-md bg-white shadow-xl rounded-lg p-8">
                <h2 className="text-2xl font-bold text-center text-purple-600">Signup</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
                    {/* Name Field */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="input input-bordered w-full"
                            {...register('name')}
                        />
                        {/* {errors.name && (
              <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>
            )} */}
                    </div>

                    {/* Email Field */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="input input-bordered w-full"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: 'Invalid email format',
                                },
                            })}
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="input input-bordered w-full"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                            })}
                        />
                        {errors.password && (
                            <span className="text-red-500 text-sm mt-1">{errors.password.message}</span>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary w-full">
                        Signup
                    </button>
                </form>
                <p className="text-center text-sm mt-4">
                    Already have an account?{' '}
                    <a href="#" className="text-blue-500 font-semibold hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignupForm;
