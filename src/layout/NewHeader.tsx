import Image from "next/image";


const NewHeader = () => {
    const navItems = [
        { label: "PLAY VEGAS SLOTS", icon: "/assets/images/bet-slot.webp", href: "#" },
        { label: "LIVE TABLES", icon: "/assets/images/bet-slot.webp", href: "#" },
        { label: "SPORT", icon: "/assets/images/bet-slot.webp", href: "#" },
        { label: "IN-PLAY(LIVE)", icon: "/assets/images/bet-slot.webp", href: "#" },
        { label: "SUPANUMBERS", icon: "/assets/images/bet-slot.webp", href: "#" },
    ];
    return (
        <header className="header">
            <nav className="nav d-flex gap-3">
                <div className="logo-img">
                    <Image alt='logo' src='/assets/images/superbet.webp' width={220} height={70} />
                </div>
                <div className="nav-links d-flex align-items-center justify-content-center gap-2">
                    <Image src='/assets/images/bet-slot.webp' alt='img' width={25} height={25} className="nav-img" />
                    <span className="yellow-class">PLAY VEGAS SLOTS</span>
                </div>
                <div className="nav-links d-flex align-items-center justify-content-center gap-2">
                    <Image src='/assets/images/live-table.webp' alt='img' width={25} height={25} className="nav-img" />
                    <span className="yellow-class">LIVE TABLES</span>
                </div>
                <div className="nav-links d-flex align-items-center justify-content-center gap-2">
                    <Image src='/assets/images/sports.webp' alt='img' width={25} height={25} className="nav-img" />
                    <span>SPORT</span>
                </div>
                <div className="nav-links d-flex align-items-center justify-content-center gap-2">
                    <Image src='/assets/images/in-play.webp' alt='img' width={25} height={25} className="nav-img" />
                    <span>IN-PLAY(LIVE)</span>
                </div>
                <div className="nav-links d-flex align-items-center justify-content-center gap-2">
                    <Image src='/assets/images/supannumber.webp' alt='img' width={25} height={25} className="nav-img" />
                    <span>SUPANUMBERS</span>
                </div>
            </nav>

            <div className="actions">
                <button className="btn-outline">Join Now</button>
                <button className="btn-filled"><Image src='/assets/images/iconLogin.webp' width={10} height={10} alt='button logo' /> Login</button>
            </div>
        </header>
    );
};

export default NewHeader;
