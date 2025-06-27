
const Footer = () => {
    return (
        <footer className="font-mono p-2 text-center border-t">
            <span className="tracking-tighter">
                © {new Date().getFullYear()} · <a className="text-blue-400" href="https://yashtyagi.in/">Yash Tyagi</a>
            </span>
        </footer>
    );
};

export default Footer;