import Link from 'next/link';
import styles from '../styles/navbar.module.scss';

const links = [
    { href: "/about", label: "about" }
]

const Navbar: React.FC = () => {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navList}>
                {links.map((link, index) => (
                    <li key={index} className={styles.navItem}>
                        <Link href={link.href} className={styles.navLink}>
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;