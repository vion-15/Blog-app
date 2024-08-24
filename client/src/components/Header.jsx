//! ada 3 library yang digunakan intuk header.jsx
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react"; //!library flowbite-react
import { Link, useLocation } from "react-router-dom"; //!library react-router-dom
import {AiOutlineSearch} from "react-icons/ai"; //!library react-icon
import {FaMoon, FaSun} from "react-icons/fa";
import {useSelector, useDispatch} from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";


export default function Header() {
    const path = useLocation().pathname;
    const dispatch = useDispatch();
    const {currentUser} = useSelector((state) =>  state.user);
    const {theme} = useSelector((state) => state.theme);
    const handleSignout = async () => {
        try {
            const res = await fetch('/api/user/signout', {
                method: 'POST'
            });
            const data = await res.json();
            if(!res.ok){
                console.log(data.message);
            }else{
                dispatch(signoutSuccess());
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
    //!Bagian Navbar
    <Navbar className="border-b-4">

        {/*Membuat logo dengan Link dengan tujuan ke path "/" */}
        <Link to="/" className="self-center whitespace-nowrap text-xl sm:text-xl font-semibold dark:text-white">
            {/*nama "Ahmad" yang ada dilogo */}
            <span className="px-4 py-1 bg-gradient-to-r from-blue-800 
            via-blue-500 to-orange-500 rounded-lg text-white">Ahmad</span>
            Blog
        </Link>

        {/*membuat search bar */}
        <form>
            {/*desain dari search bar */}
            <TextInput 
                type="text"
                placeholder="Search..."
                rightIcon={AiOutlineSearch}
                className="hidden lg:inline"
            />
        </form>

        {/*membuat ikon search (AiOutlineSearch) ketika layar mengecil */}
        <Button className="w-12 h-10 lg:hidden" color="gray">
            <AiOutlineSearch />
        </Button>
        
        {/*membuat wadah untuk tombol mode, tombol sign-in, dan toogle */}
        <div className="flex gap-2 md:order-2">
            {/*membuat tombol mode dengan ikon FaMoon */}
            <Button className="w-12 h-10 sm:inline" color="gray" onClick={() => dispatch(toggleTheme())}>
                {theme === 'light' ? <FaMoon /> : <FaSun />}
            </Button>

            {currentUser ? (
                <Dropdown arrowIcon={false} inline label={
                    <Avatar alt="user" img={currentUser.profilePicture} rounded/>
                }>
                    <Dropdown.Header>
                        <span className="block text-sm">@{currentUser.username}</span>
                        <span className="block text-sm font-medium truncate">@{currentUser.email}</span>
                    </Dropdown.Header>
                    <Link to={'/dashboard?tab=profile'}>
                        <Dropdown.Item>
                            Profile
                        </Dropdown.Item>
                    </Link>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleSignout}>
                        Sign Out
                    </Dropdown.Item>
                </Dropdown>
            ):(
            <Link to="/sign-IN">
            <Button gradientDuoTone="purpleToBlue" outline>
                Sign In
            </Button>
            </Link>  
            )}
            {/*membuat Navbar toogle */}
            <Navbar.Toggle />
        </div>

        {/*membuat Navigasi responsive Home, About, Project */}
        <Navbar.Collapse>
                {/*Nav HOME */}
                <Navbar.Link active={path === "/"} as={"div"}>
                    <Link to="/">
                        Home
                    </Link>
                </Navbar.Link>
                {/*Nav ABOUT */}
                <Navbar.Link active={path === "/about"} as={"div"}>
                    <Link to="/about">
                        About
                    </Link>
                </Navbar.Link>
                {/*Nav PROJECT */}
                <Navbar.Link active={path === "/project"} as={"div"}>
                    <Link to="/project">
                        Project
                    </Link>
                </Navbar.Link>
            </Navbar.Collapse>
    </Navbar>
  )
}
