import Link from "next/link";

const Footer = () => {
    return (
        <>
            <footer class="text-black fixed bottom-0 left-0 z-20 w-full p-2 bg-blue-200 border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-7 dark:bg-gray-800 dark:border-gray-600">
                <span class="text-black text-sm sm:text-center">© 2023 Emergency Helpline Management System</span>
                <ul class="text-black flex flex-wrap items-center mt-3 text-sm font-medium dark:text-gray-400 sm:mt-0">
                    <li>
                        <Link href="/aboutus" class="mr-4 hover:underline md:mr-6">About Us</Link>
                    </li>
                    

                    <li>
                        <Link href="#" class="hover:underline">Contact</Link>
                    </li>
                </ul>
            </footer>
        </>
    )
};

export default Footer;