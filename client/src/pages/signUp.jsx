import { Link } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";

export default function SignUp() {
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
                    Ini adalah projek Blog pertama saya menggunakan tech MERN, kamu bisa masuk dengan e-mail dan password
                    atau menggunakan Google.
                </p>
                </div>

            {/*kanan */}
            <div className="flex-1">
                <form className="flex flex-col gap-4">
                    <div>
                        <Label value="Username Anda" />
                        <TextInput type="text" placeholder="Username" id="username" />
                    </div>
                    <div>
                        <Label value="E-mail Anda" />
                        <TextInput type="text" placeholder="E-mail@company.com" id="email" />
                    </div>
                    <div>
                        <Label value="Password Anda" />
                        <TextInput type="text" placeholder="Password" id="password" />
                    </div>

                    <Button gradientDuoTone='purpleToBlue' type="submit">Sign Up</Button>
                </form>
                <div className="flex gap-2 text-sm mt-5">
                    <span>Sudah Punya Akun ?</span>
                    <Link to='/sign-in' className="text-blue-500">Sign In</Link>
                </div>
            </div>
        </div>
    </div>
    )
}

//1:59:22


