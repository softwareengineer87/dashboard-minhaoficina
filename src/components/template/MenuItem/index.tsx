import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import Link from "next/link";
import { ReactNode, useState } from "react";
import './menu-item.css';

interface MenuItemProps {
  label: string;
  icon: ReactNode;
  url: string;
}

function MenuItem({
  label,
  icon,
  url,
}: MenuItemProps) {

  const [showMenu, setShowMenu] = useState<boolean>(true);

  return (
    <nav className='menuitem-container'>
      <section className='menu-item'>
        <div className='dropdown-menu'>
          <p className='close' onClick={() => setShowMenu((state) => !state)}>
            {showMenu ? <IconChevronUp /> : <IconChevronDown />}
          </p>
          <li
            className={`${showMenu ? 'active' : 'deactive'}`}>
            <Link
              className='link'
              href={url}
            >
              {icon}
              <span className='close'>{label}</span></Link>
          </li>
        </div>
      </section>
    </nav>
  );
}

export { MenuItem }
