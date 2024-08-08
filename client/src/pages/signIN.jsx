import { Link, useNavigate} from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {signInStart, signInSuccess, signInFailure} from "../redux/user/userSlice";

export default function SignIN() {

    const [formData, setFormData] = useState({});
    const {loading, error: errorMessage} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData,[e.target.id]: e.target.value.trim() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!formData.email || !formData.password) {
            return dispatch(signInFailure("Tolong diisi semua."));
        }
        try {
            dispatch(signInStart());
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData),
            });
            const data = await res.json(); 
            if(data.success === false){
                dispatch(signInFailure(data.message));
            }
            if(res.ok){
                dispatch(signInSuccess(data));
                navigate('/')
            }
        } catch (error) {
            dispatch(signInFailure(error.message));
        }
    };

    return (
    <div className="min-h-screen mt-20">
        <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
                {/*kiri */}
                <div className="flex-1">
                <Link to="/" className="font-bold dark:text-white
                text-4xl">
                {/*nama "Ahmad" yang ada dilogo */}
                <span className="px-4 py-1 bg-gradient-to-r from-blue-800 
                via-blue-500 to-orange-500 rounded-lg text-white">Ahmad</span>
                Blog
                </Link>
                <p className="text-sm mt-5">
                    Ini adalah projek Blog pertama saya menggunakan tech MERN, kamu bisa login dengan e-mail dan password
                    atau menggunakan Google.
                </p>
                </div>

            {/*kanan */}
            <div className="flex-1">
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div>
                        <Label value="E-mail Anda" />
                        <TextInput type="email" placeholder="E-mail@company.com" id="email" onChange={handleChange} />
                    </div>
                    <div>
                        <Label value="Password Anda" />
                        <TextInput type="password" placeholder="*********" id="password" onChange={handleChange} />
                    </div>

                    <Button gradientDuoTone='purpleToBlue' type="submit" disabled={loading}>
                        {
                            loading ? (
                                <>
                                <Spinner size="sm" />
                                <span className="pl-3">Loading...</span>
                                </>
                            ) : "Sign In"
                        }
                    </Button>
                </form>
                <div className="flex gap-2 text-sm mt-5">
                    <span>Belum Punya Akun ?</span>
                    <Link to='/sign-up' className="text-blue-500">Sign Up</Link>
                </div>
                {
                    errorMessage && (
                        <Alert className="mt-5" color="failure">
                            {errorMessage}
                        </Alert>
                    )
                }
            </div>
        </div>
    </div>
    )
}

//1:59:22


