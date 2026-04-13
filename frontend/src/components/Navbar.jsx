import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "Home",     path: "/" },
  { label: "About",    path: "/about" },
  { label: "Join Beta", path: "/join-beta" },
  { label: "Contact",  path: "/contact" },
];

function Navbar() {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-10 h-[58px]
                    bg-bg/90 backdrop-blur-xl border-b border-white/[0.07]">

      <div className="font-display text-2xl tracking-[3px] text-t1">
        AI <span className="text-acc">DEBATE</span> ARENA
      </div>

      <div className="flex gap-[2px]">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`px-[18px] py-[6px] rounded-md text-[0.82rem] tracking-[0.5px]
                          transition-all duration-150 no-underline
                          ${isActive
                            ? "text-acc bg-acc/10"
                            : "text-t2 hover:text-t1 hover:bg-white/5"
                          }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default Navbar;