import Link from "next/link"; 

const NavHeader: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full flex justify-center items-center text-[length:var(--tpg-header-font-size)] z-[2] backdrop-blur-sm">
      <div className="w-[--tpg-basic-width] py-[10px] flex justify-between items-center">
        
        <div className="font-liber font-bold">
          <Link href="/">TYLE</Link>
        </div>

        <div className="font-mont flex gap-[10px]">
          <Link href="/long">Long</Link>
          <Link href="/profile">Profile</Link>
          <Link href="/login">Account</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavHeader;